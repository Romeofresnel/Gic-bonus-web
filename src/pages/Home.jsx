import React, { useEffect, useState, useRef } from "react";
import {
  ArrowUpFromDot,
  BookOpen,
  Briefcase,
  Menu,
  MonitorSmartphone,
  Moon,
  Phone,
  Settings,
  ShoppingCart,
  Sun,
  X,
} from "lucide-react";
import Menus from "../components/Menus";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

// Très important : enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Références pour les animations
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const homeTextRef = useRef(null);
  const btnsRef = useRef(null);
  const circleRef = useRef(null);
  const iconsRef = useRef([]);
  const [menus, setMenus] = useState(false);
  const [theme, setTheme] = useState(() => {
    // Vérifier localStorage en premier
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    // Puis la préférence système
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Appliquer le thème et le sauvegarder
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Initialiser le thème au montage du composant
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const arrow = document.querySelector(".a");
      if (window.scrollY > 500) {
        arrow.style.display = "initial";
      } else {
        arrow.style.display = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effet pour l'animation de navigation au défilement
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top -750px",
      toggleActions: "play none none reverse",
      onEnter: () => {
        gsap.to(navRef.current, {
          backgroundColor: "var(--color-secondary)",
          backdropFilter: "blur(35px)",
          overwrite: "auto", // 🚨 Clé importante pour éviter les conflits
        });
      },
      onLeaveBack: () => {
        gsap.to(navRef.current, {
          backgroundColor: "transparent",
          backdropFilter: "blur(1px)",
          overwrite: "auto",
        });
      },
    });

    return () => {
      trigger.kill(); // Nettoyage sûr
    };
  }, []);

  // Effet pour les animations initiales de la page
  useEffect(() => {
    // Création de la timeline principale
    const tl = gsap.timeline();

    // Animation de la navigation
    tl.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        logoRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.3"
      )
      .fromTo(
        linksRef.current.querySelectorAll("a"),
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power1.out" },
        "-=0.2"
      )

      // Animation du texte principal
      .fromTo(
        homeTextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(
        homeTextRef.current.querySelector("span"),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.3)" },
        "-=0.4"
      )
      .fromTo(
        btnsRef.current.querySelectorAll("a"),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.2,
          ease: "back.out(1.5)",
        },
        "-=0.3"
      )

      // Animation du cercle et des icônes
      .fromTo(
        circleRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.3)" },
        "-=0.2"
      );

    // Animation des icônes avec rotation et mouvement rotatoire
    iconsRef.current.forEach((icon, index) => {
      // Calculer la position initiale hors du cercle
      const angle = index * 90 * (Math.PI / 180); // 90 degrés entre chaque icône
      const radius = 150; // rayon du cercle où sont placées les icônes
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      tl.fromTo(
        icon,
        {
          x: x,
          y: y,
          opacity: 0,
          rotation: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          rotation: 360,
          duration: 0.8,
          ease: "power1.out",
        },
        "-=0.6"
      );

      // Ajouter une animation continue de rotation et mouvement
      gsap.to(icon, {
        rotation: "+=360",
        duration: 8,
        repeat: -1,
        ease: "none",
      });
    });
    return () => {
      // Nettoyer les animations en cas de démontage du composant
      tl.kill();
    };
  }, []);

  // Ajouter des icônes à la référence
  const addToIconsRef = (el) => {
    if (el && !iconsRef.current.includes(el)) {
      iconsRef.current.push(el);
    }
  };

  return (
    <>
      <div className="home-page-container" id="accueil">
        <div className="container">
          <nav ref={navRef}>
            <div className="logo" ref={logoRef}>
              <div className="img-societe">
                <img src="./gic.jpg" alt="logo" />
              </div>
              <h1>Gic Bonus</h1>
            </div>
            <div className="link-nav" ref={linksRef}>
              {menus ? (
                <X
                  onClick={() => {
                    setMenus(false);
                  }}
                />
              ) : (
                <Menu
                  className="menu"
                  onClick={() => {
                    setMenus(true);
                    console.log(<Menus />);
                  }}
                />
              )}
              <div className="link">
                <ul>
                  <a href="#accueil">Acceuil</a>
                  <a href="#propos">A propos</a>
                  <a href="#services">Nos Services</a>
                  <a href="#temoignage">Temoignage</a>
                  <a href="#map">Localisation</a>
                  <a href="#contact">Contact</a>
                </ul>
              </div>
              <div className="mode">
                {theme === "light" ? (
                  <Sun onClick={toggleTheme} className="sun" />
                ) : (
                  <Moon onClick={toggleTheme} />
                )}
              </div>
            </div>
          </nav>
          <div className="home">
            <h1 ref={homeTextRef}>
              Formez, équipez, évoluez : <span>GIC BONUS</span> vous accompagne
              dans la transformation technologique et la montée en compétences.
            </h1>
            <div className="btns" ref={btnsRef}>
              <a href="#">
                <Settings />
                <span>Nos Services</span>
              </a>
              <a href="#">
                <Phone />
                <span>Nous Contacter</span>
              </a>
            </div>
          </div>
          <div className="circle" ref={circleRef}>
            <BookOpen size={70} className="icon one" ref={addToIconsRef} />
            <Briefcase size={70} className="icon two" ref={addToIconsRef} />
            <ShoppingCart
              size={70}
              className="icon trois"
              ref={addToIconsRef}
            />
            <MonitorSmartphone
              size={70}
              className="icon four"
              ref={addToIconsRef}
            />
          </div>
        </div>
        <a href="#accueil" className="a">
          <FontAwesomeIcon icon={faArrowUp} className="arrow" />
        </a>
        {menus === true && (
          <>
            <Menus />
          </>
        )}
      </div>
    </>
  );
}
