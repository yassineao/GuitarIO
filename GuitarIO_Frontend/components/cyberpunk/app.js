"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { FIXTURES } from "./fixtures";

import { IconFeedAdd, IconSearchSubmit, Pad, TextHeading3 } from "./ui";
import { NavSection, ChannelNav, ConversationNav } from "./nav";
import Chat from "./chat";

export default function App() {
  const initialDifficulty = FIXTURES?.feed?.[0] ?? null;
  const initialGenre = FIXTURES?.genres?.[0] ?? null;

  const [activeDifficulty, setActiveDifficulty] = useState(initialDifficulty);
  const [activeGenre, setActiveGenre] = useState();

  const [query, setQuery] = useState("");

  const filteredChannels = useMemo(() => {
    const channels = FIXTURES?.feed ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return channels;

    return channels.filter((ch) => {
      const label =
        (typeof ch === "string" ? ch : ch?.name ?? ch?.title ?? ch?.label) ??
        String(ch);
      return label.toLowerCase().includes(q);
    });
  }, [query]);

  return (
    <div className="app-skeleton">
      <AppHeader />

      <div className="app-container">
        <Sidebar
          query={query}
          onQueryChange={setQuery}
          channels={filteredChannels}
          activeChannel={activeDifficulty}
          onSelectChannel={setActiveDifficulty}
          genres={FIXTURES?.genres ?? []}
          activeGenre={activeGenre}
          onSelectGenre={setActiveGenre}
        />

        <main className="app-main" role="main">
          <Chat
            title="Cyberpunk Chat"
            difficulty={activeDifficulty}
            genre={activeGenre}
          />
        </main>

        <InfoPanel />
      </div>
    </div>
  );
}

/* ───────── App header ───────── */
function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header__anchor">
        <span className="app-header__anchor__text">Night-City</span>
      </div>
    </header>
  );
}

/* ───────── Sidebar ───────── */
function Sidebar({
  query,
  onQueryChange,
  channels,
  activeChannel,
  onSelectChannel,
  genres,
  activeGenre,
  onSelectGenre,
}) {
  return (
    <aside className="app-a" aria-label="Sidebar">
      <div className="segment-topbar">
        <div className="segment-topbar__header">
          <TextHeading3 className="segment-topbar__title">Messages</TextHeading3>
        </div>

        <div className="segment-topbar__aside">
          <div className="button-toolbar">
            <button
              type="button"
              className="button button--primary button--size-lg"
              aria-label="Create new feed"
              onClick={() => console.log("Create feed")}
            >
              <IconFeedAdd className="button__icon" />
            </button>
          </div>
        </div>
      </div>

      <form className="form-search" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label className="sr-only" htmlFor="sidebar-search">
            Search feeds
          </label>
          <div className="form-control form-control--with-addon">
            <input
              id="sidebar-search"
              name="query"
              placeholder="Search..."
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              autoComplete="off"
            />
            <div
              className="form-control__addon form-control__addon--prefix"
              aria-hidden="true"
            >
              <IconSearchSubmit />
            </div>
          </div>
        </div>
      </form>

      <NavSection renderTitle={(props) => <h2 {...props}>Feeds</h2>}>
        <ChannelNav
          channels={channels}
          activeChannel={activeChannel}
          onSelect={onSelectChannel}
        />
      </NavSection>

      <NavSection renderTitle={(props) => <h2 {...props}>Direct</h2>}>
        <ConversationNav
          genres={genres}
          activeGenre={activeGenre}
          onSelect={onSelectGenre}
        />
      </NavSection>
    </aside>
  );
}

/* ───────── Right info panel ───────── */
function InfoPanel() {
  return (
    <aside className="app-b" aria-label="Info panel">
      <Pad>
        <TextHeading3 $as="h4">Already forgot the basics?</TextHeading3>
        <TextParagraph1>
           <em>Check</em> the basic Chords.
        </TextParagraph1>
       <Link href="/majorNotes" className="button button--secondary">
                Click here
              </Link>
      </Pad> 
      <Pad>
        <TextHeading3 $as="h4">Want to search for a chord ?</TextHeading3>
        <TextParagraph1>
           <em>Click</em> here.
        </TextParagraph1>
        <Link href="/notes" className="button button--secondary">
                Click here
              </Link>
      </Pad>
    </aside>
    
  );
}

const TextParagraph1 = ({ children, className = "" }) => (
  <p className={`text-paragraph1 ${className}`.trim()}>{children}</p>
);
