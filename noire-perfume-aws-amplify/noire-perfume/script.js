const moodData = {
  afterdark: {
    image: "images/noire-amber.jpg",
    alt: "Amber Veil perfume bottle in warm amber light",
    label: "NO. 01 — AMBER VEIL",
    title: "The art of<br><em>staying late.</em>",
    description: "Warm amber, smoked cedar and skin musk. The kind of warmth that draws people a little closer.",
    notes: ["Amber resin", "Smoked cedar", "Skin musk"]
  },
  clean: {
    image: "images/golden-hour.jpg",
    alt: "Solstice perfume bottle in golden light",
    label: "NO. 03 — SOLSTICE",
    title: "Quietly<br><em>magnetic.</em>",
    description: "Bright citrus, soft iris and mineral woods. Clean, considered, and never trying too hard.",
    notes: ["Bergamot", "Iris", "Mineral woods"]
  },
  desire: {
    image: "images/midnight-oud.jpg",
    alt: "Midnight Oud perfume bottle in dark teal shadows",
    label: "NO. 02 — MIDNIGHT OUD",
    title: "A little<br><em>dangerous.</em>",
    description: "Smoky oud, black pepper and incense. Deep, unapologetic, and made for the hours after midnight.",
    notes: ["Smoky oud", "Black pepper", "Incense"]
  },
  golden: {
    image: "images/golden-hour.jpg",
    alt: "Solstice perfume bottle in warm golden light",
    label: "NO. 03 — SOLSTICE",
    title: "Hold on to<br><em>the last light.</em>",
    description: "Mandarin, golden amber and creamy sandalwood. The lingering warmth of a day you wish would last.",
    notes: ["Mandarin", "Golden amber", "Sandalwood"]
  }
};

const moodRoot = document.querySelector(".mood-experience");
const moodImage = document.getElementById("moodImage");
const resultLabel = document.getElementById("resultLabel");
const resultTitle = document.getElementById("resultTitle");
const resultDescription = document.getElementById("resultDescription");
const resultNotes = document.getElementById("resultNotes");

function selectMood(key) {
  const data = moodData[key];
  if (!data) return;
  moodRoot.dataset.mood = key;
  moodImage.style.opacity = "0";
  window.setTimeout(() => {
    moodImage.src = data.image;
    moodImage.alt = data.alt;
    moodImage.onload = () => { moodImage.style.opacity = "1"; };
    if (moodImage.complete) moodImage.style.opacity = "1";
  }, 160);

  resultLabel.textContent = data.label;
  resultTitle.innerHTML = data.title;
  resultDescription.textContent = data.description;
  resultNotes.replaceChildren(...data.notes.map(note => {
    const chip = document.createElement("span");
    chip.textContent = note;
    return chip;
  }));

  document.querySelectorAll(".mood-option").forEach(button => {
    const active = button.dataset.mood === key;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  resultTitle.parentElement.style.animation = "none";
  void resultTitle.parentElement.offsetWidth;
  resultTitle.parentElement.style.animation = "";
}

document.querySelectorAll(".mood-option").forEach(button => {
  button.addEventListener("click", () => selectMood(button.dataset.mood));
});
document.querySelectorAll("[data-product-mood]").forEach(card => {
  card.addEventListener("click", () => selectMood(card.dataset.productMood));
});

// Scroll reveal, with a graceful fallback for browsers without IntersectionObserver.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}

// Mobile navigation
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
document.querySelectorAll(".desktop-nav a").forEach(link => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Gentle cursor parallax on large screens only; disabled for reduced-motion users.
const heroArt = document.getElementById("heroArt");
if (heroArt && window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroArt.addEventListener("mousemove", event => {
    const rect = heroArt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const bottle = heroArt.querySelector(".hero-bottle");
    bottle.style.translate = `${x * 9}px ${y * 9}px`;
  });
  heroArt.addEventListener("mouseleave", () => {
    heroArt.querySelector(".hero-bottle").style.translate = "0 0";
  });
}
