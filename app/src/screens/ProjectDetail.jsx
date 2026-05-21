import React, { useState } from 'react';
import Avatar from '../components/Avatar';
import { ChevronLeft, BookmarkIcon, SparkIcon } from '../components/Icons';
import { INTERESTS } from '../data';

function interestLabel(id) {
  return INTERESTS.find((i) => i.id === id)?.label || 'Idea';
}

export default function ProjectDetail({ nav, project, isSaved, toggleSave, feedbackUnlocked }) {
  const [tab, setTab] = useState('project');
  const effectiveTab = !feedbackUnlocked ? 'project' : tab;

  return (
    <div style={{ position: 'relative', minHeight: '100%' }}>
      <button
        className="back"
        onClick={() => nav.back()}
        aria-label="Back"
        style={{
          position: 'absolute', top: 12, left: 14, zIndex: 12,
          width: 36, height: 36, borderRadius: 999,
          background: 'rgba(255,253,249,0.85)',
          backdropFilter: 'blur(6px)',
          color: '#1A1A1A',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <ChevronLeft size={20} />
      </button>

      {feedbackUnlocked && (
        <div className="pill-toggle" role="tablist" aria-label="Project tabs">
          <button className={effectiveTab === 'project' ? 'active' : ''} onClick={() => setTab('project')}>Project</button>
          <button className={effectiveTab === 'feedback' ? 'active' : ''} onClick={() => setTab('feedback')}>Feedback</button>
        </div>
      )}

      {effectiveTab === 'project' ? (
        <>
          <div
            className="detail-cover"
            style={project.coverImage
              ? { backgroundImage: `url(${project.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: project.cover }
              : { background: project.cover }}
          />
          <div className="detail-body">
            <div className="author-row">
              {project.anonymous && (project.feedbackCount || 0) === 0 ? (
                <>
                  <span className="anon-badge" aria-hidden="true" style={{ width: 36, height: 36, fontSize: 16 }}>?</span>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>Anonymous</div>
                    <div className="small muted">Identity revealed after first feedback · {interestLabel(project.interest)}</div>
                  </div>
                </>
              ) : (
                <>
                  <Avatar seed={project.avatarSeed} name={project.author} size={36} />
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>{project.author}</div>
                    <div className="small muted">{project.location} · {interestLabel(project.interest)}</div>
                  </div>
                </>
              )}
              <div className="spacer" />
              <div className="karma-pill">
                <span className="spark"><SparkIcon size={13} /></span>
                {project.karma}
              </div>
            </div>

            <h1 className="serif">{project.title}</h1>
            <p className="tagline">{project.tagline}</p>

            <div className="stats">
              <div className="stat">
                <div className="num">{project.feedbackCount}</div>
                <div className="label">Feedback</div>
              </div>
              <div className="stat">
                <div className="num">{Math.round(project.karma / 7)}</div>
                <div className="label">Saved by</div>
              </div>
              <div className="stat">
                <div className="num">3 days</div>
                <div className="label">Active</div>
              </div>
            </div>

            {project.sections?.map((s, i) => (
              <div className="section-block" key={i}>
                <div className="label">{s.label}</div>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          <div className="float-cta">
            <button
              className={`save-btn ${isSaved ? 'is-saved' : ''}`}
              onClick={toggleSave}
              aria-label={isSaved ? 'Saved' : 'Save'}
            >
              <BookmarkIcon size={20} filled={isSaved} />
            </button>
            <button
              className="btn-primary accent"
              onClick={() => nav.go('feedbackForm', { id: project.id })}
            >
              Give feedback
              <span className="karma-pill" style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.28)', color: 'var(--btn-accent-text)', height: 24, padding: '0 8px' }}>
                <SparkIcon size={12} /> +15
              </span>
            </button>
          </div>
        </>
      ) : (
        <FeedbackTab project={project} />
      )}
    </div>
  );
}

function FeedbackTab({ project }) {
  const fakeFeedback = [
    {
      from: 'Theo Adebayo', avatarSeed: 'theo', karma: 18, timeAgo: '1d',
      body: 'The trust thing is real, but I\'d watch for the bigger blocker: people don\'t want to be the first lister in their neighborhood. Seed it manually with five lush listings before you launch in a new area.',
    },
    {
      from: 'Priya Raman', avatarSeed: 'priya', karma: 12, timeAgo: '3d',
      body: 'Have you talked to the local plant shops? They\'re a possible distribution channel - they could host the swap meetups in person.',
    },
    {
      from: 'Owen Tanaka', avatarSeed: 'owen', karma: 6, timeAgo: '4d',
      body: 'The rate-after-swap loop is what makes this not creepy. Don\'t cut that for the MVP.',
    },
  ];
  return (
    <div className="detail-body" style={{ paddingTop: 70 }}>
      <h1 className="serif" style={{ marginBottom: 6 }}>{project.title}</h1>
      <p className="muted" style={{ marginBottom: 18 }}>{project.feedbackCount} pieces of feedback so far</p>
      {fakeFeedback.map((f, i) => (
        <div key={i} className="tile" style={{ marginBottom: 10 }}>
          <Avatar seed={f.avatarSeed} name={f.from} size={36} />
          <div className="body">
            <div className="row" style={{ marginBottom: 4 }}>
              <strong style={{ fontSize: 14 }}>{f.from}</strong>
              <span className="tiny muted">· {f.timeAgo}</span>
              <div className="spacer" />
              <span className="karma-pill" style={{ height: 22, padding: '0 8px', fontSize: 11 }}>
                <SparkIcon size={11} /> +{f.karma}
              </span>
            </div>
            <p>{f.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
