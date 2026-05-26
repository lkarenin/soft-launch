import React from 'react';
import TopBar from '../components/TopBar';
import { LinkedInIcon, GitHubIcon, BehanceIcon, InstagramIcon, TwitterXIcon, GlobeIcon } from '../components/Icons';

const SOCIAL_FIELDS = [
  { key: 'linkedin',  Icon: LinkedInIcon,  label: 'LinkedIn',  placeholder: 'yourname' },
  { key: 'github',    Icon: GitHubIcon,    label: 'GitHub',    placeholder: 'yourname' },
  { key: 'behance',   Icon: BehanceIcon,   label: 'Behance',   placeholder: 'yourname' },
  { key: 'instagram', Icon: InstagramIcon, label: 'Instagram', placeholder: 'yourhandle' },
  { key: 'twitter',   Icon: TwitterXIcon,  label: 'X / Twitter', placeholder: 'yourhandle' },
  { key: 'website',   Icon: GlobeIcon,     label: 'Website',   placeholder: 'yoursite.com' },
];

export default function Settings({ nav, theme, setTheme, anonymousByDefault, setAnonymousByDefault, socials, setSocials }) {
  function updateSocial(key, value) {
    setSocials((s) => ({ ...s, [key]: value }));
  }

  return (
    <div>
      <TopBar onBack={() => nav.back()} title="Settings" />
      <div className="settings">

        <section className="settings-group">
          <div className="settings-group-label">Appearance</div>
          <div className="settings-row">
            <div className="t-text">
              <h4>Theme</h4>
              <p>Switch between light and dark mode.</p>
            </div>
            <div className="seg-toggle" role="radiogroup" aria-label="Theme">
              <button
                className={theme === 'light' ? 'active' : ''}
                onClick={() => setTheme('light')}
                role="radio"
                aria-checked={theme === 'light'}
              >
                Light
              </button>
              <button
                className={theme === 'dark' ? 'active' : ''}
                onClick={() => setTheme('dark')}
                role="radio"
                aria-checked={theme === 'dark'}
              >
                Dark
              </button>
            </div>
          </div>
        </section>

        <section className="settings-group">
          <div className="settings-group-label">Privacy</div>
          <div className="settings-row">
            <div className="t-text">
              <h4>Stay anonymous until I get feedback</h4>
              <p>
                New projects will show as <em>Anonymous</em> in the feed. Your name and avatar are revealed only after
                someone has reviewed your work - so first impressions aren't shaped by who you are.
              </p>
            </div>
            <button
              className={`switch ${anonymousByDefault ? 'on' : ''}`}
              onClick={() => setAnonymousByDefault(!anonymousByDefault)}
              role="switch"
              aria-checked={anonymousByDefault}
              aria-label="Stay anonymous until I get feedback"
            />
          </div>
        </section>

        <section className="settings-group">
          <div className="settings-group-label">Social Links</div>
          <p className="settings-group-desc">These appear on your profile so others can find you elsewhere.</p>
          {SOCIAL_FIELDS.map(({ key, Icon, label, placeholder }) => (
            <div key={key} className="settings-social-row">
              <div className="settings-social-icon"><Icon size={18} /></div>
              <div className="settings-social-field">
                <label className="settings-social-label">{label}</label>
                <input
                  className="settings-social-input"
                  type="text"
                  placeholder={placeholder}
                  value={socials?.[key] || ''}
                  onChange={(e) => updateSocial(key, e.target.value)}
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                />
              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}
