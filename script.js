// ===== THEME TOGGLE =====
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

function applyTheme(theme) {
  if (theme === 'dark') {
    html.classList.add('dark');
    iconSun.classList.remove('hidden');
    iconMoon.classList.add('hidden');
  } else {
    html.classList.remove('dark');
    iconSun.classList.add('hidden');
    iconMoon.classList.remove('hidden');
  }
  localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
  const isDark = html.classList.contains('dark');
  applyTheme(isDark ? 'light' : 'dark');
});

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.add('hidden');
  });
});

// ===== ACTIVE NAV LINK =====
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.classList.add('text-primary', '!text-primary');
        link.classList.remove('text-gray-500', 'dark:text-gray-400');
      } else {
        link.classList.remove('text-primary', '!text-primary');
        link.classList.add('text-gray-500', 'dark:text-gray-400');
      }
    }
  });
}

// ===== SKILLS DATA =====
const skills = [
  { icon: '🐦', name: 'Flutter',           pct: 90 },
  { icon: '🎯', name: 'Dart',              pct: 88 },
  { icon: '🌐', name: 'HTML & CSS',        pct: 85 },
  { icon: '⚡', name: 'JavaScript',        pct: 75 },
  { icon: '🔥', name: 'Firebase',          pct: 82 },
  { icon: '🐘', name: 'PHP',               pct: 70 },
  { icon: '☕', name: 'Java',              pct: 72 },
  { icon: '⚙️', name: 'C++ / C#',         pct: 65 },
  { icon: '🗄️', name: 'MySQL/PostgreSQL', pct: 78 },
  { icon: '🌐', name: 'Networking',        pct: 70 },
  { icon: '🔗', name: 'REST API',          pct: 80 },
  { icon: '🐧', name: 'Linux',          pct: 70 },
];

const skillsGrid = document.getElementById('skillsGrid');
skills.forEach(s => {
  skillsGrid.innerHTML += `
    <div class="bg-white dark:bg-[#111122] border border-gray-200 dark:border-white/8 rounded-xl p-4 hover:-translate-y-1 hover:shadow-glow-sm transition-all duration-300">
      <div class="flex justify-between items-center mb-3">
        <span class="font-semibold text-sm flex items-center gap-2">
          <span class="text-lg">${s.icon}</span>${s.name}
        </span>
        <span class="text-xs font-bold text-primary">${s.pct}%</span>
      </div>
      <div class="h-1.5 bg-gray-100 dark:bg-white/8 rounded-full overflow-hidden">
        <div class="skill-bar-fill" data-width="${s.pct}"></div>
      </div>
    </div>`;
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ===== SKILL BARS =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.innerHTML = `<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Sending...`;

  // Replace with EmailJS / Formspree for real sending
  setTimeout(() => {
    msg.classList.remove('hidden');
    msg.className = 'text-sm text-emerald-500 font-medium';
    msg.textContent = '✅ Message sent! I\'ll get back to you soon.';
    this.reset();
    btn.disabled = false;
    btn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
    setTimeout(() => { msg.classList.add('hidden'); }, 5000);
  }, 1400);
});

// ===== FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== PROJECT CAROUSELS =====
const carouselState = {};

function initCarousel(id, total) {
  carouselState[id] = { current: 0, total };
}

function slideCarousel(id, dir) {
  const state = carouselState[id];
  if (!state) return;
  state.current = (state.current + dir + state.total) % state.total;
  updateCarousel(id);
}

function goToSlide(id, index) {
  if (!carouselState[id]) return;
  carouselState[id].current = index;
  updateCarousel(id);
}

function updateCarousel(id) {
  const state = carouselState[id];
  const slides = document.getElementById('slides-' + id);
  const dots = document.getElementById('dots-' + id);
  if (slides) slides.style.transform = `translateX(-${state.current * 100}%)`;
  if (dots) {
    dots.querySelectorAll('button').forEach((dot, i) => {
      const isActive = i === state.current;
      dot.style.background = isActive
        ? (id === 'addis' ? '#ff6b9d' : '#7c6fff')
        : '';
      dot.className = `w-2 h-2 rounded-full transition-all ${isActive ? 'scale-125' : 'bg-gray-300 dark:bg-white/20'}`;
    });
  }
}

// Init both carousels
initCarousel('ecom', 8);
initCarousel('addis', 6);
