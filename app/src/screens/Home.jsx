import React, { useState } from 'react';
import { INTERESTS } from '../data';
import Avatar from '../components/Avatar';
import { BookmarkIcon, SparkIcon, FeedIcon, GridIcon, InterestIcon } from '../components/Icons';

function interestLabel(id) {
  return INTERESTS.find((i) => i.id === id)?.label || 'Idea';
}

function isAnon(project) {
  return project.anonymous && (project.feedbackCount || 0) === 0;
}

function ProjectFeedCard({ project, onOpen, isSaved, onSave }) {
  const coverStyle = project.coverImage
    ? { backgroundImage: `url(${project.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: project.cover }
    : { background: project.cover };
  return (
    <div
      className="feed-card"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
    >
      <div className="cover" style={coverStyle}>
        <div className="interest-tag">
          <InterestIcon id={project.interest} size={13} />
          <span>{interestLabel(project.interest)}</span>
        </div>
        <div className="karma-pill karma-tag">
          <span className="spark"><SparkIcon size={13} /></span>
          {project.karma}
        </div>
        <button
          className={`save ${isSaved ? 'is-saved' : ''}`}
          onClick={(e) => { e.stopPropagation(); onSave(); }}
          aria-label={isSaved ? 'Unsave' : 'Save'}
        >
          <BookmarkIcon size={18} filled={isSaved} />
        </button>
      </div>
      <div className="body">
        <div className="author">
          {isAnon(project) ? (
            <>
              <span className="anon-badge" aria-hidden="true">?</span>
              <span style={{ color: 'var(--ink)' }}>Anonymous</span>
              <span className="dot" style={{ width: 3, height: 3, borderRadius: 999, background: 'var(--ink-faint)' }} />
              <span>Revealed after first feedback</span>
            </>
          ) : (
            <>
              <Avatar seed={project.avatarSeed} name={project.author} size={22} />
              <span style={{ color: 'var(--ink)' }}>{project.author}</span>
              <span className="dot" style={{ width: 3, height: 3, borderRadius: 999, background: 'var(--ink-faint)' }} />
              <span>{project.location}</span>
            </>
          )}
        </div>
        <h3>{project.title}</h3>
        <p>{project.tagline}</p>
        <div className="meta">
          <span>{project.feedbackCount} pieces of feedback</span>
          <span className="dot" />
          <span>3 days ago</span>
        </div>
      </div>
    </div>
  );
}

function GridProjectCard({ project, onOpen }) {
  const coverStyle = project.coverImage
    ? { backgroundImage: `url(${project.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: project.cover }
    : { background: project.cover };
  return (
    <button className="grid-card" onClick={onOpen}>
      <div className="cover" style={coverStyle}>
        <div className="karma-pill karma-tag" style={{ position: 'absolute', bottom: 10, left: 10 }}>
          <span className="spark"><SparkIcon size={12} /></span>
          {project.karma}
        </div>
      </div>
      <div className="body">
        <h4>{project.title}</h4>
        <div className="meta">{project.author} · {interestLabel(project.interest)}</div>
      </div>
    </button>
  );
}

export default function Home({ nav, user, projects, savedIds, toggleSave }) {
  const [view, setView] = useState('feed');

  return (
    <div>
      <div className="topbar">
        <div className="title" style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>
          Foretold
        </div>
        <div className="spacer" />
        <div className="karma-pill">
          <span className="spark"><SparkIcon size={13} /></span>
          {user.karma.toLocaleString()}
        </div>
      </div>

      <div className="home-head">
        <div className="greeting">Welcome Back!</div>
        <div className="greeting-sub">Here's 10 new inspiring ideas</div>
      </div>

      <div className="feed-toggle" role="tablist" aria-label="Feed view">
        <button className={`ft ${view === 'feed' ? 'active' : ''}`} onClick={() => setView('feed')} role="tab" aria-selected={view === 'feed'}>
          <FeedIcon size={15} /> Feed
        </button>
        <span className="ft bar">|</span>
        <button className={`ft ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')} role="tab" aria-selected={view === 'grid'}>
          <GridIcon size={15} /> Grid
        </button>
      </div>

      {view === 'feed' ? (
        <div className="feed-list">
          {projects.map((p) => (
            <ProjectFeedCard
              key={p.id}
              project={p}
              onOpen={() => nav.go('projectDetail', { id: p.id })}
              isSaved={savedIds.has(p.id)}
              onSave={() => toggleSave(p.id)}
            />
          ))}
        </div>
      ) : (
        <div className="grid-feed">
          {projects.map((p) => (
            <GridProjectCard key={p.id} project={p} onOpen={() => nav.go('projectDetail', { id: p.id })} />
          ))}
        </div>
      )}
    </div>
  );
}
