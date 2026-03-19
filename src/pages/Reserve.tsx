import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, User, Phone, StickyNote } from "lucide-react";
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
  { id: "1", label: "Salle 1", maxTables: 24, description: "Grande salle luxueuse", badge: "🥇", image: salle1Img },
  { id: "2", label: "Salle 2", maxTables: 14, description: "Salle élégante de taille moyenne", badge: "🥈", image: salle2Img },
  { id: "3", label: "Salle 3", maxTables: 8, description: "Salle intime pour mariages", badge: "🥉", image: salle3Img },
];

const formules = [
  { id: "Silver", label: "Formule Silver", emoji: "💎", description: "Menu de mariage classique", image: formuleSilverImg },
  { id: "Gold", label: "Formule Gold", emoji: "🥇", description: "Plats premium raffinés", image: formuleGoldImg },
  { id: "Prestige", label: "Formule Prestige", emoji: "👑", description: "Menu gastronomique de luxe", image: formulePrestigeImg },
];

const Reserve = () => {
  const [salle, setSalle] = useState("");
  const [date, setDate] = useState<Date>();
  const [tables, setTables] = useState("");
  const [formule, setFormule] = useState("");
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedSalle = salles.find((s) => s.id === salle);
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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
              Réserver Votre Salle
            </h1>
            <div className="w-20 h-0.5 bg-gold mx-auto" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-14">
            <section>
              <h2 className="font-serif text-xl text-foreground mb-1">🏛 Choisir la Salle</h2>
              <p className="text-sm text-muted-foreground mb-5">
                Sélectionnez la salle qui correspond à votre événement
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {salles.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setSalle(s.id);
                      setErrors((p) => ({ ...p, salle: "" }));
                      if (Number(tables) > s.maxTables) setTables(String(s.maxTables));
                    }}
                    className={cn(
                      "group rounded-xl border-2 overflow-hidden text-left transition-all duration-300 hover:shadow-elegant",
                      salle === s.id
                        ? "border-gold shadow-elegant ring-2 ring-gold/20"
                        : "border-border hover:border-gold/40",
                      errors.salle && "border-destructive"
                    )}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.label}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {salle === s.id && (
                        <div className="absolute inset-0 bg-gold/20 flex items-center justify-center">
                          <span className="bg-gold text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold">
                            ✓ Sélectionnée
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{s.badge}</span>
                        <h3 className="font-serif text-lg text-foreground">{s.label}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{s.description}</p>
                      <p className="text-sm font-semibold text-gold">{s.maxTables} tables maximum</p>
                    </div>
                  </button>
                ))}
              </div>

              {errors.salle && <p className="text-xs text-destructive mt-2">{errors.salle}</p>}
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-1">📆 Date de l'Événement</h2>
              <p className="text-sm text-muted-foreground mb-4">Choisissez la date souhaitée</p>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full md:w-80 justify-start text-left font-normal h-12",
                      !date && "text-muted-foreground",
                      errors.date && "border-destructive"
                    )}
                    onClick={() => setErrors((p) => ({ ...p, date: "" }))}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: fr }) : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0 z-[110]" align="start">
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

              {errors.date && <p className="text-xs text-destructive mt-2">{errors.date}</p>}
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-1">🪑 Nombre de Tables</h2>
              <p className="text-sm text-muted-foreground mb-4">
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
                className={cn(
                  "w-full md:w-80 border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all",
                  errors.tables ? "border-destructive" : "border-input"
                )}
                placeholder={maxTables ? `1 – ${maxTables}` : "Ex: 10"}
              />

              {errors.tables && (
                <p className="text-xs text-destructive mt-2 animate-fade-in">{errors.tables}</p>
              )}
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-1">🍽 Choisir la Formule</h2>
              <p className="text-sm text-muted-foreground mb-5">
                Sélectionnez le menu qui correspond à vos goûts
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {formules.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setFormule(f.id);
                      setErrors((p) => ({ ...p, formule: "" }));
                    }}
                    className={cn(
                      "group rounded-xl border-2 overflow-hidden text-left transition-all duration-300 hover:shadow-elegant",
                      formule === f.id
                        ? "border-gold shadow-elegant ring-2 ring-gold/20"
                        : "border-border hover:border-gold/40",
                      errors.formule && "border-destructive"
                    )}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={f.image}
                        alt={f.label}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {formule === f.id && (
                        <div className="absolute inset-0 bg-gold/20 flex items-center justify-center">
                          <span className="bg-gold text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold">
                            ✓ Sélectionnée
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{f.emoji}</span>
                        <h3 className="font-serif text-lg text-foreground">{f.label}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{f.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              {errors.formule && <p className="text-xs text-destructive mt-2">{errors.formule}</p>}
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-1">📝 Informations Client</h2>
              <p className="text-sm text-muted-foreground mb-5">
                Vos coordonnées pour la confirmation
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
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
                      "w-full border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all",
                      errors.nom ? "border-destructive" : "border-input"
                    )}
                    placeholder="Votre nom complet"
                  />
                  {errors.nom && <p className="text-xs text-destructive mt-1">{errors.nom}</p>}
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
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
                      "w-full border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all",
                      errors.telephone ? "border-destructive" : "border-input"
                    )}
                    placeholder="+212 6XX XXX XXX"
                  />
                  {errors.telephone && (
                    <p className="text-xs text-destructive mt-1">{errors.telephone}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                    <StickyNote size={14} /> Notes supplémentaires
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full border border-input rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all resize-none"
                    placeholder="Informations supplémentaires..."
                  />
                </div>
              </div>
            </section>

            <div className="text-center pt-4">
              <Button type="submit" variant="gold" size="xl" className="min-w-64">
                Confirmer la réservation
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reserve;