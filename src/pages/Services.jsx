import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Cacher tous les éléments au départ
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set([circleOneRef.current, circleTwoRef.current], {
        opacity: 0,
        scale: 0
      });

      // 2. Cacher les cartes
      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.set(card, {
            opacity: 0,
            y: 60,
            scale: 0.8
          });

          gsap.set(iconRefs.current[index], {
            opacity: 0,
            scale: 0,
            rotation: -180
          });

          // Cacher les éléments internes
          const features = card.querySelectorAll(".feature-item");
          const button = card.querySelector(".service-button");
          const circleEl = card.querySelector(".circle-1");

          gsap.set(features, { opacity: 0, x: -30 });
          gsap.set(button, { opacity: 0, y: 20 });
          gsap.set(circleEl, { scale: 0, opacity: 0 });
        }
      });

      // 3. Animation du titre et sous-titre
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          });

          gsap.to(subtitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: "power2.out"
          });
        },
        once: true
      });

      // 4. Animation des cercles décoratifs
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to([circleOneRef.current, circleTwoRef.current], {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "back.out(1.5)",
            stagger: 0.2
          });
        },
        once: true
      });

      // 5. Animation des cartes individuelles
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          onEnter: () => {
            const tl = gsap.timeline();

            // Animation de la carte
            tl.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.3)"
            });

            // Animation de l'icône
            tl.to(iconRefs.current[index], {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.5,
              ease: "back.out(1.5)"
            }, "-=0.3");

            // Animation des éléments internes
            const features = card.querySelectorAll(".feature-item");
            const button = card.querySelector(".service-button");
            const circleEl = card.querySelector(".circle-1");

            tl.to(features, {
              opacity: 1,
              x: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: "power2.out"
            }, "-=0.2");

            tl.to(button, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out"
            }, "-=0.2");

            tl.to(circleEl, {
              opacity: 0.1,
              scale: 1,
              duration: 0.5,
              ease: "power2.out"
            }, "-=0.4");

            // Animation flottante de l'icône
            gsap.to(iconRefs.current[index], {
              y: "+=8",
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 1
            });
          },
          once: true
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

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