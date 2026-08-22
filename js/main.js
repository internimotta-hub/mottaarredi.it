// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Modulo contatti: finché Formspree non è configurato (action contiene FORM_ID),
// il submit apre il client di posta con il messaggio precompilato.
const form = document.getElementById('contact-form');

if (form) {
  form.addEventListener('submit', (e) => {
    if (!form.action.includes('FORM_ID')) return; // Formspree attivo: invio normale

    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('Richiesta dal sito mottaarredi.it');
    const body = encodeURIComponent(
      'Nome: ' + (data.get('nome') || '') + '\n' +
      'Email: ' + (data.get('email') || '') + '\n' +
      'Telefono: ' + (data.get('telefono') || '') + '\n\n' +
      (data.get('messaggio') || '')
    );
    window.location.href = 'mailto:internimotta@gmail.com?subject=' + subject + '&body=' + body;

    const note = document.getElementById('form-note');
    if (note) {
      note.textContent = 'Si aprirà il tuo programma di posta con il messaggio già compilato. In alternativa scrivici a internimotta@gmail.com.';
    }
  });
}


// Marca la presenza di JS (il reveal parte solo così: senza JS tutto resta visibile)
document.documentElement.classList.add('js');

// Ombra dell'header allo scroll
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Reveal delicato allo scroll
const revealables = document.querySelectorAll('.step, .card, .gallery figure, .sede, .materials img, .ig-strip a, .svc-list li');
revealables.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 6) * 60 + 'ms';
});
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('in-view'));
}
