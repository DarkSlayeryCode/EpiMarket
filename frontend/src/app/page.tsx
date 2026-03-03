"use client";
import { useState } from "react";
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignUpModal";
import Image from "next/image";
import LoginButton from "../components/LoginButton";
import SignUpButton from "../components/SignUpButton";
import SearchBar from "../components/SearchBar";
import BusinessCard from "../components/BusinessCard";
import GoodsCard from "../components/GoodsCard";

export default function Home() {
  const [modalMode, setModalMode] = useState<"none" | "login" | "signup">(
    "none",
  );

  return (
    <main style={{ padding: "0 40px" }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "90px",
        }}
      >
        {/* Left Section: Logo (Fixed width) */}
        <div
          style={{
            width: "150px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Image
            src="/Logo.png"
            alt="EpiMarket Logo"
            width={75}
            height={75}
            priority
          />
        </div>

        {/* Middle Section: Flexible area for expanding SearchBar */}
        <div
          style={{
            flex: 3,
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "20px",
          }}
        >
          <SearchBar />
        </div>

        {/* Right Section: Buttons (Fixed width keeps them perfectly aligned) */}
        <div
          style={{
            width: "280px",
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ width: "130px" }}>
            <LoginButton onClick={() => setModalMode("login")}>
              Login
            </LoginButton>
          </div>
          <div style={{ width: "130px" }}>
            <SignUpButton onClick={() => setModalMode("signup")}>
              Sign Up
            </SignUpButton>
          </div>
        </div>
      </nav>

      {/* --- Section 1: Business/Shops --- */}
      <section style={{ marginTop: "60px" }}>
        <h2
          style={{
            color: "#1a2a3a",
            marginBottom: "24px",
            fontSize: "1.8rem",
            fontWeight: 900,
          }}
        >
          Nos Boutiques Partenaires
        </h2>
        <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
          <BusinessCard
            businessName="Le Verger d'Antan"
            category="Producteur"
            description="Fruits et légumes bios direct producteur."
          />
          <BusinessCard
            businessName="Boulangerie Epi"
            category="Artisan"
            description="Pains au levain et viennoiseries maison."
          />
        </div>
      </section>

      {/* --- Section 2: Goods/Products --- */}
      <section style={{ marginTop: "80px" }}>
        <h2
          style={{
            color: "#1a2a3a",
            marginBottom: "24px",
            fontSize: "1.8rem",
            fontWeight: 900,
          }}
        >
          Produits du Moment
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "30px",
          }}
        >
          {/* Test 1: High Stock / Bio */}
          <GoodsCard
            title="Pommes Gala"
            price="3.20€"
            unit="le kg"
            badge="BIO"
            shopName="Verger d'Antan"
            location="Cotonou - 2km"
            stock={12}
          />

          {/* Test 2: Low Stock / Promo */}
          <GoodsCard
            title="Baguette Tradition"
            price="1.10€"
            unit="la pièce"
            badge="FRAIS"
            shopName="Boulangerie Epi"
            location="Cotonou - 1km"
            stock={3}
          />

          {/* Test 3: Out of Stock */}
          <GoodsCard
            title="Miel de Fleurs"
            price="8.50€"
            unit="le pot"
            badge="LOCAL"
            shopName="Rucher du Bénin"
            location="Ouidah - 40km"
            stock={0}
          />

          {/* Test 4: Pasta */}
          <GoodsCard
            title="Pâtes Artisanales"
            price="4.50€"
            unit="500g"
            badge="NEW"
            shopName="Pasta Casa"
            location="Cotonou - 5km"
            stock={8}
          />
        </div>
      </section>

      {/* Modals */}
      <LoginModal
        isOpen={modalMode === "login"}
        onClose={() => setModalMode("none")}
      />
      <SignUpModal
        isOpen={modalMode === "signup"}
        onClose={() => setModalMode("none")}
        switchToLogin={() => setModalMode("login")}
      />
    </main>
  );
}
