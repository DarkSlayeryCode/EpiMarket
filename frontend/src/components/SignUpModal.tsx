"use client";
import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

const SignUpModal = ({ isOpen, onClose, switchToLogin }) => {
  // 1. Added state for role selection
  const [role, setRole] = useState("client");

  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <StyledWrapper onClick={(e) => e.stopPropagation()}>
        <div className="form-box">
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>

          <div className="form">
            <Image
              src="/Logo.png"
              alt="EpiMarket Logo"
              className="logo-img"
              width={80}
              height={80}
            />
            <span className="title">Join EpiMarket</span>
            <span className="subtitle">
              Les courses le ventre plein, sans stress.
            </span>

            {/* 2. Added Role Selection Menu */}
            <div className="role-container">
              <button
                type="button"
                className={`role-btn ${role === "client" ? "active" : ""}`}
                onClick={() => setRole("client")}
              >
                Client
              </button>
              <button
                type="button"
                className={`role-btn ${role === "vendeur" ? "active" : ""}`}
                onClick={() => setRole("vendeur")}
              >
                Vendeur
              </button>
            </div>

            <div className="form-container">
              <input type="text" className="input" placeholder="Full Name" />
              <input type="email" className="input" placeholder="Email" />
              <input type="password" className="input" placeholder="Password" />
            </div>

            {/* 3. Button text now reflects the role */}
            <button className="signup-btn">
              Sign up as {role === "client" ? "Client" : "Vendeur"}
            </button>
          </div>

          <div className="form-section">
            <p>
              Have an account? <button onClick={switchToLogin}>Log in</button>
            </p>
          </div>
        </div>
      </StyledWrapper>
    </ModalBackdrop>
  );
};

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(26, 42, 58, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(6px);
`;

const StyledWrapper = styled.div`
  .form-box {
    max-width: 340px;
    background: #fcfaf7;
    overflow: hidden;
    border-radius: 25px;
    color: #1a2a3a;
    position: relative;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    border: 1px solid white;
  }

  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #999;
    z-index: 10;
  }

  .form {
    display: flex;
    flex-direction: column;
    padding: 32px 24px 24px;
    gap: 12px;
    text-align: center;
    align-items: center;
  }

  .title {
    font-weight: bold;
    font-size: 1.6rem;
    color: #1a2a3a;
  }

  .subtitle {
    font-size: 0.85rem;
    color: #4a5d23;
    margin-bottom: 5px;
  }

  /* --- Role Selector Styles --- */
  .role-container {
    display: flex;
    width: 100%;
    background: #f3f0eb;
    padding: 4px;
    border-radius: 12px;
    margin-bottom: 10px;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  .role-btn {
    flex: 1;
    border: none;
    background: none;
    padding: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.3s ease;
    color: #1a2a3a;
  }

  .role-btn.active {
    background-color: #4a5d23; /* Logo Green */
    color: white;
    box-shadow: 0 4px 10px rgba(74, 93, 35, 0.2);
  }

  .form-container {
    border-radius: 12px;
    background-color: #fff;
    width: 100%;
    border: 1px solid #e0e0e0;
    overflow: hidden;
  }

  .input {
    background: none;
    border: 0;
    outline: 0;
    height: 45px;
    width: 100%;
    border-bottom: 1px solid #eee;
    font-size: 0.9rem;
    padding: 8px 15px;
    color: #333;
  }

  .input:last-child {
    border-bottom: none;
  }

  .form-section {
    padding: 16px;
    font-size: 0.85rem;
    background-color: #f3f0eb;
    text-align: center;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }

  .form-section button {
    background: none;
    border: none;
    font-weight: bold;
    color: #8b2626;
    cursor: pointer;
    text-decoration: underline;
  }

  .signup-btn {
    background-color: #4a5d23;
    color: #fff;
    border: 0;
    border-radius: 12px;
    padding: 12px 16px;
    width: 100%;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 5px;
  }

  .signup-btn:hover {
    background-color: #36441a;
    transform: translateY(-1px);
  }
`;

export default SignUpModal;
