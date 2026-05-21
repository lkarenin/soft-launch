import React, { useState } from 'react';
import Avatar from '../components/Avatar';
import { FEEDBACK_GIVEN, FEEDBACK_RECEIVED, INTERESTS } from '../data';
import { SparkIcon, StarIcon, BookmarkIcon, ChevronRight, InterestIcon } from '../components/Icons';
import { ArrowRight } from '@phosphor-icons/react';

const TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'given', label: 'Given' },
  { id: 'received', label: 'Received' },
  { id: 'saved', label: 'Saved' },
];

function interestLabel(id) {
  return INTERESTS.find((i) => i.id === id)?.label || 'Idea';
}

export default function Profile({ nav, user, myProjects, savedIds, allProjects, awardKarma }) {
  const [tab, setTab] = useState('projects');
  const [ratings, setRatings] = useState(() =>
    Object.fromEntries(FEEDBACK_RECEIVED.map((f) => [f.id, f.rating]))
  );

  const saveRating = (id, value) => {
    if (ratings[id]) return; // already rated
    setRatings({ ...ratings, [id]: value });
    awardKarma(value * 2, 'Rating feedback rewards the giver');
  };

  const savedProjects = allProjects.filter((p) => savedIds.has(p.id));

  return (
    <div>
      <div className="topbar">
        <div className="title" style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500 }}>Your profile</div>
        <div className="spacer" />
        <button className="btn-ghost" style={{ height: 32, padding: '0 12px', fontSize: 12 }} onClick={() => nav.go('settings')}>Settings</button>
      </div>

      <div className="profile-head">
        <Avatar seed="you" name="You" size={64} ring />
        <div className="name-block">
          <h1>You</h1>
          <div className="handle">Brooklyn, NY · joined a month ago</div>
        </div>
      </div>

      <div className="karma-card">
        <div className="karma-num">
          <span><SparkIcon size={22} /></span>
          {user.karma.toLocaleString()}
          <small>karma</small>
        </div>
        <div className="bar" aria-hidden="true">
          <span style={{ width: `${user.rankProgress * 100}%` }} />
        </div>
        <div className="progress-text">
          You're a <strong>{user.rank}</strong>. {Math.round((1 - user.rankProgress) * 400)} more to reach <strong>{user.rankNext}</strong>.
        </div>
      </div>

      <div className="profile-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={tab === t.id ? 'active' : ''}
            onClick={() => setTab(t.id)}
            role="tab"
            aria-selected={tab === t.id}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="profile-body">
        {tab === 'projects' && (
          <div className="tile-list">
            {myProjects.map((p, idx) => (
              <button key={p.id} className="tile" onClick={() => nav.go('projectDetail', { id: p.id })}>
                <div
                  className={idx % 2 === 0 ? 'gradient-blue' : 'gradient-purple'}
                  style={{ width: 52, height: 52, borderRadius: 12, flexShrink: 0 }}
                />
                <div className="body">
                  <h4>{p.title}</h4>
                  <div className="sub">{interestLabel(p.interest)} · {p.feedbackCount} pieces of feedback</div>
                  <p style={{ fontSize: 13 }}>{p.tagline}</p>
                </div>
                <ChevronRight size={18} />
              </button>
            ))}
            <button
              className="add-section"
              style={{ marginTop: 4 }}
              onClick={() => nav.go('newProject')}
            >
              + Start a new project
            </button>
          </div>
        )}

        {tab === 'given' && (
          <div className="tile-list">
            {FEEDBACK_GIVEN.map((f) => (
              <div key={f.id} className="tile">
                <Avatar seed={f.avatarSeed} name={f.to} size={40} />
                <div className="body">
                  <h4 style={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>You <ArrowRight size={13} weight="bold" /> {f.to}</h4>
                  <div className="sub">on {f.project} · {f.timeAgo}</div>
                  <p>{f.excerpt}</p>
                  <div className="karma-line">
                    <SparkIcon size={12} /> +{f.karmaEarned} karma · marked helpful by {f.to.split(' ')[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'received' && (
          <div className="tile-list">
            <div className="bm-banner" style={{ marginBottom: 12 }}>
              Rate the feedback you got. Helpful ratings reward the person who gave it - and they're more likely to come back and help others.
            </div>
            {FEEDBACK_RECEIVED.map((f) => (
              <div key={f.id} className="tile">
                <Avatar seed={f.avatarSeed} name={f.from} size={40} />
                <div className="body">
                  <h4 style={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>{f.from} <ArrowRight size={13} weight="bold" /> you</h4>
                  <div className="sub">on {f.project} · {f.timeAgo}</div>
                  <p>{f.excerpt}</p>
                  {ratings[f.id] ? (
                    <div className="quality-rating">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span key={n} className={`star ${n <= ratings[f.id] ? 'filled' : ''}`}>
                          <StarIcon size={16} filled={n <= ratings[f.id]} />
                        </span>
                      ))}
                      <span className="label">{ratings[f.id]}/5 · awarded</span>
                    </div>
                  ) : (
                    <>
                      <div className="rate-prompt">How helpful was this?</div>
                      <div className="quality-rating">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            className={`star ${n <= (ratings[f.id] || 0) ? 'filled' : ''}`}
                            onClick={() => saveRating(f.id, n)}
                            aria-label={`Rate ${n} stars`}
                          >
                            <StarIcon size={18} />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'saved' && (
          <div className="tile-list">
            {savedProjects.length === 0 ? (
              <div className="empty"><BookmarkIcon /> Nothing saved yet. Tap the bookmark on a project you want to come back to.</div>
            ) : savedProjects.map((p, idx) => (
              <button key={p.id} className="tile" onClick={() => nav.go('projectDetail', { id: p.id })}>
                <div
                  className={idx % 2 === 0 ? 'gradient-blue' : 'gradient-purple'}
                  style={{ width: 52, height: 52, borderRadius: 12, flexShrink: 0 }}
                />
                <div className="body">
                  <h4>{p.title}</h4>
                  <div className="sub">{p.author} · {interestLabel(p.interest)}</div>
                  <p style={{ fontSize: 13 }}>{p.tagline}</p>
                </div>
                <ChevronRight size={18} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
