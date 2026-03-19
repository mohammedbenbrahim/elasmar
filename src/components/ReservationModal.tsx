import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  X,
  CalendarIcon,
  Users,
  Crown,
  MessageSquare,
  PartyPopper,
  CheckCircle2,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
}

const salles = [
  { id: "1", label: "Salle 1", subtitle: "Ambiance élégante" },
  { id: "2", label: "Salle 2", subtitle: "Parfaite pour les fêtes" },
  { id: "3", label: "Salle 3", subtitle: "Grand format" },
];

const PHONE_NUMBER = "212677772906";

const formules = [
  { value: "Silver", label: "Formule Silver", icon: "💎" },
  { value: "Gold", label: "Formule Gold", icon: "🥇" },
  { value: "Prestige", label: "Formule Prestige", icon: "👑" },
];

const ReservationModal = ({ open, onClose }: ReservationModalProps) => {
  const [salle, setSalle] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [tables, setTables] = useState("");
  const [formule, setFormule] = useState("Silver");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const selectedSalleLabel =
    salles.find((s) => s.id === salle)?.label || "Votre sélection";

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  const validate = () => {
    const e: Record<string, boolean> = {};

    if (!salle) e.salle = true;
    if (!date) e.date = true;
    if (!tables || Number(tables) < 1) e.tables = true;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const isPastDay = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const compareDay = new Date(day);
    compareDay.setHours(0, 0, 0, 0);

    return compareDay < today;
  };

const handleSubmit = () => {
  if (!validate()) return;

  const message = `Bonjour Salle des Fêtes Elasmar Fouad,

Je souhaite réserver avec les informations suivantes :

Salle choisie : ${selectedSalleLabel}
Date : ${date ? format(date, "dd/MM/yyyy") : ""}
Nombre de tables : ${tables}
Formule choisie : ${formule}
Notes : ${notes.trim() || "Aucune"}

Merci de me confirmer la disponibilité.`;

  const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

  // FORCE redirect (no popup, no rewrite)
  window.location.replace(url);
};
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/70 px-4 py-6 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-modal-title"
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-warm-white shadow-elegant animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground transition-all hover:scale-105 hover:text-foreground"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        <div className="grid max-h-[90vh] overflow-y-auto lg:grid-cols-[1fr_1.15fr]">
          <div className="relative overflow-hidden bg-charcoal px-6 py-8 text-white sm:px-8">
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-gold/20" />
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80">
                <PartyPopper size={14} />
                Réservation
              </div>

              <h2
                id="reservation-modal-title"
                className="font-serif text-3xl leading-tight text-white"
              >
                Réservez votre salle en quelques clics
              </h2>

              <p className="mt-4 text-sm leading-6 text-white/75">
                Choisissez la salle, la date, le nombre de tables et la formule.
                Votre demande sera envoyée directement sur WhatsApp.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                    Salle sélectionnée
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {selectedSalleLabel}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                    Formule actuelle
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {formule}
                  </p>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                  <p className="text-sm leading-6 text-white/80">
                    Après validation, un message WhatsApp prérempli s’ouvrira pour
                    confirmer votre demande de réservation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background px-6 py-8 sm:px-8">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Détails de la réservation
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Remplissez le formulaire ci-dessous pour continuer.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Choisir la salle *
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {salles.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setSalle(s.id);
                        setErrors((prev) => ({ ...prev, salle: false }));
                      }}
                      className={cn(
                        "rounded-2xl border px-4 py-4 text-left transition-all duration-300 hover:-translate-y-0.5",
                        salle === s.id
                          ? "border-gold bg-gold/10 shadow-md ring-1 ring-gold/40"
                          : "border-border bg-card hover:border-gold/40 hover:shadow-sm",
                        errors.salle && "border-red-400"
                      )}
                    >
                      <p className="font-medium text-foreground">{s.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {s.subtitle}
                      </p>
                    </button>
                  ))}
                </div>
                {errors.salle && (
                  <p className="mt-1 text-xs text-red-500">
                    Veuillez choisir une salle
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Date de l&apos;événement *
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "h-12 w-full justify-start rounded-xl border text-left font-normal",
                        !date && "text-muted-foreground",
                        errors.date && "border-red-400"
                      )}
                      onClick={() =>
                        setErrors((prev) => ({ ...prev, date: false }))
                      }
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date
                        ? format(date, "PPP", { locale: fr })
                        : "Sélectionner une date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="z-[110] w-auto rounded-2xl p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => {
                        setDate(d);
                        setErrors((prev) => ({ ...prev, date: false }));
                      }}
                      disabled={isPastDay}
                      initialFocus
                      className="pointer-events-auto p-3"
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && (
                  <p className="mt-1 text-xs text-red-500">
                    Veuillez choisir une date
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Nombre de tables *
                </label>
                <div className="relative">
                  <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="number"
                    min={1}
                    value={tables}
                    onChange={(e) => {
                      setTables(e.target.value);
                      setErrors((prev) => ({ ...prev, tables: false }));
                    }}
                    className={cn(
                      "h-12 w-full rounded-xl border bg-background pl-10 pr-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold/40",
                      errors.tables ? "border-red-400" : "border-border"
                    )}
                    placeholder="Ex: 10"
                  />
                </div>
                {errors.tables && (
                  <p className="mt-1 text-xs text-red-500">
                    Veuillez indiquer le nombre de tables
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Choix de la formule *
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {formules.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setFormule(item.value)}
                      className={cn(
                        "rounded-2xl border px-4 py-4 text-left transition-all duration-300 hover:-translate-y-0.5",
                        formule === item.value
                          ? "border-gold bg-gold/10 shadow-md ring-1 ring-gold/40"
                          : "border-border bg-card hover:border-gold/40 hover:shadow-sm"
                      )}
                    >
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Crown className="h-4 w-4" />
                        <span>{item.label}</span>
                      </div>
                      <p className="mt-2 text-lg">{item.icon}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Notes supplémentaires
                </label>
                <div className="relative">
                  <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full resize-none rounded-xl border border-border bg-background py-3 pl-10 pr-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold/40"
                    placeholder="Informations supplémentaires..."
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="gold"
                size="lg"
                className="h-12 w-full rounded-xl text-base"
                onClick={handleSubmit}
              >
                Confirmer la réservation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;