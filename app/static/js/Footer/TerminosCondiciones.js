// TerminosCondiciones.js
document.addEventListener('DOMContentLoaded', function() {
    // Puedes añadir funcionalidad JS aquí si es necesario
    console.log('Términos y Condiciones cargado');
    
    // Ejemplo: Acordeón para secciones en móvil
    const terminosSections = document.querySelectorAll('.terminos-section');
    
    if (window.innerWidth < 768) {
        terminosSections.forEach(section => {
            const heading = section.querySelector('h2');
            const content = section.querySelector('ul, p, div');
            
            if (heading && content) {
                // Ocultar contenido inicialmente
                content.style.display = 'none';
                
                // Añadir evento click al heading
                heading.addEventListener('click', () => {
                    if (content.style.display === 'none') {
                        content.style.display = 'block';
                    } else {
                        content.style.display = 'none';
                    }
                });
                
                // Añadir estilo para indicar que es clickeable
                heading.style.cursor = 'pointer';
                heading.style.padding = '10px';
                heading.style.backgroundColor = '#f5f5f5';
                heading.style.borderRadius = '4px';
            }
        });
    }
});
