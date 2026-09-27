const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu-principal');
const dropdown = document.querySelector('.dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');

menuToggle?.addEventListener('click', () => {
  const aberto = menu?.classList.toggle('active') ?? false;
  menuToggle.setAttribute('aria-expanded', String(aberto));
  menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});

dropdownToggle?.addEventListener('click', () => {
  const aberto = dropdown?.classList.toggle('active') ?? false;
  dropdownToggle.setAttribute('aria-expanded', String(aberto));
});

document.addEventListener('click', (event) => {
  if (menu && menuToggle && !menu.contains(event.target) && !menuToggle.contains(event.target)) {
    menu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  }

  if (dropdown && dropdownToggle && !dropdown.contains(event.target)) {
    dropdown.classList.remove('active');
    dropdownToggle.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    menu?.classList.remove('active');
    dropdown?.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Abrir menu');
    dropdownToggle?.setAttribute('aria-expanded', 'false');
  }
});

const cpf = document.querySelector('#cpf');
const telefone = document.querySelector('#telefone');
const cep = document.querySelector('#cep');

cpf?.addEventListener('input', () => {
  let valor = cpf.value.replace(/\D/g, '').slice(0, 11);
  valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
  valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
  valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  cpf.value = valor;
});

telefone?.addEventListener('input', () => {
  let valor = telefone.value.replace(/\D/g, '').slice(0, 11);
  valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
  valor = valor.replace(/(\d{5})(\d{4})$/, '$1-$2');
  valor = valor.replace(/(\d{4})(\d{4})$/, '$1-$2');
  telefone.value = valor;
});

cep?.addEventListener('input', () => {
  let valor = cep.value.replace(/\D/g, '').slice(0, 8);
  valor = valor.replace(/^(\d{5})(\d)/, '$1-$2');
  cep.value = valor;
});


// Componentes de feedback: Toast e Modal
const abrirToast = document.querySelector('#abrir-toast');
const toastFeedback = document.querySelector('#toast-feedback');
let toastTimer;

abrirToast?.addEventListener('click', () => {
  clearTimeout(toastTimer);
  toastFeedback.classList.add('show');
  toastTimer = setTimeout(() => toastFeedback.classList.remove('show'), 3500);
});

const abrirModal = document.querySelector('#abrir-modal');
const modalFeedback = document.querySelector('#modal-feedback');
const fecharModal = document.querySelector('#fechar-modal');
const fecharModalFinal = document.querySelector('#fechar-modal-final');

function fecharFeedbackModal() {
  modalFeedback?.classList.remove('show');
  modalFeedback?.setAttribute('aria-hidden', 'true');
  abrirModal?.focus();
}

abrirModal?.addEventListener('click', () => {
  modalFeedback.classList.add('show');
  modalFeedback.setAttribute('aria-hidden', 'false');
  fecharModal?.focus();
});

fecharModal?.addEventListener('click', fecharFeedbackModal);
fecharModalFinal?.addEventListener('click', fecharFeedbackModal);

modalFeedback?.addEventListener('click', (event) => {
  if (event.target === modalFeedback) {
    fecharFeedbackModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalFeedback?.classList.contains('show')) {
    fecharFeedbackModal();
  }
});
