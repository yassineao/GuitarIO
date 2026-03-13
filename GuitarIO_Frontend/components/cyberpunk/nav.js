"use client";

import React from "react";
import { Badge } from "./ui";

/* header nav item */

export function NavItem({ navItem }) {
  return (
    <li className="nav__item">
      <a
        className={`nav__link ${navItem.isActive ? "nav__link--active" : ""}`}
        href="#"
      >
        <span className="nav__link__element">{navItem.text}</span>
        {navItem.notificationCount > 0 && (
          <span className="nav__link__element">
            <Badge>{navItem.notificationCount}</Badge>
          </span>
        )}
      </a>
    </li>
  );
}

/* small nav layout container */

export function NavSection({ children, renderTitle }) {
  return (
    <div className="nav-section">
      <div className="nav-section__header">
        {renderTitle({ className: "nav-section__title" })}
      </div>
      <div className="nav-section__body">{children}</div>
    </div>
  );
}

/* channel & conversation links */

export function ChannelLink({ icon, name, unread = 0 }) {
  return (
    <span
      className={`channel-link ${
        unread > 0 ? "channel-link--unread" : ""
      }`.trim()}
    >
      <span className="channel-link__icon">{icon || "#"}</span>
      <span className="channel-link__element">{name}</span>

      {unread > 0 && (
        <span className="channel-link__element">
          <Badge>{unread}</Badge>
        </span>
      )}
    </span>
  );
}

export function ConversationLink({ conversation }) {
  const { isOnline, unread = 0, name } = conversation;

  return (
    <span
      className={`conversation-link ${
        isOnline ? "conversation-link--online" : ""
      } ${unread > 0 ? "conversation-link--unread" : ""}`.trim()}
    >
      <span className="conversation-link__icon" />
      <span className="conversation-link__element">{name}</span>

      {unread > 0 && (
        <span className="conversation-link__element">
          <Badge>{unread}</Badge>
        </span>
      )}
    </span>
  );
}

/* full nav lists */
export function ChannelNav({
  activeChannel = null,
  channels = [],
  onSelect
}) {
  return (
    <ul className="nav">
      {channels.map((channel) => (
        <li className="nav__item" key={channel.id}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelect?.(channel);
            }}
            className={`nav__link ${
              activeChannel?.id === channel.id
                ? "nav__link--active"
                : ""
            }`}
          >
            <ChannelLink
              name={channel.name}
              unread={channel.unread ?? 0}
              icon="#"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ConversationNav({
  activeGenre = null,
  genres = [],
  onSelect,
}) {
  return (
    <ul className="nav">
      {genres.map((genre) => (
        <li className="nav__item" key={genre.id}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelect?.(genre);
            }}
            className={`nav__link ${
              activeGenre?.id === genre.id ? "nav__link--active" : ""
            }`}
          >
            <ConversationLink conversation={genre} />
          </a>
        </li>
      ))}
    </ul>
  );
}

