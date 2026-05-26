import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { EVENTS } from '../data';
import { CheckIcon } from '../components/Icons';

export default function EventRsvp({ nav, eventId, onSubmit }) {
  const event = EVENTS.find((e) => e.id === eventId) || EVENTS[0];
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState(() => (event.questions || []).map(() => ''));
  const [wantBuddy, setWantBuddy] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  const updateAnswer = (i, val) => {
    setAnswers((a) => a.map((v, idx) => (idx === i ? val : v)));
  };

  const canSubmit = name.trim().length > 0 && confirmed;

  const handleSubmit = () => {
    if (onSubmit) onSubmit();
    if (wantBuddy) {
      nav.replace('personalityTest', { eventId: event.id });
    } else {
      nav.back();
      nav.back();
    }
  };

  return (
    <div>
      <TopBar onBack={() => nav.back()} title="RSVP" />
      <div className="rsvp-form">
        <h2 className="serif">{event.title}</h2>
        <p className="rsvp-meta">{event.date} at {event.time} · {event.location}</p>

        {/* Name */}
        <div className="rsvp-field">
          <label className="rsvp-label">Name</label>
          <input
            className="rsvp-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>

        {/* Event-specific questions */}
        {(event.questions || []).map((q, i) => (
          <div className="rsvp-field" key={i}>
            <label className="rsvp-label">{q}</label>
            <textarea
              className="rsvp-textarea"
              value={answers[i]}
              onChange={(e) => updateAnswer(i, e.target.value)}
              placeholder="Write your answer..."
              rows={3}
            />
          </div>
        ))}

        {/* Buddy toggle */}
        <div className="buddy-toggle">
          <div className="t-text">
            <h4>Find a buddy</h4>
            <p>Match with someone who's also going. Meet up before the event.</p>
          </div>
          <button className={`switch ${wantBuddy ? 'on' : ''}`} onClick={() => setWantBuddy((w) => !w)} aria-label="Want a buddy" />
        </div>

        {/* Confirm attendance */}
        <div
          className="guideline-check"
          onClick={() => setConfirmed((c) => !c)}
          role="checkbox"
          aria-checked={confirmed}
          tabIndex={0}
        >
          <div className={`checkbox ${confirmed ? 'checked' : ''}`}>
            {confirmed && <CheckIcon size={14} />}
          </div>
          <span>I can confirm I will attend</span>
        </div>

        <button
          className="btn-primary accent"
          style={{ width: '100%', marginTop: 8 }}
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          {wantBuddy ? 'Submit & find a buddy' : 'Submit'}
        </button>
      </div>
    </div>
  );
}
