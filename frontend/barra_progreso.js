window.addEventListener('scroll', () => {
  const scroll = document.documentElement.scrollTop;         // cuánto has bajado
  const alturaTotal = 
    document.documentElement.scrollHeight - 
    document.documentElement.clientHeight;                   // total que se puede recorrer

  const porcentaje = (scroll / alturaTotal) * 100;
  document.getElementById('barra-progreso').style.width = porcentaje + '%';
});