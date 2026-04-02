// ── Formulario de contacto ────────────────────────────────────────────────────
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('.btn-submit');
  btn.textContent = '¡Enviado! ✓';
  btn.style.background = '#27ae60';
  setTimeout(() => {
    btn.textContent = 'Enviar mensaje';
    btn.style.background = '';
    this.reset();
  }, 3000);
});
