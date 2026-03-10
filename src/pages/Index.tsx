import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Sparkles, HeadphonesIcon, Car } from "lucide-react";

import heroImg from "@/assets/hero-wedding.jpg";
import galleryTables from "@/assets/gallery-tables.jpg";
import galleryStage from "@/assets/gallery-stage.jpg";
import galleryLighting from "@/assets/gallery-lighting.jpg";
import galleryFlowers from "@/assets/gallery-flowers.jpg";
import galleryHall from "@/assets/gallery-hall.jpg";

const galleryImages = [
  { src: galleryTables, alt: "Tables décorées" },
  { src: galleryStage, alt: "Scène des mariés" },
  { src: galleryLighting, alt: "Éclairage" },
  { src: galleryFlowers, alt: "Décoration florale" },
  { src: galleryHall, alt: "Vue d'ensemble" },
];

const features = [
  { icon: Users, title: "Grande capacité", desc: "Accueillez tous vos invités dans un espace majestueux." },
  { icon: Sparkles, title: "Décoration luxueuse", desc: "Un cadre raffiné avec des finitions haut de gamme." },
  { icon: HeadphonesIcon, title: "Service professionnel", desc: "Une équipe dédiée pour un événement sans souci." },
  { icon: Car, title: "Parking disponible", desc: "Stationnement spacieux pour tous vos invités." },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Salle des Fêtes Elasmar Fouad" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-warm-white mb-4 tracking-wide">
            Salle des Fêtes<br />Elasmar Fouad
          </h1>
          <p className="text-warm-white/80 text-lg sm:text-xl font-light mb-8 max-w-xl mx-auto">
            L'élégance pour vos moments inoubliables
          </p>
          <Button variant="hero" size="xl" onClick={() => navigate("/reserve")}>
            Réserver
          </Button>
        </div>
      </section>

      {/* About */}
      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-2">Notre Salle</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-8" />
          <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
            Avec une grande capacité d'accueil et une décoration luxueuse, la Salle des Fêtes Elasmar Fouad
            est l'endroit idéal pour célébrer vos mariages, fiançailles et événements spéciaux. Notre équipe
            professionnelle veille à chaque détail pour faire de votre journée un souvenir inoubliable.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground text-center mb-2">Galerie</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-lg shadow-card group ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground text-center mb-2">Pourquoi Nous Choisir</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-lg bg-cream shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="text-gold" size={24} />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-charcoal text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl lg:text-4xl text-warm-white mb-4">
            Réservez votre date dès maintenant
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-8" />
          <Button variant="gold" size="xl" onClick={() => navigate("/reserve")}>
            Réserver
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
