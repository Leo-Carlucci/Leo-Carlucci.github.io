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
// ====== ANIMACIÓN SKILLS ======
function animateSkills() {
  const fills = document.querySelectorAll("#skills .skill-fill");
  fills.forEach(fill => {
    const level = fill.getAttribute("data-level");
    fill.style.width = level + "%";
  });
}

// Escuchar cuando se abre la sección skills
const skillsSection = document.getElementById("skills");
const skillsLink = document.querySelector('[data-target="skills"]');

if (skillsLink) {
  skillsLink.addEventListener("click", () => {
    setTimeout(() => {
      animateSkills();
    }, 400); // espera a que termine la animación de apertura
  });
}
      // Retrasa el scroll para que coincida con la animación CSS
      setTimeout(() => {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
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
});







