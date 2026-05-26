import React, { useState } from 'react';
import Avatar from '../components/Avatar';
import { FEEDBACK_GIVEN, FEEDBACK_RECEIVED, INTERESTS, USERS } from '../data';
import { SparkIcon, StarIcon, BookmarkIcon, ChevronRight, InterestIcon, CheckIcon, UsersIcon, ChatIcon, FeedIcon } from '../components/Icons';
import StarRating from '../components/StarRating';
import { ArrowRight, Eye } from '@phosphor-icons/react';

const TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'given', label: 'Given' },
  { id: 'received', label: 'Received' },
  { id: 'saved', label: 'Saved' },
];

function interestLabel(id) {
  return INTERESTS.find((i) => i.id === id)?.label || 'Idea';
}

export default function Profile({ nav, user, myProjects, savedIds, allProjects, awardKarma, friendIds, receivedRequests, onAccept, onDecline }) {
  const [tab, setTab] = useState('projects');
  const [ratings, setRatings] = useState(() =>
    Object.fromEntries(FEEDBACK_RECEIVED.map((f) => [f.id, f.rating]))
  );

  const saveRating = (id, value) => {
    if (ratings[id]) return;
    setRatings({ ...ratings, [id]: value });
    awardKarma(value * 2, 'Rating feedback rewards the giver');
  };

  const savedProjects = allProjects.filter((p) => savedIds.has(p.id));
  const friendList = USERS.filter((u) => friendIds.has(u.seed));
  const requestCount = receivedRequests?.length ?? 0;

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
          <div className="profile-social">
            <button className="profile-social-stat" onClick={() => setTab('friends')}>
              <strong>{friendIds.size}</strong> {friendIds.size === 1 ? 'friend' : 'friends'}
            </button>
            {requestCount > 0 && (
              <>
                <span className="profile-social-dot" />
                <button className="profile-social-requests" onClick={() => nav.go('notifications')}>
                  {requestCount} request{requestCount > 1 ? 's' : ''} →
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="karma-card">
        <div className="karma-num">
          <span><SparkIcon size={22} /></span>
          {user.karma.toLocaleString()}
          <small>available to spend</small>
        </div>
        <div className="karma-lifetime">
          <SparkIcon size={12} /> {(user.lifetimeKarma ?? user.karma).toLocaleString()} lifetime earned
        </div>
        {/* Reach & engagement — replaces the old tier-progress block.
            Shows how the user's projects are performing in the feed
            (views, impressions, feedback received) so the karma card
            reads as a status snapshot rather than a gamification ladder. */}
        <div className="engagement-stats" role="list">
          <div className="engagement-stat" role="listitem">
            <span className="engagement-stat__icon"><Eye size={16} /></span>
            <span className="engagement-stat__num">{(user.views ?? 0).toLocaleString()}</span>
            <span className="engagement-stat__label">views</span>
          </div>
          <div className="engagement-stat" role="listitem">
            <span className="engagement-stat__icon"><FeedIcon size={15} /></span>
            <span className="engagement-stat__num">{(user.impressions ?? 0).toLocaleString()}</span>
            <span className="engagement-stat__label">impressions</span>
          </div>
          <div className="engagement-stat" role="listitem">
            <span className="engagement-stat__icon"><ChatIcon size={15} /></span>
            <span className="engagement-stat__num">{(user.feedbackReceived ?? 0).toLocaleString()}</span>
            <span className="engagement-stat__label">feedback</span>
          </div>
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
            style={{ position: 'relative' }}
          >
            {t.label}
            {t.id === 'friends' && requestCount > 0 && (
              <span className="tab-badge">{requestCount}</span>
            )}
          </button>
        ))}
      </div>

      <div className="profile-body">
        {tab === 'projects' && (
          <div className="tile-list">
            {allProjects.filter(p => p.mine).map((p, idx) => (
              <button key={p.id} className="tile" onClick={() => nav.go('projectDetail', { id: p.id })}>
                <div
                  className={p.coverImage ? '' : (idx % 2 === 0 ? 'gradient-blue' : 'gradient-purple')}
                  style={{
                    width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                    ...(p.coverImage
                      ? { backgroundImage: `url(${p.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: p.cover }
                      : {}),
                  }}
                />
                <div className="body">
                  <h4>{p.title}</h4>
                  <div className="sub">{interestLabel(p.interest)} · {p.feedbackCount} pieces of feedback</div>
                  {p.rating > 0 && (
                    <div style={{ marginTop: 4 }}>
                      <StarRating value={p.rating} count={p.ratingCount} size={13} />
                    </div>
                  )}
                  <p style={{ fontSize: 13 }}>{p.tagline}</p>
                </div>
                <ChevronRight size={18} />
              </button>
            ))}
            <button className="add-section" style={{ marginTop: 4 }} onClick={() => nav.go('newProject')}>
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
              Rate the feedback you got. Helpful ratings reward the person who gave it.
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
                          <button key={n} className={`star ${n <= (ratings[f.id] || 0) ? 'filled' : ''}`} onClick={() => saveRating(f.id, n)} aria-label={`Rate ${n} stars`}>
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
              <div className="empty"><BookmarkIcon /> Nothing saved yet.</div>
            ) : savedProjects.map((p, idx) => (
              <button key={p.id} className="tile" onClick={() => nav.go('projectDetail', { id: p.id })}>
                <div
                  className={p.coverImage ? '' : (idx % 2 === 0 ? 'gradient-blue' : 'gradient-purple')}
                  style={{
                    width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                    ...(p.coverImage
                      ? { backgroundImage: `url(${p.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: p.cover }
                      : {}),
                  }}
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

        {tab === 'friends' && (
          <div>
            {requestCount > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div className="friends-section-label">Pending Requests</div>
                <div className="tile-list">
                  {receivedRequests.map((req) => (
                    <div key={req.seed} className="tile">
                      <button onClick={() => nav.go('userProfile', { seed: req.seed })} style={{ flexShrink: 0 }}>
                        <Avatar seed={req.seed} name={req.name} size={44} />
                      </button>
                      <div className="body">
                        <h4 style={{ fontSize: 15 }}>{req.name}</h4>
                        <div className="sub">{req.timeAgo}</div>
                        {req.message && <p style={{ fontSize: 13 }}>{req.message}</p>}
                        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                          <button className="notif-accept" onClick={() => onAccept(req.seed)}>Accept</button>
                          <button className="notif-decline" onClick={() => onDecline(req.seed)}>Decline</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="friends-section-label">
              {friendList.length > 0 ? `${friendList.length} ${friendList.length === 1 ? 'Friend' : 'Friends'}` : 'Friends'}
            </div>
            {friendList.length === 0 ? (
              <div className="friends-empty">
                <UsersIcon size={28} />
                <p>No friends yet</p>
                <span>Explore the feed and connect with people whose ideas excite you.</span>
              </div>
            ) : (
              <div className="tile-list">
                {friendList.map((u) => (
                  <button key={u.seed} className="tile" onClick={() => nav.go('userProfile', { seed: u.seed })}>
                    <Avatar seed={u.seed} name={u.name} size={44} />
                    <div className="body">
                      <h4 style={{ fontSize: 15 }}>{u.name}</h4>
                      <div className="sub">{u.handle} · {u.location}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ink-muted)', fontSize: 12, flexShrink: 0 }}>
                      <CheckIcon size={13} /> Friends
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
