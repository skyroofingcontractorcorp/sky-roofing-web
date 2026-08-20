document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  const setMenu = (open) => {
    links.classList.toggle("is-open", open);
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    setMenu(!links.classList.contains("is-open"));
  });
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  const desktop = window.matchMedia("(min-width: 901px)");
  desktop.addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('cert-modal')?.classList.remove('open');
});