// ==========================================================================
// COURSEBOOK INTERACTIVE JAVASCRIPT
// Theme (Dark/Light), Font Scaling (A-/A+), Font Modes (Sans/Serif), TOC & Copy
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initFontControls();
  initSidebar();
  initCodeCopy();
  initTocScrollSpy();
  initSidebarActive();
  initHighlight();
});

// --- Theme Management (Dark / Light) ---
function initTheme() {
  const savedTheme = localStorage.getItem('coursebook-theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  applyTheme(savedTheme);

  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.querySelectorAll('.theme-icon').forEach(icon => icon.textContent = '☀️');
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.querySelectorAll('.theme-icon').forEach(icon => icon.textContent = '🌙');
  }
  localStorage.setItem('coursebook-theme', theme);
}

// --- Font Family & Size Controls ---
const FONT_SIZES = [14, 15, 16, 17, 18, 20, 22];

function initFontControls() {
  // Font Family
  const savedFont = localStorage.getItem('coursebook-font') || 'sans';
  applyFontFamily(savedFont);

  document.querySelectorAll('.font-family-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isSerif = document.body.classList.contains('font-serif');
      const nextFont = isSerif ? 'sans' : 'serif';
      applyFontFamily(nextFont);
    });
  });

  // Font Size
  let currentSize = parseInt(localStorage.getItem('coursebook-font-size')) || 16;
  applyFontSize(currentSize);

  document.querySelectorAll('.font-decrease-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = FONT_SIZES.indexOf(currentSize);
      if (idx > 0) {
        currentSize = FONT_SIZES[idx - 1];
        applyFontSize(currentSize);
      }
    });
  });

  document.querySelectorAll('.font-increase-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = FONT_SIZES.indexOf(currentSize);
      if (idx < FONT_SIZES.length - 1) {
        currentSize = FONT_SIZES[idx + 1];
        applyFontSize(currentSize);
      }
    });
  });
}

function applyFontFamily(font) {
  if (font === 'serif') {
    document.body.classList.remove('font-sans');
    document.body.classList.add('font-serif');
    document.querySelectorAll('.font-indicator').forEach(el => el.textContent = 'Sans');
  } else {
    document.body.classList.remove('font-serif');
    document.body.classList.add('font-sans');
    document.querySelectorAll('.font-indicator').forEach(el => el.textContent = 'Serif');
  }
  localStorage.setItem('coursebook-font', font);
}

function applyFontSize(size) {
  document.documentElement.style.setProperty('--base-font-size', `${size}px`);
  localStorage.setItem('coursebook-font-size', size);
}

// --- Sidebar Toggle & Smooth Auto-Scroll ---
function initSidebar() {
  const toggleBtn = document.querySelector('.navbar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
    });
  }

  document.addEventListener('click', (e) => {
    if (sidebar && sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== toggleBtn) {
      sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
    }
  });
}

// --- Active Sidebar Link Auto-Scroll ---
function initSidebarActive() {
  const activeLink = document.querySelector('.sidebar-links a.active');
  if (activeLink) {
    activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

// --- One-Click Code Copy ---
function initCodeCopy() {
  document.querySelectorAll('.code-block').forEach(block => {
    const copyBtn = block.querySelector('.code-block-copy');
    const codeEl = block.querySelector('pre code') || block.querySelector('pre');
    
    if (copyBtn && codeEl) {
      copyBtn.addEventListener('click', async () => {
        const textToCopy = codeEl.innerText.trim();
        try {
          await navigator.clipboard.writeText(textToCopy);
          copyBtn.textContent = '✓ Copied';
          copyBtn.classList.add('copied');
          setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.classList.remove('copied');
          }, 2000);
        } catch (err) {
          const textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          copyBtn.textContent = '✓ Copied';
          copyBtn.classList.add('copied');
          setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.classList.remove('copied');
          }, 2000);
        }
      });
    }
  });
}

// --- Dynamic Table of Contents Scroll-Spy ---
function initTocScrollSpy() {
  const tocLinks = document.querySelectorAll('.toc-links a');
  if (!tocLinks.length) return;

  const headings = [];
  tocLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetEl = document.querySelector(href);
      if (targetEl) {
        headings.push({ el: targetEl, link: link });
      }
    }
  });

  if (!headings.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(l => l.classList.remove('active'));
        const activeItem = headings.find(h => h.el === entry.target);
        if (activeItem) {
          activeItem.link.classList.add('active');
        }
      }
    });
  }, {
    rootMargin: '-80px 0px -70% 0px',
    threshold: 0
  });

  headings.forEach(h => observer.observe(h.el));
}

// --- Syntax Highlighting ---
function initHighlight() {
  if (typeof hljs !== 'undefined') {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  }
}
