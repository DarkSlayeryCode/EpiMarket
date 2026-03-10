"use client";
import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPES ---
interface Product {
  id: number;
  name: string;
  price: number;
  totalQuantity: number;
  soldQuantity: number;
  location: string;
  image: string;
}

export default function VendorDashboard() {
  // 1. BUSINESS STATE
  const [business, setBusiness] = useState({
    name: "Ma Super Boutique",
    image: "/Logo.png",
  });

  // 2. PRODUCTS STATE
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Pommes Gala",
      price: 3.2,
      totalQuantity: 100,
      soldQuantity: 45,
      location: "Cotonou",
      image: "/apple.jpg",
    },
  ]);

  // 3. MODAL & PREVIEW STATE
  const [editType, setEditType] = useState<"business" | "product" | null>(null);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  // --- CALCULATIONS ---
  const dailyStats = useMemo(() => {
    const revenue = products.reduce(
      (acc, curr) => acc + curr.price * curr.soldQuantity,
      0,
    );
    return {
      revenue,
      itemsSold: products.reduce((acc, c) => acc + c.soldQuantity, 0),
    };
  }, [products]);

  // --- HANDLERS ---
  const handleEditBusiness = () => {
    setActiveItem({ ...business });
    setEditType("business");
  };

  const handleEditProduct = (product: Product | null) => {
    setActiveItem(
      product || {
        id: Date.now(),
        name: "",
        price: 0,
        totalQuantity: 0,
        soldQuantity: 0,
        location: "",
        image: "",
      },
    );
    setEditType("product");
  };

  const saveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (editType === "business") {
      setBusiness(activeItem);
    } else {
      setProducts((prev) => {
        const exists = prev.find((p) => p.id === activeItem.id);
        if (exists)
          return prev.map((p) => (p.id === activeItem.id ? activeItem : p));
        return [...prev, activeItem];
      });
    }
    setEditType(null);
  };

  return (
    <DashboardWrapper>
      {/* HEADER: BUSINESS INFO */}
      <BusinessHeader>
        <div className="profile-info">
          {/* Added onClick for Preview */}
          <div
            className="img-wrapper"
            onClick={() => setPreviewImg(business.image)}
          >
            <Image
              src={business.image}
              alt="Store"
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="img-hover-hint">🔍 Voir</div>
          </div>
          <div>
            <h1>{business.name}</h1>
            <button onClick={handleEditBusiness}>Modifier le Profil</button>
          </div>
        </div>
        <div className="revenue-card">
          <label>Recette du Jour</label>
          <h2>{dailyStats.revenue.toFixed(2)}€</h2>
        </div>
      </BusinessHeader>

      {/* PRODUCT MANAGEMENT */}
      <InventoryCard>
        <div className="card-header">
          <h2>Mes Produits</h2>
          <button className="add-btn" onClick={() => handleEditProduct(null)}>
            + Ajouter
          </button>
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Nom</th>
                <th>Prix</th>
                <th>Stock (Restant/Total)</th>
                <th>Ventes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    {/* Added onClick for Preview */}
                    <div
                      className="prod-img"
                      onClick={() => setPreviewImg(p.image || "/Logo.png")}
                    >
                      <Image
                        src={p.image || "/Logo.png"}
                        alt={p.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <div className="img-hover-hint">🔍</div>
                    </div>
                  </td>
                  <td>
                    <strong>{p.name}</strong>
                  </td>
                  <td>{p.price.toFixed(2)}€</td>
                  <td>
                    {p.totalQuantity - p.soldQuantity} / {p.totalQuantity}
                  </td>
                  <td className="sold-text">{p.soldQuantity} vendus</td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => handleEditProduct(p)}
                    >
                      ⚙️ Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InventoryCard>

      {/* --- NEW: IMAGE PREVIEW LIGHTBOX --- */}
      <AnimatePresence>
        {previewImg && (
          <LightboxOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImg(null)}
          >
            <motion.div
              className="lightbox-box"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <div className="lightbox-img-container">
                <Image
                  src={previewImg}
                  alt="Aperçu"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p>Cliquez pour fermer</p>
            </motion.div>
          </LightboxOverlay>
        )}
      </AnimatePresence>

      {/* UNIVERSAL EDIT MODAL */}
      <AnimatePresence>
        {editType && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <h3>
                {editType === "business"
                  ? "Modifier Boutique"
                  : "Modifier Produit"}
              </h3>
              <form onSubmit={saveChanges}>
                <div className="input-group">
                  <label>Nom</label>
                  <input
                    value={activeItem?.name}
                    onChange={(e) =>
                      setActiveItem({ ...activeItem, name: e.target.value })
                    }
                  />
                </div>

                <div className="input-group">
                  <label>URL de l'Image</label>
                  <input
                    placeholder="Lien de l'image (Cloudinary/S3)"
                    value={activeItem?.image}
                    onChange={(e) =>
                      setActiveItem({ ...activeItem, image: e.target.value })
                    }
                  />
                </div>

                {editType === "product" && (
                  <div className="row">
                    <div className="input-group">
                      <label>Prix (€)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={activeItem?.price}
                        onChange={(e) =>
                          setActiveItem({
                            ...activeItem,
                            price: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="input-group">
                      <label>Quantité Totale</label>
                      <input
                        type="number"
                        value={activeItem?.totalQuantity}
                        onChange={(e) =>
                          setActiveItem({
                            ...activeItem,
                            totalQuantity: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                <div className="modal-actions">
                  <button
                    type="button"
                    className="cancel"
                    onClick={() => setEditType(null)}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="save">
                    Enregistrer
                  </button>
                </div>
              </form>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </DashboardWrapper>
  );
}

// --- STYLED COMPONENTS ---

const DashboardWrapper = styled.main`
  background: #fcfaf7;
  min-height: 100vh;
  padding: 40px;
`;

// NEW STYLES FOR PREVIEW
const LightboxOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(26, 42, 58, 0.9);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .lightbox-box {
    width: 90%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .lightbox-img-container {
    width: 100%;
    height: 60vh;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
  }

  p {
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.8rem;
    opacity: 0.6;
  }
`;

const BusinessHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  .profile-info {
    display: flex;
    gap: 20px;
    align-items: center;
    .img-wrapper {
      width: 80px;
      height: 80px;
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      border: 3px solid #1a2a3a;
      cursor: zoom-in;

      .img-hover-hint {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 0.7rem;
        font-weight: 800;
        opacity: 0;
        transition: 0.2s;
      }
      &:hover .img-hover-hint {
        opacity: 1;
      }
    }
    h1 {
      font-size: 1.8rem;
      margin-bottom: 5px;
      color: #1a2a3a;
    }
    button {
      background: none;
      border: 1px solid #ccc;
      padding: 5px 12px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.8rem;
    }
  }

  .revenue-card {
    background: #1a2a3a;
    color: white;
    padding: 20px 40px;
    border-radius: 24px;
    text-align: right;
    label {
      font-size: 0.8rem;
      opacity: 0.7;
    }
    h2 {
      font-size: 2.2rem;
      font-weight: 900;
    }
  }
`;

const InventoryCard = styled.section`
  background: white;
  border-radius: 30px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);

  .card-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    .add-btn {
      background: #4a5d23;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 12px;
      font-weight: 800;
      cursor: pointer;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    th {
      text-align: left;
      padding: 15px;
      color: #666;
      font-size: 0.85rem;
      border-bottom: 1px solid #eee;
    }
    td {
      padding: 15px;
      border-bottom: 1px solid #f9f9f9;
    }
    .prod-img {
      width: 50px;
      height: 50px;
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      cursor: zoom-in;

      .img-hover-hint {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        opacity: 0;
        transition: 0.2s;
      }
      &:hover .img-hover-hint {
        opacity: 1;
      }
    }
    .sold-text {
      color: #8b2626;
      font-weight: 700;
    }
    .action-btn {
      background: #f0f0f0;
      border: none;
      padding: 8px 12px;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
    }
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-content {
    background: white;
    width: 90%;
    max-width: 500px;
    padding: 40px;
    border-radius: 30px;

    h3 {
      margin-bottom: 25px;
      color: #1a2a3a;
      font-weight: 900;
      font-size: 1.5rem;
    }

    .input-group {
      margin-bottom: 20px;
      label {
        display: block;
        font-size: 0.85rem;
        font-weight: 700;
        color: #666;
        margin-bottom: 8px;
      }
      input {
        width: 100%;
        padding: 12px;
        border: 2px solid #eee;
        border-radius: 12px;
        font-size: 1rem;
      }
    }

    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

    .modal-actions {
      display: flex;
      gap: 15px;
      margin-top: 30px;
      button {
        flex: 1;
        padding: 14px;
        border-radius: 15px;
        font-weight: 800;
        cursor: pointer;
        border: none;
      }
      .cancel {
        background: #f5f5f5;
        color: #666;
      }
      .save {
        background: #1a2a3a;
        color: white;
      }
    }
  }
`;
