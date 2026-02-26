"use client";
import React from "react";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const LoginButton = ({ children, onClick, type = "button" }: ButtonProps) => {
  return (
    <StyledWrapper>
      <button className="button-animated" onClick={onClick} type={type}>
        {children}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button-animated {
    height: 40px; /* Fixed height */
    width: 100%; /* Fills the 130px container in page.tsx */
    display: flex; /* Added to center text */
    align-items: center; /* Added to center text */
    justify-content: center; /* Added to center text */
    padding: 0; /* Remove padding to respect fixed height */
    border: none;
    border-radius: 9999px; /* Match the pill shape of SignUpButton */
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    color: #4a5d23;
    transition: all 1000ms;
    font-size: 12px; /* Slightly smaller for the new height */
    position: relative;
    overflow: hidden;
    outline: 2px solid #4a5d23;
    background: transparent;
  }

  .button-animated:hover {
    color: #ffffff;
    transform: scale(1.05);
    outline: 2px solid #36441a;
    box-shadow: 4px 5px 17px -4px rgba(74, 93, 35, 0.5);
  }

  .button-animated::before {
    content: "";
    position: absolute;
    left: -50px;
    top: 0;
    width: 0;
    height: 100%;
    background-color: #4a5d23;
    transform: skewX(45deg);
    z-index: -1;
    transition: width 1000ms;
  }

  .button-animated:hover::before {
    width: 250%;
  }
`;

export default LoginButton;
