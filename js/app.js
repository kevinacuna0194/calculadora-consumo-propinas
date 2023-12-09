let Cliente = {
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
    const camposVacios = [ mesa, hora ].some( some => some === '');

    if (camposVacios) {

        console.log('Hay al menos un campo vacio');

    } else {

        console.log('Todos los campos estan llenos');
    }
}