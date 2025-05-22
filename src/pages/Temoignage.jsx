import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/autoplay";
// import "swiper/css/pagination";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Enregistrer le plugin ScrollTrigger auprès de GSAP
gsap.registerPlugin(ScrollTrigger);

const Temoignage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Refs pour l'animation
  const sectionRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const swiperRef = useRef(null);
  const lavigationRef = useRef(null);

  // Données des témoignages
  const testimonials = [
    {
      name: "Jean Dupont",
      title: "PDG, Entreprise X",
      message:
        "Ce service a transformé notre entreprise. Une équipe réactive et des résultats concrets.",
      image: "/pexel2.jpg",
    },
    {
      name: "Marie Claire",
      title: "Responsable RH",
      message:
        "Nous avons vu une nette amélioration de notre visibilité en ligne grâce à eux.",
      image: "/pexel2.jpg",
    },
    {
      name: "Ahmed Ben Ali",
      title: "Directeur Marketing",
      message:
        "Leur professionnalisme et créativité sont remarquables. Je recommande vivement.",
      image: "/pexel2.jpg",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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

  const playAnimation = () => {
    if (!sectionRef.current || isAnimated) return;

    // Configuration initiale : masquer tous les éléments
    gsap.set([leftPanelRef.current, rightPanelRef.current], {
      opacity: 0,
    });

    gsap.set(titleRef.current, {
      y: -30,
      opacity: 0,
    });

    gsap.set(paragraphRef.current, {
      y: 20,
      opacity: 0,
    });

    gsap.set(swiperRef.current, {
      x: 50,
      opacity: 0,
    });

    gsap.set(lavigationRef.current, {
      y: 20,
      opacity: 0,
    });

    // Animation principale
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
        duration: 0.6,
      },
    });

    // Phase 1: Left Panel (titre + paragraphe)
    tl.to(leftPanelRef.current, {
      opacity: 1,
      duration: 0.3,
    })
      .to(
        titleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.2)",
        },
        "-=0.1"
      )
      .to(
        paragraphRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
        },
        "-=0.2"
      );

    // Phase 2: Right Panel (container)
    tl.to(
      rightPanelRef.current,
      {
        opacity: 1,
        duration: 0.3,
      },
      "-=0.2"
    ).to(
      swiperRef.current,
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.1"
    );

    // Phase 3: Éléments des slides (animation des cartes visibles)
    tl.call(
      () => {
        // Animer les slides visibles avec un délai
        const visibleSlides =
          sectionRef.current.querySelectorAll(".swiper-slide");

        visibleSlides.forEach((slide, index) => {
          const card = slide.querySelector(".testimonial-card");
          const image = slide.querySelector(".img");
          const name = slide.querySelector(".name");
          const title = slide.querySelector(".title");
          const message = slide.querySelector(".message");
          const circle = slide.querySelector(".circle");

          if (card) {
            // Configuration initiale pour chaque slide
            gsap.set([image, name, title, message, circle], {
              opacity: 0,
            });

            gsap.set(image, { scale: 0, rotation: -10 });
            gsap.set([name, title], { y: 15 });
            gsap.set(message, { y: 20 });
            gsap.set(circle, { scale: 0 });

            // Animation de chaque slide
            const slideTl = gsap.timeline({ delay: index * 0.1 });

            slideTl
              .to(image, {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.4,
                ease: "back.out(1.3)",
              })
              .to(
                [name, title],
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.3,
                  stagger: 0.05,
                },
                "-=0.2"
              )
              .to(
                message,
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.4,
                },
                "-=0.1"
              )
              .to(
                circle,
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.3,
                  ease: "back.out(1.2)",
                },
                "-=0.3"
              );
          }
        });
      },
      null,
      0.2
    );

    // Phase 4: Boutons de navigation
    tl.to(
      lavigationRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
      },
      "-=0.3"
    );

    return tl;
  };

  return (
    <div className="testimonials-section" id="temoignage" ref={sectionRef}>
      <div className="left-panel" ref={leftPanelRef}>
        <h2 ref={titleRef}>Témoignages</h2>
        <p ref={paragraphRef}>
          Ils nous ont fait confiance et partagent leur expérience. Découvrez ce
          qu'ils pensent de notre service.
        </p>
      </div>

      <div className="right-panel" ref={rightPanelRef}>
        <div ref={swiperRef}>
          <Swiper
            direction={isMobile ? "horizontal" : "vertical"}
            loop={true}
            slidesPerView={isMobile ? 1 : 2}
            centeredSlides={true}
            spaceBetween={20}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            modules={[Autoplay, Navigation, Pagination]}
            className="testimonials-swiper"
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-card">
                  <div className="testimonial-contents">
                    <div className="quote-icon">
                      <div className="img">
                        <img src={t.image} alt={`Photo de ${t.name}`} />
                      </div>
                    </div>
                    <div className="testimonial-content">
                      <section>
                        <h4 className="name">{t.name},</h4>
                        <span className="title">{t.title}</span>
                      </section>
                      <p className="message">"{t.message}"</p>
                    </div>
                  </div>
                  <div className="circle"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Boutons de navigation personnalisés */}
        <div className="navigation-buttons" ref={lavigationRef}>
          <button className="swiper-button-prev">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="swiper-button-next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Temoignage;
