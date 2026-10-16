const gallery = document.querySelector("#gallery");
const form = document.querySelector("#message-form");
const messageInput = document.querySelector("#message");
const charCount = document.querySelector("#char-count");
const feedback = document.querySelector("#form-feedback");

function revealOnScroll() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach(el => observer.observe(el));
}
function makePetals() {
  const field = document.querySelector(".petal-field");
  if (!field || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const count = window.innerWidth < 700 ? 9 : 17;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${12 + Math.random() * 16}s`;
    petal.style.animationDelay = `${-Math.random() * 24}s`;
    petal.style.transform = `scale(${0.55 + Math.random() * 0.75})`;
    field.appendChild(petal);
  }
}
function renderGallery(items) {
  if (!items.length) return;
  gallery.replaceChildren();
  items.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "gallery-item";
    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.url;
      video.controls = true;
      video.preload = "metadata";
      video.playsInline = true;
      video.setAttribute("aria-label", item.caption || "Video de Promo 5B");
      card.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = item.url;
      img.alt = item.caption || `Recuerdo de Promo 5B ${index + 1}`;
      img.loading = "lazy";
      card.appendChild(img);
    }
    if (item.caption) {
      const caption = document.createElement("p");
      caption.className = "gallery-caption";
      caption.textContent = item.caption;
      card.appendChild(caption);
    }
    gallery.appendChild(card);
  });
}
messageInput.addEventListener("input", () => {
  charCount.textContent = `${[...messageInput.value].length} / 50 caracteres`;
});
form.addEventListener("submit", event => {
  event.preventDefault();
  feedback.classList.remove("error");
  feedback.textContent = "La página ya funciona en GitHub Pages, pero para guardar mensajes necesitamos conectar una base de datos externa.";
});
revealOnScroll();
makePetals();
