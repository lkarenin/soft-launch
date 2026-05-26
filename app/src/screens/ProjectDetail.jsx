import React, { useState, useRef, useEffect } from 'react';
import Avatar from '../components/Avatar';
import StarRating from '../components/StarRating';
import BadgePill from '../components/BadgePill';
import { ChevronLeft, BookmarkIcon, SparkIcon } from '../components/Icons';
import { INTERESTS } from '../data';

const BOOST_AMOUNTS = [10, 25, 50, 100];

function KarmaBoostSheet({ project, userKarma, onSpend, onClose }) {
  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="karma-sheet">
        <div className="karma-sheet-handle" />
        <div className="karma-sheet-head">
          <div className="karma-sheet-title">Boost this project</div>
          <div className="karma-sheet-sub">Spend karma to push your project higher in the feed. It compounds — the more you add, the more visible it gets.</div>
        </div>

        <div className="karma-sheet-meter">
          <div className="karma-sheet-meter-row">
            <span className="karma-sheet-meter-label">Project karma</span>
            <span className="karma-sheet-meter-val">
              <SparkIcon size={13} /> {project.karma}
            </span>
          </div>
          <div className="karma-sheet-meter-row">
            <span className="karma-sheet-meter-label">Your balance</span>
            <span className="karma-sheet-meter-val">{userKarma.toLocaleString()} available</span>
          </div>
        </div>

        <div className="karma-boost-amounts">
          {BOOST_AMOUNTS.map((amount) => (
            <button
              key={amount}
              className="karma-boost-btn"
              disabled={userKarma < amount}
              onClick={() => { onSpend(amount); onClose(); }}
            >
              <SparkIcon size={13} />
              +{amount}
            </button>
          ))}
        </div>

        <button className="btn-ghost" style={{ width: '100%', marginTop: 8 }} onClick={onClose}>Cancel</button>
      </div>
    </>
  );
}

function DotsMenu({ nav, projectId }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={menuRef} style={{ position: 'absolute', top: 12, right: 14, zIndex: 12 }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="More options"
        style={{
          width: 36, height: 36, borderRadius: 999,
          background: 'rgba(255,253,249,0.85)',
          backdropFilter: 'blur(6px)',
          color: '#1A1A1A',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 700, letterSpacing: 1,
        }}
      >
        ···
      </button>
      {open && (
        <div className="dots-menu">
          <button className="dots-item" onClick={() => { setOpen(false); nav.go('newProject'); }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit project
          </button>
          <button className="dots-item" onClick={() => { setOpen(false); if (navigator.share) { navigator.share({ title: 'Check this out on Foretold', url: window.location.href }); } }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Share project
          </button>
          <div className="dots-divider" />
          <button className="dots-item dots-item--danger" onClick={() => { setOpen(false); nav.back(); }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
            Delete project
          </button>
        </div>
      )}
    </div>
  );
}

function interestLabel(id) {
  return INTERESTS.find((i) => i.id === id)?.label || 'Idea';
}

export default function ProjectDetail({ nav, project, isSaved, toggleSave, feedbackUnlocked, user, spendKarma }) {
  const [tab, setTab] = useState('project');
  const effectiveTab = !feedbackUnlocked ? 'project' : tab;
  const [showBoost, setShowBoost] = useState(false);

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

      {project.mine && <DotsMenu nav={nav} projectId={project.id} />}

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
                    <div className="author-meta-line">
                      <span className="small muted">Identity revealed after first feedback · {interestLabel(project.interest)}</span>
                      {project.badge && <BadgePill id={project.badge} />}
                    </div>
                  </div>
                </>
              ) : (
                <button
                  className="author-profile-btn"
                  onClick={() => project.avatarSeed && project.avatarSeed !== 'you' && nav.go('userProfile', { seed: project.avatarSeed })}
                  disabled={!project.avatarSeed || project.avatarSeed === 'you'}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', cursor: project.avatarSeed === 'you' ? 'default' : 'pointer' }}
                >
                  <Avatar seed={project.avatarSeed} name={project.author} size={36} />
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>{project.author}</div>
                    <div className="author-meta-line">
                      <span className="small muted">{project.location} · {interestLabel(project.interest)}</span>
                      {project.badge && <BadgePill id={project.badge} />}
                    </div>
                  </div>
                </button>
              )}
              <div className="spacer" />
              {project.mine && (
                <button
                  className="karma-pill karma-pill--boost"
                  onClick={() => setShowBoost(true)}
                  aria-label="Boost project with karma"
                >
                  <span className="spark"><SparkIcon size={13} /></span>
                  {project.karma}
                </button>
              )}
            </div>

            <h1 className="serif">{project.title}</h1>
            <p className="tagline">{project.tagline}</p>

            {project.mine && project.rating ? (
              <div className="rating-row" style={{ marginBottom: 14 }}>
                <StarRating value={project.rating} count={project.ratingCount} size={16} />
                <span className="small muted">overall rating</span>
              </div>
            ) : null}

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
          {!project.mine && (
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
          )}
        </>
      ) : (
        <FeedbackTab project={project} />
      )}

      {showBoost && (
        <KarmaBoostSheet
          project={project}
          userKarma={user?.karma ?? 0}
          onSpend={(amount) => spendKarma(project.id, amount)}
          onClose={() => setShowBoost(false)}
        />
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
