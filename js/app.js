let cliente = {
    mesa: '',
    hora: '',
    pedido: []
};

const categorias = {
    1: 'Comida',
    2: 'Bebidas',
    3: 'Postres'
}

const btnGuardarCiente = document.querySelector('#guardar-cliente');
btnGuardarCiente.addEventListener('click', guardarCliente);

function guardarCliente() {

    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;

    /** Revisar si hay campos vacios 
     * .some va a verificar que al menos uno cumpla esta condición
    */
    const camposVacios = [mesa, hora].some(some => some === '');

    if (camposVacios) {

        /** Verificar si ya hay una alerta */
        const existeAlerta = document.querySelector('.invalid-feedback'); // null

        if (!existeAlerta) {

            // console.log('Hay al menos un campo vacio');
            const alerta = document.createElement('DIV');
            alerta.classList.add('invalid-feedback', 'd-block', 'text-center');
            alerta.textContent = 'Todos los campos son Obligatorios';
            document.querySelector('.modal-body form').appendChild(alerta);

            setTimeout(() => {

                alerta.remove();

            }, 3000);
        }

        return;
    }

    // console.log('Todos los campos estan llenos');
    /** Asignar datos del formulario a cliente
     * Mantener propiedades del objeto cliente y sobrescribir fecha y hora */
    cliente = { ...cliente, mesa, hora }

    // console.log(cliente);

    /** Ocultar modal
     * Identificar Modal en html
     * Pasar instancia a Botstrap. Obtener el modal actual
     * métodos de Bootstrap para ocultarlo.
     */
    const modalFormulario = document.querySelector('#formulario');
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
    modalBootstrap.hide();

    /** Mostrar secciones */
    mostrarSecciones();

    /** Obtener Platillos de la API de JSON-Server */
    obtenerPlatillos();
}

function mostrarSecciones() {

    /** Seleccionar secciones ocultas 
     * Retorna un nodeList
     * Iterar y quitrar display none
    */
    const seccionesOcultas = document.querySelectorAll('.d-none');
    seccionesOcultas.forEach(seccion => {

        seccion.classList.remove('d-none');
    });

}

function obtenerPlatillos() {

    const url = 'http://localhost:4000/platillos';

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarPlatillos(resultado))
        .catch(error => console.log(error));
}

function mostrarPlatillos(platillos) {

    const contenido = document.querySelector('#platillos .contenido');

    /** Iterar arreglo de objetos */
    platillos.forEach(platillo => {

        const row = document.createElement('DIV');
        row.classList.add('row', 'py-3', 'border-top');

        const nombre = document.createElement('DIV');
        nombre.classList.add('col-md-4');
        nombre.textContent = platillo.nombre;

        const precio = document.createElement('DIV');
        precio.classList.add('col-md-3', 'fw-bold');
        precio.textContent = `$${platillo.precio}`;

        const categoria = document.createElement('DIV');
        categoria.classList.add('col-md-3', 'fw-bold');
        categoria.textContent = categorias[platillo.categoria];

        const inputCantidad = document.createElement('INPUT');
        inputCantidad.type = 'number';
        inputCantidad.min = 0;
        inputCantidad.value = 0;
        inputCantidad.id = `porducto-${platillo.id}`;
        inputCantidad.classList.add('form-control');

        const agregar = document.createElement('DIV');
        agregar.classList.add('col-md-2');
        agregar.appendChild(inputCantidad);

        row.appendChild(nombre);
        row.appendChild(precio);
        row.appendChild(categoria);
        row.appendChild(agregar);
        contenido.appendChild(row);
    });
}