"use client";
import React from "react";
import styled from "styled-components";

interface SignUpButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const SignUpButton = ({
  children,
  onClick,
  type = "button",
}: SignUpButtonProps) => {
  return (
    <StyledWrapper>
      <button className="button button-item" onClick={onClick} type={type}>
        <span className="button-bg">
          <span className="button-bg-layers">
            <span className="button-bg-layer button-bg-layer-1 -navy" />
            <span className="button-bg-layer button-bg-layer-2 -green" />
            <span className="button-bg-layer button-bg-layer-3 -burgundy" />
          </span>
        </span>
        <span className="button-inner">
          <span className="button-inner-static">{children}</span>
          <span className="button-inner-hover">{children}</span>
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /*button {
    height: 2.5rem;
    font-size: 12px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    width: 100%; /* Ensures it fills container if needed */
  }*/

  .button {
    position: relative;
    display: inline-flex;
    height: 2.5rem; /* Match LoginButton exactly */
    width: 100%;
    justify-content: center;
    align-items: center;
    border-radius: 9999px;
    padding: 0 1.5rem;
    font-family: inherit;
    font-size: 12px; /* Match LoginButton exactly */
    font-weight: 600;
    text-transform: uppercase; /* Match LoginButton style */
    color: #fafaf6;
    letter-spacing: 1px;
    cursor: pointer;
    overflow: hidden;
  }

  .button-item {
    background-color: transparent;
    color: #1a2a3a; /* Navy text */
  }

  .button-item .button-bg {
    background-color: #f3f0eb; /* Slightly darker cream for embedded look */
  }

  .button-inner,
  .button-inner-hover,
  .button-inner-static {
    pointer-events: none;
    display: block;
  }

  .button-inner {
    position: relative;
    z-index: 2;
  }

  .button-inner-hover {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transform: translateY(70%);
    color: white;
  }

  .button-bg {
    overflow: hidden;
    border-radius: 9999px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(1);
    transition: transform 1.8s cubic-bezier(0.19, 1, 0.22, 1);
    border: 1px solid rgba(26, 42, 58, 0.1);
  }

  .button-bg-layers {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: -100%;
    aspect-ratio: 1 / 1;
    width: max(200%, 15rem);
  }

  .button-bg-layer {
    border-radius: 9999px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(0);
    display: block;
  }

  /* Updated brand colors */
  .button-bg-layer.-navy {
    background-color: #1a2a3a;
  }
  .button-bg-layer.-green {
    background-color: #4a5d23;
  }
  .button-bg-layer.-burgundy {
    background-color: #8b2626;
  }

  .button:hover .button-inner-static {
    opacity: 0;
    transform: translateY(-70%);
    transition:
      transform 1.4s cubic-bezier(0.19, 1, 0.22, 1),
      opacity 0.3s linear;
  }

  .button:hover .button-inner-hover {
    opacity: 1;
    transform: translateY(0);
    transition:
      transform 1.4s cubic-bezier(0.19, 1, 0.22, 1),
      opacity 1.4s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .button:hover .button-bg-layer {
    transition:
      transform 1.3s cubic-bezier(0.19, 1, 0.22, 1),
      opacity 0.3s linear;
  }

  .button:hover .button-bg-layer-1 {
    transform: scale(1);
  }
  .button:hover .button-bg-layer-2 {
    transition-delay: 0.1s;
    transform: scale(1);
  }
  .button:hover .button-bg-layer-3 {
    transition-delay: 0.2s;
    transform: scale(1);
  }
`;

export default SignUpButton;
