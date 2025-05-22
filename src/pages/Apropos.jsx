import React, { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";
import { gsap } from "gsap";

export default function Apropos() {
  // Créer des références pour les éléments à animer
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  const circle3Ref = useRef(null);

  // État pour suivre si la section est visible
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
          playAnimation();
          observer.disconnect(); // Stopper l'observation pour éviter de rejouer
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect(); // Nettoyage au démontage
    };
  }, [isVisible]);

  // Fonction pour jouer les animations
  const playAnimation = () => {
    // Créer une timeline GSAP pour séquencer les animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Animation du titre
    tl.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    );

    // 2. Animation de l'image
    tl.fromTo(
      imageRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      "-=0.3" // Commencer légèrement avant la fin de l'animation précédente
    );

    // 3. Animation du texte
    tl.fromTo(
      textRef.current.querySelectorAll("h3, p"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
      "-=0.3"
    );

    // 4. Animation du bouton
    tl.fromTo(
      buttonRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.2"
    );

    // 5. Animation des cercles avec léger rebond
    tl.fromTo(
      [circle1Ref.current, circle2Ref.current, circle3Ref.current],
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "bounce.out", // Effet de rebond
      },
      "-=0.2"
    );
  };

  return (
    <>
      <div className="apropos-page-container" id="propos" ref={sectionRef}>
        <div className="apropos-page-content">
          <div className="container-img" ref={imageRef}>
            <img src="/pexel5.jpg" alt="social" />
          </div>
          <div className="apropos-text" ref={textRef}>
            <h1 ref={titleRef}>À propos</h1>
            <h3>Depuis 2012, GIC BONUS rapproche la technologie des hommes.</h3>
            <p>
              Nous proposons des équipements informatiques de qualité et des
              formations certifiantes en informatique et bureautique. Notre
              mission : transmettre le savoir, accompagner les parcours, et
              bâtir l’avenir aux côtés de nos clients.
            </p>
            <a href="#" ref={buttonRef}>
              <Info />
              <span>En savoir plus</span>
            </a>
          </div>
        </div>
        <div className="cirle-1" ref={circle1Ref}></div>
        <div className="cirle-2" ref={circle2Ref}></div>
        <div className="cirle-3" ref={circle3Ref}></div>
      </div>
    </>
  );
}
