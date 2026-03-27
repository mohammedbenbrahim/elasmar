import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
    features: [
      "Salle premium",
      "Décoration complète",
      "Menu amélioré",
      "Animation basique",
    ],
    price: "Sur demande",
    popular: true,
  },
  {
    icon: "👑",
    name: "Formule Prestige",
    features: [
      "Salle VIP",
      "Décoration luxe personnalisée",
      "Menu gastronomique",
      "Animation + DJ",
    ],
    price: "Sur demande",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const Formules = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-warm-white overflow-x-hidden">
      <Header />

      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-cream via-warm-white to-cream overflow-hidden">
        <motion.div
          className="absolute top-16 left-[-70px] h-56 w-56 rounded-full bg-gold/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-[-90px] h-72 w-72 rounded-full bg-charcoal/5 blur-3xl"
          animate={{ scale: [1.08, 1, 1.08], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-sm text-gold mb-5"
            >
              <Sparkles size={16} />
              Nos offres élégantes
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-4xl lg:text-6xl text-foreground text-center mb-4 leading-tight"
            >
              Nos Formules
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="w-16 h-0.5 bg-gold mx-auto mb-5"
            />

            <motion.p
              variants={fadeUp}
              className="text-center text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg leading-relaxed"
            >
              Choisissez la formule qui correspond à vos envies pour créer un
              événement raffiné, mémorable et parfaitement adapté à vos attentes.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {formules.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -10, scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-3xl p-8 bg-white/70 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.08)] transition-all duration-500 border overflow-hidden ${
                  f.popular
                    ? "border-gold ring-2 ring-gold/15"
                    : "border-white/60 hover:border-gold/30"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
                <motion.div
                  className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gold/10 blur-2xl"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />

                {f.popular && (
                  <motion.span
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-5 right-5 bg-gold text-warm-white text-[11px] font-semibold px-3 py-1.5 rounded-full tracking-[0.2em]"
                  >
                    POPULAIRE
                  </motion.span>
                )}

                <div className="relative z-10">
                  <motion.div
                    className="text-5xl text-center mb-5"
                    whileHover={{ scale: 1.15, rotate: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    {f.icon}
                  </motion.div>

                  <h3 className="font-serif text-2xl text-center text-foreground mb-2">
                    {f.name}
                  </h3>

                  <p className="text-center font-serif text-lg text-gold mb-8">
                    {f.price}
                  </p>

                  <ul className="space-y-4 mb-8">
                    {f.features.map((feat, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: j * 0.06 }}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/10 text-gold flex-shrink-0">
                          <Check size={14} />
                        </span>
                        {feat}
                      </motion.li>
                    ))}
                  </ul>

                  <Button
                    variant="gold-outline"
                    className="w-full group rounded-xl h-12 text-sm"
                    onClick={() =>
                      navigate("/reserve", { state: { formule: f.name } })
                    }
                  >
                    Réserver cette formule
                    <ArrowRight
                      size={16}
                      className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Formules;