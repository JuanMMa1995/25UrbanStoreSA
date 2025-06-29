// static/js/agrega_marca.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(e) {
        const nombreInput = document.getElementById('id_nombre');
        if (nombreInput.value.trim() === '') {
            e.preventDefault();
            alert('Por favor, ingrese un nombre para la marca');
            nombreInput.focus();
        }
    });
});