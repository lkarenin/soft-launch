import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { INTERESTS } from '../data';

const LOGO_SRC = `${import.meta.env.BASE_URL}foretold-logo.svg`;
import Avatar from '../components/Avatar';
import StarRating from '../components/StarRating';
import BadgePill from '../components/BadgePill';
import { BookmarkIcon, SparkIcon, FeedIcon, GridIcon, InterestIcon, SearchIcon, X, SlidersIcon } from '../components/Icons';

const CATEGORY_IDS = ['food', 'wellness', 'art', 'music', 'community', 'fashion', 'travel', 'kids', 'media'];
const INDUSTRY_IDS = ['tech', 'design', 'finance', 'hardware', 'health', 'education', 'climate'];
const LOCATIONS = ['Brooklyn, NY', 'Oakland, CA', 'Austin, TX', 'Portland, OR', 'Chicago, IL', 'Seattle, WA'];

function interestLabel(id) {
  return INTERESTS.find((i) => i.id === id)?.label || 'Idea';
}

function isAnon(project) {
  return project.anonymous && (project.feedbackCount || 0) === 0;
}

function ProjectFeedCard({ project, onOpen, isSaved, onSave }) {
  const coverStyle = project.coverImage
    ? { backgroundImage: `url(${project.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: project.cover }
    : { background: project.cover };
  return (
    <div
      className="feed-card"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
    >
      <div className="cover" style={coverStyle}>
        <div className="cover-tag-row">
          <div className="interest-tag cat-pill" data-cat={project.interest}>
            <InterestIcon id={project.interest} size={13} />
            <span>{interestLabel(project.interest)}</span>
          </div>
          {project.badge && <BadgePill id={project.badge} />}
        </div>
        {project.mine && (
          <div className="karma-pill karma-tag">
            <span className="spark"><SparkIcon size={13} /></span>
            {project.karma}
          </div>
        )}
        <button
          className={`save ${isSaved ? 'is-saved' : ''}`}
          onClick={(e) => { e.stopPropagation(); onSave(); }}
          aria-label={isSaved ? 'Unsave' : 'Save'}
        >
          <BookmarkIcon size={18} filled={isSaved} />
        </button>
      </div>
      <div className="body">
        <div className="author">
          {isAnon(project) ? (
            <>
              <span className="anon-badge" aria-hidden="true">?</span>
              <span style={{ color: 'var(--ink)' }}>Anonymous</span>
              <span className="dot" style={{ width: 3, height: 3, borderRadius: 999, background: 'var(--ink-faint)' }} />
              <span>Revealed after first feedback</span>
            </>
          ) : (
            <>
              <Avatar seed={project.avatarSeed} name={project.author} size={22} />
              <span style={{ color: 'var(--ink)' }}>{project.author}</span>
              <span className="dot" style={{ width: 3, height: 3, borderRadius: 999, background: 'var(--ink-faint)' }} />
              <span>{project.location}</span>
            </>
          )}
        </div>
        <h3>{project.title}</h3>
        <p>{project.tagline}</p>
        {project.mine && project.rating ? (
          <div className="meta rating-row">
            <StarRating value={project.rating} count={project.ratingCount} size={13} />
            <span className="dot" />
            <span>{project.feedbackCount} feedback</span>
          </div>
        ) : (
          <div className="meta">
            <span>{project.feedbackCount} pieces of feedback</span>
            <span className="dot" />
            <span>3 days ago</span>
          </div>
        )}
      </div>
    </div>
  );
}

function GridProjectCard({ project, onOpen }) {
  const coverStyle = project.coverImage
    ? { backgroundImage: `url(${project.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: project.cover }
    : { background: project.cover };
  return (
    <button className="grid-card" onClick={onOpen}>
      <div className="cover" style={coverStyle} />
      <div className="body">
        <h4>{project.title}</h4>
        <div className="meta">{project.author} · {interestLabel(project.interest)}</div>
      </div>
    </button>
  );
}

function FilterSheet({ filters, onApply, onClose }) {
  const [local, setLocal] = useState(() => ({
    locations: new Set(filters.locations),
    categories: new Set(filters.categories),
    industries: new Set(filters.industries),
  }));

  function toggle(field, val) {
    const next = new Set(local[field]);
    if (next.has(val)) next.delete(val); else next.add(val);
    setLocal(prev => ({ ...prev, [field]: next }));
  }

  function clearAll() {
    setLocal({ locations: new Set(), categories: new Set(), industries: new Set() });
  }

  const totalActive = local.locations.size + local.categories.size + local.industries.size;

  return (
    <>
      <div className="filter-backdrop" onClick={onClose} />
      <div className="filter-sheet">
        <div className="filter-handle" />
        <div className="filter-header">
          <span className="filter-title">Filters</span>
          {totalActive > 0 && (
            <button className="filter-clear-btn" onClick={clearAll}>Clear all</button>
          )}
          <button className="topbar-icon-btn" style={{ marginLeft: 'auto' }} onClick={onClose} aria-label="Close filters">
            <X size={18} />
          </button>
        </div>
        <div className="filter-body">
          <div className="filter-section">
            <div className="filter-section-label">Location</div>
            <div className="filter-pill-row">
              {LOCATIONS.map(loc => (
                <button key={loc} className={`filter-pill ${local.locations.has(loc) ? 'active' : ''}`} onClick={() => toggle('locations', loc)}>
                  {loc}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-section">
            <div className="filter-section-label">Category</div>
            <div className="filter-pill-row">
              {CATEGORY_IDS.map(id => (
                <button key={id} className={`filter-pill ${local.categories.has(id) ? 'active' : ''}`} onClick={() => toggle('categories', id)}>
                  {interestLabel(id)}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-section">
            <div className="filter-section-label">Industry</div>
            <div className="filter-pill-row">
              {INDUSTRY_IDS.map(id => (
                <button key={id} className={`filter-pill ${local.industries.has(id) ? 'active' : ''}`} onClick={() => toggle('industries', id)}>
                  {interestLabel(id)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="filter-footer">
          <button className="btn-primary" style={{ width: '100%' }} onClick={() => { onApply(local); onClose(); }}>
            {totalActive > 0 ? `Show results · ${totalActive} active` : 'Show results'}
          </button>
        </div>
      </div>
    </>
  );
}

export default function Home({ nav, user, projects, savedIds, toggleSave }) {
  const [view, setView] = useState('feed');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState(() => ({
    locations: new Set(),
    categories: new Set(),
    industries: new Set(),
  }));

  const hasActiveFilters = filters.locations.size > 0 || filters.categories.size > 0 || filters.industries.size > 0;
  const totalActiveFilters = filters.locations.size + filters.categories.size + filters.industries.size;

  const BATCH_SIZE = 6;
  const [loadedCount, setLoadedCount] = useState(BATCH_SIZE);
  const sentinelRef = useRef(null);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      // Own projects live in Profile → My Projects, not in the community feed
      if (p.mine) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          p.title.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          interestLabel(p.interest).toLowerCase().includes(q);
        if (!match) return false;
      }
      if (filters.locations.size > 0 && !filters.locations.has(p.location)) return false;
      const selectedInterests = new Set([...filters.categories, ...filters.industries]);
      if (selectedInterests.size > 0 && !selectedInterests.has(p.interest)) return false;
      return true;
    });
  }, [projects, searchQuery, filters]);

  // Reset loaded count whenever the filtered pool changes (search / filter)
  useEffect(() => {
    setLoadedCount(BATCH_SIZE);
  }, [filteredProjects]);

  // IntersectionObserver fires when the sentinel scrolls into view
  const loadMore = useCallback(() => {
    setLoadedCount((c) => c + BATCH_SIZE);
  }, []);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadMore]);

  // Build infinite list by cycling through filteredProjects
  const infiniteItems = useMemo(() => {
    if (filteredProjects.length === 0) return [];
    return Array.from({ length: loadedCount }, (_, i) => {
      const p = filteredProjects[i % filteredProjects.length];
      const cycle = Math.floor(i / filteredProjects.length);
      return { ...p, _key: `${p.id}-c${cycle}` };
    });
  }, [filteredProjects, loadedCount]);

  function closeSearch() {
    setSearchOpen(false);
    setSearchQuery('');
  }

  return (
    <div>
      <div className="topbar home-topbar">
        {!searchOpen ? (
          <>
            <img src={LOGO_SRC} alt="Foretold" className="home-logo" />
            <div className="spacer" />
            <div className="feed-toggle" role="tablist" aria-label="Feed view">
              <button className={`ft ${view === 'feed' ? 'active' : ''}`} onClick={() => setView('feed')} role="tab" aria-selected={view === 'feed'}>
                <FeedIcon size={15} /> Feed
              </button>
              <span className="ft bar">|</span>
              <button className={`ft ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')} role="tab" aria-selected={view === 'grid'}>
                <GridIcon size={15} /> Grid
              </button>
            </div>
          </>
        ) : (
          <input
            autoFocus
            className="home-search-input"
            placeholder="Keywords, username, category…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        )}
        <div className="topbar-actions">
          <button
            className="topbar-icon-btn"
            onClick={searchOpen ? closeSearch : () => setSearchOpen(true)}
            aria-label={searchOpen ? 'Close search' : 'Search'}
          >
            {searchOpen ? <X size={18} /> : <SearchIcon size={18} />}
          </button>
          <button
            className={`topbar-icon-btn ${hasActiveFilters ? 'filter-active' : ''}`}
            onClick={() => setShowFilter(true)}
            aria-label="Filter"
          >
            <SlidersIcon size={18} />
            {hasActiveFilters && <span className="filter-badge">{totalActiveFilters}</span>}
          </button>
        </div>
      </div>

      {view === 'feed' ? (
        <div className="feed-list">
          {infiniteItems.length > 0 ? (
            <>
              {infiniteItems.map((p) => (
                <ProjectFeedCard
                  key={p._key}
                  project={p}
                  onOpen={() => nav.go('projectDetail', { id: p.id })}
                  isSaved={savedIds.has(p.id)}
                  onSave={() => toggleSave(p.id)}
                />
              ))}
              <div ref={sentinelRef} className="feed-sentinel">
                <span className="feed-loading-dot" /><span className="feed-loading-dot" /><span className="feed-loading-dot" />
              </div>
            </>
          ) : (
            <div className="empty">No projects match your search.</div>
          )}
        </div>
      ) : (
        <div className="grid-feed">
          {infiniteItems.length > 0 ? (
            <>
              {infiniteItems.map((p) => (
                <GridProjectCard key={p._key} project={p} onOpen={() => nav.go('projectDetail', { id: p.id })} />
              ))}
              <div ref={sentinelRef} className="feed-sentinel" style={{ gridColumn: '1 / -1' }}>
                <span className="feed-loading-dot" /><span className="feed-loading-dot" /><span className="feed-loading-dot" />
              </div>
            </>
          ) : (
            <div className="empty">No projects match your search.</div>
          )}
        </div>
      )}

      {showFilter && (
        <FilterSheet
          filters={filters}
          onApply={setFilters}
          onClose={() => setShowFilter(false)}
        />
      )}
    </div>
  );
}
