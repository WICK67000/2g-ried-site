import React, { useState, useEffect } from "react";

export default function TwoGRiedTest() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", company: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const [humanCheck, setHumanCheck] = useState(false);
  const [mathAns, setMathAns] = useState("");
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const onHash = () => setMenuOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPageReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = (data, token, opts) => {
    if (!data.name || !data.email || !data.message) {
      return "Merci de compléter au moins Nom, Email et Message.";
    }
    if (data.company) {
      return "Merci, votre message est pris en compte.";
    }
    if (!token) {
      if (opts?.allowFallback && opts?.fallbackOk) return null;
      return "Merci de valider le captcha.";
    }
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    const fallbackOk = humanCheck && mathAns.trim() === "5" && pageReady;
    const err = validateForm(form, "", { allowFallback: true, fallbackOk });
    if (err) { setStatus(err); return; }

    try {
      setLoading(true);
      const subject = encodeURIComponent("Demande de devis 2G RIED");
      const body = encodeURIComponent(
        `Nom: ${form.name}\nEmail: ${form.email}\nTéléphone: ${form.phone || "-"}\n\nMessage:\n${form.message}`
      );
      window.location.href = `mailto:deuxgried@outlook.com?subject=${subject}&body=${body}`;
      setStatus("Votre messagerie va s'ouvrir pour envoyer l'email.");
      setForm({ name: "", email: "", phone: "", message: "", company: "" });
      setHumanCheck(false);
      setMathAns("");
    } catch (err) {
      console.error(err);
      setStatus("❌ Impossible de préparer l'email.");
    } finally {
      setLoading(false);
    }
  };

  const NavLink = ({ href, children }) => (
    <a href={href} className="px-3 py-2 rounded-lg hover:bg-green-50 transition-colors">{children}</a>
  );

  const [tests, setTests] = useState(null);
  const runSelfTests = () => {
    const cases = [
      { name: "Empty fields", input: { name: "", email: "", message: "", phone: "", company: "" }, token: "", expected: "Merci de compléter au moins Nom, Email et Message." },
      { name: "Honeypot filled", input: { name: "A", email: "a@b.c", message: "Hi", phone: "", company: "bot" }, token: "dummy", expected: "Merci, votre message est pris en compte." },
      { name: "Captcha missing", input: { name: "A", email: "a@b.c", message: "Hi", phone: "", company: "" }, token: "", expected: "Merci de valider le captcha." },
      { name: "Valid payload (token)", input: { name: "A", email: "a@b.c", message: "Hi", phone: "", company: "" }, token: "ok", expected: null },
      { name: "Valid payload (fallback ok)", input: { name: "A", email: "a@b.c", message: "Hi", phone: "", company: "" }, token: "", expected: null, fallback: { allowFallback: true, fallbackOk: true } },
      { name: "Fallback present but failed", input: { name: "A", email: "a@b.c", message: "Hi", phone: "", company: "" }, token: "", expected: "Merci de valider le captcha.", fallback: { allowFallback: true, fallbackOk: false } },
    ];
    const results = cases.map((c) => {
      const got = validateForm(c.input, c.token, c.fallback);
      const pass = got === c.expected;
      return { name: c.name, pass, got: String(got), expected: String(c.expected) };
    });
    setTests(results);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-green-600 flex items-center justify-center shadow">
              <span className="text-white font-bold">2G</span>
            </div>
            <div>
              <p className="text-lg font-semibold">2G RIED</p>
              <p className="text-xs text-gray-500 -mt-1">Espaces verts • Grand Est</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#realisations">Réalisations</NavLink>
            <NavLink href="#zone">Zone & Carte</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <a href="#devis" className="ml-3 px-4 py-2 rounded-2xl bg-green-600 text-white hover:opacity-90">Devis gratuit</a>
          </nav>

          <button className="md:hidden px-3 py-2 rounded-xl border" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu">☰</button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t">
            <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col">
              <a className="py-2" href="#services">Services</a>
              <a className="py-2" href="#realisations">Réalisations</a>
              <a className="py-2" href="#zone">Zone & Carte</a>
              <a className="py-2" href="#contact">Contact</a>
              <a className="py-2" href="#devis">Devis gratuit</a>
            </div>
          </div>
        )}
      </header>

      <section className="bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">Entretien & aménagement d'espaces verts</h1>
            <p className="mt-4 text-lg text-gray-600">Tonte, taille, haies, élagage, désherbage, débroussaillage, petites créations et maintenance régulière.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#devis" className="px-5 py-3 rounded-2xl bg-green-600 text-white font-medium hover:opacity-90">Demander un devis</a>
              <a href="#services" className="px-5 py-3 rounded-2xl border font-medium hover:bg-green-50">Voir nos services</a>
            </div>
            <ul className="mt-6 text-sm text-gray-600 grid grid-cols-2 gap-2 max-w-lg">
              <li>✅ Intervention rapide</li>
              <li>✅ Devis gratuit</li>
              <li>✅ Particuliers & pros</li>
              <li>✅ Colmar • Mulhouse • alentours</li>
            </ul>
          </div>
          <div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow">
              <img alt="Pelouse entretenue et haies taillées" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1920&auto=format&fit=crop" />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-14 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold">Nos services</h2>
          <p className="text-gray-600 mt-2 max-w-2xl">Liste non exhaustive — ajustable selon tes besoins réels.</p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { t: "Tonte & Bordures", d: "Tonte régulière, finitions propres, évacuation." },
              { t: "Taille de haies", d: "Haies nettes, lignes droites, déchets verts gérés." },
              { t: "Débroussaillage", d: "Terrains en friche, herbes hautes, remise au propre." },
              { t: "Élagage léger", d: "Petite taille d'arbres/arbustes (hors grimpe complexe)." },
              { t: "Désherbage", d: "Allées, terrasses, massifs, solutions adaptées." },
              { t: "Créations simples", d: "Gazon en plaques, paillage, bordures, massifs." },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border p-5 hover:shadow transition-shadow bg-white">
                <h3 className="font-semibold text-lg">{s.t}</h3>
                <p className="text-sm text-gray-600 mt-1">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="realisations" className="py-14 md:py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold">Réalisations (bientôt)</h2>
          <p className="text-gray-600 mt-2 max-w-2xl">Tu ajouteras tes photos ici plus tard.</p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="aspect-video rounded-2xl bg-white border grid place-items-center text-gray-400">
                <span>Photo #{i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="zone" className="py-14 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold">Zone d'intervention & Carte</h2>
          <p className="text-gray-600 mt-2">Colmar, Mulhouse, Widensolen et alentours (ajustable).</p>
          <div className="mt-6 rounded-2xl overflow-hidden border shadow-sm">
            <iframe title="Carte 2G RIED — Colmar" src="https://www.google.com/maps?q=Colmar%20France&output=embed" width="100%" height="420" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="mt-4 text-sm text-gray-500">Si l'iframe était bloquée : <a className="text-green-700 underline" href="https://www.google.com/maps?q=Colmar%20France" target="_blank" rel="noreferrer">ouvrir la carte</a>.</div>
        </div>
      </section>

      <section id="devis" className="py-14 md:py-20 bg-green-600 text-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Obtenir un devis gratuit</h2>
            <p className="mt-2 text-green-50">Réponse sous 24–48h ouvrées (indicatif).</p>
            <ul className="mt-4 text-green-50 text-sm space-y-1 list-disc pl-5">
              <li>Tarifs clairs selon la surface et la complexité</li>
              <li>Interventions ponctuelles ou contrat d'entretien</li>
              <li>Déplacement inclus dans un rayon défini</li>
            </ul>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
            <form onSubmit={onSubmit} className="grid gap-3">
              <input type="text" name="company" value={form.company} onChange={onChange} className="hidden" autoComplete="off" tabIndex={-1} aria-hidden="true" />

              <input name="name" value={form.name} onChange={onChange} placeholder="Nom" className="px-3 py-2 rounded-xl bg-white text-gray-800" />
              <input type="email" name="email" value={form.email} onChange={onChange} placeholder="Email" className="px-3 py-2 rounded-xl bg-white text-gray-800" />
              <input name="phone" value={form.phone} onChange={onChange} placeholder="Téléphone (optionnel)" className="px-3 py-2 rounded-xl bg-white text-gray-800" />
              <textarea name="message" value={form.message} onChange={onChange} placeholder="Votre besoin…" rows={4} className="px-3 py-2 rounded-xl bg-white text-gray-800" />

              <div className="rounded-xl border bg-white p-3 text-gray-800">
                <p className="text-sm mb-2">Vérification rapide :</p>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={humanCheck} onChange={(e) => setHumanCheck(e.target.checked)} />
                  Je confirme ne pas être un robot
                </label>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span>2 + 3 =</span>
                  <input value={mathAns} onChange={(e) => setMathAns(e.target.value)} className="w-16 px-2 py-1 rounded border" inputMode="numeric" />
                </div>
                {!pageReady && <p className="mt-2 text-xs text-gray-500">Activation dans quelques secondes…</p>}
              </div>

              <button
                type="submit"
                disabled={loading || !humanCheck || mathAns.trim() !== "5" || !pageReady}
                className="mt-1 px-4 py-2 rounded-2xl bg-white text-green-700 font-semibold hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Envoi…" : "Envoyer la demande"}
              </button>
              {status && <p className="text-sm text-white/90">{status}</p>}
            </form>
            <p className="text-xs text-green-50 mt-3">
              En soumettant ce formulaire, vous acceptez que vos données soient utilisées uniquement pour traiter votre demande,
              conformément à notre <a href="#confidentialite" className="underline">politique de confidentialité</a>.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold">Contact</h2>
          <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="rounded-2xl border p-4">
              <p className="text-gray-500">Email</p>
              <a className="font-medium text-green-700 underline" href="mailto:deuxgried@outlook.com">deuxgried@outlook.com</a>
            </div>
            <div className="rounded-2xl border p-4">
              <p className="text-gray-500">Téléphone</p>
              <span className="font-medium">à ajouter</span>
            </div>
            <div className="rounded-2xl border p-4">
              <p className="text-gray-500">Horaires</p>
              <span className="font-medium">Lun–Sam, 8h–19h</span>
            </div>
            <div className="rounded-2xl border p-4">
              <p className="text-gray-500">Zone</p>
              <span className="font-medium">Colmar • Mulhouse • environs</span>
            </div>
          </div>
        </div>
      </section>

      <section id="confidentialite" className="py-14 bg-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold">Politique de confidentialité</h2>
          <p className="mt-3 text-gray-700 max-w-3xl">
            2G RIED collecte uniquement les données nécessaires au traitement de votre demande (nom, email, téléphone, message).
            Vos informations ne sont ni revendues ni utilisées à des fins commerciales sans votre accord. Vous pouvez demander
            l'accès, la rectification ou la suppression de vos données en nous écrivant à
            <a className="ml-1 underline text-green-700" href="mailto:deuxgried@outlook.com">deuxgried@outlook.com</a>.
          </p>
          <ul className="mt-4 text-gray-700 list-disc pl-5 space-y-1 max-w-3xl">
            <li>Base légale : intérêt légitime à répondre à votre demande et exécution de mesures précontractuelles.</li>
            <li>Durée de conservation : 12 mois maximum après le dernier contact, sauf obligation légale différente.</li>
            <li>Hébergement : à définir lors du déploiement (ex. Vercel). Pas de script tiers chargé sur cette page.</li>
            <li>Anti-spam : utilisation d'un champ invisible (honeypot) et d'un mini captcha local.</li>
          </ul>
        </div>
      </section>

      <section id="tests" className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold">Self-tests (validation du formulaire)</h2>
            <button onClick={runSelfTests} className="px-4 py-2 rounded-xl border hover:bg-green-50">Lancer les tests</button>
          </div>
          {tests && (
            <div className="mt-4 overflow-auto border rounded-xl">
              <table className="w-full text-sm">
                <thead className="bg-green-50">
                  <tr>
                    <th className="text-left p-2">Cas</th>
                    <th className="text-left p-2">Résultat</th>
                    <th className="text-left p-2">Obtenu</th>
                    <th className="text-left p-2">Attendu</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((t, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2">{t.name}</td>
                      <td className="p-2">{t.pass ? "✅" : "❌"}</td>
                      <td className="p-2 whitespace-pre-wrap">{t.got}</td>
                      <td className="p-2 whitespace-pre-wrap">{t.expected}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!tests && <p className="mt-3 text-gray-600">Clique sur « Lancer les tests » pour exécuter 6 cas (champs vides, honeypot, captcha manquant, token valide, fallback OK, fallback KO).</p>}
        </div>
      </section>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} 2G RIED — Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <a href="#services" className="hover:text-gray-700">Services</a>
            <a href="#realisations" className="hover:text-gray-700">Réalisations</a>
            <a href="#zone" className="hover:text-gray-700">Zone & Carte</a>
            <a href="#contact" className="hover:text-gray-700">Contact</a>
            <a href="#confidentialite" className="hover:text-gray-700">Confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
