document.addEventListener('DOMContentLoaded', () => {
  // ====== MENÚ SECCIONES ======
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.hidden-section');

  // puntero opcional para actualizar carrusel cuando se abra "Projects"
  let updateCarousel = null;

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      // Oculta todas las secciones
      sections.forEach(sec => sec.classList.remove('visible-section'));

      // Muestra la sección seleccionada
      targetSection.classList.add('visible-section');

      // Desplaza suavemente y, si es Projects, refresca el carrusel
      setTimeout(() => {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        if (targetId === 'projects' && typeof updateCarousel === 'function') {
          updateCarousel();
        }
      }, 50);
    });
  });

  // ====== CARRUSEL (manual, 2 imágenes por página) ======
  const carousel = document.querySelector(".carousel");
  const items = document.querySelectorAll(".carousel-item");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dots = document.querySelectorAll(".dot");

  if (carousel) {
    let currentPage = 0;
    const itemsPerPage = 2; // 👈 2 imágenes visibles por "página"
    let totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

    // Definimos la función y la exponemos al menú
    updateCarousel = function () {
      // Mueve por páginas completas (cada página = 100% del ancho)
      carousel.style.transform = `translateX(-${currentPage * 100}%)`;

      // Actualiza indicadores si existen
      if (dots.length) {
        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === currentPage);
        });
      }
    };

    // Botón siguiente
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentPage = (currentPage + 1) % totalPages;
        updateCarousel();
      });
    }

    // Botón anterior
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentPage = (currentPage - 1 + totalPages) % totalPages;
        updateCarousel();
      });
    }

    // Click en puntitos (si existen): van por página, no por ítem
    if (dots.length) {
      dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
          currentPage = Math.min(i, totalPages - 1);
          updateCarousel();
        });
      });
    }

    // Recalcula y reposiciona cuando "Projects" se vuelve visible
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      const observer = new MutationObserver(() => {
        if (projectsSection.classList.contains("visible-section")) {
          updateCarousel();
        }
      });
      observer.observe(projectsSection, { attributes: true, attributeFilter: ["class"] });
    }

    // Ajuste en cambios de tamaño (por si cambia el layout)
    window.addEventListener("resize", () => {
      totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
      if (currentPage >= totalPages) currentPage = totalPages - 1;
      updateCarousel();
    });

    // Inicializar
    updateCarousel();
  }
});




