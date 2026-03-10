"use client";
import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
// Importing your Logo component
import Logo from "@/components/Logo";

interface Order {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: "Livré" | "En cours" | "Annulé";
}

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    avatar: "/default-avatar.png",
  });

  const [orders] = useState<Order[]>([
    {
      id: "ORD-9921",
      date: "2026-03-01",
      items: ["Pommes Gala", "Miel"],
      total: 11.7,
      status: "Livré",
    },
    {
      id: "ORD-8812",
      date: "2026-02-20",
      items: ["Baguette Tradition"],
      total: 1.1,
      status: "Livré",
    },
    {
      id: "ORD-7765",
      date: "2026-02-15",
      items: ["Lait Frais", "Pâtes"],
      total: 6.6,
      status: "Livré",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const totalSpent = useMemo(
    () => orders.reduce((acc, curr) => acc + curr.total, 0),
    [orders],
  );

  return (
    <ProfileWrapper>
      {/* USE YOUR LOGO COMPONENT HERE */}
      <nav className="profile-nav">
        <Logo />
        {/*<span className="nav-hint">Retour au marché</span>*/}
      </nav>

      <ProfileHeader>
        <div
          className="avatar-section"
          onClick={() => setPreviewImg(user.avatar)}
        >
          <div className="avatar-ring">
            <Image
              src={user.avatar}
              alt="User Profile"
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="hover-icon">🔍</div>
          </div>
        </div>

        <div className="user-details">
          <h1>{user.name}</h1>
          <p className="email-text">{user.email}</p>
          <button
            className="edit-profile-btn"
            onClick={() => setIsEditing(true)}
          >
            Modifier le profil
          </button>
        </div>

        <div className="spending-badge">
          <label>Total Dépensé</label>
          <div className="amount">{totalSpent.toFixed(2)}€</div>
        </div>
      </ProfileHeader>

      <HistorySection>
        <div className="section-title">
          <h2>Historique des Achats</h2>
          <span className="count-badge">{orders.length} commandes</span>
        </div>

        <div className="order-list">
          {orders.map((order) => (
            <motion.div
              className="order-card"
              key={order.id}
              whileHover={{ x: 10 }}
            >
              <div className="order-main">
                <span className="order-id">{order.id}</span>
                <span className="order-date">
                  {new Date(order.date).toLocaleDateString()}
                </span>
                <p className="order-items">{order.items.join(", ")}</p>
              </div>
              <div className="order-meta">
                <span className="order-total">{order.total.toFixed(2)}€</span>
                <span
                  className={`status-tag ${order.status.toLowerCase().replace(" ", "-")}`}
                >
                  {order.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </HistorySection>

      <AnimatePresence>
        {previewImg && (
          <LightboxOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImg(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <Image
                src={previewImg}
                alt="Preview"
                width={500}
                height={500}
                style={{ borderRadius: "50%" }}
              />
            </motion.div>
          </LightboxOverlay>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEditing && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <h3>Modifier mes informations</h3>
              <div className="input-group">
                <label>Nom complet</label>
                <input
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>URL Photo de profil</label>
                <input
                  value={user.avatar}
                  onChange={(e) => setUser({ ...user, avatar: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button
                  className="btn-save"
                  onClick={() => setIsEditing(false)}
                >
                  Sauvegarder
                </button>
                <button
                  className="btn-close"
                  onClick={() => setIsEditing(false)}
                >
                  Annuler
                </button>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </ProfileWrapper>
  );
}

// --- STYLES ---

const ProfileWrapper = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 20px 80px;
  background: #fcfaf7;
  min-height: 100vh;

  .profile-nav {
    padding: 20px 0 40px;
    display: flex;
    align-items: center;
    gap: 15px;

    .nav-hint {
      font-weight: 700;
      color: #1a2a3a;
      opacity: 0.4;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
`;

const ProfileHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 40px;
  background: white;
  padding: 40px;
  border-radius: 35px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
  margin-bottom: 50px;

  .avatar-section {
    cursor: pointer;
    .avatar-ring {
      width: 120px;
      height: 120px;
      position: relative;
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid #1a2a3a;
      .hover-icon {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        opacity: 0;
        transition: 0.2s;
      }
      &:hover .hover-icon {
        opacity: 1;
      }
    }
  }

  .user-details {
    flex: 1;
    h1 {
      color: #1a2a3a;
      font-size: 2rem;
      font-weight: 900;
    }
    .email-text {
      color: #4a5d23;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .edit-profile-btn {
      background: #f0f0f0;
      border: none;
      padding: 10px 18px;
      border-radius: 12px;
      font-weight: 800;
      cursor: pointer;
    }
  }

  .spending-badge {
    text-align: right;
    label {
      font-size: 0.7rem;
      font-weight: 900;
      color: #4a5d23;
      text-transform: uppercase;
    }
    .amount {
      font-size: 2.8rem;
      font-weight: 900;
      color: #1a2a3a;
      line-height: 1;
    }
  }
`;

const HistorySection = styled.section`
  .section-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    h2 {
      color: #1a2a3a;
      font-weight: 900;
    }
    .count-badge {
      background: #1a2a3a;
      color: white;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
    }
  }

  .order-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .order-card {
    background: white;
    padding: 25px;
    border-radius: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.02);

    .order-id {
      font-weight: 900;
      color: #1a2a3a;
    }
    .order-date {
      font-size: 0.8rem;
      color: #999;
      margin-left: 8px;
    }
    .order-items {
      margin-top: 8px;
      color: #444;
      font-size: 0.95rem;
    }

    .order-meta {
      text-align: right;
    }
    .order-total {
      display: block;
      font-size: 1.3rem;
      font-weight: 900;
      color: #1a2a3a;
    }

    .status-tag {
      font-size: 0.65rem;
      font-weight: 900;
      padding: 4px 10px;
      border-radius: 6px;
      text-transform: uppercase;
      &.livré {
        background: #e8f5e9;
        color: #2e7d32;
      }
    }
  }
`;

const LightboxOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(26, 42, 58, 0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal-content {
    background: white;
    padding: 40px;
    border-radius: 30px;
    width: 400px;
    h3 {
      margin-bottom: 25px;
      color: #1a2a3a;
      font-weight: 900;
    }
    .input-group {
      margin-bottom: 20px;
      label {
        display: block;
        font-size: 0.8rem;
        font-weight: 800;
        margin-bottom: 6px;
      }
      input {
        width: 100%;
        padding: 12px;
        border: 1px solid #eee;
        border-radius: 12px;
      }
    }
    .modal-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    .btn-save {
      flex: 1;
      background: #1a2a3a;
      color: white;
      border: none;
      padding: 14px;
      border-radius: 15px;
      cursor: pointer;
      font-weight: 800;
    }
    .btn-close {
      flex: 1;
      border: 1px solid #eee;
      background: none;
      padding: 14px;
      border-radius: 15px;
      cursor: pointer;
    }
  }
`;
