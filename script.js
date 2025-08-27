// Basic interactivity: mobile menu, typewriter, assistant click
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
  const open = links.classList.toggle('show');
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Active link highlight on scroll
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        navLink?.classList.add('active');
      }
    });
  }, { threshold: 0.6 }
);
document.querySelectorAll('section[id]').forEach(s => observer.observe(s));

// Typewriter effect (accessible)
const textEl = document.getElementById('typewriter');
const fullText = "Hi, I'm Sanjana—your friendly data assistant.";
let i = 0;
function type() {
  if (!textEl) return;
  textEl.textContent = fullText.slice(0, i++);
  if (i <= fullText.length) requestAnimationFrame(type);
}
setTimeout(() => requestAnimationFrame(type), 600);

// Assistant click -> smooth scroll to About/Projects
document.getElementById('assistant')?.addEventListener('click', () => {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
