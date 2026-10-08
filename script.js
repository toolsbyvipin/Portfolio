/*
  PORTFOLIO UPDATE SYSTEM
  - Big 16:9 videos  -> add to `videos`
  - Shorts           -> paste IDs into `shortsPool` (any number, 4+ recommended)
  You only need the YouTube ID from the link:
    youtube.com/watch?v=XXXXXXXXXXX   -> XXXXXXXXXXX
    youtube.com/shorts/XXXXXXXXXXX    -> XXXXXXXXXXX
*/
const videos = [
  {
    title: "unDoom — Product Animation",
    category: "SaaS / Product",
    description: "Apple-inspired product presentation for a distraction-free YouTube extension I created.",
    youtubeId: "oaC8jh2Nn6I",
    featured: true
  },
  {
    title: "Documentary / Investigation Edit",
    category: "Documentary",
    description: "Dark, cinematic storytelling with fast visual pacing and an investigation-led style.",
    youtubeId: "D6AnTcpJL6w",
    featured: true
  }
];

/*
  SHORTS POOL
  Every page load picks SHORTS_TO_SHOW different Shorts from this pool at random.
  Duplicates are removed automatically, so no Short is ever shown twice.
  Add as many IDs as you like from https://www.youtube.com/@VIPinside1/shorts
*/
const SHORTS_TO_SHOW = 4;
const shortsPool = [
  { title: "Micro-Wave — Fast Paced Edit", youtubeId: "Sa94R81Otfs" }
  // { title: "Short title", youtubeId: "PASTE_ID_HERE" },
  // { title: "Short title", youtubeId: "PASTE_ID_HERE" },
  // { title: "Short title", youtubeId: "PASTE_ID_HERE" },
  // { title: "Short title", youtubeId: "PASTE_ID_HERE" },
];

const projects = [
  {
    tag: "Product · GitHub",
    title: "unDoom",
    description: "A distraction-free YouTube experience designed to remove the doom-scrolling layer and help users focus.",
    url: "https://github.com/toolsbyvipin/unDoom"
  },
  {
    tag: "Tool · GitHub",
    title: "YT Downloader",
    description: "A YouTube Music downloader project built as a practical desktop tool.",
    url: "https://github.com/toolsbyvipin/YT-DOWNLOADER-"
  }
];

const videoGrid = document.querySelector("#videoGrid");
const projectGrid = document.querySelector("#projectGrid");

/* ---------- Big videos ---------- */
videoGrid.innerHTML = videos.map(v => `
  <article class="video-card ${v.featured ? "featured" : ""}">
    <div class="video-frame">
      <iframe
        src="https://www.youtube.com/embed/${v.youtubeId}"
        title="${v.title}"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>
    </div>
    <div class="video-info">
      <div>
        <div class="video-title">${v.title}</div>
        <div class="video-meta">${v.category}</div>
      </div>
      <div class="video-description">${v.description}</div>
    </div>
  </article>
`).join("");

/* ---------- Shorts row (random, no repeats) ---------- */
(function renderShorts() {
  // 1. remove duplicate IDs and empty/placeholder entries
  const seen = new Set();
  const unique = shortsPool.filter(s => {
    const id = (s.youtubeId || "").trim();
    if (!id || id.startsWith("PASTE_") || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
  if (!unique.length) return;

  // 2. Fisher–Yates shuffle, then take the first N
  for (let i = unique.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [unique[i], unique[j]] = [unique[j], unique[i]];
  }
  const picked = unique.slice(0, SHORTS_TO_SHOW);

  // 3. styles (kept here so only script.js needs to change)
  const style = document.createElement("style");
  style.textContent = `
    .shorts-head{display:flex;justify-content:space-between;align-items:baseline;margin:38px 0 18px;gap:20px}
    .shorts-head h3{margin:0;font-size:13px;letter-spacing:.18em;font-weight:500;color:#777;text-transform:uppercase}
    .shorts-head a{color:#aaa;text-decoration:none;font-size:12px}
    .shorts-head a:hover{color:#fff}
    .shorts-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
    .short-card .short-frame{aspect-ratio:9/16;background:#111;border:1px solid #252525;border-radius:16px;overflow:hidden}
    .short-card iframe{width:100%;height:100%;border:0;display:block}
    .short-card .short-title{margin-top:12px;font-size:13px;font-weight:600;color:#ddd}
    @media(max-width:900px){.shorts-grid{grid-template-columns:repeat(2,1fr)}}
  `;
  document.head.appendChild(style);

  // 4. markup, inserted right under the big videos
  const wrap = document.createElement("div");
  wrap.className = "shorts-wrap";
  wrap.innerHTML = `
    <div class="shorts-head">
      <h3>Shorts</h3>
      <a href="https://www.youtube.com/@VIPinside1/shorts" target="_blank" rel="noreferrer">More on YouTube ↗</a>
    </div>
    <div class="shorts-grid">
      ${picked.map(s => `
        <article class="short-card">
          <div class="short-frame">
            <iframe
              src="https://www.youtube.com/embed/${s.youtubeId}"
              title="${s.title || "Short"}"
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
          </div>
          ${s.title ? `<div class="short-title">${s.title}</div>` : ""}
        </article>
      `).join("")}
    </div>
  `;
  videoGrid.insertAdjacentElement("afterend", wrap);
})();

/* ---------- Projects ---------- */
projectGrid.innerHTML = projects.map(p => `
  <article class="project">
    <div>
      <div class="project-tag">${p.tag}</div>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
    </div>
    <a href="${p.url}" target="_blank" rel="noreferrer">View project ↗</a>
  </article>
`).join("");
