import React, { useState } from "react";
// Icônes minimalistes locales pour éviter les dépendances externes en preview
const BaseIcon = (props) => (
  <svg
    className={props.className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
  </svg>
);
const Leaf = BaseIcon;
const Scissors = BaseIcon;
const Trees = BaseIcon;
const Shovel = BaseIcon;
const Sun = BaseIcon;
const Droplets = BaseIcon;
const Mail = BaseIcon;
const Phone = BaseIcon;
const MapPin = BaseIcon;
const Hammer = BaseIcon;
const Axe = BaseIcon;
const Broom = BaseIcon;
const Truck = BaseIcon;

export default function A2Grid() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 900);
  };

  const Service = ({ icon: Icon, title, desc }) => (
    <div className="rounded-2xl shadow-sm bg-white border p-6 hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100"><Icon className="w-5 h-5" /></div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );

  const Pill = ({ children }) => (
    <span className="px-3 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700 border border-emerald-100">{children}</span>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Global styles */}
      <style>{`html{scroll-behavior:smooth}`}</style>

      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-bold text-xl">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">A2</span>
            <span>A2 GRID</span>
          </a>
          <nav className="hidden sm:flex items-center gap-5 text-sm">
            <a href="#services" className="hover:text-emerald-700">Services</a>
            <a href="#realisations" className="hover:text-emerald-700">Réalisations</a>
            <a href="#zones" className="hover:text-emerald-700">Zones</a>
            <a href="#contact" className="hover:text-emerald-700">Contact</a>
            <a href="#contact" className="ml-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition">
              <Hammer className="w-4 h-4" /> Demander un devis
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="bg-gradient-to-b from-white to-emerald-50/60">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Pill>Entretien</Pill>
              <Pill>Aménagement</Pill>
              <Pill>Débarras végétaux</Pill>
              <Pill>Abattage</Pill>
              <Pill>Bâtiment</Pill>
              <Pill>Transport</Pill>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
              Espaces verts <span className="text-emerald-600">pro</span> &
              <br className="hidden sm:block" /> service rapide en Alsace
            </h1>
            <p className="text-gray-600 mb-6 max-w-prose">
              A2 GRID accompagne particuliers et pros : tonte, taille de haies, désherbage, nettoyage de terrasses, petit élagage, abattage, nettoyage de bâtiments et transport de matériaux.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition">
                <Mail className="w-4 h-4"/> Demander un devis gratuit
              </a>
              <a href="tel:+33646912878" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition">
                <Phone className="w-4 h-4"/> Appeler directement
              </a>
              <a href="#zones" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border hover:bg-gray-50 transition">
                <MapPin className="w-4 h-4"/> Zones d’intervention
              </a>
            </div>
            <div className="mt-6 text-sm text-gray-500">Réponse sous 24h ouvrées • Devis gratuit • Interventions soignées</div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-white border shadow-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/10 to-transparent"/>
              <div className="h-full w-full grid grid-cols-2 gap-1 p-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-2xl bg-gray-100 border flex items-center justify-center text-gray-400 text-sm">
                    Photo à venir
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white border shadow-sm rounded-2xl px-4 py-3 hidden md:flex items-center gap-2">
              <Sun className="w-4 h-4 text-emerald-600"/>
              <span className="text-sm">Matériel pro • Travail soigné</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Nos services</h2>
          <p className="text-gray-600 mb-8">Prestations rapides, propres et au juste prix.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Service icon={Axe} title="Abattage d’arbres" desc="Abattage contrôlé, démontage par sections si nécessaire et périmètre sécurisé." />
            <Service icon={Broom} title="Nettoyage intérieur / extérieur" desc="Nettoyage de bâtiments : intérieur, vitres, façades, bardages et fin de chantier." />
            <Service icon={Truck} title="Transport de matériaux" desc="Transport et évacuation : terre, bois, gravats, matériaux — camionnette/benne légère." />
            <Service icon={Leaf} title="Tonte & entretien de pelouse" desc="Tonte régulière, finitions précises, bordures nettes et évacuation des déchets verts." />
            <Service icon={Scissors} title="Taille de haies & arbustes" desc="Haies linéaires, formes, remise à niveau saisonnière et nettoyage après intervention." />
            <Service icon={Shovel} title="Désherbage & remise en état" desc="Désherbage mécanique/manuel, allées, parterres, remises à niveau de massifs." />
            <Service icon={Trees} title="Petit élagage" desc="Élagage léger, branches gênantes ou dangereuses, sécurisation des accès." />
            <Service icon={Droplets} title="Nettoyage terrasses & allées" desc="Nettoyage haute pression contrôlé, remise au propre des surfaces extérieures." />
            <Service icon={Hammer} title="Débarras végétaux" desc="Chargement, évacuation en déchetterie et finition propre du chantier." />
          </div>
        </div>
      </section>

      {/* Réalisations */}
      <section id="realisations" className="py-16 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Réalisations</h2>
          <p className="text-gray-600 mb-8">Gallerie en cours – vous pourrez ajouter vos photos ici.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border bg-gray-100 aspect-[4/3] flex items-center justify-center text-gray-400">
                Photo à venir
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zones & Map */}
      <section id="zones" className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-6 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Zones d’intervention</h2>
            <p className="text-gray-600 mb-6">Basés près de Colmar – interventions rapides dans le centre Alsace.</p>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {["Colmar", "Wintzenheim", "Horbourg‑Wihr", "Andolsheim", "Biesheim", "Widensolen", "Neuf‑Brisach", "Sélestat", "Guebwiller", "Mulhouse"].map((v) => (
                <li key={v} className="px-3 py-2 rounded-xl bg-white border flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600"/> {v}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <div className="rounded-2xl overflow-hidden border bg-white">
              {/* OpenStreetMap embed – integrated map */}
              <div className="aspect-[4/3]">
                <iframe
                  title="Carte A2 GRID – Colmar"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={
                    "https://www.openstreetmap.org/export/embed.html?bbox=7.30%2C48.04%2C7.42%2C48.11&layer=mapnik&marker=48.079%2C7.357"
                  }
                />
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">Carte intégrée. Si votre navigateur bloque l’iframe, une carte statique s’affichera automatiquement dans la version hébergée.</div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Contact & devis</h2>
            <p className="text-gray-600 mb-6">Décrivez votre besoin – réponse sous 24h ouvrées.</p>
            <div className="rounded-2xl border p-6">
              {!sent ? (
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div>
                    <label className="block text-sm mb-1">Nom</label>
                    <input required className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">Email</label>
                      <input type="email" required className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Téléphone</label>
                      <input className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Message</label>
                    <textarea rows={5} required className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} placeholder="Ex. Taille de haie 12m, désherbage allée 30m², évacuation déchets…"/>
                  </div>
                  <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60">
                    {loading ? "Envoi…" : "Envoyer ma demande"}
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">✓</div>
                  <p className="font-semibold">Message bien envoyé !</p>
                  <p className="text-sm text-gray-600">Nous vous recontactons sous 24h ouvrées.</p>
                  <button onClick={()=>setSent(false)} className="mt-4 text-sm underline">Envoyer une autre demande</button>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-4 content-start">
            <div className="rounded-2xl border p-6 bg-emerald-50">
              <h3 className="font-semibold mb-2">Infos</h3>
              <p className="text-sm text-gray-700 flex items-center gap-2"><Mail className="w-4 h-4"/> contact@a2grid.fr (à confirmer)</p>
              <p className="text-sm text-gray-700 flex items-center gap-2"><Phone className="w-4 h-4"/> <a href="tel:+33646912878" className="hover:underline">06 46 91 28 78</a></p>
              <p className="text-sm text-gray-700 flex items-center gap-2"><MapPin className="w-4 h-4"/> Basé à Colmar – interventions Alsace</p>
            </div>
            <div className="rounded-2xl border p-6">
              <h3 className="font-semibold mb-2">Pourquoi A2 GRID ?</h3>
              <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
                <li>Devis clair et prix justes</li>
                <li>Interventions rapides et propres</li>
                <li>Évacuation des déchets comprise sur demande</li>
                <li>Matériel pro, finitions soignées</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} A2 GRID – Espaces verts</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-emerald-700">Mentions légales</a>
            <a href="#" className="hover:text-emerald-700">Politique de confidentialité</a>
            <a href="#top" className="hover:text-emerald-700">Haut de page</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
