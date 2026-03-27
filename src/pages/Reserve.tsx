import { useMemo, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  CalendarIcon,
  User,
  Phone,
  StickyNote,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import salle1Img from "@/assets/salle-1.jpg";
import salle2Img from "@/assets/salle-2.jpg";
import salle3Img from "@/assets/salle-3.jpg";
import formuleSilverImg from "@/assets/formule-silver.jpg";
import formuleGoldImg from "@/assets/formule-gold.jpg";
import formulePrestigeImg from "@/assets/formule-prestige.jpg";

const PHONE_NUMBER = "212677772906";

const salles = [
  {
    id: "1",
    label: "Salle 1",
    maxTables: 24,
    description: "Grande salle luxueuse",
    badge: "🥇",
    image: salle1Img,
  },
  {
    id: "2",
    label: "Salle 2",
    maxTables: 14,
    description: "Salle élégante de taille moyenne",
    badge: "🥈",
    image: salle2Img,
  },
  {
    id: "3",
    label: "Salle 3",
    maxTables: 8,
    description: "Salle intime pour mariages",
    badge: "🥉",
    image: salle3Img,
  },
];

const formules = [
  {
    id: "Silver",
    label: "Formule Silver",
    emoji: "💎",
    description: "Menu de mariage classique",
    image: formuleSilverImg,
  },
  {
    id: "Gold",
    label: "Formule Gold",
    emoji: "🥇",
    description: "Plats premium raffinés",
    image: formuleGoldImg,
  },
  {
    id: "Prestige",
    label: "Formule Prestige",
    emoji: "👑",
    description: "Menu gastronomique de luxe",
    image: formulePrestigeImg,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65 },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const Reserve = () => {
  const [salle, setSalle] = useState("");
  const [date, setDate] = useState<Date>();
  const [tables, setTables] = useState("");
  const [formule, setFormule] = useState("");
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedSalle = useMemo(() => salles.find((s) => s.id === salle), [salle]);
  const maxTables = selectedSalle?.maxTables || 0;

  const validate = () => {
    const e: Record<string, string> = {};

    if (!salle) e.salle = "Veuillez choisir une salle";
    if (!date) e.date = "Veuillez choisir une date";

    if (!tables || Number(tables) < 1) {
      e.tables = "Veuillez indiquer le nombre de tables";
    } else if (salle && Number(tables) > maxTables) {
      e.tables = `Maximum ${maxTables} tables pour ${selectedSalle?.label}`;
    }

    if (!formule) e.formule = "Veuillez choisir une formule";
    if (!nom.trim()) e.nom = "Veuillez entrer votre nom";
    if (!telephone.trim()) e.telephone = "Veuillez entrer votre numéro";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    const message = `Bonjour Salle des Fêtes Elasmar Fouad,

Je souhaite effectuer une réservation avec les informations suivantes :

Salle choisie : ${selectedSalle?.label}
Capacité maximale : ${maxTables} tables
Nombre de tables réservé : ${tables}
Date de l'événement : ${date ? format(date, "dd/MM/yyyy") : ""}
Formule choisie : ${formule}

Nom : ${nom}
Téléphone : ${telephone}
Notes : ${notes || "Aucune"}

Merci de me confirmer la disponibilité.`;

    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  };

  const inputClass =
    "mt-2 w-full rounded-2xl border border-border/70 bg-background/90 px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:border-gold/40 focus:ring-2 focus:ring-gold/20";

  const cardClass =
    "rounded-[28px] border border-white/60 bg-white/75 backdrop-blur-xl p-4 sm:p-5 md:p-7 shadow-[0_20px_80px_rgba(0,0,0,0.06)]";

  return (
    <div className="min-h-screen bg-warm-white overflow-x-hidden">
      <Header />

      <main className="relative pt-24 pb-28 md:pt-28 md:pb-24 lg:pt-32 lg:pb-28">
        <motion.div
          className="absolute top-10 left-[-70px] h-44 w-44 sm:h-56 sm:w-56 rounded-full bg-gold/10 blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-[-70px] h-52 w-52 sm:h-72 sm:w-72 rounded-full bg-charcoal/5 blur-3xl pointer-events-none"
          animate={{ scale: [1.08, 1, 1.08], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 sm:px-5 lg:px-8 max-w-6xl relative z-10">
          <motion.div
            className="text-center mb-10 sm:mb-12 md:mb-14 max-w-3xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs sm:text-sm text-gold mb-4 sm:mb-5"
            >
              <Sparkles size={16} />
              Réservation élégante et rapide
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-3 sm:mb-4 leading-tight"
            >
              Réserver Votre Salle
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed px-1"
            >
              Sélectionnez votre salle, votre formule et la date souhaitée pour nous
              envoyer une demande de réservation claire, rapide et professionnelle.
            </motion.p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8 sm:space-y-10 md:space-y-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Salle */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className={cardClass}
            >
              <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-1">
                🏛 Choisir la Salle
              </h2>
              <p className="text-sm text-muted-foreground mb-5 sm:mb-6">
                Sélectionnez la salle qui correspond à votre événement
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {salles.map((s, index) => (
                  <motion.button
                    key={s.id}
                    type="button"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.07 }}
                    whileHover={{ y: -4 }}
                    onClick={() => {
                      setSalle(s.id);
                      setErrors((p) => ({ ...p, salle: "" }));
                      if (Number(tables) > s.maxTables) setTables(String(s.maxTables));
                    }}
                    className={cn(
                      "group overflow-hidden rounded-3xl border-2 text-left transition-all duration-300 hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)] active:scale-[0.99]",
                      salle === s.id
                        ? "border-gold shadow-[0_18px_50px_rgba(212,175,55,0.16)] ring-2 ring-gold/20"
                        : "border-border hover:border-gold/40",
                      errors.salle && "border-destructive"
                    )}
                  >
                    <div className="relative h-44 sm:h-48 overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.label}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                      <div className="absolute top-3 left-3 rounded-full bg-black/35 backdrop-blur-md px-3 py-1 text-white text-xs">
                        {s.badge} {s.label}
                      </div>

                      {salle === s.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 bg-gold/20 flex items-center justify-center"
                        >
                          <span className="bg-gold text-primary-foreground px-4 py-2 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-2">
                            <CheckCircle2 size={16} /> Sélectionnée
                          </span>
                        </motion.div>
                      )}
                    </div>

                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-serif text-base sm:text-lg text-foreground">
                          {s.label}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {s.description}
                      </p>
                      <p className="text-sm font-semibold text-gold">
                        {s.maxTables} tables maximum
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {errors.salle && (
                <p className="text-xs text-destructive mt-3">{errors.salle}</p>
              )}
            </motion.section>

            {/* Date + Tables */}
            <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8 items-start">
              <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                className={cardClass}
              >
                <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-1">
                  📆 Date de l'Événement
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Choisissez la date souhaitée
                </p>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full justify-start rounded-2xl text-left font-normal min-h-[52px] border-border/70 bg-background/90 px-4",
                        !date && "text-muted-foreground",
                        errors.date && "border-destructive"
                      )}
                      onClick={() => setErrors((p) => ({ ...p, date: "" }))}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                      <span className="truncate">
                        {date
                          ? format(date, "PPP", { locale: fr })
                          : "Sélectionner une date"}
                      </span>
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-auto p-0 z-[110] rounded-2xl max-w-[95vw]"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => {
                        setDate(d);
                        setErrors((p) => ({ ...p, date: "" }));
                      }}
                      disabled={(d) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const selectedDay = new Date(d);
                        selectedDay.setHours(0, 0, 0, 0);
                        return selectedDay < today;
                      }}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>

                {errors.date && (
                  <p className="text-xs text-destructive mt-3">{errors.date}</p>
                )}
              </motion.section>

              <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                className={cardClass}
              >
                <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-1">
                  🪑 Nombre de Tables
                </h2>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  {selectedSalle
                    ? `Maximum ${maxTables} tables pour ${selectedSalle.label}`
                    : "Sélectionnez d'abord une salle"}
                </p>

                <input
                  type="number"
                  min={1}
                  max={maxTables || undefined}
                  value={tables}
                  onChange={(e) => {
                    setTables(e.target.value);
                    setErrors((p) => ({ ...p, tables: "" }));
                  }}
                  className={cn(inputClass, errors.tables && "border-destructive")}
                  placeholder={maxTables ? `1 – ${maxTables}` : "Ex : 10"}
                  inputMode="numeric"
                />

                {errors.tables && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-destructive mt-3"
                  >
                    {errors.tables}
                  </motion.p>
                )}
              </motion.section>
            </div>

            {/* Formules */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className={cardClass}
            >
              <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-1">
                🍽 Choisir la Formule
              </h2>
              <p className="text-sm text-muted-foreground mb-5 sm:mb-6">
                Sélectionnez le menu qui correspond à vos goûts
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {formules.map((f, index) => (
                  <motion.button
                    key={f.id}
                    type="button"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.07 }}
                    whileHover={{ y: -4 }}
                    onClick={() => {
                      setFormule(f.id);
                      setErrors((p) => ({ ...p, formule: "" }));
                    }}
                    className={cn(
                      "group overflow-hidden rounded-3xl border-2 text-left transition-all duration-300 hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)] active:scale-[0.99]",
                      formule === f.id
                        ? "border-gold shadow-[0_18px_50px_rgba(212,175,55,0.16)] ring-2 ring-gold/20"
                        : "border-border hover:border-gold/40",
                      errors.formule && "border-destructive"
                    )}
                  >
                    <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                      <img
                        src={f.image}
                        alt={f.label}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                      <div className="absolute top-3 left-3 rounded-full bg-black/35 backdrop-blur-md px-3 py-1 text-white text-xs">
                        {f.emoji} {f.label}
                      </div>

                      {formule === f.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 bg-gold/20 flex items-center justify-center"
                        >
                          <span className="bg-gold text-primary-foreground px-4 py-2 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-2">
                            <CheckCircle2 size={16} /> Sélectionnée
                          </span>
                        </motion.div>
                      )}
                    </div>

                    <div className="p-4 sm:p-5">
                      <h3 className="font-serif text-base sm:text-lg text-foreground mb-1">
                        {f.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {f.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {errors.formule && (
                <p className="text-xs text-destructive mt-3">{errors.formule}</p>
              )}
            </motion.section>

            {/* Client infos */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className="rounded-[28px] border border-white/60 bg-charcoal text-white p-4 sm:p-5 md:p-7 shadow-[0_20px_80px_rgba(0,0,0,0.1)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-gold/10 blur-3xl" />
              <div className="relative z-10">
                <h2 className="font-serif text-xl sm:text-2xl mb-1">
                  📝 Informations Client
                </h2>
                <p className="text-sm text-white/65 mb-5 sm:mb-6">
                  Vos coordonnées pour la confirmation
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-3xl">
                  <div>
                    <label className="text-[11px] sm:text-xs font-medium text-white/60 uppercase tracking-[0.18em] flex items-center gap-2">
                      <User size={14} /> Nom complet *
                    </label>
                    <input
                      type="text"
                      value={nom}
                      onChange={(e) => {
                        setNom(e.target.value);
                        setErrors((p) => ({ ...p, nom: "" }));
                      }}
                      className={cn(
                        inputClass,
                        "bg-white/10 border-white/10 text-white placeholder:text-white/35",
                        errors.nom && "border-destructive"
                      )}
                      placeholder="Votre nom complet"
                    />
                    {errors.nom && (
                      <p className="text-xs text-red-300 mt-2">{errors.nom}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-[11px] sm:text-xs font-medium text-white/60 uppercase tracking-[0.18em] flex items-center gap-2">
                      <Phone size={14} /> Numéro de téléphone *
                    </label>
                    <input
                      type="tel"
                      value={telephone}
                      onChange={(e) => {
                        setTelephone(e.target.value);
                        setErrors((p) => ({ ...p, telephone: "" }));
                      }}
                      className={cn(
                        inputClass,
                        "bg-white/10 border-white/10 text-white placeholder:text-white/35",
                        errors.telephone && "border-destructive"
                      )}
                      placeholder="+212 6XX XXX XXX"
                      inputMode="tel"
                    />
                    {errors.telephone && (
                      <p className="text-xs text-red-300 mt-2">{errors.telephone}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[11px] sm:text-xs font-medium text-white/60 uppercase tracking-[0.18em] flex items-center gap-2">
                      <StickyNote size={14} /> Notes supplémentaires
                    </label>
                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className={cn(
                        inputClass,
                        "resize-none bg-white/10 border-white/10 text-white placeholder:text-white/35"
                      )}
                      placeholder="Informations supplémentaires..."
                    />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Desktop CTA */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="hidden md:flex justify-center pt-2"
            >
              <Button
                type="submit"
                variant="gold"
                size="xl"
                className="min-w-[300px] group rounded-2xl"
              >
                Confirmer la réservation
                <ArrowRight
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  size={18}
                />
              </Button>
            </motion.div>

            {/* Mobile sticky CTA */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-black/5 bg-warm-white/95 backdrop-blur-xl px-4 py-3 safe-area-inset-bottom">
              <Button
                type="submit"
                variant="gold"
                className="w-full h-12 rounded-2xl group text-sm"
              >
                Confirmer la réservation
                <ArrowRight
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  size={17}
                />
              </Button>
            </div>
          </motion.form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reserve;