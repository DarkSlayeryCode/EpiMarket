"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <LogoLink href="/">
      <motion.div
        whileHover={{ scale: 1.05, rotate: -3 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <ImageWrapper>
          <Image
            src="/basket.png"
            alt="EpiMarket Logo"
            fill
            priority // High priority loading for the logo
            style={{ objectFit: "contain" }}
          />
        </ImageWrapper>
      </motion.div>
      <LogoText>
        Epi<span>Market</span>
      </LogoText>
    </LogoLink>
  );
}

// --- STYLES ---

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  cursor: pointer;
  width: fit-content;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 45px;
  height: 45px;

  /* Adds a subtle shadow to the basket to make it pop */
  filter: drop-shadow(0px 4px 6px rgba(26, 42, 58, 0.15));
`;

const LogoText = styled.h2`
  color: #1a2a3a; /* Your Brand Navy */
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.5px;
  margin: 0;

  span {
    color: #4a5d23; /* Your Brand Green */
  }

  @media (max-width: 480px) {
    display: none; /* Optional: hide text on very small mobile screens */
  }
`;
