document.addEventListener('DOMContentLoaded', function() {
        // Enviar el formulario automáticamente después de 2 segundos
        setTimeout(function() {
            document.forms['send_pay_form'].submit();
        }, 2000);
    });