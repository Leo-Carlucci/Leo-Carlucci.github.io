document.addEventListener('DOMContentLoaded', () => {
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
      }, 300); // este delay coincide con la duración en CSS (0.35s aprox.)
    });
  });
});