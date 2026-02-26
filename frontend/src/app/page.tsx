"use client";
import { useState } from "react";
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignUpModal";
import Image from "next/image";
import LoginButton from "../components/LoginButton";
import SignUpButton from "../components/SignUpButton";
import SearchBar from "../components/SearchBar";

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
