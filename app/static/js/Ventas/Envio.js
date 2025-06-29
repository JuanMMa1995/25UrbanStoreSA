// Costos de envío por región
const costosEnvio = {
    'RM': 3000,
    'I': 13000,
    'II': 14000,
    'III': 11000,
    'IV': 8000,
    'V': 4000,
    'VI': 5000,
    'VII': 6000,
    'VIII': 7000,
    'IX': 9000,
    'XIV': 10000,
    'X': 12000,
    'XI': 15000,
    'XII': 16000,
    'XV': 14500,
    'XVI': 7000,
};

document.addEventListener('DOMContentLoaded', function() {
    const regionSelect = document.getElementById('id_region');
    const costoEnvioElement = document.getElementById('costo-envio');
    const totalPagarElement = document.getElementById('total-pagar');
    const subtotal = parseFloat("{{ total_carrito }}");  // El total del carrito pasado desde la vista

    function actualizarCostos() {
        const region = regionSelect.value;
        const costo = costosEnvio[region] || 0;
        const total = subtotal + costo;
        
        // Formatear números con separadores de miles
        const formato = new Intl.NumberFormat('es-CL');
        
        costoEnvioElement.textContent = '$' + formato.format(costo);
        totalPagarElement.innerHTML = '<strong>$' + formato.format(total) + '</strong>';
    }

    // Inicializar costos al cargar
    actualizarCostos();

    // Actualizar al cambiar región
    regionSelect.addEventListener('change', actualizarCostos);
});