let cliente = {
    mesa: '',
    hora: '',
    pedido: []
};

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
        row.classList.add('row');

        const nombre = document.createElement('DIV');
        nombre.classList.add('col-md-4');
        nombre.textContent = platillo.nombre;

        row.appendChild(nombre);
        contenido.appendChild(row);
    });
}