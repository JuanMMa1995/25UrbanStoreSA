$(document).ready(function() {
    // Validación del formulario
    $("#contactForm").validate({
        rules: {
            nombre: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            mensaje: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            nombre: {
                required: "Por favor ingresa tu nombre",
                minlength: "Tu nombre debe tener al menos 3 caracteres"
            },
            email: {
                required: "Por favor ingresa tu email",
                email: "Por favor ingresa un email válido"
            },
            mensaje: {
                required: "Por favor escribe tu mensaje",
                minlength: "Tu mensaje debe tener al menos 10 caracteres"
            }
        },
        errorElement: "div",
        errorPlacement: function(error, element) {
            error.addClass("error");
            error.insertAfter(element);
        },
        highlight: function(element, errorClass) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function(element, errorClass) {
            $(element).removeClass("is-invalid");
        },
        submitHandler: function(form) {
            // Puedes añadir aquí código adicional antes del envío si es necesario
            form.submit();
        }
    });
});