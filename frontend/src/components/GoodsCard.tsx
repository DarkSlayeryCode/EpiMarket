"use client";
import React from "react";
import styled from "styled-components";

const GoodsCard = ({
  title = "Pommes Gala",
  price = "3.50€",
  unit = "le kg",
  imageUrl = "/apple.png",
  badge = "BIO",
  shopName = "Ferme d'Epi",
  location = "Arrivage Direct - 5km",
  stock = 5, // New Prop: Number of items left
}) => {
  const isOutOfStock = stock <= 0;

  return (
    <StyledWrapper $isOutOfStock={isOutOfStock}>
      <div className="card">
        <div className="card__shine" />
        <div className="card__glow" />

        <div className="card__content">
          {badge && (
            <div className="card__badge">
              {isOutOfStock ? "SOLD OUT" : badge}
            </div>
          )}

          <div className="product-image-container">
            <img src={imageUrl} alt={title} className="product-img" />
          </div>

          <div className="textBox">
            <div className="card__text">
              <div className="title-row">
                <p className="head">{title}</p>
                <span className="shop-tag">{shopName}</span>
              </div>

              <p className="description">Produit frais et de saison</p>

              <div className="meta-row">
                <div className="location-chip">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {location}
                </div>

                {/* Stock Indicator */}
                <div className={`stock-tag ${isOutOfStock ? "out" : ""}`}>
                  {isOutOfStock ? "Rupture" : `${stock} restants`}
                </div>
              </div>
            </div>

            <div className="card__footer">
              <div className="price-container">
                <span className="price">{price}</span>
                <span className="unit">{unit}</span>
              </div>

              <button className="card__button" disabled={isOutOfStock}>
                {isOutOfStock ? (
                  <svg
                    height={16}
                    width={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    height={16}
                    width={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M4 12H20M12 4V20" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ $isOutOfStock: boolean }>`
  .card {
    --brand-navy: #1a2a3a;
    --brand-green: #4a5d23;
    --brand-burgundy: #8b2626;
    --card-bg: #ffffff;

    width: 220px;
    height: 310px; /* Increased slightly for stock row */
    background: var(--card-bg);
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(26, 42, 58, 0.05);
    cursor: ${(props) => (props.$isOutOfStock ? "default" : "pointer")};
    opacity: ${(props) => (props.$isOutOfStock ? 0.8 : 1)};
  }

  /* Design 1 & 2 styles... */
  .card__shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0) 60%
    );
    background-size: 200% 100%;
    opacity: 0;
    z-index: 3;
    pointer-events: none;
  }
  .card__content {
    padding: 1.25rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
  }

  .card__badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: ${(props) =>
      props.$isOutOfStock ? "var(--brand-burgundy)" : "var(--brand-burgundy)"};
    color: white;
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
    font-size: 0.6rem;
    font-weight: 800;
    z-index: 10;
  }

  .product-image-container {
    height: 110px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: ${(props) => (props.$isOutOfStock ? "grayscale(0.8)" : "none")};
  }
  .product-img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    transition: 0.4s ease-in-out;
  }

  .meta-row {
    display: flex;
    gap: 6px;
    margin-top: 6px;
    flex-wrap: wrap;
  }

  .location-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--brand-green);
    background: rgba(74, 93, 35, 0.08);
    padding: 3px 8px;
    border-radius: 6px;
  }

  /* --- STOCK TAG STYLE --- */
  .stock-tag {
    font-size: 0.65rem;
    font-weight: 700;
    color: #666;
    background: #f0f0f0;
    padding: 3px 8px;
    border-radius: 6px;
    transition: all 0.3s;
  }

  .stock-tag.out {
    color: var(--brand-burgundy);
    background: rgba(139, 38, 38, 0.1);
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 8px;
  }
  .head {
    color: var(--brand-navy);
    font-size: 1rem;
    font-weight: 800;
    margin: 0;
  }
  .shop-tag {
    font-size: 0.6rem;
    background: rgba(26, 42, 58, 0.08);
    color: var(--brand-navy);
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 600;
  }
  .description {
    font-size: 0.75rem;
    color: #777;
    margin: 4px 0 0 0;
  }

  .card__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }
  .price {
    display: block;
    color: ${(props) => (props.$isOutOfStock ? "#999" : "var(--brand-green)")};
    font-weight: 800;
    font-size: 1.2rem;
  }
  .unit {
    font-size: 0.7rem;
    color: #999;
  }

  .card__button {
    width: 32px;
    height: 32px;
    background: ${(props) =>
      props.$isOutOfStock ? "#ddd" : "var(--brand-navy)"};
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: 0.3s ease;
    border: none;
    cursor: ${(props) => (props.$isOutOfStock ? "not-allowed" : "pointer")};
  }

  /* Hover Effects */
  .card:hover:not(:active) {
    transform: ${(props) =>
      props.$isOutOfStock ? "none" : "translateY(-5px)"};
    box-shadow: ${(props) =>
      props.$isOutOfStock ? "none" : "0 20px 30px rgba(0,0,0,0.1)"};
  }
  .card:hover .card__shine {
    opacity: ${(props) => (props.$isOutOfStock ? 0 : 1)};
    animation: shine 2s infinite linear;
  }
  .card:hover .product-img {
    transform: ${(props) =>
      props.$isOutOfStock ? "none" : "scale(1.05) rotate(3deg)"};
  }

  .card:hover .stock-tag:not(.out) {
    background: var(--brand-navy);
    color: white;
  }

  @keyframes shine {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

export default GoodsCard;
