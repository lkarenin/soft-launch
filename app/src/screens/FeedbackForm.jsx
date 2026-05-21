import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { CheckIcon, SparkIcon } from '../components/Icons';

const DEFAULT_SECTIONS = [
  { label: 'What did you like most?', body: '' },
  { label: 'What could be stronger?', body: '' },
  { label: 'Would you actually use this?', body: '' },
  { label: 'One thing you\'d try next', body: '' },
];

export default function FeedbackForm({ nav, project, onSubmit, onOpenGuidelines }) {
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [checked, setChecked] = useState(false);

  const update = (i, body) => {
    setSections((s) => s.map((section, idx) => (idx === i ? { ...section, body } : section)));
  };

  const addSection = () => {
    setSections((s) => [...s, { label: 'Another thought', body: '' }]);
  };

  const filled = sections.some((s) => s.body.trim().length > 0);
  const canSubmit = filled && checked;

  return (
    <div>
      <TopBar onBack={() => nav.back()} title="Give feedback" closeIcon />
      <div className="feedback-form">
        <div className="eyebrow">You're evaluating</div>
        <h1>{project.title}</h1>

        <div className="karma-callout">
          <div className="icon"><SparkIcon size={14} /></div>
          <p>
            Thoughtful feedback earns <strong>karma</strong>, which boosts your own projects in the feed. The more specific you are, the more {project.author?.split(' ')[0]} can do with it.
          </p>
        </div>

        {sections.map((s, i) => (
          <div className="fb-section" key={i}>
            <div className="label">{s.label}</div>
            <textarea
              placeholder="Be honest. Be kind. Be specific."
              value={s.body}
              onChange={(e) => update(i, e.target.value)}
            />
          </div>
        ))}

        <button className="add-section" onClick={addSection}>+ Add a section</button>

        <div className="guideline-check" onClick={() => setChecked((c) => !c)} role="checkbox" aria-checked={checked} tabIndex={0}>
          <div className={`checkbox ${checked ? 'checked' : ''}`}>
            {checked && <CheckIcon size={14} />}
          </div>
          <span>I've checked that my comments follow the{' '}
            <a
              href="#"
              className="inline-link"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); nav.go('guidelines'); }}
            >community guidelines</a>.
          </span>
        </div>

        <button
          className="btn-primary accent"
          style={{ width: '100%' }}
          disabled={!canSubmit}
          onClick={onSubmit}
        >
          Send feedback
          <span className="karma-pill" style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.28)', color: 'var(--btn-accent-text)', height: 24, padding: '0 8px' }}>
            <SparkIcon size={12} /> +15
          </span>
        </button>
      </div>
    </div>
  );
}
