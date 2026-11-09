import { career, shipItems, type CareerItem } from "./career";

function esc(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function section(item: CareerItem, dev: boolean): string {
  const label = item.kind === "career" ? "Career" : "About Spencer";
  const pending = dev && item.status !== "approved"
    ? `<p class="banner">PLACEHOLDER: ${esc(item.note || item.topic)}</p>`
    : "";
  const fact = item.factLine ? `<p>${esc(item.factLine)}</p>` : "";
  return `<section aria-labelledby="topic-${esc(item.id)}">
    <h2 id="topic-${esc(item.id)}">${esc(item.topic)}</h2>
    <p class="kicker">${label}</p>
    ${pending}
    ${fact}
    <p class="where">${esc(item.world.pageTitle)}. ${esc(item.world.text)}</p>
  </section>`;
}

export function careerPageHtml(dev = false): string {
  const items = shipItems(dev);
  const careerItems = items.filter((item) => item.kind === "career");
  const flavor = items.filter((item) => item.kind === "personal");
  const contact = career.contact.status === "approved" ? career.contact : null;
  const resume = career.resume.status === "approved" && career.resume.href ? career.resume : null;
  const draft = dev && !career.reviewedBySpencer
    ? `<p class="draft">Draft content: awaiting Spencer's review</p>`
    : "";
  const contactBlock = contact
    ? `<section aria-labelledby="contact-heading">
        <h2 id="contact-heading">${esc(contact.heading || "CONTACT")}</h2>
        <p>${esc(contact.intro || "")}</p>
        <ul>
          ${(contact.details ?? []).map((detail) => `<li><span>${esc(detail.label)}</span> <a href="${esc(detail.href)}">${esc(detail.value)}</a></li>`).join("")}
        </ul>
      </section>`
    : "";
  const resumeBlock = resume
    ? `<p><a href="${esc(resume.href || "")}" download>Download resume (PDF)</a></p>`
    : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Spencer Sweeney: Career</title>
  <meta name="description" content="Career notes for Spencer Sweeney, software engineer." />
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    body {
      margin: 0; background: #14110e; color: #fff6e8;
      font-family: "Iowan Old Style", Palatino, "Palatino Linotype", Georgia, serif;
      line-height: 1.45;
    }
    a { color: #ffe7a3; }
    a:focus-visible, button:focus-visible { outline: 3px solid #ffe7a3; outline-offset: 3px; }
    header, main, footer { width: min(880px, calc(100% - 32px)); margin: 0 auto; }
    header { padding: 28px 0 8px; }
    h1 { font-size: 2.4rem; margin: 0 0 8px; color: #ffe7a3; }
    h2 { margin: 0 0 6px; font-size: 1.4rem; color: #ffe7a3; }
    .summary { margin: 0 0 16px; font-size: 1.15rem; }
    nav { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 20px; }
    nav a, .links a {
      display: inline-flex; align-items: center; min-height: 48px; padding: 8px 14px;
      border: 2px solid #ffe7a3; border-radius: 8px; text-decoration: none; background: #231c16;
    }
    section { background: #231c16; border: 1px solid #4a3b28; border-radius: 12px; padding: 16px 18px; margin: 0 0 12px; }
    .kicker { margin: 0; color: #fff6e8; font-size: 0.95rem; }
    .where { color: #fff6e8; }
    ul { padding-left: 1.1rem; }
    li { margin: 8px 0; }
    li a { display: inline-flex; align-items: center; min-height: 44px; }
    footer { padding: 8px 0 32px; color: #f0e2c8; }
    .draft { border: 1px dashed #ff4fd8; color: #ffd6f4; padding: 8px; }
    .banner { border: 2px dashed #ff4fd8; color: #ffd6f4; padding: 8px; }
    @media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto; } }
  </style>
</head>
<body>
  <header>
    <h1>${esc(career.person.name)}</h1>
    <p class="summary">${esc(career.person.summary)}</p>
    <nav aria-label="Career sections">
      <a href="#career">Career</a>
      <a href="#discoveries">Discoveries</a>
      <a href="#contact">Contact</a>
      <a href="/lampkeep/">Play Lampkeep</a>
      <a href="/">Back to the space site</a>
    </nav>
  </header>
  <main>
    <div id="career">${careerItems.map((item) => section(item, dev)).join("")}</div>
    ${resumeBlock}
    <div id="contact">${contactBlock}</div>
    <h2 id="discoveries">Found in the game</h2>
    <div id="flavor">${flavor.map((item) => section(item, dev)).join("")}</div>
  </main>
  <footer>
    ${draft}
    <p class="links"><a href="/lampkeep/">Play Lampkeep</a> <a href="/">Back to the space site</a></p>
    <p>Everything here is readable without playing.</p>
  </footer>
  <script>
    try {
      var raw = localStorage.getItem("lampkeep.v4");
      var found = raw ? (JSON.parse(raw).foundIds || []) : [];
      document.querySelectorAll("section[aria-labelledby]").forEach(function (node) {
        var id = (node.getAttribute("aria-labelledby") || "").replace("topic-", "");
        if (found.indexOf(id) >= 0) {
          var mark = document.createElement("p");
          mark.textContent = "Found in the game";
          node.appendChild(mark);
        }
      });
    } catch (err) { /* storage optional */ }
  </script>
</body>
</html>`;
}
