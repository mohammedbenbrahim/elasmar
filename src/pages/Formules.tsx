import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ReservationModal from "@/components/ReservationModal";
import { Check } from "lucide-react";

const formules = [
  {
    icon: "💎",
    name: "Formule Silver",
    features: ["Salle", "Tables décorées", "Menu standard", "Service inclus"],
    price: "Sur demande",
  },
  {
    icon: "🥇",
    name: "Formule Gold",
    features: ["Salle premium", "Décoration complète", "Menu amélioré", "Animation basique"],
    price: "Sur demande",
    popular: true,
  },
  {
    icon: "👑",
    name: "Formule Prestige",
    features: ["Salle VIP", "Décoration luxe personnalisée", "Menu gastronomique", "Animation + DJ"],
    price: "Sur demande",
  },
];

const Formules = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-warm-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-serif text-4xl lg:text-5xl text-foreground text-center mb-2">Nos Formules</h1>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
          <p className="text-center text-muted-foreground max-w-lg mx-auto mb-16">
            Choisissez la formule qui correspond à vos envies pour un événement parfait.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {formules.map((f, i) => (
              <div
                key={i}
                className={`relative rounded-xl p-8 bg-cream shadow-card transition-all duration-500 hover:shadow-elegant hover:-translate-y-2 border-2 ${
                  f.popular ? "border-gold" : "border-transparent hover:border-gold"
                }`}
              >
                {f.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-warm-white text-xs font-semibold px-4 py-1 rounded-full tracking-wide">
                    POPULAIRE
                  </span>
                )}
                <div className="text-4xl text-center mb-4">{f.icon}</div>
                <h3 className="font-serif text-xl text-center text-foreground mb-6">{f.name}</h3>
                <ul className="space-y-3 mb-8">
                  {f.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check size={16} className="text-gold flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <p className="text-center font-serif text-lg text-gold mb-6">{f.price}</p>
                <Button
                  variant="gold-outline"
                  className="w-full"
                  onClick={() => setModalOpen(true)}
                >
                  Réserver cette formule
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ReservationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Formules;
