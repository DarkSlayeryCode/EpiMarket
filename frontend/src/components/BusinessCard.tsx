"use client";
import React from "react";
import styled from "styled-components";

const BusinessCard = ({
  businessName = "EpiMarket Shop",
  category = "Alimentation",
  description = "Des produits frais, locaux et de saison livrés directement chez vous sans stress.",
  imageUrl = "/Logo.png",
}) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="back-animation" />
        <div className="main-content">
          <div
            className="image-bg"
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            <div className="circle" id="left" />
            <div className="circle" id="right" />
          </div>
          <div className="info-overlay">
            <small className="badge">{category}</small>
            <div className="text-content">
              <h3 className="business-name">{businessName}</h3>
              <p className="description">{description}</p>
            </div>
            <p className="card-footer">Voir la boutique →</p>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 240px; /* Slightly wider for thicker text */
    height: 320px;
    background-color: #151515;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 15px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }

  .back-animation {
    position: absolute;
    width: 150%;
    height: 150%;
    background: linear-gradient(
      90deg,
      transparent,
      #4a5d23,
      #4a5d23,
      transparent
    );
    animation: rotate 4000ms infinite linear;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .card:hover .back-animation {
    opacity: 1;
  }
  .card:hover {
    transform: scale(1.05);
  }

  .main-content {
    position: absolute;
    width: 98%;
    height: 98%;
    background-color: #fcfaf7;
    border-radius: 13px;
    z-index: 2;
    overflow: hidden;
  }

  .image-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transition: all 0.5s ease;
    z-index: 1;
  }

  .card:hover .image-bg {
    filter: blur(8px) brightness(0.5);
    transform: scale(1.1);
  }

  .circle {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    filter: blur(20px);
    opacity: 0.3;
  }
  #left {
    background: #4a5d23;
    top: -20px;
    left: -20px;
  }
  #right {
    background: #1a2a3a;
    bottom: -20px;
    right: -20px;
  }

  .info-overlay {
    position: relative;
    z-index: 3;
    height: 100%;
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    transition: all 0.4s ease;
  }

  .badge {
    position: absolute;
    top: 15px;
    left: 15px;
    background: #4a5d23;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
  }

  /* --- THICKER NAME STYLE --- */
  .business-name {
    color: #1a2a3a;
    font-size: 1.4rem;
    font-weight: 900; /* Extra Bold */
    margin: 0;
    transition: all 0.4s ease;
    line-height: 1.1;
    text-shadow: 0px 1px 2px rgba(255, 255, 255, 0.8);
  }

  .description {
    height: 0;
    opacity: 0;
    font-size: 0.85rem;
    color: #fff;
    margin-top: 10px;
    overflow: hidden;
    transition: all 0.4s ease;
    line-height: 1.4;
  }

  .card-footer {
    font-size: 11px;
    color: #4a5d23;
    font-weight: 900;
    margin-top: 15px;
    opacity: 0;
    transition: all 0.4s ease;
  }

  .card:hover .info-overlay {
    justify-content: flex-start;
    padding-top: 50px;
    background: rgba(0, 0, 0, 0.3);
  }

  .card:hover .business-name {
    color: white;
    text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  }

  .card:hover .description,
  .card:hover .card-footer {
    height: auto;
    opacity: 1;
  }

  .card:hover .badge {
    opacity: 0;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default BusinessCard;
