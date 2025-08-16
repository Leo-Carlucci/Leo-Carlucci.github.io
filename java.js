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

      // Oculta todas
      sections.forEach(sec => sec.classList.remove('visible-section'));

      // Muestra la seleccionada
      targetSection.classList.add('visible-section');

      // Retrasa el scroll para que haya empezado la animación de apertura
      setTimeout(() => {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    });
  });

  // ====== CARRUSEL (manual) ======
  const carousel = document.querySelector(".carousel");
  const items = document.querySelectorAll(".carousel-item");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dots = document.querySelectorAll(".dot");

  if (carousel) {
    let currentIndex = 0;

    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateCarousel();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
      });
    });
  }
});

