import React from 'react';
import Avatar from '../components/Avatar';
import TopBar from '../components/TopBar';
import { USERS, PROJECTS, INTERESTS } from '../data';
import { SparkIcon, UserPlusIcon, CheckIcon, InterestIcon, LinkedInIcon, GitHubIcon, BehanceIcon, InstagramIcon, TwitterXIcon, GlobeIcon } from '../components/Icons';

const SOCIAL_CONFIG = [
  { key: 'linkedin',  Icon: LinkedInIcon,  label: 'LinkedIn',  href: (v) => `https://linkedin.com/in/${v}` },
  { key: 'github',    Icon: GitHubIcon,    label: 'GitHub',    href: (v) => `https://github.com/${v}` },
  { key: 'behance',   Icon: BehanceIcon,   label: 'Behance',   href: (v) => `https://behance.net/${v}` },
  { key: 'instagram', Icon: InstagramIcon, label: 'Instagram', href: (v) => `https://instagram.com/${v}` },
  { key: 'twitter',   Icon: TwitterXIcon,  label: 'X',         href: (v) => `https://x.com/${v}` },
  { key: 'website',   Icon: GlobeIcon,     label: 'Website',   href: (v) => v.startsWith('http') ? v : `https://${v}` },
];

function interestLabel(id) {
  return INTERESTS.find((i) => i.id === id)?.label || id;
}

export default function UserProfile({ nav, seed, friendIds, sentRequests, onSendRequest }) {
  const user = USERS.find((u) => u.seed === seed);
  const projects = PROJECTS.filter((p) => p.avatarSeed === seed);

  const isFriend = friendIds.has(seed);
  const isPending = sentRequests.has(seed);

  if (!user) {
    return (
      <div>
        <TopBar title="Profile" onBack={() => nav.back()} />
        <div className="empty" style={{ paddingTop: 60 }}>User not found.</div>
      </div>
    );
  }

  function FriendButton() {
    if (isFriend) {
      return (
        <div className="friend-btn is-friends">
          <CheckIcon size={15} /> Friends
        </div>
      );
    }
    if (isPending) {
      return <div className="friend-btn is-pending">Requested</div>;
    }
    return (
      <button className="friend-btn is-add" onClick={() => onSendRequest(seed)}>
        <UserPlusIcon size={15} /> Add Friend
      </button>
    );
  }

  return (
    <div>
      <TopBar onBack={() => nav.back()} />

      <div className="up-hero">
        <Avatar seed={seed} name={user.name} size={72} ring />
        <h1 className="up-name">{user.name}</h1>
        <div className="up-handle">{user.handle} · {user.location}</div>
        {user.bio && <p className="up-bio">{user.bio}</p>}

        <div className="up-stats">
          <div className="up-stat">
            <span className="up-stat-num">{user.karma.toLocaleString()}</span>
            <span className="up-stat-label">Karma</span>
          </div>
          <div className="up-stat-div" />
          <div className="up-stat">
            <span className="up-stat-num">{projects.length}</span>
            <span className="up-stat-label">Projects</span>
          </div>
          <div className="up-stat-div" />
          <div className="up-stat">
            <span className="up-stat-num">{user.joinedAgo.split(' ')[0]}</span>
            <span className="up-stat-label">{user.joinedAgo.split(' ').slice(1).join(' ')}</span>
          </div>
        </div>

        <div className="up-actions">
          <FriendButton />
        </div>

        {user.socials && Object.values(user.socials).some(Boolean) && (
          <div className="up-socials">
            {SOCIAL_CONFIG.map(({ key, Icon, label, href }) =>
              user.socials[key] ? (
                <a
                  key={key}
                  className="up-social-btn"
                  href={href(user.socials[key])}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icon size={18} />
                </a>
              ) : null
            )}
          </div>
        )}
      </div>

      {user.interests?.length > 0 && (
        <div className="up-section">
          <div className="up-section-label">Interests</div>
          <div className="up-interests">
            {user.interests.map((id) => (
              <div key={id} className="up-interest-chip cat-pill" data-cat={id}>
                <InterestIcon id={id} size={13} />
                {interestLabel(id)}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="up-section">
        <div className="up-section-label">Projects</div>
        {projects.length === 0 ? (
          <div className="empty" style={{ padding: '20px 0' }}>No projects posted yet.</div>
        ) : (
          <div className="tile-list">
            {projects.map((p) => (
              <button
                key={p.id}
                className="tile"
                onClick={() => nav.go('projectDetail', { id: p.id })}
              >
                <div
                  style={{
                    width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                    background: p.cover,
                    ...(p.coverImage ? { backgroundImage: `url(${p.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}),
                  }}
                />
                <div className="body">
                  <h4>{p.title}</h4>
                  <div className="sub">{interestLabel(p.interest)} · {p.feedbackCount} feedback</div>
                  <p style={{ fontSize: 13 }}>{p.tagline}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
