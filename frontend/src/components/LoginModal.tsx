"use client";
import React from "react";
import styled from "styled-components";
import Image from "next/image"; // Next.js optimized image component

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <StyledWrapper onClick={(e) => e.stopPropagation()}>
        <form className="form">
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>

          {/* LOGO AREA */}
          <div className="logo-container">
            <div className="logo-circle">
              {/* Make sure your logo is in the /public folder */}
              <Image
                src="/Logo.png" // Ensure this matches your filename in /public
                alt="EpiMarket Logo"
                className="logo-img"
                width={80} // Added
                height={80} // Added
              />
            </div>
          </div>

          <p id="heading">EpiMarket Login</p>
          <p className="sub-heading">Les courses le ventre plein !</p>

          <div className="field">
            <svg className="input-icon" viewBox="0 0 16 16">
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
            </svg>
            <input
              autoComplete="off"
              placeholder="Email or Username"
              className="input-field"
              type="text"
            />
          </div>

          <div className="field">
            <svg className="input-icon" viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
            <input
              placeholder="Password"
              className="input-field"
              type="password"
            />
          </div>

          <div className="btn-group">
            <button className="button-login" type="submit">
              Log In
            </button>
            <button className="button-signup" type="button">
              Sign Up
            </button>
          </div>
          <button className="button-forgot" type="button">
            Forgot Password?
          </button>
        </form>
      </StyledWrapper>
    </ModalBackdrop>
  );
};

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(26, 42, 58, 0.4); /* Deep navy with low opacity */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
`;

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 2.5em;
    background-color: #fcfaf7; /* Cream background from logo */
    border-radius: 30px;
    width: 380px;
    position: relative;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid white;
  }

  .logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: -10px;
  }

  .logo-circle {
    width: 80px;
    height: 80px;
    background: white;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-img {
    max-width: 100%;
    height: auto;
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #eee;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #666;
  }

  #heading {
    text-align: center;
    color: #1a2a3a; /* Deep Navy from logo */
    font-size: 1.6em;
    font-weight: 800;
    margin-top: 10px;
  }

  .sub-heading {
    text-align: center;
    color: #4a5d23; /* Green from logo */
    font-size: 0.85em;
    margin-bottom: 1.5em;
    font-weight: 500;
  }

  .field {
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 15px;
    padding: 12px 15px;
    background-color: white;
    border: 1px solid #e0e0e0;
    transition: 0.3s;
  }

  .field:focus-within {
    border-color: #4a5d23;
    box-shadow: 0 0 0 3px rgba(74, 93, 35, 0.1);
  }

  .input-icon {
    height: 1.1em;
    width: 1.1em;
    fill: #8b2626; /* Burgundy cap color */
  }

  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #1a2a3a;
    font-size: 0.95em;
  }

  .btn-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 1.5em;
  }

  .button-login {
    padding: 14px;
    border-radius: 15px;
    border: none;
    background-color: #4a5d23; /* Market Green */
    color: white;
    font-weight: bold;
    font-size: 1em;
    cursor: pointer;
    transition: 0.3s;
  }

  .button-login:hover {
    background-color: #36441a;
    transform: scale(1.02);
  }

  .button-signup {
    padding: 12px;
    border-radius: 15px;
    border: 2px solid #e2a02b; /* Golden snack color */
    background: transparent;
    color: #b07d22;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
  }

  .button-signup:hover {
    background: #fff8eb;
  }

  .button-forgot {
    background: none;
    border: none;
    color: #999;
    font-size: 0.8em;
    cursor: pointer;
    margin-top: 10px;
  }
`;

export default LoginModal;
