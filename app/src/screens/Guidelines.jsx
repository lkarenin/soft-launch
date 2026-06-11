import React from 'react';
import TopBar from '../components/TopBar';
import { SparkIcon } from '../components/Icons';

const RULES = [
  {
    title: 'Be honest',
    body: 'Say what you really think. Sugar-coating doesn\'t help anyone grow. If something isn\'t working, name it - gently, but clearly.',
  },
  {
    title: 'Be specific',
    body: 'Instead of "this is cool," try "the onboarding flow made me want to keep going because…" Specifics are what people can actually act on.',
  },
  {
    title: 'Be kind',
    body: 'Remember there\'s a person on the other side who put themselves out there. Critique the work, not the person.',
  },
  {
    title: 'Focus on what helps',
    body: 'The best feedback answers a question the creator didn\'t know they had. Think about what would genuinely move their project forward.',
  },
  {
    title: 'No self-promotion',
    body: 'Feedback isn\'t the place to pitch your own project. Keep the focus on theirs.',
  },
  {
    title: 'Respect privacy',
    body: 'Some creators choose to stay anonymous until they receive feedback. Don\'t share details about projects or people outside of Soft Launch without permission.',
  },
];

export default function Guidelines({ nav }) {
  return (
    <div>
      <TopBar onBack={() => nav.back()} title="Community guidelines" closeIcon />
      <div className="guidelines-page">
        <div className="karma-callout" style={{ marginBottom: 20 }}>
          <div className="icon"><SparkIcon size={14} /></div>
          <p>
            Soft Launch runs on <strong>karma</strong> - the more thoughtful you are, the more the community gives back. These guidelines exist to keep feedback generous, useful, and safe.
          </p>
        </div>

        {RULES.map((rule, i) => (
          <div className="guideline-item" key={i}>
            <div className="guideline-num">{i + 1}</div>
            <div>
              <h3>{rule.title}</h3>
              <p>{rule.body}</p>
            </div>
          </div>
        ))}

        <p className="guidelines-footer">
          Feedback that violates these guidelines may be removed, and repeated violations can result in reduced karma or account restrictions.
        </p>
      </div>
    </div>
  );
}
