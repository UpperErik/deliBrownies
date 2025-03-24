document.addEventListener('DOMContentLoaded', mostrarCarritoEnCompra);

function mostrarCarritoEnCompra() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedor = document.querySelector('#detalle-carrito');
    let total = 0;

    carrito.forEach(producto => {
        let precioUnitario = parseFloat(producto.precio.replace('$', '').trim()); // Convierte el precio a número

        if (isNaN(precioUnitario)) {
            precioUnitario = 0; // Si no se puede convertir, asigna 0 para evitar errores
        }

        const subtotal = precioUnitario * producto.cantidad;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="80"></td>
            <td>${producto.titulo}</td>
            <td>$${precioUnitario.toFixed(2)}</td>
            <td>${producto.cantidad}</td>
            <td>$${subtotal.toFixed(2)}</td>
        `;
        contenedor.appendChild(row);
    });

    document.querySelector('#total-carrito').textContent = `$${total.toFixed(2)}`;
}
