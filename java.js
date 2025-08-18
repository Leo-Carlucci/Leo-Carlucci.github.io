document.addEventListener('DOMContentLoaded', () => {
  // ====== MENÚ SECCIONES ======
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.hidden-section');

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

      // Solo hacer scroll si el usuario hizo click en el menú DESPUÉS de cargar la página
      if (e.isTrusted) {
        setTimeout(() => {
          targetSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
        }, 300);
      }
    });
  });

  // ====== CARRUSEL (manual, 2 imágenes por página) ======
  const carousel = document.querySelector(".carousel");
  const items = document.querySelectorAll(".carousel-item");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dots = document.querySelectorAll(".dot");

  if (carousel) {
    let currentIndex = 0;
    const itemsPerPage = 2;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    function updateCarousel() {
      // Desplazamos el carrusel por página
      carousel.style.transform = `translateX(-${currentIndex * (100 / itemsPerPage)}%)`;

      // Actualizar indicadores
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    // Botón siguiente
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % totalPages;
      updateCarousel();
    });

    // Botón anterior
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + totalPages) % totalPages;
      updateCarousel();
    });

    // Click en puntitos
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
      });
    });

    // Inicializar
    updateCarousel();
  }

  // ====== ANIMACIÓN SKILLS ======
  function animateSkills() {
    const fills = document.querySelectorAll("#skills .skill-fill");
    fills.forEach(fill => {
      const level = fill.getAttribute("data-level");
      fill.style.width = level + "%";
    });
  }

  // Detectar cuando la sección skills se hace visible
  const skillsSection = document.getElementById("skills");

  if (skillsSection) {
    const observer = new MutationObserver(() => {
      if (skillsSection.classList.contains("visible-section")) {
        animateSkills();
      }
    });

    observer.observe(skillsSection, { attributes: true, attributeFilter: ["class"] });
  }
});








