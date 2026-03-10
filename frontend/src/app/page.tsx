"use client";
import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

// Components
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignUpModal";
import LoginButton from "../components/LoginButton";
import SignUpButton from "../components/SignUpButton";
import SearchBar from "../components/SearchBar";
import BusinessCard from "../components/BusinessCard";
import GoodsCard from "../components/GoodsCard";
import Logo from "../components/Logo";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalMode, setModalMode] = useState<"none" | "login" | "signup">(
    "none",
  );

  // --- NAVIGATION COMPONENT ---
  const Navigation = () => (
    <NavContainer>
      <div className="nav-left">
        <Logo />
      </div>

      <div className="nav-middle">
        {/* Only show SearchBar if logged in */}
        {isLoggedIn && <SearchBar />}
      </div>

      <div className="nav-right">
        {isLoggedIn ? (
          <Link href="/profile" style={{ textDecoration: "none" }}>
            <ProfileButton>
              <div className="avatar-mini">JD</div>
              <span>Mon Profil</span>
            </ProfileButton>
          </Link>
        ) : (
          <div className="auth-group">
            <LoginButton onClick={() => setModalMode("login")}>
              Connexion
            </LoginButton>
            <SignUpButton onClick={() => setModalMode("signup")}>
              Inscription
            </SignUpButton>
          </div>
        )}
      </div>
    </NavContainer>
  );

  return (
    <PageWrapper>
      <Navigation />

      {!isLoggedIn ? (
        <HeroSection>
          <div className="hero-content">
            <h1>
              Le marché local, <br />
              <span>directement chez vous.</span>
            </h1>
            <p>
              Découvrez les meilleurs produits de Cotonou et soutenez vos
              artisans locaux.
            </p>
            <div className="cta-row">
              <button
                className="primary-cta"
                onClick={() => setModalMode("signup")}
              >
                Commencer mes courses
              </button>
              <button
                className="secondary-cta"
                onClick={() => setIsLoggedIn(true)}
              >
                Simuler une connexion
              </button>
            </div>
          </div>
          <div className="hero-image">
            <Image
              src="/basket.png"
              alt="Basket"
              width={300}
              height={300}
              priority
            />
          </div>
        </HeroSection>
      ) : (
        <div className="client-content">
          <Section>
            <h2>Nos Boutiques Partenaires</h2>
            <div className="grid-flex">
              <BusinessCard
                businessName="Le Verger d'Antan"
                category="Producteur"
                description="Fruits et légumes bios."
              />
              <BusinessCard
                businessName="Boulangerie Epi"
                category="Artisan"
                description="Pains au levain maison."
              />
            </div>
          </Section>

          <Section>
            <h2>Produits du Moment</h2>
            <div className="product-grid">
              <GoodsCard
                title="Pommes Gala"
                price="3.20€"
                unit="kg"
                badge="BIO"
                shopName="Verger d'Antan"
                location="Cotonou"
                stock={12}
              />
              <GoodsCard
                title="Baguette Tradition"
                price="1.10€"
                unit="pc"
                badge="FRAIS"
                shopName="Boulangerie Epi"
                location="Cotonou"
                stock={3}
              />
              <GoodsCard
                title="Miel de Fleurs"
                price="8.50€"
                unit="pot"
                badge="LOCAL"
                shopName="Rucher du Bénin"
                location="Ouidah"
                stock={0}
              />
              <GoodsCard
                title="Pâtes Artisanales"
                price="4.50€"
                unit="500g"
                badge="NEW"
                shopName="Pasta Casa"
                location="Cotonou"
                stock={8}
              />
            </div>
          </Section>
        </div>
      )}

      <LoginModal
        isOpen={modalMode === "login"}
        onClose={() => setModalMode("none")}
      />
      <SignUpModal
        isOpen={modalMode === "signup"}
        onClose={() => setModalMode("none")}
        switchToLogin={() => setModalMode("login")}
      />
    </PageWrapper>
  );
}

// --- STYLES ---

const PageWrapper = styled.main`
  padding: 0 40px;
  background-color: #fcfaf7;
  min-height: 100vh;
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  .nav-left {
    width: 200px;
  }
  .nav-middle {
    flex: 1;
    display: flex;
    justify-content: center;
    max-width: 500px;
  }
  .nav-right {
    width: 300px;
    display: flex;
    justify-content: flex-end;
  }
  .auth-group {
    display: flex;
    gap: 12px;
    width: 280px;
  }
`;

const ProfileButton = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 6px 16px 6px 6px;
  border-radius: 50px;
  border: 2px solid #1a2a3a;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  .avatar-mini {
    width: 35px;
    height: 35px;
    background: #4a5d23;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 0.8rem;
  }

  span {
    color: #1a2a3a;
    font-weight: 800;
    font-size: 0.9rem;
  }

  &:hover {
    background: #1a2a3a;
    span {
      color: white;
    }
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(26, 42, 58, 0.2);
  }
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 100px 0;

  .hero-content {
    max-width: 600px;
    h1 {
      font-size: 4rem;
      font-weight: 900;
      color: #1a2a3a;
      line-height: 1.1;
      margin-bottom: 20px;
    }
    h1 span {
      color: #4a5d23;
    }
    p {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 40px;
    }
  }

  .cta-row {
    display: flex;
    gap: 20px;
  }

  .primary-cta {
    background: #1a2a3a;
    color: white;
    border: none;
    padding: 18px 32px;
    border-radius: 15px;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #2c445c;
      transform: scale(1.05);
      box-shadow: 0 8px 20px rgba(26, 42, 58, 0.3);
    }
  }

  .secondary-cta {
    background: none;
    border: 2px solid #1a2a3a;
    color: #1a2a3a;
    padding: 18px 32px;
    border-radius: 15px;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #4a5d23; /* Green background */
      border-color: #4a5d23; /* Green border */
      color: white;
      transform: scale(1.05);
      box-shadow: 0 8px 20px rgba(74, 93, 35, 0.2);
    }
  }
`;

const Section = styled.section`
  margin-top: 60px;
  h2 {
    color: #1a2a3a;
    margin-bottom: 24px;
    font-size: 1.8rem;
    font-weight: 900;
  }
  .grid-flex {
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
  }
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 30px;
  }
`;
