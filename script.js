/*
  PORTFOLIO UPDATE SYSTEM
  Add a new object to `videos` whenever you have a better edit.
  You only need the YouTube ID from the link.
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
  },
  {
    title: "Micro-Wave — Fast Paced Edit",
    category: "Short Form",
    description: "A high-energy short built around rapid cuts, motion and rhythm.",
    youtubeId: "Sa94R81Otfs",
    featured: false
  } , 
  {
    title: "Study Ratna - Shorts Learning",
    category: "Short Form",
    description: "Fast-paced educational short-form edit focused on clean pacing and engaging visuals.",
    youtubeId: "izVwX-fH0KM",
    featured: false
  },
  {
    title: "Solve Arena - Promotional Humorous Edit",
    category: "Promotional",
    description: "A humorous promotional edit built around fast pacing, timing and visual storytelling.",
    youtubeId: "ed1QlA7JfzQ",
    featured: false
  },
  {
    title: "Cinematic Film Clip Edit",
    category: "Cinematic",
    description: "A cinematic film edit focused on atmosphere, pacing and visual composition.",
    youtubeId: "CgXw3ydSizQ",
    featured: false
  }
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
