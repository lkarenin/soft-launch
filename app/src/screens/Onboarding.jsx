import React, { useState, useMemo, useRef } from 'react';
import { INTERESTS, BACKGROUNDS } from '../data';
import { ChevronLeft, PinIcon, CheckIcon, SparkIcon, InterestIcon, SearchIcon, SeedIcon, ChatIcon } from '../components/Icons';

const STEPS = ['interests', 'location', 'background', 'welcome'];
const ONB_STEP_TOTAL = 4;

function highlightMatch(label, query) {
  if (!query) return label;
  const lower = label.toLowerCase();
  const q = query.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) return label;
  return (
    <>
      {label.slice(0, idx)}
      <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{label.slice(idx, idx + query.length)}</strong>
      {label.slice(idx + query.length)}
    </>
  );
}

const CITIES = [
  'Brooklyn, NY',
  'New York, NY',
  'Manhattan, NY',
  'Queens, NY',
  'Bronx, NY',
  'Jersey City, NJ',
  'Hoboken, NJ',
  'Philadelphia, PA',
  'Pittsburgh, PA',
  'Boston, MA',
  'Cambridge, MA',
  'Providence, RI',
  'Washington, DC',
  'Baltimore, MD',
  'Richmond, VA',
  'Raleigh, NC',
  'Durham, NC',
  'Charlotte, NC',
  'Atlanta, GA',
  'Nashville, TN',
  'Miami, FL',
  'Orlando, FL',
  'Tampa, FL',
  'New Orleans, LA',
  'Austin, TX',
  'Houston, TX',
  'Dallas, TX',
  'San Antonio, TX',
  'El Paso, TX',
  'Phoenix, AZ',
  'Tucson, AZ',
  'Albuquerque, NM',
  'Santa Fe, NM',
  'Salt Lake City, UT',
  'Boise, ID',
  'Denver, CO',
  'Boulder, CO',
  'Las Vegas, NV',
  'Los Angeles, CA',
  'Long Beach, CA',
  'Pasadena, CA',
  'San Diego, CA',
  'San Francisco, CA',
  'Oakland, CA',
  'Berkeley, CA',
  'San Jose, CA',
  'Sacramento, CA',
  'Portland, OR',
  'Seattle, WA',
  'Tacoma, WA',
  'Anchorage, AK',
  'Honolulu, HI',
  'Minneapolis, MN',
  'Saint Paul, MN',
  'Madison, WI',
  'Milwaukee, WI',
  'Chicago, IL',
  'Detroit, MI',
  'Ann Arbor, MI',
  'Cleveland, OH',
  'Columbus, OH',
  'Cincinnati, OH',
  'Indianapolis, IN',
  'Louisville, KY',
  'St. Louis, MO',
  'Kansas City, MO',
  'Omaha, NE',
  'Toronto, ON',
  'Montréal, QC',
  'Vancouver, BC',
  'Mexico City, MX',
  'London, UK',
  'Edinburgh, UK',
  'Dublin, IE',
  'Paris, FR',
  'Berlin, DE',
  'Amsterdam, NL',
  'Lisbon, PT',
  'Madrid, ES',
  'Barcelona, ES',
  'Rome, IT',
  'Copenhagen, DK',
  'Stockholm, SE',
  'Tokyo, JP',
  'Seoul, KR',
  'Singapore, SG',
  'Sydney, AU',
  'Melbourne, AU',
  'Online only',
];

export default function Onboarding({ nav }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState(new Set());
  const [location, setLocation] = useState('');
  const [bg, setBg] = useState('');
  const [locationFocused, setLocationFocused] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(0);
  const blurTimerRef = useRef(null);

  const suggestions = useMemo(() => {
    const q = location.trim().toLowerCase();
    if (!q) return [];
    if (CITIES.some((c) => c.toLowerCase() === q)) return [];
    return CITIES.filter((c) => c.toLowerCase().includes(q)).slice(0, 6);
  }, [location]);

  const pickCity = (city) => {
    setLocation(city);
    setLocationFocused(false);
    setHighlightIdx(0);
  };

  const onLocationKeyDown = (e) => {
    if (!suggestions.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIdx((i) => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIdx((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      pickCity(suggestions[highlightIdx] || suggestions[0]);
    } else if (e.key === 'Escape') {
      setLocationFocused(false);
    }
  };

  const step = STEPS[stepIdx];
  const canContinue =
    (step === 'interests' && selectedInterests.size >= 1) ||
    (step === 'location' && location.trim().length > 0) ||
    (step === 'background' && bg) ||
    (step === 'welcome');

  const next = () => {
    if (stepIdx < STEPS.length - 1) setStepIdx(stepIdx + 1);
    else nav.go('home');
  };
  const prev = () => {
    if (stepIdx === 0) nav.back();
    else setStepIdx(stepIdx - 1);
  };

  const toggleInterest = (id) => {
    const next = new Set(selectedInterests);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedInterests(next);
  };

  return (
    <div className="onb">
      <div className="topbar" style={{ background: 'transparent', position: 'static', padding: '0 0 12px', minHeight: 'auto' }}>
        <button className="back" onClick={prev} aria-label="Back"><ChevronLeft size={20} /></button>
        <div className="spacer" />
      </div>
      <div className="onb-progress" aria-hidden="true">
        {STEPS.map((_, i) => (
          <span key={i} className={i <= stepIdx ? 'done' : ''} />
        ))}
      </div>

      <div className="onb-step-label">
        Step {stepIdx + 1} of {ONB_STEP_TOTAL}
      </div>

      {step === 'interests' && (
        <>
          <h2>What are you curious about?</h2>
          <p className="lede">Pick a few - we'll use these to surface ideas from people building in the same world as you.</p>
          <div className="interest-grid">
            {INTERESTS.map((i) => (
              <button
                key={i.id}
                className={`interest-chip ${selectedInterests.has(i.id) ? 'selected' : ''}`}
                onClick={() => toggleInterest(i.id)}
              >
                <InterestIcon id={i.id} size={16} />
                <span>{i.label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {step === 'location' && (
        <>
          <h2>Where are you based?</h2>
          <p className="lede">We'll show you nearby events and people, so showing up doesn't have to be a whole expedition.</p>
          <div className="autocomplete">
            <div className="text-field">
              <PinIcon size={18} />
              <input
                value={location}
                onChange={(e) => { setLocation(e.target.value); setHighlightIdx(0); }}
                onFocus={() => { setLocationFocused(true); if (blurTimerRef.current) clearTimeout(blurTimerRef.current); }}
                onBlur={() => {
                  // delay so click on a suggestion fires before blur closes the list
                  blurTimerRef.current = setTimeout(() => setLocationFocused(false), 120);
                }}
                onKeyDown={onLocationKeyDown}
                placeholder="City, neighborhood, or zip"
                autoComplete="off"
                aria-autocomplete="list"
                aria-expanded={locationFocused && suggestions.length > 0}
                aria-controls="city-suggestions"
                autoFocus
              />
            </div>
            {locationFocused && suggestions.length > 0 && (
              <ul
                id="city-suggestions"
                className="autocomplete-list"
                role="listbox"
              >
                {suggestions.map((c, i) => (
                  <li
                    key={c}
                    role="option"
                    aria-selected={i === highlightIdx}
                    className={`autocomplete-item ${i === highlightIdx ? 'is-active' : ''}`}
                    onMouseEnter={() => setHighlightIdx(i)}
                    onMouseDown={(e) => {
                      // prevent input blur before click registers
                      e.preventDefault();
                      pickCity(c);
                    }}
                  >
                    <PinIcon size={14} />
                    <span>{highlightMatch(c, location.trim())}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="lede" style={{ marginTop: 16, fontSize: 13 }}>
            Try: <button className="chip" onClick={() => pickCity('Brooklyn, NY')}>Brooklyn, NY</button>{' '}
            <button className="chip" onClick={() => pickCity('Online only')}>Online only</button>
          </p>
        </>
      )}

      {step === 'background' && (
        <>
          <h2>What's your day-to-day right now?</h2>
          <p className="lede">No wrong answer - this just helps us match you with people who get it.</p>
          <div className="bg-list">
            {BACKGROUNDS.map((b) => (
              <button
                key={b}
                className={`bg-option ${bg === b ? 'selected' : ''}`}
                onClick={() => setBg(b)}
              >
                <span>{b}</span>
                {bg === b && <CheckIcon size={16} />}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 'welcome' && (
        <>
          <h2>Here's what you can do.</h2>

          <div className="welcome-cards">
            <div className="welcome-card">
              <div className="welcome-card-icon"><SeedIcon size={18} /></div>
              <h4>Share an idea</h4>
              <p>Post a project and get honest feedback from people who get it.</p>
            </div>
            <div className="welcome-card">
              <div className="welcome-card-icon"><SearchIcon size={18} /></div>
              <h4>Explore what's out there</h4>
              <p>Browse ideas from people near you and discover what they're building.</p>
            </div>
            <div className="welcome-card">
              <div className="welcome-card-icon"><ChatIcon size={18} /></div>
              <h4>Give feedback, earn karma</h4>
              <p>Help others improve and your own projects get seen by more people.</p>
            </div>
          </div>

          <div className="karma-callout">
            <div className="icon"><SparkIcon size={15} /></div>
            <p>
              <strong>Karma powers everything.</strong> The more you give, the more the community gives back.
            </p>
          </div>
        </>
      )}

      <div className="onb-footer">
        <button className="btn-primary accent" disabled={!canContinue} onClick={next} style={{ flex: 1 }}>
          {step === 'welcome' ? 'Take me to the feed' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
