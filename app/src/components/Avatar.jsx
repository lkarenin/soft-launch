import React from 'react';

// Deterministic warm-toned avatar from a string seed.
// When a seed has a real photo mapped below, it renders that instead.
const PALETTES = [
  ['#F4D7CB', '#D97557'],
  ['#DCE3CC', '#7A8C5C'],
  ['#F5E6C5', '#D9A441'],
  ['#D5E1EA', '#8AA4B8'],
  ['#E5D2DC', '#94627A'],
  ['#FBEEE7', '#B85C40'],
  ['#EDE5D8', '#8A8276'],
];

const BASE = import.meta.env.BASE_URL;

// Map user seeds → photo files in /public/avatars/
// avatar-1: woman, Harvard cap
// avatar-2: man, striped sweater
// avatar-3: woman, curly hair, green sweater
// avatar-4: man, sunglasses, olive hoodie
// avatar-5: man, glasses, brown jacket
const SEED_PHOTOS = {
  maya:  `${BASE}avatars/avatar-3.png`,
  theo:  `${BASE}avatars/avatar-5.png`,
  priya: `${BASE}avatars/avatar-1.png`,
  sam:   `${BASE}avatars/avatar-4.png`,
  lila:  `${BASE}avatars/avatar-1.png`,
  owen:  `${BASE}avatars/avatar-2.png`,
  jules: `${BASE}avatars/avatar-4.png`,
  noor:  `${BASE}avatars/avatar-3.png`,
  ren:   `${BASE}avatars/avatar-5.png`,
  rj:    `${BASE}avatars/avatar-2.png`,
  yuki:  `${BASE}avatars/avatar-4.png`,
  dana:  `${BASE}avatars/avatar-3.png`,
};

function hash(str = '') {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export default function Avatar({ seed = '', name = '', size = 40, ring = false }) {
  const photo = SEED_PHOTOS[seed];

  if (photo) {
    return (
      <div
        className={`avatar${ring ? ' is-ring' : ''}`}
        style={{ width: size, height: size, background: '#ddd', overflow: 'hidden', flexShrink: 0 }}
        aria-label={name || seed}
      >
        <img
          src={photo}
          alt={name || seed}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          draggable={false}
        />
      </div>
    );
  }

  const palette = PALETTES[hash(seed || name) % PALETTES.length];
  const initial = (name || seed || '?').trim().charAt(0).toUpperCase();
  return (
    <div
      className={`avatar${ring ? ' is-ring' : ''}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 100%)`,
        fontSize: Math.max(11, Math.round(size * 0.42)),
      }}
      aria-label={name || seed}
    >
      <span>{initial}</span>
    </div>
  );
}
