import React, { useState } from "react";

// Icônes locales minimalistes (pas de dépendances externes)
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

  // Remplace FORMSPREE_ENDPOINT par ton lien réel quand prêt
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/TON_ID_ICI"; // ne s'affiche pas sur le site

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!FORMSPREE_ENDPOINT.includes("TON_ID_ICI")) {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, _subject: "Demande A2 GRID" })
        });
        if (!res.ok) throw new Error("Envoi échoué");
      } else {
        // Mode démo si aucun endpoint réel n'est défini
        await new Promise((r) => setTimeout(r, 600));
      }
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      alert("Impossible d'envoyer le message pour le moment. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
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

      {/* Hero (sans galerie supérieure) */}
      <section id="top" className="bg-gradient-to-b from-white to-emerald-50/60">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 grid md:grid-cols-1 gap-10 items-center">
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
              A2 GRID accompagne particuliers et pros : abattage, nettoyage de bâtiments (intérieur/extérieur), transport de matériaux, tonte, taille de haies, désherbage, nettoyage de terrasses et petit élagage.
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
        <div className="max-w-6xl mx_auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Réalisations</h2>
          <p className="text-gray-600 mb-8">Galerie en cours – vous pourrez ajouter vos photos ici.</p>
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
              {/* OpenStreetMap embed */}
              <div className="aspect-[4/3]">
                <iframe
                  title="Carte A2 GRID – Colmar"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={"https://www.openstreetmap.org/export/embed.html?bbox=7.30%2C48.04%2C7.42%2C48.11&layer=mapnik&marker=48.079%2C7.357"}
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
                    <textarea rows={5} required className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} placeholder="Ex. Abattage d’un cerisier ~8m, évacuation + nettoyage; ou Nettoyage de façade 60m²; ou Transport 2m³ de gravats…"/>
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
              <p className="text-sm text-gray-700 flex items-center gap-2"><Mail className="w-4 h-4"/> <a href="mailto:deuxgried@outlook.com" className="hover:underline">deuxgried@outlook.com</a></p>
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

      {/* Mentions légales */}
      <section id="mentions" className="py-16 border-t bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Mentions légales</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div className="space-y-2">
              <p><span className="font-semibold">Éditeur :</span> A2 GRID – Services d'espaces verts <span className="text-gray-400">[Dénomination exacte à compléter]</span></p>
              <p><span className="font-semibold">Forme juridique :</span> <span className="text-gray-400">[Micro‑entreprise / SASU / SARL – à compléter]</span></p>
              <p><span className="font-semibold">Siège social :</span> Colmar, France <span className="text-gray-400">[Adresse complète à compléter]</span></p>
              <p><span className="font-semibold">Immatriculation :</span> SIREN/SIRET <span className="text-gray-400">[n° à compléter]</span></p>
              <p><span className="font-semibold">TVA intracommunautaire :</span> <span className="text-gray-400">[le cas échéant]</span></p>
              <p><span className="font-semibold">Direction de la publication :</span> Mboudou Auguste <span className="text-gray-400">[ou représentant légal]</span></p>
              <p><span className="font-semibold">Contact :</span> <a href="mailto:deuxgried@outlook.com" className="hover:underline">deuxgried@outlook.com</a> • <a href="tel:+33646912878" className="hover:underline">06 46 91 28 78</a></p>
              <p><span className="font-semibold">Assurance RC Pro :</span> <span className="text-gray-400">[Assureur / n° police / couverture – à compléter]</span></p>
            </div>
            <div className="space-y-2">
              <p><span className="font-semibold">Hébergeur :</span> <span className="text-gray-400">[OVH / o2switch / Vercel – raison sociale, adresse, téléphone]</span></p>
              <p><span className="font-semibold">Propriété intellectuelle :</span> contenus et visuels © {new Date().getFullYear()} A2 GRID. Toute reproduction non autorisée est interdite.</p>
              <p><span className="font-semibold">Responsabilité :</span> les informations du site sont fournies à titre indicatif et peuvent évoluer.</p>
              <p><span className="font-semibold">Médiation à la consommation :</span> <span className="text-gray-400">[Coordonnées du médiateur, si applicable]</span></p>
              <p><span className="font-semibold">Dernière mise à jour :</span> {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Politique de confidentialité */}
      <section id="confidentialite" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Politique de confidentialité</h2>
          <div className="space-y-3 text-sm text-gray-700 max-w-3xl">
            <p><span className="font-semibold">Données collectées :</span> via le formulaire (nom, email, téléphone, message). <span className="text-gray-400">[Ajouter autres sources si besoin]</span></p>
            <p><span className="font-semibold">Finalités :</span> prise de contact, édition de devis, suivi des interventions et gestion commerciale.</p>
            <p><span className="font-semibold">Bases légales :</span> exécution de mesures précontractuelles et intérêt légitime (gestion de la relation client).</p>
            <p><span className="font-semibold">Durées de conservation :</span> 24 mois pour les demandes sans suite contractuelle ; durée du contrat + 5 ans pour les clients.</p>
            <p><span className="font-semibold">Destinataires :</span> A2 GRID et ses prestataires techniques (hébergeur, messagerie). <span className="text-gray-400">[Lister le cas échéant]</span></p>
            <p><span className="font-semibold">Hébergement & transferts :</span> hébergement en UE/EEE ; pas de transfert hors UE sans garanties appropriées.</p>
            <p><span className="font-semibold">Vos droits (RGPD) :</span> accès, rectification, effacement, opposition, limitation, portabilité. Exercez vos droits à : <a href="mailto:deuxgried@outlook.com" className="underline">deuxgried@outlook.com</a>.</p>
            <p><span className="font-semibold">Cookies :</span> uniquement cookies techniques nécessaires au fonctionnement. <span className="text-gray-400">[Ajouter bannière si analytics ultérieurement]</span></p>
            <p><span className="font-semibold">Sécurité :</span> mesures techniques et organisationnelles adaptées. <span className="text-gray-400">[DPO non désigné]</span></p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} A2 GRID – Espaces verts</p>
          <div className="flex items-center gap-4">
            <a href="#mentions" className="hover:text-emerald-700">Mentions légales</a>
            <a href="#confidentialite" className="hover:text-emerald-700">Politique de confidentialité</a>
            <a href="#top" className="hover:text-emerald-700">Haut de page</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
