"use client";

import { FormEvent, useMemo, useState } from "react";

const products = [
  {
    tag: "Cel mai simplu start",
    title: "Fără baterie",
    price: "de la 2.900 lei",
    body: "Folosești energia produsă exact când este soare: frigider, router, laptop, aer condiționat.",
    items: ["2 panouri + microinvertor", "Monitorizare în aplicație", "Ideal pentru consumul de zi"],
    accent: "cream",
  },
  {
    tag: "Pentru mai mult control",
    title: "Cu baterie",
    price: "de la 5.900 lei",
    body: "Păstrezi energia produsă ziua și o folosești seara, când consumul casei continuă.",
    items: ["Panouri + microinvertor", "Baterie 1,5–3 kWh", "Consum mai mare din energia proprie"],
    accent: "mint",
  },
];

export default function Home() {
  const [consumption, setConsumption] = useState(250);
  const [city, setCity] = useState("București");
  const [submitted, setSubmitted] = useState(false);

  const estimate = useMemo(() => {
    const annualProduction = city === "Constanța" || city === "Craiova" ? 920 : 820;
    const dailyUse = consumption / 30;
    const selfUse = Math.min(annualProduction, dailyUse * 365 * 0.72);
    const saving = Math.round(selfUse * 1.05);
    return { annualProduction, saving, coverage: Math.min(32, Math.round((saving / (consumption * 12 * 1.05)) * 100)) };
  }, [consumption, city]);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="Balcon Solar acasă"><span className="brand-mark">◒</span> balcon<span>solar</span></a>
        <div className="nav-links"><a href="#cum-functioneaza">Cum funcționează</a><a href="#optiuni">Opțiuni</a><a href="#intrebari">Întrebări</a></div>
        <a className="nav-cta" href="#oferta">Vreau o ofertă <span>↗</span></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> Primul tău pas spre autoconsum</div>
          <h1>Soare pe balcon.<br /><em>Mai puțin</em> pe factură.</h1>
          <p className="hero-lede">Sisteme solare compacte pentru apartamente din România. Produci energie ziua, reduci consumul din rețea și ai control mai bun asupra facturii.</p>
          <div className="hero-actions"><a className="button primary" href="#calculator">Calculează economia <span>↓</span></a><a className="text-link" href="#cum-functioneaza">Vezi cum funcționează <span>→</span></a></div>
          <div className="trust-row"><div className="avatars"><span>A</span><span>M</span><span>R</span></div><p><strong>Primele locuri pentru testare</strong><br />Înscrie-te și află dacă balconul tău este potrivit.</p></div>
        </div>
        <div className="hero-art" aria-label="Panou solar montat pe un balcon, fotografie realistă">
          <img src="/hero-balcony.png" alt="Două panouri solare montate pe balustrada unui balcon modern" />
          <div className="photo-badge"><span>◒</span><strong>800 W</strong><small>balcony solar</small></div>
          <div className="art-caption"><span className="live-dot" /> Fotografie de concept · România</div>
        </div>
      </section>

      <section className="metrics"><div className="shell metrics-grid"><div><strong>800 W</strong><span>putere maximă</span></div><div><strong>820 kWh</strong><span>producție anuală estimată</span></div><div><strong>230 V</strong><span>conectare la locul de consum</span></div><div><strong>01</strong><span>balcon. un început bun.</span></div></div></section>

      <section className="section shell intro" id="cum-functioneaza"><div className="section-label">01 / IDEEA</div><div><h2>O soluție mică pentru o problemă mare.</h2><p>Nu toată lumea are casă, acoperiș sau buget pentru un sistem fotovoltaic clasic. Dar aproape fiecare apartament are un balcon și consumă energie în timpul zilei.</p></div><div className="intro-note"><span>✦</span><p>Gândește-l ca pe un „consum negativ”: energia produsă de panouri este folosită întâi în casa ta.</p></div></section>

      <section className="section shell calculator-section" id="calculator"><div className="section-label">02 / ESTIMATOR</div><div className="calc-layout"><div><h2>Cât ai putea economisi?</h2><p className="muted">O estimare orientativă pentru un sistem de 800 W. Rezultatul depinde de orientarea balconului, umbrire și obiceiurile tale.</p><div className="calc-card"><label htmlFor="consumption">Consum lunar estimat <output>{consumption} kWh</output></label><input id="consumption" type="range" min="80" max="600" step="10" value={consumption} onChange={(e) => setConsumption(Number(e.target.value))} /><div className="range-labels"><span>80 kWh</span><span>600 kWh</span></div><label htmlFor="city">Orașul tău</label><select id="city" value={city} onChange={(e) => setCity(e.target.value)}><option>București</option><option>Constanța</option><option>Craiova</option><option>Cluj-Napoca</option><option>Iași</option><option>Timișoara</option></select></div></div><div className="result-card"><span className="result-kicker">ESTIMARE ANUALĂ</span><strong>{estimate.saving.toLocaleString("ro-RO")} lei</strong><p>economisiți prin energia folosită direct în locuință</p><div className="result-line"><span>Producție posibilă</span><b>~{estimate.annualProduction} kWh/an</b></div><div className="result-line"><span>Acoperire estimată</span><b>până la {estimate.coverage}%</b></div><a href="#oferta" className="button light">Vreau calculul meu exact <span>↗</span></a><small>Calcul orientativ, nu ofertă financiară.</small></div></div></section>

      <section className="section shell options" id="optiuni"><div className="section-label">03 / ALEGEREA TA</div><div className="section-heading"><h2>Începi simplu.<br />Extinzi când ești pregătit.</h2><p>Două configurații, aceeași idee: mai multă energie produsă de tine.</p></div><div className="product-grid">{products.map((product) => <article className={`product-card ${product.accent}`} key={product.title}><span className="product-tag">{product.tag}</span><h3>{product.title}</h3><p>{product.body}</p><strong className="product-price">{product.price}</strong><ul>{product.items.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul><a href="#oferta" className="product-link">Solicită o ofertă <span>→</span></a></article>)}</div></section>

      <section className="section shell legal"><div className="legal-card"><div className="section-label">04 / TRANSPARENȚĂ</div><div><h2>„Plug-and-play” nu înseamnă fără reguli.</h2><p>În România, un sistem conectat la instalația locuinței trebuie ales și instalat responsabil. Te ajutăm să înțelegi pașii, documentele și condițiile tehnice înainte să iei o decizie.</p><a className="text-link" href="https://anre.ro/wp-content/uploads/2026/03/QA-instalare-panouri-solare-sub-800W.pdf" target="_blank" rel="noreferrer">Citește ghidul ANRE <span>↗</span></a></div></div></section>

      <section className="section shell offer" id="oferta"><div className="offer-copy"><div className="section-label">05 / VALIDARE</div><h2>Balconul tău poate produce ceva mai mult.</h2><p>Lasă-ne câteva detalii. Nu vinzi nimic și nu primești spam. Colectăm primele cereri pentru a construi oferta potrivită pentru România.</p><div className="offer-points"><span>✦</span><p>Răspundem în maximum 2 zile lucrătoare.</p></div></div><form className="lead-form" onSubmit={submitForm}>{submitted ? <div className="success"><span>✓</span><h3>Mulțumim pentru interes!</h3><p>Am înregistrat cererea ta de testare. Revenim cu câteva întrebări pentru o estimare mai exactă.</p><a href="#top" className="text-link">Înapoi sus <span>↑</span></a></div> : <><div className="form-head"><span>01</span><h3>Spune-ne despre balconul tău</h3></div><label>Nume și prenume<input required name="name" placeholder="Ex. Andrei Popescu" /></label><label>Email<input required type="email" name="email" placeholder="tu@email.ro" /></label><div className="form-row"><label>Oraș<input required name="city" placeholder="București" /></label><label>Consum lunar<select name="use"><option>Sub 150 kWh</option><option>150–300 kWh</option><option>300–500 kWh</option><option>Peste 500 kWh</option></select></label></div><label>Ce te interesează?<select name="interest"><option>Sistem fără baterie</option><option>Sistem cu baterie</option><option>Nu știu încă</option></select></label><label className="check"><input type="checkbox" required /> Sunt de acord să fiu contactat(ă) pentru această validare.</label><button className="button primary full" type="submit">Vreau o ofertă pentru balconul meu <span>↗</span></button><small>Datele tale sunt folosite doar pentru acest test de interes.</small></>}</form></section>

      <section className="faq shell" id="intrebari"><div className="section-label">ÎNTREBĂRI FRECVENTE</div><div className="faq-grid"><div><h2>Înainte să cumperi,<br />merită să întrebi.</h2><p className="muted">Iar dacă nu găsești răspunsul, scrie-ne.</p></div><div className="faq-list"><details open><summary>Pot instala sistemul pe orice balcon?<span>+</span></summary><p>Depinde de orientare, umbrire, spațiul disponibil, rezistența prinderii și regulile clădirii. Evaluarea acestor lucruri face parte din oferta corectă.</p></details><details><summary>Este nevoie de baterie?<span>+</span></summary><p>Nu neapărat. Fără baterie, sistemul este mai accesibil și funcționează cel mai bine dacă ai consum în timpul zilei. Bateria ajută la folosirea energiei și seara.</p></details><details><summary>În cât timp îmi recuperez investiția?<span>+</span></summary><p>Depinde de prețul energiei, orientarea balconului și cât din producție consumi direct. Calculatorul de mai sus este doar o primă estimare.</p></details></div></div></section>

      <footer className="footer"><div className="shell footer-inner"><a className="brand" href="#top"><span className="brand-mark">◒</span> balcon<span>solar</span></a><p>Un experiment pentru energie mai simplă, în apartamentele din România.</p><span className="footer-note">© 2026 · În faza de validare</span></div></footer>
    </main>
  );
}
