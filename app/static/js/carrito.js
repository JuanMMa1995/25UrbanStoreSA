document.addEventListener('DOMContentLoaded', function() {
    // Habilitar/deshabilitar botón de pago según checkbox
    const termsCheck = document.getElementById('termsCheck');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (termsCheck && checkoutBtn) {
        termsCheck.addEventListener('change', function() {
            checkoutBtn.disabled = !this.checked;
        });
    }

    // Manejar incremento de cantidad
    document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const productType = this.dataset.productType;
            const max = parseInt(this.dataset.max);
            const quantityElement = this.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            
            if (quantity < max) {
                quantity++;
                updateCartItem(productId, productType, quantity);
            } else {
                alert('No hay suficiente stock disponible');
            }
        });
    });

    // Manejar decremento de cantidad
    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const productType = this.dataset.productType;
            const quantityElement = this.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            
            if (quantity > 1) {
                quantity--;
                updateCartItem(productId, productType, quantity);
            }
        });
    });

    // Manejar eliminación de producto
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const productType = this.dataset.productType;
            
            if (confirm('¿Estás seguro de que deseas eliminar este producto de tu carrito?')) {
                removeCartItem(productId, productType);
            }
        });
    });

    // Manejar botón de pago
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            proceedToCheckout();
        });
    }

    // Función para actualizar cantidad en el carrito
    function updateCartItem(productId, productType, quantity) {
        fetch('/update_cart/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify({
                product_id: productId,
                product_type: productType,
                quantity: quantity,
                action: 'update'
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload(); // Recargar para ver cambios
            } else {
                alert(data.message || 'Error al actualizar el carrito');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al actualizar el carrito');
        });
    }

    // Función para eliminar item del carrito
    function removeCartItem(productId, productType) {
        fetch('/update_cart/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify({
                product_id: productId,
                product_type: productType,
                action: 'remove'
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload(); // Recargar para ver cambios
            } else {
                alert(data.message || 'Error al eliminar el producto');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al eliminar el producto');
        });
    }

    // Función para proceder al pago
    function proceedToCheckout() {
        fetch('/proceed_to_checkout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Compra realizada con éxito');
                window.location.href = '/'; // Redirigir a página principal
            } else {
                alert(data.message || 'Error al procesar el pago');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al procesar el pago');
        });
    }

    // Función auxiliar para obtener el token CSRF
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});