import { useMemo, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  CalendarIcon,
  StickyNote,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Building2,
  Ban,
  UtensilsCrossed,
  LayoutGrid,
  Armchair,
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
import avecPackImg from "@/assets/pack.jpg";
import sansPackImg from "@/assets/s-pack.jpg";

const PHONE_NUMBER = "212677772906";

const salles = [
  {
    id: "1",
    label: "Salle 1",
    maxTables: 24,
    description: "Grande salle luxueuse",
    image: salle1Img,
  },
  {
    id: "2",
    label: "Salle 2",
    maxTables: 14,
    description: "Salle élégante de taille moyenne",
    image: salle2Img,
  },
  {
    id: "3",
    label: "Salle 3",
    maxTables: 8,
    description: "Salle intime pour mariages",
    image: salle3Img,
  },
];

const reservationTypes = [
  {
    id: "avec-pack",
    label: "Avec Pack",
    description: "Réservation avec prestation complète",
    image: avecPackImg,
  },
  {
    id: "sans-pack",
    label: "Sans Pack",
    description: "Réservation simple, personnalisable selon vos besoins",
    image: sansPackImg,
  },
];

const menus = [
  {
    id: "djaj-mhamer",
    label: "Djaj Mhamer",
    description: "Une proposition traditionnelle raffinée",
  },
  {
    id: "bastilla",
    label: "Bastilla",
    description: "Un choix élégant pour les grandes occasions",
  },
  {
    id: "mechoui",
    label: "Méchoui",
    description: "Une formule généreuse et prestigieuse",
  },
  {
    id: "mixte",
    label: "Menu Mixte",
    description: "Une composition variée selon vos préférences",
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
  const [reservationType, setReservationType] = useState("");
  const [menu, setMenu] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedSalle = useMemo(() => salles.find((s) => s.id === salle), [salle]);
  const maxTables = selectedSalle?.maxTables;

  const validate = () => {
    const e: Record<string, string> = {};

    if (!date) e.date = "Veuillez choisir une date";

    if (!tables || Number(tables) < 1) {
      e.tables = "Veuillez indiquer le nombre de tables";
    } else if (selectedSalle && maxTables && Number(tables) > maxTables) {
      e.tables = `Maximum ${maxTables} tables pour ${selectedSalle.label}`;
    }

    if (!reservationType) e.reservationType = "Veuillez choisir une option";
    if (!menu) e.menu = "Veuillez choisir un menu";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    const message = `Bonjour Salle des Fêtes Elasmar Fouad,

Je souhaite effectuer une réservation avec les informations suivantes :

Salle choisie : ${selectedSalle?.label || "Sans salle définie"}
${selectedSalle ? `Capacité maximale : ${maxTables} tables` : ""}
Nombre de tables réservé : ${tables}
Date de l'événement : ${date ? format(date, "dd/MM/yyyy") : ""}
Type de réservation : ${reservationType}
Menu choisi : ${menu}
Notes : ${notes || "Aucune"}

Merci de me confirmer la disponibilité.`;

    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  };

  const inputClass =
    "mt-2 w-full rounded-2xl border border-border/70 bg-background/90 px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:border-gold/40 focus:ring-2 focus:ring-gold/20";

  const cardClass =
    "rounded-[30px] border border-white/60 bg-white/80 backdrop-blur-xl p-4 sm:p-5 md:p-7 shadow-[0_20px_80px_rgba(0,0,0,0.06)]";

  const selectionCardClass =
    "group rounded-[28px] border text-left transition-all duration-300 hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1";

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
              Sélectionnez votre salle, votre formule et votre menu pour envoyer
              une demande de réservation claire et raffinée.
            </motion.p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8 sm:space-y-10 md:space-y-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className={cardClass}
            >
              <div className="mb-5 sm:mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <Building2 size={18} />
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl text-foreground">
                    Choisir la Salle
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Cette étape est optionnelle. Vous pouvez continuer sans choisir de salle.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  onClick={() => {
                    setSalle("");
                    setErrors((p) => ({ ...p, salle: "", tables: "" }));
                  }}
                  className={cn(
                    selectionCardClass,
                    "min-h-[290px] border border-dashed p-6 flex flex-col justify-center items-center text-center",
                    salle === ""
                      ? "border-gold bg-gold/5 ring-2 ring-gold/20 shadow-[0_18px_50px_rgba(212,175,55,0.12)]"
                      : "border-border hover:border-gold/40 bg-white"
                  )}
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-black/5 text-foreground">
                    <Ban size={24} />
                  </div>

                  <h3 className="font-serif text-lg text-foreground mb-2">
                    Sans salle
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
                    Vous pourrez préciser votre choix ultérieurement avec notre équipe.
                  </p>

                  {salle === "" && (
                    <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-1.5 text-xs font-medium text-primary-foreground">
                      <CheckCircle2 size={14} />
                      Sélectionné
                    </span>
                  )}
                </motion.button>

                {salles.map((s, index) => (
                  <motion.button
                    key={s.id}
                    type="button"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (index + 1) * 0.07 }}
                    whileHover={{ y: -4 }}
                    onClick={() => {
                      const isSameSalle = salle === s.id;
                      setSalle(isSameSalle ? "" : s.id);
                      setErrors((p) => ({ ...p, salle: "", tables: "" }));

                      if (!isSameSalle && Number(tables) > s.maxTables) {
                        setTables(String(s.maxTables));
                      }
                    }}
                    className={cn(
                      selectionCardClass,
                      "overflow-hidden border bg-white",
                      salle === s.id
                        ? "border-gold ring-2 ring-gold/20 shadow-[0_18px_50px_rgba(212,175,55,0.12)]"
                        : "border-border hover:border-gold/40"
                    )}
                  >
                    <div className="relative h-44 sm:h-48 overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.label}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                      <div className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-foreground shadow-sm">
                        {s.label}
                      </div>

                      {salle === s.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 bg-gold/15 flex items-center justify-center"
                        >
                          <span className="bg-white text-foreground px-4 py-2 rounded-full text-xs sm:text-sm font-medium inline-flex items-center gap-2 shadow-lg">
                            <CheckCircle2 size={16} className="text-gold" />
                            Sélectionnée
                          </span>
                        </motion.div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="font-serif text-lg text-foreground mb-1">{s.label}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{s.description}</p>
                      <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                        <LayoutGrid size={14} />
                        {s.maxTables} tables maximum
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.section>

            <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8 items-start">
              <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                className={cardClass}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <CalendarIcon size={18} />
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl text-foreground">
                    Date de l'Événement
                  </h2>
                </div>

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
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <Armchair size={18} />
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl text-foreground">
                    Nombre de Tables
                  </h2>
                </div>

                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  {selectedSalle
                    ? `Maximum ${maxTables} tables pour ${selectedSalle.label}`
                    : "Vous pouvez saisir le nombre de tables même sans choisir une salle"}
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

            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className={cardClass}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <UtensilsCrossed size={18} />
                </div>
                <h2 className="font-serif text-xl sm:text-2xl text-foreground">
                  Choisir l’Option et le Menu
                </h2>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Sélectionnez d’abord le type de réservation puis le menu souhaité.
              </p>

              <div className="mb-8">
                <h3 className="font-serif text-lg text-foreground mb-4">Option</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {reservationTypes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setReservationType(item.label);
                        setErrors((p) => ({ ...p, reservationType: "" }));
                      }}
                      className={cn(
                        "rounded-[24px] border overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.06)]",
                        reservationType === item.label
                          ? "border-gold bg-gold/5 ring-2 ring-gold/20"
                          : "border-border bg-white hover:border-gold/40",
                        errors.reservationType && "border-destructive"
                      )}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.label}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                        <div className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-foreground shadow-sm">
                          {item.label}
                        </div>

                        {reservationType === item.label && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 bg-gold/15 flex items-center justify-center"
                          >
                            <span className="bg-white text-foreground px-4 py-2 rounded-full text-xs sm:text-sm font-medium inline-flex items-center gap-2 shadow-lg">
                              <CheckCircle2 size={16} className="text-gold" />
                              Sélectionnée
                            </span>
                          </motion.div>
                        )}
                      </div>

                      <div className="p-5 flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-serif text-lg text-foreground mb-1">
                            {item.label}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {reservationType === item.label && (
                          <CheckCircle2 className="text-gold shrink-0" size={18} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {errors.reservationType && (
                  <p className="text-xs text-destructive mt-3">{errors.reservationType}</p>
                )}
              </div>

              <div>
                <h3 className="font-serif text-lg text-foreground mb-4">Menu Traiteur</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {menus.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setMenu(item.label);
                        setErrors((p) => ({ ...p, menu: "" }));
                      }}
                      className={cn(
                        "rounded-[24px] border p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.06)]",
                        menu === item.label
                          ? "border-gold bg-gold/5 ring-2 ring-gold/20"
                          : "border-border bg-white hover:border-gold/40",
                        errors.menu && "border-destructive"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-serif text-lg text-foreground mb-1">
                            {item.label}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {menu === item.label && (
                          <CheckCircle2 className="text-gold shrink-0" size={18} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {errors.menu && (
                  <p className="text-xs text-destructive mt-3">{errors.menu}</p>
                )}
              </div>
            </motion.section>

            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className={cardClass}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <StickyNote size={18} />
                </div>
                <h2 className="font-serif text-xl sm:text-2xl text-foreground">
                  Notes supplémentaires
                </h2>
              </div>

              <p className="text-sm text-muted-foreground mb-5">
                Ajoutez des précisions si nécessaire.
              </p>

              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={cn(inputClass, "resize-none")}
                placeholder="Informations supplémentaires..."
              />
            </motion.section>

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
                className="min-w-[320px] group rounded-2xl shadow-[0_16px_40px_rgba(212,175,55,0.18)]"
              >
                Confirmer la réservation
                <ArrowRight
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  size={18}
                />
              </Button>
            </motion.div>

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