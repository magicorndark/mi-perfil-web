const formulario = document.getElementById('formulario-contacto');

formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const mensaje = document.getElementById('mensaje').value;

  if (nombre === '' || correo === '' || mensaje === '') {
    alert('Por favor, completa todos los campos.');
    return;
  }

  if (!validarCorreo(correo)) {
    alert('Correo electrónico no válido.');
    return;
  }

  enviarFormulario();
});

function validarCorreo(correo) {
  const regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(correo);
}

async function enviarFormulario() {
  const data = {
    nombre: nombre,
    correo: correo,
    mensaje: mensaje
  };

  const url = 'https://formspree.io/f/manwnrnp'; 
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (result.estado === 'ok') {
      mostrarMensajeExito('¡Formulario enviado exitosamente!');
    } else {
      mostrarMensajeError('Error al enviar el formulario.');
    }
  } catch (error) {
    console.error(error);
    mostrarMensajeError('Error al enviar el formulario.');
  }
}

function mostrarMensajeExito(mensaje) {
  const mensajeExito = document.createElement('p');
  mensajeExito.textContent = mensaje;
  mensajeExito.className = 'mensaje-exito'; 
  formulario.appendChild(mensajeExito);

  setTimeout(() => {
    formulario.removeChild(mensajeExito);
  }, 5000);
}

function mostrarMensajeError(mensaje) {
  const mensajeError = document.createElement('p');
  mensajeError.textContent = mensaje;
  mensajeError.className = 'mensaje-error'; 
  formulario.appendChild(mensajeError);

  setTimeout(() => {
    formulario.removeChild(mensajeError);
  }, 5000);
}
