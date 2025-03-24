// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 


let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

     document.querySelector('#carrito a.button').addEventListener('click', guardarCarritoEnLocalStorage);

     document.querySelector('#btn-comprar').addEventListener('click', function(e) {
          e.preventDefault();  // Evita un posible error de redirección
          guardarCarritoEnLocalStorage(); // Guarda el carrito
          window.location.href = "compra.html"; // Redirige a la página de compra
      });
}

function guardarCarritoEnLocalStorage() {
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito)); // Guardamos el carrito en localStorage
 }
 


// Funciones
// Función que añade el curso al carrito
function agregarCurso(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosCurso(curso);
     }
}


function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad++;
                     return curso;
                } else {
                     return curso;
             }
          })
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     // console.log(articulosCarrito)

     

     // console.log(articulosCarrito)
     carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const cursoId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();
     }
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {
     vaciarCarrito();
 
     articulosCarrito.forEach(curso => {
         const row = document.createElement('tr');
         row.innerHTML = `
             <td>  
                 <img src="${curso.imagen}" width="100">
             </td>
             <td>${curso.titulo}</td>
             <td>${curso.precio}</td>
             <td>${curso.cantidad}</td>
             <td>
                 <div class="contador">
                     <button class="decrementar" data-id="${curso.id}">-</button>
                     <span>${curso.cantidad}</span>
                     <button class="incrementar" data-id="${curso.id}">+</button>
                 </div>
             </td>
         `;
         contenedorCarrito.appendChild(row);
     });
 
     sincronizarEventListeners();
 }
 
 

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma lenta
     // contenedorCarrito.innerHTML = '';


     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}

function sincronizarEventListeners() {
     document.querySelectorAll('.incrementar').forEach(btn => {
         btn.addEventListener('click', aumentarCantidad);
     });
 
     document.querySelectorAll('.decrementar').forEach(btn => {
         btn.addEventListener('click', disminuirCantidad);
     });
 }

 function aumentarCantidad(e) {
     const id = e.target.getAttribute('data-id');
     articulosCarrito = articulosCarrito.map(curso => {
         if (curso.id === id) curso.cantidad++;
         return curso;
     });
     carritoHTML();
 }
 
 function disminuirCantidad(e) {
     const id = e.target.getAttribute('data-id');
     articulosCarrito = articulosCarrito.map(curso => {
         if (curso.id === id) curso.cantidad--;
         return curso;
     }).filter(curso => curso.cantidad > 0); // Si la cantidad es 0, lo elimina
 
     carritoHTML();
 }
 