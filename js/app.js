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

    console.log(cliente);
}