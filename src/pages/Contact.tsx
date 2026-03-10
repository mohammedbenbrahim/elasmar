import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Instagram, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ nom: "", telephone: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Bonjour, je suis ${form.nom}.\n\n${form.message}\n\nTéléphone: ${form.telephone}\nEmail: ${form.email}`;
    window.open(`https://wa.me/212769747484?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "mt-1 w-full border border-border rounded-md px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all";

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-warm-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-serif text-4xl lg:text-5xl text-foreground text-center mb-2">Contactez Nous</h1>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-16" />

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <div className="bg-cream rounded-xl p-8 shadow-card">
              <h2 className="font-serif text-2xl text-foreground mb-6">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Nom</label>
                  <input name="nom" required value={form.nom} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Téléphone</label>
                  <input name="telephone" required value={form.telephone} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Message</label>
                  <textarea name="message" rows={4} required value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} />
                </div>
                <Button type="submit" variant="gold" size="lg" className="w-full">
                  Envoyer
                </Button>
              </form>
            </div>

            {/* Info + Map */}
            <div className="space-y-8">
              <div className="bg-cream rounded-xl p-8 shadow-card">
                <h2 className="font-serif text-2xl text-foreground mb-6">Nos Coordonnées</h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gold" />
                    <span>+212 XX XXX XXXX</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle size={18} className="text-gold" />
                    <span>WhatsApp: +212 XX XXX XXXX</span>
                  </div>
                  <a
                    href="https://www.instagram.com/salle_des_fetes_elasmar_fouad/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-gold transition-colors"
                  >
                    <Instagram size={18} className="text-gold" />
                    <span>@salle_des_fetes_elasmar_fouad</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-gold" />
                    <span>Maroc</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-card h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.846!2d-7.589!3d33.573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM0JzIyLjgiTiA3wrAzNSczMy42Ilc!5e0!3m2!1sfr!2sma!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Localisation"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;