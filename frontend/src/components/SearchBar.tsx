"use client";
import React, { useState } from "react";
import styled from "styled-components";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <StyledWrapper $isExpanded={isExpanded}>
      <div
        className={`search-container ${isExpanded ? "expanded" : ""}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <button className="menu-btn" type="button">
          <span>Menu</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <div className="divider" />

        <input
          type="text"
          placeholder="Rechercher un produit..."
          className="search-input"
          onFocus={() => setIsExpanded(true)}
        />

        <button className="search-submit" type="submit">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ $isExpanded: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  .search-container {
    display: flex;
    align-items: center;
    background: white;
    padding: 4px 6px 4px 16px;
    border-radius: 999px;
    border: 1px solid rgba(26, 42, 58, 0.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    width: 350px; /* Base width */
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Expansion logic */
  .search-container.expanded {
    width: 600px; /* Expanded width */
    border-color: #4a5d23;
    box-shadow: 0 8px 24px rgba(74, 93, 35, 0.15);
  }

  .menu-btn {
    background: none;
    border: none;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    color: #1a2a3a;
    cursor: pointer;
    white-space: nowrap;
  }

  .divider {
    width: 1px;
    height: 24px;
    background-color: rgba(26, 42, 58, 0.1);
    margin: 0 12px;
  }

  .search-input {
    border: none;
    outline: none;
    background: transparent;
    flex-grow: 1;
    font-size: 0.95rem;
    color: #1a2a3a;
    width: 0; /* Allows smooth growth */
  }

  .search-submit {
    background: #4a5d23;
    color: white;
    border: none;
    border-radius: 50%;
    width: 36px;
    min-width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

export default SearchBar;
