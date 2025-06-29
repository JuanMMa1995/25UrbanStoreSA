document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('payment-form');
    
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar los datos de la tarjeta aquí
            const cardNumber = document.getElementById('numero-tarjeta').value;
            const expiryDate = document.getElementById('fecha-expiracion').value;
            const cvv = document.getElementById('cvv').value;
            
            // Validación básica (puedes mejorarla)
            if (!cardNumber || !expiryDate || !cvv) {
                alert('Por favor complete todos los campos de pago');
                return;
            }
            
            // Si todo está bien, enviar el formulario
            this.submit();
        });
    }
});