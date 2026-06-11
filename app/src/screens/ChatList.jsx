import React from 'react';
import Avatar from '../components/Avatar';
import { CHATS } from '../data';
import { BellIcon } from '../components/Icons';

export default function ChatList({ nav, receivedRequests }) {
  const requestCount = receivedRequests?.length ?? 0;

  return (
    <div>
      <div className="topbar">
        <div className="title" style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>
          Conversations
        </div>
        <div className="spacer" />
        <button
          className="notif-bell-btn"
          onClick={() => nav.go('notifications')}
          aria-label={`Notifications${requestCount > 0 ? ` · ${requestCount} pending` : ''}`}
        >
          <BellIcon size={20} />
          {requestCount > 0 && <span className="notif-bell-count">{requestCount}</span>}
        </button>
      </div>

      <div className="chat-list">
        <p className="muted small" style={{ padding: '4px 22px 14px' }}>Your event buddies, the people you've given feedback to, and friends from Soft Launch rooms.</p>
        {CHATS.map((c) => (
          <div key={c.id} className="chat-row-wrap">
            <button
              className="chat-avatar-btn"
              onClick={() => c.avatarSeed !== 'group' && nav.go('userProfile', { seed: c.avatarSeed })}
              aria-label={c.avatarSeed !== 'group' ? `View ${c.name}'s profile` : undefined}
              style={{ cursor: c.avatarSeed === 'group' ? 'default' : 'pointer' }}
            >
              <Avatar seed={c.avatarSeed} name={c.name} size={48} />
            </button>
            <button className="chat-row-content" onClick={() => nav.go('chatThread', { id: c.id })}>
              <div className="info">
                <div className="top-line">
                  <span className="name">{c.name}</span>
                  {c.unread && <span className="badge" aria-label="Unread" />}
                  <span className="time">{c.timeAgo}</span>
                </div>
                <div className="preview">{c.preview}</div>
                {c.eventTitle && <span className="event-tag">{c.eventTitle}</span>}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
