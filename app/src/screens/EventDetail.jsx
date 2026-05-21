import React, { useState } from 'react';
import { EVENTS } from '../data';
import Avatar from '../components/Avatar';
import { ChevronLeft, ClockIcon, PinIcon, BookmarkIcon } from '../components/Icons';

export default function EventDetail({ nav, eventId }) {
  const event = EVENTS.find((e) => e.id === eventId) || EVENTS[0];
  const [saved, setSaved] = useState(false);

  return (
    <div style={{ position: 'relative', minHeight: '100%' }}>
      {/* Back button */}
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

      <div className="event-detail">
        <div
          className="cover"
          style={event.coverImage
            ? { backgroundImage: `url(${event.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: event.cover }
            : { background: event.cover }}
        />
        <div className="event-detail-body">
          <h1>{event.title}</h1>

          <div className="ed-hosts">
            <span className="ed-label">Hosted by</span>
            <div className="ed-host-avatars">
              {event.hostSeeds.map((s) => (
                <Avatar key={s} seed={s} size={28} />
              ))}
            </div>
            <span className="ed-host-name">{event.host}</span>
          </div>

          <div className="ed-details">
            <div className="ed-detail-row">
              <ClockIcon size={16} />
              <span>{event.date} at {event.time}</span>
            </div>
            <div className="ed-detail-row">
              <PinIcon size={16} />
              <span>{event.location}</span>
            </div>
          </div>

          <p className="ed-blurb">{event.blurb}</p>

          <div className="attendees">
            <div className="stack">
              {['ada', 'theo', 'maya', 'jules', 'noor'].map((s) => (
                <Avatar key={s} seed={s} size={32} />
              ))}
            </div>
            <span className="count"><strong>{event.going}</strong> going · {Math.round(event.going * 0.4)} looking for a buddy</span>
          </div>
        </div>

        <div className="float-cta">
          <button
            className={`save-btn ${saved ? 'is-saved' : ''}`}
            onClick={() => setSaved((s) => !s)}
            aria-label={saved ? 'Saved' : 'Save'}
          >
            <BookmarkIcon size={20} filled={saved} />
          </button>
          <button
            className="btn-primary accent"
            style={{ flex: 1 }}
            onClick={() => nav.go('eventRsvp', { id: event.id })}
          >
            RSVP
          </button>
        </div>
      </div>
    </div>
  );
}
