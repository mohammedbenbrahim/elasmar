import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
}

const salles = [
  { id: "1", label: "Salle 1" },
  { id: "2", label: "Salle 2" },
  { id: "3", label: "Salle 3" },
];

const PHONE_NUMBER = "212769747484";

const ReservationModal = ({ open, onClose }: ReservationModalProps) => {
  const [salle, setSalle] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [tables, setTables] = useState("");
  const [formule, setFormule] = useState("Silver");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  if (!open) return null;

  const validate = () => {
    const e: Record<string, boolean> = {};

    if (!salle) e.salle = true;
    if (!date) e.date = true;
    if (!tables || Number(tables) < 1) e.tables = true;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const selectedSalle = salles.find((s) => s.id === salle)?.label || "";

  const whatsappUrl = useMemo(() => {
    const message = `Bonjour Salle des Fêtes Elasmar Fouad,

Je souhaite réserver avec les informations suivantes :

Salle choisie : ${selectedSalle}
Date : ${date ? format(date, "dd/MM/yyyy") : ""}
Nombre de tables : ${tables}
Formule choisie : ${formule}
Notes : ${notes.trim() || "Aucune"}

Merci de me confirmer la disponibilité.`;

    return `https://api.whatsapp.com/send?phone=212769747484&text=${encodeURIComponent(message)}`;
  }, [selectedSalle, date, tables, formule, notes]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validate()) {
      e.preventDefault();
    }
  };

  const isPastDay = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const compareDay = new Date(day);
    compareDay.setHours(0, 0, 0, 0);

    return compareDay < today;
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-warm-white rounded-lg shadow-elegant w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-8">
          <h2 className="font-serif text-2xl text-foreground mb-1 text-center">
            Réserver Votre Salle
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />

          <div className="space-y-5">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
                Choisir la salle *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {salles.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setSalle(s.id);
                      setErrors((prev) => ({ ...prev, salle: false }));
                    }}
                    className={cn(
                      "rounded-lg border-2 py-4 text-sm font-medium transition-all duration-300 hover:shadow-md",
                      salle === s.id
                        ? "border-gold bg-gold/10 text-gold shadow-md"
                        : "border-border bg-background text-foreground hover:border-gold/40",
                      errors.salle && "border-red-400"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              {errors.salle && (
                <p className="text-xs text-red-500 mt-1">
                  Veuillez choisir une salle
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                Date de l&apos;événement *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
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
                <PopoverContent className="w-auto p-0 z-[110]" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                      setDate(d);
                      setErrors((prev) => ({ ...prev, date: false }));
                    }}
                    disabled={isPastDay}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.date && (
                <p className="text-xs text-red-500 mt-1">
                  Veuillez choisir une date
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                Nombre de tables *
              </label>
              <input
                type="number"
                min={1}
                value={tables}
                onChange={(e) => {
                  setTables(e.target.value);
                  setErrors((prev) => ({ ...prev, tables: false }));
                }}
                className={cn(
                  "w-full border rounded-md px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all",
                  errors.tables ? "border-red-400" : "border-border"
                )}
                placeholder="Ex: 10"
              />
              {errors.tables && (
                <p className="text-xs text-red-500 mt-1">
                  Veuillez indiquer le nombre de tables
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                Choix de la formule *
              </label>
              <select
                value={formule}
                onChange={(e) => setFormule(e.target.value)}
                className="w-full border border-border rounded-md px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
              >
                <option value="Silver">💎 Formule Silver</option>
                <option value="Gold">🥇 Formule Gold</option>
                <option value="Prestige">👑 Formule Prestige</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                Notes supplémentaires
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-border rounded-md px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all resize-none"
                placeholder="Informations supplémentaires..."
              />
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="block w-full"
            >
              <Button type="button" variant="gold" size="lg" className="w-full">
                Confirmer la réservation
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;