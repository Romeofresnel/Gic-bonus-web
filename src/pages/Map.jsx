import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Map() {
  // Références pour les éléments à animer
  const titleRef = useRef(null);
  const sectionRef = useRef(null);

  const textRef = useRef(null);
  const mapRef = useRef(null);
  const circleRef = useRef(null);
  const icon1Ref = useRef(null);
  const icon2Ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
          playAnimation(); // <--- l'animation commence ici
          observer.disconnect();
        }
      },
      {
        threshold: 0.4,
        rootMargin: "0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [isVisible]);

  // Fonction séparée pour la timeline GSAP
  const playAnimation = () => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "-=0.3"
    );

    tl.fromTo(
      mapRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power1.out" }
    );

    tl.fromTo(
      circleRef.current,
      { opacity: 0, scale: 0.2 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "bounce.out",
      }
    );

    tl.fromTo(
      icon1Ref.current,
      { y: 200, opacity: 0, rotate: -30 },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        ease: "bounce.out",
        duration: 1.2,
      }
    );

    tl.fromTo(
      icon2Ref.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 0.5, scale: 1, duration: 0.5 },
      "-=0.3"
    );
  };

  return (
    <>
      <div className="map-container" id="map" ref={sectionRef}>
        <div className="descript-cont">
          {isMobile ? (
            <p>
              <span>📍 Adresse</span> GIC BONUS vous accueille à Bafoussam,
              Ouest Cameroun, près de Total d’en haut, descente Akwa vers la
              Terrasse. Facilement accessible.
            </p>
          ) : (
            <p ref={textRef}>
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
