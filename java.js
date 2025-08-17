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
            
            // Retrasa el scroll para que coincida con la animación CSS 
            setTimeout(() => { 
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
            }, 300); 
        }); 
    }); 

    // ====== CARRUSEL (manual, mostrando 2 imágenes por página) ====== 
    const carousel = document.querySelector(".carousel"); 
    const items = document.querySelectorAll(".carousel-item"); 
    const prevBtn = document.querySelector(".prev"); 
    const nextBtn = document.querySelector(".next"); 
    const dots = document.querySelectorAll(".dot"); 

    if (carousel) { 
        let currentIndex = 0; 
        // cantidad de items visibles por página 
        const itemsPerPage = 2; 
        const totalPages = Math.ceil(items.length / itemsPerPage); 

        function updateCarousel() { 
            // desplazamos el carrusel según la página actual 
            carousel.style.transform = translateX(-${currentIndex * 100}%); 
            
            // actualizar indicadores 
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

        // Forzar actualización cuando la sección Projects se muestre 
        const projectsSection = document.getElementById("projects"); 
        if (projectsSection) { 
            const observer = new MutationObserver(() => { 
                if (projectsSection.classList.contains("visible-section")) { 
                    updateCarousel(); 
                } 
            }); 
            observer.observe(projectsSection, { attributes: true }); 
        } 

        // Inicializar 
        updateCarousel(); 
    } 

    // Click en puntitos 
    dots.forEach((dot, index) => { 
        dot.addEventListener("click", () => { 
            currentIndex = index; 
            updateCarousel(); 
        }); 
    }); 
});




