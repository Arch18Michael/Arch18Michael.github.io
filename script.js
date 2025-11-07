
const latestAnimes = [
  {
    src: "img/jujutsu kaisen.jpg",
    alt: "Jujutsu Kaisen",
    name: "Jujutsu Kaisen S2",
  },
  { src: "img/solo leveling.jpg", alt: "Solo Leveling", name: "Solo Leveling" },
  { src: "img/frieren(3).jpg", alt: "Frieren", name: "Frieren" },
  { src: "img/spy.jpg", alt: "Spy x Family", name: "Spy x Family S2" },
  { src: "img/BHA.jpg", alt: "Boku no Hero Academia", name: "BNHA" },
  { src: "img/Gachiakuta.jpg", alt: "Gachiakuta", name: "Gachiakuta" },
];


const catalogAnimes = [
  {
    id: "naruto",
    titulo: "Naruto Shippuden",
    descripcion: "Ninja clásico",
    descripcionDetallada:
      "Naruto Uzumaki es un joven ninja que sueña con convertirse en Hokage y proteger su aldea...",
    imagen: "img/naruto.jpeg",
    link : "https://www3.animeflv.net/anime/naruto-shippuden-hd",
  },
  {
    id: "sololeveling",
    titulo: "Solo leveling",
    descripcion: "Fantasía surcoreana",
    descripcionDetallada:
      "Sung Jin-woo, el cazador más débil del mundo, obtiene la habilidad de subir de nivel como en un videojuego.",
    imagen: "img/solo leveling.jpg",
    link: "https://www3.animeflv.net/anime/ore-dake-level-up-na-ken",
  },
  {
    id: "demonslayer",
    titulo: "Demon Slayer",
    descripcion: "Caza demonios",
    descripcionDetallada:
      "Tanjiro Kamado lucha contra demonios para proteger a su hermana Nezuko y salvar a la humanidad...",
    imagen: "img/demon slayer.jpg",
    link: "https://www3.animeflv.net/anime/kimetsu-no-yaiba",
  },
  {
    id: "attackontitan",
    titulo: "Attack on Titan",
    descripcion: "Humanidad vs titanes",
    imagen: "img/attack on titen.jpg",
    descripcionDetallada:
      "En un mundo donde la humanidad está al borde de la extinción por culpa de titanes devoradores de hombres.",
    link: "https://www3.animeflv.net/anime/shingeki-no-kyojin-the-final-season",
  },
  {
    id: "jujutsukaisen",
    titulo: "Jujutsu Kaisen",
    descripcion: "Hechiceros y maldiciones",
    imagen: "img/jujutsu kaisen.jpg",
    descripcionDetallada:
      "Yuji Itadori se une a una organización de hechiceros para combatir maldiciones.",
    link:"https://www3.animeflv.net/anime/jujutsu-kaisen-tv",
  },
  {
    id: "sailormoon",
    titulo: "Sailor Moon",
    descripcion: "Chicas mágicas y peleas",
    imagen: "img/Sailor.jpg",
    descripcionDetallada:
      "Usagi Tsukino y sus amigas las Sailor Senshi defienden la Tierra usando poderes lunares.",
    link:"https://www3.animeflv.net/anime/sailor-moon",
  },
];


//detalles
function generateLatestAnimeGallery() {
  const container = document.getElementById("latest-anime-gallery");
  if (!container) return;
  container.innerHTML = latestAnimes
    .map(
      (anime) => `
    <div class="col-md-2 col-6">
      <img src="${anime.src}" class="img-fluid rounded shadow-sm" alt="${anime.alt}">
      <p class="text-center mt-2">${anime.name}</p>
    </div>
  `
    )
    .join("");
}

function generateCatalog() {
  const container = document.getElementById('animeCatalogo');
  if (!container) return;

  container.innerHTML = catalogAnimes.map(anime => `
    <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div class="card h-100 bg-dark text-light shadow-sm">
        <img src="${anime.imagen}" class="card-img-top" alt="${anime.titulo}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${anime.titulo}</h5>
          <p class="card-text small text-muted">${anime.descripcion}</p>
          <button class="btn btn-danger btn-sm mt-auto" data-id="${anime.id}" data-bs-toggle="modal" data-bs-target="#detalleModal">
            Ver detalle
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Evento para abrir el modal
  document.querySelectorAll('[data-bs-toggle="modal"]').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.target.getAttribute('data-id');
      const anime = catalogAnimes.find(a => a.id === id);
      if (anime) {
        document.getElementById('modalTitulo').textContent = anime.titulo;
        document.getElementById('modalDescripcion').textContent = anime.descripcionDetallada;
        document.getElementById('modalImagen').src = anime.imagen;
        document.getElementById('modalImagen').alt = anime.titulo;
        document.getElementById('reproducirBtn').onclick = () => window.open(anime.link, '_blank');
      }
    });
  });
}



function mostrarDetalle() {
  const container = document.getElementById("detalle-contenedor");
  if (!container) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const tipo = params.get("tipo");
  let item;
  if (tipo === "catalogo") item = catalogAnimes.find((a) => a.id === id);
  else if (tipo === "tienda") item = tiendaItems.find((a) => a.id === id);
  if (!item) {
    container.innerHTML =
      "<p class='text-light text-center'>Elemento no encontrado.</p>";
    return;
  }
  container.innerHTML = `
    <div class="card bg-dark text-light shadow-sm">
      <img src="${item.imagen}" class="card-img-top" alt="${item.titulo}">
      <div class="card-body">
        <h2 class="card-title text-danger">${item.titulo}</h2>
        <p class="card-text">${item.descripcionDetallada}</p>
        <a href="${
          tipo === "catalogo" ? "catalogo.html" : "tienda.html"
        }" class="btn btn-secondary mt-2">Volver</a>
      </div>
    </div>
  `;
}

//modo oscuro
function setupThemeToggleButton() {
  const navContainer = document.querySelector(".navbar .container div");
  const logo = document.getElementById("siteLogo");
  if (!navContainer) return;

  const modeBtn = document.createElement("button");
  modeBtn.className = "btn btn-outline-light btn-sm ms-2 theme-toggle";
  const icon = document.createElement("span");
  icon.className = "material-symbols-outlined";
  modeBtn.appendChild(icon);
  navContainer.appendChild(modeBtn);

  function updateLogo(isLight) {
    if (!logo) return;
    logo.src = isLight ? "img/EvoTama_logo.png" : "img/EvoTama_Logo_white.png";
  }

  const toggleTheme = () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    icon.textContent = isLight ? "dark_mode" : "light_mode";
    updateLogo(isLight);
  };

  modeBtn.addEventListener("click", toggleTheme);

  // Estado inicial
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isLight = savedTheme === "light" || (!savedTheme && !prefersDark);
  document.body.classList.toggle("light-mode", isLight);
  icon.textContent = isLight ? "dark_mode" : "light_mode";
  updateLogo(isLight);
}

//complejos
function performSearch() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;
  const query = searchInput.value.toLowerCase().trim();
  const sections = document.querySelectorAll(".searchable");
  if (!query) {
    sections.forEach((sec) => (sec.style.display = "block"));
    return;
  }
  sections.forEach((sec) => {
    const title = (sec.getAttribute("data-title") || "").toLowerCase();
    const text = sec.textContent.toLowerCase();
    sec.style.display =
      title.includes(query) || text.includes(query) ? "block" : "none";
  });
}

//inicializacion
document.addEventListener("DOMContentLoaded", () => {
  generateLatestAnimeGallery();
  generateCatalog();
  generateTienda();
  mostrarDetalle();
  setupThemeToggleButton();

  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const sidebarMenu = document.getElementById("sidebarMenu");

  if (hamburgerBtn && sidebarMenu) {
    hamburgerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebarMenu.classList.toggle("show");
      const icon = hamburgerBtn.querySelector(".material-symbols-outlined");
      if (icon)
        icon.textContent = sidebarMenu.classList.contains("show")
          ? "close"
          : "menu";
      hamburgerBtn.style.left = sidebarMenu.classList.contains("show")
        ? "270px"
        : "15px";
    });
  }
});

function abrirDetalle(id, tipo) {
  let item;
  if (tipo === 'catalogo') item = catalogAnimes.find(a => a.id === id);
  else if (tipo === 'tienda') item = tiendaItems.find(a => a.id === id);
  if (!item) return;

  // Insertar datos en el modal
  document.getElementById('detalleTitulo').textContent = item.titulo;
  document.getElementById('detalleDescripcion').textContent = item.descripcionDetallada;
  document.getElementById('detalleImagen').src = item.imagen;

  // Mostrar modal con Bootstrap
  const modalEl = document.getElementById('detalleModal');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

