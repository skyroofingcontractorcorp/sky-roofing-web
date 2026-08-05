document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  /* ---------- Fondo de la navbar al hacer scroll ---------- */
  const onScroll = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll(); // aplica el estado correcto al cargar la página
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menú hamburguesa ---------- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  const setMenu = (open) => {
    links.classList.toggle("is-open", open);
    toggle.classList.toggle("is-open", open);
    // aria-expanded le dice a los lectores de pantalla si está abierto
    toggle.setAttribute("aria-expanded", String(open));
  };

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    setMenu(!links.classList.contains("is-open"));
  });

  // Al tocar un enlace el menú se cierra (importante para los #anclajes,
  // porque la página no recarga y el panel quedaría abierto encima)
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setMenu(false));
  });

  // Tocar fuera del menú lo cierra
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) setMenu(false);
  });

  // Tecla Escape lo cierra y devuelve el foco al botón
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Si se pasa a escritorio con el menú abierto, se limpia el estado
  const desktop = window.matchMedia("(min-width: 901px)");
  desktop.addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });
});
