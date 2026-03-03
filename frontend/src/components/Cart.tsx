"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fixes the "Hydration Mismatch" error by waiting for the browser
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <CartContainer>
      <motion.div
        drag
        dragMomentum={false}
        whileDrag={{ scale: 1.05, cursor: "grabbing" }}
        className="drag-handle"
      >
        {/* The Expandable Panel */}
        <AnimatePresence>
          {isOpen && (
            <CartPanel
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
            >
              <div className="cart-header">
                <h3>Mon Panier</h3>
                <button onClick={() => setIsOpen(false)}>✕</button>
              </div>

              <div className="cart-items">
                <div className="item">
                  <span>Pommes Gala</span>
                  <strong>3.20€</strong>
                </div>
              </div>

              <div className="cart-footer">
                <div className="total-row">
                  <span>Total</span>
                  <span>3.20€</span>
                </div>
                <button className="checkout-btn">Commander</button>
              </div>
            </CartPanel>
          )}
        </AnimatePresence>

        {/* The Bubble Trigger */}
        <CartBubble onClick={() => setIsOpen(!isOpen)}>
          <span className="count">1</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
          </svg>
        </CartBubble>
      </motion.div>
    </CartContainer>
  );
};

const CartContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 1000;
  pointer-events: none; /* Allows clicking things 'under' the container area */

  .drag-handle {
    pointer-events: auto; /* Re-enables clicking for the cart itself */
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

const CartBubble = styled.div`
  width: 60px;
  height: 60px;
  background: #1a2a3a; /* Navy */
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 10px 25px rgba(26, 42, 58, 0.3);
  cursor: grab;
  position: relative;
  border: 2px solid #ffffff;

  .count {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #8b2626; /* Burgundy */
    color: white;
    font-size: 0.7rem;
    font-weight: 800;
    min-width: 22px;
    height: 22px;
    padding: 0 4px;
    border-radius: 11px;
    border: 2px solid #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: 24px;
    height: 24px;
  }
  &:active {
    cursor: grabbing;
  }
`;

const CartPanel = styled(motion.div)`
  margin-bottom: 15px;
  width: 320px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.05);

  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h3 {
      margin: 0;
      font-size: 1.1rem;
      color: #1a2a3a;
      font-weight: 800;
    }
    button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.2rem;
      color: #ccc;
    }
  }

  .cart-items {
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 20px;
  }

  .item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #f5f5f5;
    font-size: 0.95rem;
    color: #333;
  }

  .total-row {
    display: flex;
    justify-content: space-between;
    font-weight: 800;
    font-size: 1.1rem;
    color: #1a2a3a;
    margin-bottom: 15px;
  }

  .checkout-btn {
    width: 100%;
    background: #4a5d23; /* Green */
    color: white;
    border: none;
    padding: 14px;
    border-radius: 14px;
    font-weight: 800;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.2s;
    &:hover {
      background: #3d4d1d;
    }
    &:active {
      transform: scale(0.98);
    }
  }
`;

export default Cart;
