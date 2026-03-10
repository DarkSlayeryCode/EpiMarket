"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";

// Components
import GoodsCard from "../../components/GoodsCard";
import SearchBar from "../../components/SearchBar";
import Cart from "../../components/Cart";
import Logo from "../../components/Logo"; // Integrated Logo component

// Dummy Data for testing the grid
const EXAMPLE_PRODUCTS = [
  {
    id: 1,
    title: "Pommes Gala",
    price: "3.20€",
    unit: "kg",
    shopName: "Verger d'Antan",
    category: "Fruits",
    location: "Cotonou",
    stock: 12,
  },
  {
    id: 2,
    title: "Baguette Tradition",
    price: "1.10€",
    unit: "pc",
    shopName: "Boulangerie Epi",
    category: "Boulangerie",
    location: "Cotonou",
    stock: 5,
  },
  {
    id: 3,
    title: "Miel de Fleurs",
    price: "8.50€",
    unit: "pot",
    shopName: "Rucher du Bénin",
    category: "Epicerie",
    location: "Ouidah",
    stock: 0,
  },
  {
    id: 4,
    title: "Pâtes Artisanales",
    price: "4.50€",
    unit: "500g",
    shopName: "Pasta Casa",
    category: "Epicerie",
    location: "Cotonou",
    stock: 8,
  },
  {
    id: 5,
    title: "Lait Frais",
    price: "2.10€",
    unit: "Litre",
    shopName: "Ferme d'Epi",
    category: "Crèmerie",
    location: "Cotonou",
    stock: 15,
  },
];

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shopFilter = searchParams.get("shop");
  const categoryFilter = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const displayTitle =
    shopFilter ||
    categoryFilter ||
    (searchQuery ? `"${searchQuery}"` : "Notre Catalogue");

  const backendImageUrl = null;
  const headerImage = backendImageUrl || "/Logo.png";

  if (!mounted) return null;

  return (
    <CatalogWrapper>
      <header className="catalog-header">
        {/* TOP LEFT LOGO POSITIONING */}
        <div className="logo-container">
          <Logo />
        </div>

        <div className="bg-container">
          <Image
            src={headerImage}
            alt="Header Background"
            fill
            priority
            className="header-bg-img"
            style={{
              objectFit: backendImageUrl ? "cover" : "contain",
              opacity: backendImageUrl ? 0.4 : 0.1,
            }}
          />
        </div>

        <div className="header-content">
          <div className="title-area">
            {(shopFilter || categoryFilter) && (
              <span className="context-label">
                {shopFilter ? "Boutique" : "Rayon"}
              </span>
            )}
            <h1>{displayTitle}</h1>
            <p className="subtitle">
              {EXAMPLE_PRODUCTS.length} produits trouvés
            </p>
          </div>
          <div className="search-container">
            <SearchBar defaultValue={searchQuery || ""} />
          </div>
        </div>
      </header>

      <section className="results-container">
        <div className="product-grid">
          {EXAMPLE_PRODUCTS.map((product) => (
            <GoodsCard
              key={product.id}
              title={product.title}
              price={product.price}
              unit={product.unit}
              shopName={product.shopName}
              location={product.location}
              stock={product.stock}
              badge={product.category === "Fruits" ? "BIO" : "NEW"}
            />
          ))}
        </div>
      </section>

      <Cart />
    </CatalogWrapper>
  );
}

const CatalogWrapper = styled.main`
  background-color: #fcfaf7;
  min-height: 100vh;
  padding-bottom: 120px;

  .catalog-header {
    position: relative;
    height: 320px;
    background-color: white;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    border-bottom: 2px solid #1a2a3a;
    margin-bottom: 40px;
    overflow: hidden;
  }

  /* Absolute positioning for the Logo */
  .logo-container {
    position: absolute;
    top: 30px;
    left: 40px;
    z-index: 10; /* Ensures it stays above the bg-container */
  }

  .bg-container {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
  }

  .header-content {
    position: relative;
    z-index: 5;
    width: 90%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 40px;
  }

  .context-label {
    background: #4a5d23;
    color: white;
    font-size: 0.7rem;
    font-weight: 800;
    padding: 4px 12px;
    border-radius: 4px;
    text-transform: uppercase;
    margin-bottom: 10px;
    display: inline-block;
  }

  .title-area h1 {
    color: #1a2a3a;
    font-size: 3.2rem;
    font-weight: 900;
    margin: 0;
    line-height: 1;
  }

  .subtitle {
    color: #4a5d23;
    font-weight: 800;
    margin-top: 10px;
    font-size: 1rem;
    letter-spacing: 0.5px;
  }

  .search-container {
    width: 380px;
    background: white;
    padding: 8px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  .results-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 30px;
    justify-items: center;
  }

  @media (max-width: 768px) {
    .logo-container {
      left: 20px;
      top: 20px;
    }
    .header-content {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .search-container {
      width: 100%;
      margin-top: 30px;
    }
    .title-area h1 {
      font-size: 2.2rem;
    }
  }
`;
