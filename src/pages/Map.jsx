import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Map() {
  // Références pour les éléments à animer
  const titleRef = useRef(null);
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const mapRef = useRef(null);
  const circleRef = useRef(null);
  const icon1Ref = useRef(null);
  const icon2Ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Cacher tous les éléments au départ
      gsap.set(titleRef.current, {
        opacity: 0,
        y: -30
      });

      gsap.set(textRef.current, {
        opacity: 0,
        y: -20
      });

      gsap.set(mapRef.current, {
        opacity: 0,
        scale: 0.8
      });

      gsap.set(circleRef.current, {
        opacity: 0,
        scale: 0.2
      });

      gsap.set(icon1Ref.current, {
        opacity: 0,
        y: 200,
        rotation: -30
      });

      gsap.set(icon2Ref.current, {
        opacity: 0,
        scale: 0.8
      });

      // 2. Animation du titre
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
        },
        once: true
      });

      // 3. Animation du texte
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.to(textRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out"
          });
        },
        once: true
      });

      // 4. Animation de la carte
      ScrollTrigger.create({
        trigger: mapRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(mapRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power1.out"
          });
        },
        once: true
      });

      // 5. Animation du cercle décoratif
      ScrollTrigger.create({
        trigger: circleRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(circleRef.current, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "bounce.out"
          });
        },
        once: true
      });

      // 6. Animation des icônes
      ScrollTrigger.create({
        trigger: icon1Ref.current,
        start: "top 85%",
        onEnter: () => {
          const tl = gsap.timeline();

          tl.to(icon1Ref.current, {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 1.2,
            ease: "bounce.out"
          });

          tl.to(icon2Ref.current, {
            opacity: 0.5,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          }, "-=0.3");

          // Animation flottante continue pour icon1
          tl.to(icon1Ref.current, {
            y: "+=10",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        },
        once: true
      });

    }, sectionRef);

    // Gestion du responsive
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="map-container" id="map" ref={sectionRef}>
        <div className="descript-cont">
          {isMobile ? (
            <p ref={textRef}>
              <span>📍 Adresse</span> GIC BONUS vous accueille à Bafoussam,
              Ouest Cameroun, près de Total d'en haut, descente Akwa vers la
              Terrasse. Facilement accessible.
            </p>
          ) : (
            <p>
              <span>📍 Notre adresse</span> Retrouvez GIC BONUS à Bafoussam,
              région de l'Ouest Cameroun, à la Total d'en haut, descente Akwa,
              en direction de la Terrasse. Un emplacement stratégique pensé pour
              mieux vous servir, entre accessibilité et proximité.
            </p>
          )}
        </div>
        <div className="map-cont">
          <h1 ref={titleRef}>Localisation</h1>
          <div className="card-map">
            <img src="/map.png" alt="" ref={mapRef} />
          </div>
        </div>
        <FontAwesomeIcon icon={faLocationDot} ref={icon1Ref} />
        <FontAwesomeIcon icon={faLocationDot} className="one" ref={icon2Ref} />
        <div className="circle" ref={circleRef}></div>
      </div>
    </>
  );
}