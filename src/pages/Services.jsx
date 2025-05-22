import React, { useEffect, useRef, useState } from "react";
import { FaLaptop, FaCopy, FaGraduationCap } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Vente d'Équipement Informatique",
    description:
      "Nous proposons une large gamme d'équipements informatiques de qualité pour répondre à tous vos besoins professionnels et personnels.",
    icon: <FaLaptop />,
    features: [
      "Ordinateurs de bureau et portables",
      "Périphériques et accessoires",
      "Solutions réseau et serveurs",
      "Maintenance et support technique",
    ],
  },
  {
    id: 2,
    title: "Secrétariat Bureautique",
    description:
      "Services bureautiques complets pour vous accompagner dans vos tâches administratives quotidiennes.",
    icon: <FaCopy />,
    features: [
      "Photocopie et numérisation de documents",
      "Saisie et mise en page de documents",
      "Impression couleur et noir et blanc",
      "Reliure et plastification",
    ],
  },
  {
    id: 3,
    title: "Formation en Informatique",
    description:
      "Des formations adaptées à tous les niveaux pour maîtriser les outils informatiques essentiels dans votre vie professionnelle.",
    icon: <FaGraduationCap />,
    features: [
      "Bureautique (Word, Excel, PowerPoint)",
      "Conception graphique et web",
      "Programmation et développement",
      "Administration système et réseau",
    ],
  },
];

const Services = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRefs = useRef([]);
  const iconRefs = useRef([]);
  const circleOneRef = useRef(null);
  const circleTwoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
          playAnimation();
          observer.disconnect();
        }
      },
      {
        threshold: 0.3, // Réduit pour déclencher plus tôt
        rootMargin: "50px", // Marge pour anticiper l'entrée
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  const playAnimation = () => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power2.out", // Ease par défaut plus rapide
          duration: 0.4, // Durée par défaut réduite
        },
      });

      // Phase 1: Titre + sous-titre (parallèle)
      tl.from(titleRef.current, {
        y: -20, // Mouvement réduit
        opacity: 0,
        duration: 0.5,
      }).from(
        subtitleRef.current,
        {
          y: 15, // Mouvement réduit
          opacity: 0,
          duration: 0.4,
        },
        "-=0.3"
      ); // Chevauchement augmenté

      // Phase 2: Cercles décoratifs (en parallèle)
      tl.from(
        [circleOneRef.current, circleTwoRef.current],
        {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.5)", // Moins élastique, plus rapide
          stagger: 0.1, // Décalage minimal
        },
        "-=0.2"
      );

      // Phase 3: Cartes (animation groupée optimisée)
      const allCards = cardRefs.current;
      const allIcons = iconRefs.current;

      // Animation des cartes en groupe
      tl.from(
        allCards,
        {
          y: 30, // Mouvement réduit
          opacity: 0,
          duration: 0.5,
          stagger: 0.08, // Stagger plus rapide
          ease: "back.out(1.2)",
        },
        "-=0.2"
      );

      // Animation des icônes en parallèle
      tl.from(
        allIcons.filter(Boolean),
        {
          scale: 0,
          opacity: 0,
          rotation: -45, // Rotation réduite
          duration: 0.4,
          stagger: 0.06,
          ease: "back.out(1.3)",
        },
        "-=0.4"
      );

      // Phase 4: Éléments internes (optimisé)
      allCards.forEach((card, index) => {
        if (!card) return;

        const features = card.querySelectorAll(".feature-item");
        const button = card.querySelector(".service-button");
        const circleEl = card.querySelector(".circle-1");

        // Timeline pour chaque carte (en parallèle)
        const cardTl = gsap.timeline();

        // Cercle décoratif
        if (circleEl) {
          cardTl.from(
            circleEl,
            {
              scale: 0,
              opacity: 0.6,
              duration: 0.3,
              ease: "power2.out",
            },
            0
          );
        }

        // Features et bouton ensemble
        cardTl
          .from(
            features,
            {
              x: -15, // Mouvement réduit
              opacity: 0,
              stagger: 0.05, // Stagger très rapide
              duration: 0.3,
            },
            0.1
          )
          .from(
            button,
            {
              y: 10, // Mouvement réduit
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            },
            0.15
          );

        // Ajouter à la timeline principale avec stagger
        tl.add(cardTl, `-=${0.3 - index * 0.05}`);
      });

      // Phase 5: Animations continues (optimisées)
      // Animation flottante des icônes (démarrage immédiat)
      allIcons.forEach((icon, index) => {
        if (icon) {
          gsap.to(icon, {
            y: "+=6", // Mouvement réduit
            duration: 1.2 + index * 0.1, // Durée réduite
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.5 + index * 0.1, // Délai initial
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  };

  // Version alternative encore plus rapide
  const playAnimationTurbo = () => {
    const ctx = gsap.context(() => {
      // Configuration globale pour la vitesse
      gsap.set([titleRef.current, subtitleRef.current, ...cardRefs.current], {
        opacity: 0,
      });

      const masterTl = gsap.timeline({
        defaults: {
          duration: 0.3,
          ease: "power2.out",
        },
      });

      // Groupe 1: Headers (simultané)
      masterTl.to([titleRef.current, subtitleRef.current], {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out",
      });

      // Groupe 2: Tout le reste (quasi-simultané)
      masterTl
        .to(
          cardRefs.current,
          {
            opacity: 1,
            y: 0,
            stagger: 0.03, // Très rapide
            duration: 0.35,
            ease: "back.out(1.1)",
          },
          0.2
        )
        .to(
          iconRefs.current.filter(Boolean),
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            stagger: 0.02,
            duration: 0.3,
            ease: "back.out(1.2)",
          },
          0.25
        );

      // Cercles décoratifs
      masterTl.to(
        [circleOneRef.current, circleTwoRef.current],
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.3)",
        },
        0.1
      );

      // Éléments internes (rapide)
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const features = card.querySelectorAll(".feature-item");
        const button = card.querySelector(".service-button");
        const circleEl = card.querySelector(".circle-1");

        const delay = 0.3 + index * 0.02;

        if (features.length) {
          gsap.from(features, {
            opacity: 0,
            x: -10,
            stagger: 0.02,
            duration: 0.25,
            delay: delay,
          });
        }

        if (button) {
          gsap.from(button, {
            // opacity: 0,
            y: 8,
            duration: 0.25,
            delay: delay + 0.05,
          });
        }

        if (circleEl) {
          gsap.from(circleEl, {
            scale: 0,
            opacity: 1,
            duration: 0.2,
            delay: delay,
          });
        }
      });

      // Animations continues (démarrage rapide)
      iconRefs.current.forEach((icon, index) => {
        if (icon) {
          gsap.to(icon, {
            y: "+=5",
            duration: 1 + index * 0.05,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.3,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  };
  return (
    <section className="services-section" ref={sectionRef} id="services">
      <div className="container">
        <h2 className="section-title" ref={titleRef}>
          Nos Services
        </h2>
        <p className="section-subtitle" ref={subtitleRef}>
          Des solutions adaptées à vos besoins
        </p>

        <div className="services-grid">
          {services.map((service, i) => (
            <div
              className="service-card"
              key={service.id}
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <div className="container-blur">
                <div className="service-header">
                  <div
                    className="icon-wrapper"
                    ref={(el) => (iconRefs.current[i] = el)}
                  >
                    {service.icon}
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                </div>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, j) => (
                    <li key={j} className="feature-item">
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="service-button">En savoir plus</button>
              </div>
              <div className="circle-1"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="circle one" ref={circleOneRef}></div>
      <div className="circle two" ref={circleTwoRef}></div>
    </section>
  );
};

export default Services;
