import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { INTERESTS } from '../data';
import { InterestIcon } from '../components/Icons';

const DEFAULT_COVER = '#1F120D';

const PROMPTS = [
  { label: 'The idea (in one breath)', placeholder: 'A neighborhood plant-swap app, no money - just trust and shared dirt.' },
  { label: 'Who it\'s for', placeholder: 'Apartment plant people who don\'t want to drop $40 every time they spot something on TikTok.' },
  { label: 'Where you\'re stuck', placeholder: 'What\'s the part you keep coming back to that you can\'t answer alone?' },
];

export default function NewProject({ nav, onCreate }) {
  const [cover] = useState(DEFAULT_COVER);
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [interest, setInterest] = useState('design');
  const [sections, setSections] = useState(PROMPTS.map((p) => ({ label: p.label, body: '' })));

  const canPublish = title.trim() && tagline.trim();

  return (
    <div>
      <TopBar onBack={() => nav.back()} title="New project" closeIcon />
      <div className="np">
        <div className="image-drop" style={{ background: cover }}>
          <div className="pick">+ Add image</div>
        </div>

        <div className="np-field">
          <div className="label">Title</div>
          <input
            className="np-input title"
            placeholder="What's it called?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="np-field">
          <div className="label">One-line summary</div>
          <textarea
            className="np-input summary"
            placeholder="The shortest, warmest version of your idea."
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        </div>

        <div className="np-field">
          <div className="label">What world is it in?</div>
          <div className="row" style={{ flexWrap: 'wrap', gap: 6 }}>
            {INTERESTS.slice(0, 8).map((i) => (
              <button
                key={i.id}
                className={`chip ${interest === i.id ? 'is-active' : ''}`}
                onClick={() => setInterest(i.id)}
              >
                <InterestIcon id={i.id} size={13} /> {i.label}
              </button>
            ))}
          </div>
        </div>

        {sections.map((s, i) => (
          <div className="np-field" key={i}>
            <div className="label">{s.label}</div>
            <textarea
              className="np-input summary"
              placeholder={PROMPTS[i]?.placeholder || 'Anything else?'}
              value={s.body}
              onChange={(e) =>
                setSections((arr) => arr.map((sec, idx) => (idx === i ? { ...sec, body: e.target.value } : sec)))
              }
            />
          </div>
        ))}

        <button className="add-section" onClick={() => setSections((arr) => [...arr, { label: 'Another section', body: '' }])}>
          + Add a section
        </button>

        <div className="np-actions">
          <button className="btn-ghost" onClick={() => nav.back()}>Save draft</button>
          <button
            className="btn-primary accent"
            disabled={!canPublish}
            onClick={() => onCreate({
              cover,
              title: title.trim(),
              tagline: tagline.trim(),
              interest,
              sections: sections.filter((s) => s.body.trim()),
              location: 'Your city',
            })}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
