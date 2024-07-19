document.getElementById('formulario-contacto').addEventListener('submit', async function(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const mensaje = document.getElementById('mensaje').value;

  if (!nombre || !correo || !mensaje) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  if (!validarCorreo(correo)) {
    alert('Correo electrónico no válido.');
    return;
  }

  const data = { nombre, correo, mensaje };

  try {
    const response = await fetch('https://formspree.io/f/manwnrnp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      mostrarMensajeExito('¡Formulario enviado exitosamente!');
    } else {
      mostrarMensajeError('Error al enviar el formulario.');
    }
  } catch (error) {
    console.error(error);
    mostrarMensajeError('Error al enviar el formulario.');
  }
});

function validarCorreo(correo) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(correo);
}

function mostrarMensajeExito(mensaje) {
  const mensajeExito = document.createElement('p');
  mensajeExito.textContent = mensaje;
  mensajeExito.className = 'mensaje-exito';
  document.getElementById('formulario-contacto').appendChild(mensajeExito);

  setTimeout(() => {
    mensajeExito.remove();
  }, 5000);
}

function mostrarMensajeError(mensaje) {
  const mensajeError = document.createElement('p');
  mensajeError.textContent = mensaje;
  mensajeError.className = 'mensaje-error';
  document.getElementById('formulario-contacto').appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 5000);
}

