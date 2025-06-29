document.addEventListener('DOMContentLoaded', function() {
    // Manejar agregar al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.productId;
            const productType = this.dataset.productType;
            
            fetch('/update_cart/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                body: JSON.stringify({
                    product_id: productId,
                    product_type: productType,
                    quantity: 1,
                    action: 'add'
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // Mostrar notificación
                    const notification = document.createElement('div');
                    notification.className = 'alert alert-success position-fixed top-0 end-0 m-3';
                    notification.style.zIndex = '9999';
                    notification.textContent = 'Producto agregado al carrito';
                    document.body.appendChild(notification);
                    
                    // Actualizar el contador del carrito si existe
                    updateCartCounter(data.cart_count || 0);
                    
                    // Eliminar notificación después de 3 segundos
                    setTimeout(() => {
                        notification.remove();
                    }, 3000);
                } else {
                    alert(data.message || 'Error al agregar al carrito');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al agregar al carrito');
            });
        });
    });

    // Función para actualizar el contador del carrito
    function updateCartCounter(count) {
        const counterElement = document.querySelector('.cart-counter');
        if (counterElement) {
            counterElement.textContent = count;
            counterElement.style.display = count > 0 ? 'inline-block' : 'none';
        }
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