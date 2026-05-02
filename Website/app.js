/* NAV SCROLL */
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
});

/* SCROLL REVEAL */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* WAITLIST COUNT */
async function loadCount() {
  try {
    const res = await fetch('/api/waitlist/count');
    const d = await res.json();
    document.getElementById('waitlist-count').textContent = (d.count || 0).toLocaleString();
  } catch(e) { document.getElementById('waitlist-count').textContent = '0'; }
}
loadCount();

/* SUBMIT WAITLIST */
async function submitWaitlist(form) {
  const nameEl = document.getElementById(form + '-name');
  const emailEl = document.getElementById(form + '-email');
  const btn = document.getElementById(form + '-btn');
  const success = document.getElementById(form + '-success');
  const posEl = document.getElementById(form + '-pos');
  const email = emailEl?.value.trim() || '';
  const name = nameEl?.value.trim() || '';

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    emailEl.style.borderColor = '#c04040';
    emailEl.focus();
    setTimeout(() => emailEl.style.borderColor = '', 2000);
    return;
  }

  btn.classList.add('loading'); btn.disabled = true;

  try {
    const res = await fetch('/api/waitlist/join', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });
    const d = await res.json();
    if (res.ok) {
      btn.closest('.form-row').style.display = 'none';
      if (nameEl) nameEl.closest('.name-row').style.display = 'none';
      success.style.display = 'flex';
      if (posEl && d.position) posEl.textContent = `Position #${d.position.toLocaleString()}`;
      loadCount();
    } else {
      btn.classList.remove('loading'); btn.disabled = false;
      if (d.error === 'already_exists') {
        emailEl.style.borderColor = 'rgba(212,169,106,0.5)';
        emailEl.value = ''; emailEl.placeholder = 'Already on the list ✓';
        setTimeout(() => { emailEl.style.borderColor = ''; emailEl.placeholder = 'your@email.com'; }, 3000);
      }
    }
  } catch(e) {
    btn.classList.remove('loading'); btn.disabled = false;
    emailEl.style.borderColor = '#c04040';
    setTimeout(() => emailEl.style.borderColor = '', 2000);
  }
}

document.querySelectorAll('.form-input, .name-input').forEach(el => {
  el.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    submitWaitlist(el.id.split('-')[0]);
  });
});
