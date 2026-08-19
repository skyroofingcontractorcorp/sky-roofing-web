/* scroll_reveal.js
   1) Revela con una transición suave cualquier elemento con [data-reveal]
      cuando entra en pantalla al hacer scroll.
   2) Activa scroll suave en los enlaces internos de ancla (href="#seccion").
   Colócalo antes de </body>: <script src="scroll_reveal.js" defer></script> */

(function () {
  "use strict";

  const items = document.querySelectorAll("[data-reveal]");

  // Si el navegador no soporta IntersectionObserver, se muestra todo sin animar
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); // se anima una sola vez
          }
        });
      },
      {
        threshold: 0.15,                 // se dispara cuando el 15% es visible
        rootMargin: "0px 0px -50px 0px", // se adelanta un poco a la aparición
      }
    );

    items.forEach((el) => observer.observe(el));
  }

  // Scroll suave para enlaces internos (#ancla)
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id.length < 2) return;          // ignora href="#"
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
