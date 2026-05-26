import React, { useState, useCallback, useMemo, useEffect } from 'react';
import './App.css';
import { INITIAL_USER, PROJECTS, SAVED, INITIAL_FRIEND_REQUESTS } from './data';
import BottomNav from './components/BottomNav';
import KarmaToast from './components/KarmaToast';
import Splash from './screens/Splash';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import ProjectDetail from './screens/ProjectDetail';
import FeedbackForm from './screens/FeedbackForm';
import NewProject from './screens/NewProject';
import Events from './screens/Events';
import EventDetail from './screens/EventDetail';
import EventRsvp from './screens/EventRsvp';
import PersonalityTest from './screens/PersonalityTest';
import BuddyMatches from './screens/BuddyMatches';
import ChatList from './screens/ChatList';
import ChatThread from './screens/ChatThread';
import Profile from './screens/Profile';
import Settings from './screens/Settings';
import Guidelines from './screens/Guidelines';
import UserProfile from './screens/UserProfile';
import Notifications from './screens/Notifications';

const PRIMARY_TABS = new Set(['home', 'events', 'chat', 'profile']);

function App() {
  const [stack, setStack] = useState([{ name: 'splash', params: {} }]);
  const [user, setUser] = useState(INITIAL_USER);
  const [savedIds, setSavedIds] = useState(new Set(SAVED));
  const [savedEventIds, setSavedEventIds] = useState(new Set());
  const [feedbackUnlockedIds, setFeedbackUnlockedIds] = useState(new Set());
  const [theme, setTheme] = useState('light');
  const [anonymousByDefault, setAnonymousByDefault] = useState(false);
  const [socials, setSocials] = useState(INITIAL_USER.socials);
  const [friendIds, setFriendIds] = useState(new Set());
  const [sentRequests, setSentRequests] = useState(new Set());
  const [receivedRequests, setReceivedRequests] = useState(INITIAL_FRIEND_REQUESTS);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  const [myProjects, setMyProjects] = useState([
    {
      id: 'mine-seed',
      author: 'You',
      avatarSeed: 'you',
      location: 'Brooklyn, NY',
      mine: true,
      title: 'Quiet Mornings',
      tagline: 'A 5-minute weekday email that helps creative people figure out what they actually want to do today.',
      interest: 'media',
      karma: 84,
      feedbackCount: 9,
      cover: '#211908',
      coverImage: `${import.meta.env.BASE_URL}covers/thumbnail1.jpg`,
      rating: 0, ratingCount: 0,
      sections: [
        { label: 'The idea', body: 'Every weekday morning, I send myself a question - "what would make today feel like mine?" I want to send a softer version of that to other people who struggle to start.' },
        { label: 'Where I\'m stuck', body: 'I can\'t tell if this is a newsletter or a tiny app. I keep flipping between the two and not shipping either.' },
      ],
    },
  ]);
  // Per-project rating overrides keyed by project id. Each entry stores
  // the current weighted average + number of submissions, so a new rating
  // merges as a running weighted mean rather than replacing the value.
  const [ratingOverrides, setRatingOverrides] = useState({});
  const [toast, setToast] = useState(null);

  const current = stack[stack.length - 1];

  const go = useCallback((name, params = {}) => {
    setStack((s) => {
      // Tab switches reset to a single screen (no back-stack into tabs)
      if (PRIMARY_TABS.has(name)) return [{ name, params }];
      return [...s, { name, params }];
    });
  }, []);

  const replace = useCallback((name, params = {}) => {
    setStack((s) => {
      const next = [...s];
      next[next.length - 1] = { name, params };
      return next;
    });
  }, []);

  const back = useCallback(() => {
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }, []);

  const showToast = useCallback((message, sub) => {
    setToast({ id: Date.now(), message, sub });
    setTimeout(() => setToast(null), 2400);
  }, []);

  const awardKarma = useCallback((amount, reason) => {
    setUser((u) => ({ ...u, karma: u.karma + amount, lifetimeKarma: (u.lifetimeKarma || 0) + amount }));
    showToast(`+${amount} karma`, reason);
  }, [showToast]);

  const spendKarma = useCallback((projectId, amount) => {
    setUser((u) => ({ ...u, karma: Math.max(0, u.karma - amount) }));
    setMyProjects((arr) => arr.map((p) => p.id === projectId ? { ...p, karma: p.karma + amount } : p));
    showToast(`+${amount} karma`, 'Boosted your project');
  }, [showToast]);

  const toggleSave = useCallback((id) => {
    setSavedIds((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSaveEvent = useCallback((id) => {
    setSavedEventIds((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const sendFriendRequest = useCallback((seed) => {
    setSentRequests((s) => new Set([...s, seed]));
  }, []);

  const acceptFriendRequest = useCallback((seed) => {
    setFriendIds((s) => new Set([...s, seed]));
    setReceivedRequests((r) => r.filter((req) => req.seed !== seed));
  }, []);

  const declineFriendRequest = useCallback((seed) => {
    setReceivedRequests((r) => r.filter((req) => req.seed !== seed));
  }, []);

  const addProject = useCallback((project) => {
    const id = 'mine-' + Date.now();
    setMyProjects((arr) => [{ ...project, id, author: 'You', avatarSeed: 'you', mine: true, karma: 0, feedbackCount: 0, anonymous: anonymousByDefault }, ...arr]);
    return id;
  }, [anonymousByDefault]);

  const allProjects = useMemo(() => {
    const merged = [...myProjects, ...PROJECTS.filter((p) => !myProjects.some((mp) => mp.id === p.id))];
    // Apply running rating overrides so freshly-submitted feedback updates
    // the displayed stars on both the feed card and detail screen.
    return merged.map((p) => {
      const o = ratingOverrides[p.id];
      return o ? { ...p, rating: o.rating, ratingCount: o.ratingCount } : p;
    });
  }, [myProjects, ratingOverrides]);

  const submitProjectRating = useCallback((projectId, score) => {
    setRatingOverrides((map) => {
      const seed = map[projectId]
        || (() => {
          const base = PROJECTS.find((p) => p.id === projectId)
            || myProjects.find((p) => p.id === projectId);
          return { rating: base?.rating || 0, ratingCount: base?.ratingCount || 0 };
        })();
      const nextCount = seed.ratingCount + 1;
      const nextRating = (seed.rating * seed.ratingCount + score) / nextCount;
      return { ...map, [projectId]: { rating: nextRating, ratingCount: nextCount } };
    });
  }, [myProjects]);

  const nav = { go, back, replace };

  const isOnboarding = current.name === 'splash' || current.name === 'onboarding';
  const showNav = !isOnboarding && !['projectDetail', 'settings', 'guidelines', 'eventDetail', 'eventRsvp', 'userProfile', 'notifications'].includes(current.name);

  const unlockFeedback = useCallback((id) => {
    setFeedbackUnlockedIds((s) => {
      if (s.has(id)) return s;
      const next = new Set(s);
      next.add(id);
      return next;
    });
  }, []);

  function renderScreen() {
    switch (current.name) {
      case 'splash':
        return <Splash nav={nav} />;
      case 'onboarding':
        return <Onboarding nav={nav} />;
      case 'home':
        return <Home nav={nav} user={user} projects={allProjects} savedIds={savedIds} toggleSave={toggleSave} />;
      case 'projectDetail':
        return (
          <ProjectDetail
            nav={nav}
            project={allProjects.find((p) => p.id === current.params.id) || allProjects[0]}
            isSaved={savedIds.has(current.params.id)}
            toggleSave={() => toggleSave(current.params.id)}
            feedbackUnlocked={feedbackUnlockedIds.has(current.params.id)}
            user={user}
            spendKarma={spendKarma}
          />
        );
      case 'feedbackForm':
        return (
          <FeedbackForm
            nav={nav}
            project={allProjects.find((p) => p.id === current.params.id) || allProjects[0]}
            onSubmit={({ score } = {}) => {
              unlockFeedback(current.params.id);
              if (typeof score === 'number' && score > 0) {
                submitProjectRating(current.params.id, score);
              }
              awardKarma(15, 'Thank you for thoughtful feedback');
              nav.back();
            }}
          />
        );
      case 'newProject':
        return (
          <NewProject
            nav={nav}
            onCreate={(project) => {
              const id = addProject(project);
              showToast('Project published', 'It\'s now in the feed for feedback');
              nav.replace('projectDetail', { id });
            }}
          />
        );
      case 'events':
        return <Events nav={nav} savedEventIds={savedEventIds} toggleSaveEvent={toggleSaveEvent} />;
      case 'eventDetail':
        return <EventDetail nav={nav} eventId={current.params.id} />;
      case 'eventRsvp':
        return <EventRsvp nav={nav} eventId={current.params.id} />;
      case 'personalityTest':
        return <PersonalityTest nav={nav} eventId={current.params.eventId} />;
      case 'buddyMatches':
        return <BuddyMatches nav={nav} eventId={current.params.eventId} />;
      case 'chat':
        return <ChatList nav={nav} receivedRequests={receivedRequests} />;
      case 'chatThread':
        return <ChatThread nav={nav} chatId={current.params.id} />;
      case 'profile':
        return (
          <Profile
            nav={nav}
            user={user}
            myProjects={myProjects}
            savedIds={savedIds}
            allProjects={allProjects}
            awardKarma={awardKarma}
            friendIds={friendIds}
            receivedRequests={receivedRequests}
            onAccept={acceptFriendRequest}
            onDecline={declineFriendRequest}
          />
        );
      case 'userProfile':
        return (
          <UserProfile
            nav={nav}
            seed={current.params.seed}
            friendIds={friendIds}
            sentRequests={sentRequests}
            onSendRequest={sendFriendRequest}
          />
        );
      case 'notifications':
        return (
          <Notifications
            nav={nav}
            receivedRequests={receivedRequests}
            onAccept={acceptFriendRequest}
            onDecline={declineFriendRequest}
          />
        );
      case 'guidelines':
        return <Guidelines nav={nav} />;
      case 'settings':
        return (
          <Settings
            nav={nav}
            theme={theme}
            setTheme={setTheme}
            anonymousByDefault={anonymousByDefault}
            setAnonymousByDefault={setAnonymousByDefault}
            socials={socials}
            setSocials={setSocials}
          />
        );
      default:
        return <Home nav={nav} user={user} projects={allProjects} savedIds={savedIds} toggleSave={toggleSave} />;
    }
  }

  return (
    <div className="stage">
      <div className="phone-shell">
        <div className="device">
          <div className="phone-island" aria-hidden="true" />
          <div className="phone-statusbar" aria-hidden="true">
            <span className="phone-time">9:41</span>
            <div className="phone-statusicons">
              <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
                <rect x="0" y="7" width="3" height="5" rx="1"/>
                <rect x="4.5" y="4.5" width="3" height="7.5" rx="1"/>
                <rect x="9" y="2" width="3" height="10" rx="1"/>
                <rect x="13.5" y="0" width="3" height="12" rx="1" opacity="0.35"/>
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeLinecap="round">
                <circle cx="8" cy="11" r="1.2" fill="currentColor" stroke="none"/>
                <path d="M5 8.5Q8 6 11 8.5" strokeWidth="1.6"/>
                <path d="M2.5 6Q8 2 13.5 6" strokeWidth="1.6"/>
              </svg>
              <svg width="27" height="13" viewBox="0 0 27 13" fill="currentColor">
                <rect x="0.6" y="0.6" width="23" height="11.8" rx="3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                <rect x="24" y="4" width="2.5" height="5" rx="1.2" opacity="0.45"/>
                <rect x="2" y="2" width="18" height="9" rx="2"/>
              </svg>
            </div>
          </div>
          <div className="screen" key={current.name + JSON.stringify(current.params)}>
            {renderScreen()}
          </div>
          {showNav && <BottomNav active={current.name} nav={nav} />}
          <div className="phone-home-bar" aria-hidden="true">
            <div className="phone-home-pill" />
          </div>
        </div>
        {toast && <KarmaToast key={toast.id} message={toast.message} sub={toast.sub} />}
      </div>
    </div>
  );
}

export default App;
