import React from "react";

export default function Menus({ aff }) {
  return (
    <>
      <div className="menu-container" onClick={(e) => e.target === e.currentTarget && aff() && e.stopPropagation()}>
        <div className="link">
          <ul >
            <a href="#accueil" onClick={(e) => e.target === e.currentTarget && aff() && e.stopPropagation()}>Acceuil</a>
            <a href="#propos" onClick={(e) => e.target === e.currentTarget && aff() && e.stopPropagation()}>A propos</a>
            <a href="#services" onClick={(e) => e.target === e.currentTarget && aff() && e.stopPropagation()}>Nos Services</a>
            <a href="#temoignage" onClick={(e) => e.target === e.currentTarget && aff() && e.stopPropagation()}>Temoignage</a>
            <a href="#map" onClick={(e) => e.target === e.currentTarget && aff() && e.stopPropagation()}>Localisation</a>
            <a href="#contact" id="con" onClick={(e) => e.target === e.currentTarget && aff() && e.stopPropagation()}>
              Contact
            </a>
          </ul>
        </div>
      </div>
    </>
  );
}
