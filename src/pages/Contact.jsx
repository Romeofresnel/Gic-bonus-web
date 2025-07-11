import {
  faFacebook,
  faInstagram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Mail, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Form from "../components/Form";
import Portal from "../components/Portal";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  // Références pour les éléments à animer
  const [aff, setAff] = useState(false)
  const mailIconRef = useRef(null);
  const contactTextRef = useRef(null);
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const socialMediaRef = useRef(null);
  const securityRef = useRef(null);
  const navigationRef = useRef(null);
  const logoSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Cacher tous les éléments au départ
      gsap.set([mailIconRef.current, contactTextRef.current], {
        opacity: 0,
        scale: 0,
        y: 50
      });

      gsap.set(formRef.current, {
        opacity: 0,
        y: 50
      });

      gsap.set(logoSectionRef.current, {
        opacity: 0,
        y: 30
      });

      gsap.set([navigationRef.current, securityRef.current, socialMediaRef.current], {
        opacity: 0,
        x: -30
      });

      // Cacher les liens sociaux
      const socialLinks = socialMediaRef.current?.querySelectorAll("a");
      if (socialLinks) {
        gsap.set(socialLinks, {
          opacity: 0,
          x: -20
        });
      }

      // 2. Animation principale déclenchée par ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          const tl = gsap.timeline();

          // 1. Animation de l'icône Mail - apparaît en premier
          tl.to(mailIconRef.current, {
            opacity: 1,
            scale: 1,
            y: 10,
            duration: 0.8,
            ease: "back.out(1.7)",
          });

          // 2. Animation du texte "Contactez-nous" - sort de l'icône
          tl.to(contactTextRef.current, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          }, "-=0.4");

          // 3. Animation du formulaire
          tl.to(formRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power1.out",
          }, "-=0.2");

          // 4. Animation du logo et du texte descriptif
          tl.to(logoSectionRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          }, "-=0.3");

          // 5. Animation des nav-footer - en séquence
          tl.to(navigationRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power1.out",
          }, "-=0.2");

          tl.to(securityRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power1.out",
          }, "-=0.3");

          tl.to(socialMediaRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power1.out",
          }, "-=0.3");

          // Animation des liens sociaux avec un délai entre chaque
          if (socialLinks) {
            tl.to(socialLinks, {
              opacity: 1,
              x: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: "power1.out",
            }, "-=0.2");
          }
        },
        once: true
      });

      // Animation flottante pour l'icône mail
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(mailIconRef.current, {
            y: "+=5",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.5
          });
        },
        once: true
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);
  function handleClose() {
    setAff(false);
    formRef.current.reset(); // Réinitialiser le formulaire si nécessaire
  }
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
                <a href="https://wa.me/237620661852?text=Bonjour%20je%20souhaite%20plus%20d'informations" target="_blank">
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
        <div className="mobile">
          <div className="sec">
            <p>© {new Date().getFullYear()} GIC BONUS. Tous droits réservés.</p>
          </div>
          <div className="liens">
            <ul>
              <a href="#accueil">Acceuil</a>
              <a href="#propos">A Propos</a>
              <a href="#services">Nos services</a>
              <a href="#temoignage">Temoignage</a>
              <a href="#map">Localisation</a>
              <a onClick={() => setAff(true)}>Contact</a>
            </ul>
          </div>
        </div>
        {aff && <Form aff={handleClose} formRef={formRef} />}
      </footer>
    </>
  );
}