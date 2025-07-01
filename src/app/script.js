window.addEventListener('load', () => {
  const intro = document.getElementById('intro');
  const contenido = document.getElementById('contenido');

  setTimeout(() => {
    intro.style.opacity = 0;
    setTimeout(() => {
      intro.style.display = 'none';
      contenido.classList.remove('oculto');
    }, 1000); // Espera a que se desvanezca
  }, 1500); // Tiempo visible del "Hola" en milisegundos
});
