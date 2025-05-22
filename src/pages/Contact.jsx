import {
  faFacebook,
  faInstagram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Mail, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Contact() {
  // Références pour les éléments à animer
  const mailIconRef = useRef(null);
  const contactTextRef = useRef(null);
  const formRef = useRef(null);
  const navFootherRef = useRef(null);
  const sectionRef = useRef(null);
  const socialMediaRef = useRef(null);
  const securityRef = useRef(null);
  const navigationRef = useRef(null);
  const logoSectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  const playAnimation = () => {
    // Créer une timeline GSAP
    const tl = gsap.timeline();

    // 1. Animation de l'icône Mail - apparaît en premier
    tl.fromTo(
      mailIconRef.current,
      {
        opacity: 0,
        scale: 0,
        // rotate: -180,
        y: 50,
      },
      {
        opacity: 1,
        scale: 1,
        // rotate: 0,
        y: 10,
        duration: 0.8,
        ease: "back.out(1.7)",
      }
    );

    // 2. Animation du texte "Contactez-nous" - sort de l'icône
    tl.fromTo(
      contactTextRef.current,
      {
        opacity: 0,
        scale: 0,
        // width: 0,
      },
      {
        opacity: 1,
        scale: 1,
        // width: "auto",
        duration: 0.7,
        ease: "power2.out",
      }
    );

    // 3. Animation du formulaire
    tl.fromTo(
      formRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power1.out",
      }
    );

    // 4. Animation du logo et du texte descriptif
    tl.fromTo(
      logoSectionRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      }
    );

    // 5. Animation des nav-foother - en séquence
    tl.fromTo(
      navigationRef.current,
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power1.out",
      }
    );

    tl.fromTo(
      securityRef.current,
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power1.out",
      },
      "-=0.3" // commence légèrement avant la fin de l'animation précédente
    );

    tl.fromTo(
      socialMediaRef.current,
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power1.out",
      },
      "-=0.3" // commence légèrement avant la fin de l'animation précédente
    );

    // Animation des liens sociaux avec un délai entre chaque
    const socialLinks = socialMediaRef.current.querySelectorAll("a");
    tl.fromTo(
      socialLinks,
      {
        opacity: 0,
        x: -20,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.1, // décalage entre chaque élément
        ease: "power1.out",
      }
    );

    // Nettoyer la timeline lors du démontage du composant
    return () => {
      tl.kill();
    };
  };

  return (
    <>
      <footer className="conctact-container" id="contact" ref={sectionRef}>
        <div className="contact-us">
          <div className="glass-form">
            <h2>
              <span ref={mailIconRef}>
                <Mail />
              </span>
              <span ref={contactTextRef}>Contactez-nous</span>
            </h2>
            <form ref={formRef}>
              <input type="text" placeholder="Nom complet" />
              <input type="email" placeholder="Adresse e-mail" />
              <textarea placeholder="Votre message"></textarea>
              <button type="submit">Envoyer</button>
            </form>
          </div>
          <div className="sec">
            <p>© {new Date().getFullYear()} GIC BONUS. Tous droits réservés.</p>
          </div>
        </div>
        <div className="foother-gic">
          <div className="nav-foothers" ref={logoSectionRef}>
            <img src="/gic.jpg" alt="logo" />
            <p>
              La qualité et la performence a portée de main ! Gic-Bonus est la
              pour vous
            </p>
          </div>
          <div className="body-foother">
            <div className="nav-foother" ref={navigationRef}>
              <h4>Navigation</h4>
              <hr />

              <ul>
                <a href="#accueil">Acceuil</a>
                <a href="#propos">A Propos</a>
                <a href="#services">Nos services</a>
                <a href="#temoignage">Temoignage</a>
                <a href="#map">Localisation</a>
                <a href="#contact">Contact</a>
              </ul>
            </div>
            <div className="nav-foother" ref={securityRef}>
              <h4>Security</h4>
              <hr />
              <ul>
                <li>Privacy Policy</li>
                <li>User Agreement</li>
                <li>Copyright</li>
              </ul>
            </div>
            <div className="nav-foother" ref={socialMediaRef}>
              <h4>Social Media</h4>
              <hr />

              <ul>
                <a href="#">
                  <FontAwesomeIcon icon={faWhatsapp} />
                  <span>Whatsapp</span>
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faInstagram} />
                  <span>Instagram</span>
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faFacebook} />
                  <span>Facebook</span>
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faTwitter} />
                  <span>Twitter</span>
                </a>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
