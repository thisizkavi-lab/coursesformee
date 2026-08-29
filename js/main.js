// ==========================================================================
// COURSEBOOK INTERACTIVE JAVASCRIPT
// Instant Dark/Light Theme (SVG Icon), Sidebar Auto-Scroll, TOC, Code Copy
// & Interactive Japanese Study Decks (WaniKani 1-60)
// ==========================================================================

// 1. Immediate execution before DOM ready to prevent flash
(function() {
  const saved = localStorage.getItem('coursebook-theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSidebar();
  initCodeCopy();
  initTocScrollSpy();
  initSidebarActive();
  initHighlight();
  initJapaneseStudyDeck();
});

// --- Theme Management (Dark / Light) ---
function initTheme() {
  const current = localStorage.getItem('coursebook-theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  applyTheme(current);

  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || document.documentElement.classList.contains('dark');
      const nextTheme = isDark ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
    if (document.body) document.body.classList.add('dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark');
    if (document.body) document.body.classList.remove('dark');
  }
  localStorage.setItem('coursebook-theme', theme);
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
          copyBtn.classList.add('copied');
          setTimeout(() => {
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
          copyBtn.classList.add('copied');
          setTimeout(() => {
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

// ==========================================================================
// INTERACTIVE JAPANESE STUDY DECK ENGINE (Audio, Furigana, Flashcards & Progress)
// ==========================================================================
function initJapaneseStudyDeck() {
  const container = document.querySelector('.japanese-container');
  if (!container) return;

  const levelId = container.getAttribute('data-level') || '1';
  const storageKey = `coursebook_jp_mastered_lvl_${levelId}`;
  let masteredSet = new Set(JSON.parse(localStorage.getItem(storageKey) || '[]'));

  const cards = Array.from(container.querySelectorAll('.study-card'));
  const totalCards = cards.length;

  // 1. Initial State Sync
  cards.forEach(card => {
    const itemId = card.getAttribute('data-item-id');
    if (masteredSet.has(itemId)) {
      card.classList.add('mastered');
      const btn = card.querySelector('.master-toggle-btn');
      if (btn) btn.innerHTML = '✓ Mastered';
    }
  });

  updateProgress();

  // 2. Audio Pronunciation Button
  container.querySelectorAll('.audio-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToSpeak = btn.getAttribute('data-speak');
      if (textToSpeak && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(textToSpeak);
        utter.lang = 'ja-JP';
        utter.rate = 0.9;
        window.speechSynthesis.speak(utter);
      }
    });
  });

  // 3. Mark Mastered Toggle
  container.querySelectorAll('.master-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.study-card');
      const itemId = card.getAttribute('data-item-id');

      if (card.classList.contains('mastered')) {
        card.classList.remove('mastered');
        btn.innerHTML = '○ Mark Learned';
        masteredSet.delete(itemId);
      } else {
        card.classList.add('mastered');
        btn.innerHTML = '✓ Mastered';
        masteredSet.add(itemId);
      }

      localStorage.setItem(storageKey, JSON.stringify(Array.from(masteredSet)));
      updateProgress();
      filterCards();
    });
  });

  // 4. Furigana Toggle
  const furiganaToggle = document.getElementById('toggle-furigana-btn');
  if (furiganaToggle) {
    furiganaToggle.addEventListener('click', () => {
      document.body.classList.toggle('hide-furigana');
      furiganaToggle.classList.toggle('active');
    });
  }

  // 5. Flashcard Mode Toggle
  const flashcardToggle = document.getElementById('toggle-flashcard-btn');
  if (flashcardToggle) {
    flashcardToggle.addEventListener('click', () => {
      document.body.classList.toggle('flashcard-mode');
      flashcardToggle.classList.toggle('active');
      cards.forEach(c => c.classList.remove('revealed'));
    });
  }

  // Card click in flashcard mode to reveal
  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (document.body.classList.contains('flashcard-mode')) {
        card.classList.toggle('revealed');
      }
    });
  });

  // 6. Filter Pills (All, Kanji, Vocabulary, Learning, Mastered)
  let currentFilter = 'all';
  const filterPills = container.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter');
      filterCards();
    });
  });

  // 7. Live Search Filter
  const searchInput = document.getElementById('deck-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterCards();
    });
  }

  function filterCards() {
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

    cards.forEach(card => {
      const type = card.getAttribute('data-type'); // 'kanji' or 'vocab'
      const isMastered = card.classList.contains('mastered');
      const text = card.textContent.toLowerCase();

      // Check Category Filter
      let matchesFilter = true;
      if (currentFilter === 'kanji' && type !== 'kanji') matchesFilter = false;
      else if (currentFilter === 'vocab' && type !== 'vocab') matchesFilter = false;
      else if (currentFilter === 'learning' && isMastered) matchesFilter = false;
      else if (currentFilter === 'mastered' && !isMastered) matchesFilter = false;

      // Check Search Query
      let matchesSearch = true;
      if (query && !text.includes(query)) {
        matchesSearch = false;
      }

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function updateProgress() {
    const masteredCount = masteredSet.size;
    const learningCount = totalCards - masteredCount;
    const percentage = totalCards > 0 ? Math.round((masteredCount / totalCards) * 100) : 0;

    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) progressFill.style.width = `${percentage}%`;

    const progressText = document.querySelector('.progress-percentage-text');
    if (progressText) progressText.textContent = `${masteredCount}/${totalCards} (${percentage}%)`;

    const statMastered = document.getElementById('stat-mastered');
    if (statMastered) statMastered.textContent = masteredCount;

    const statLearning = document.getElementById('stat-learning');
    if (statLearning) statLearning.textContent = learningCount;

    const badgeMastered = document.getElementById('badge-count-mastered');
    if (badgeMastered) badgeMastered.textContent = masteredCount;

    const badgeLearning = document.getElementById('badge-count-learning');
    if (badgeLearning) badgeLearning.textContent = learningCount;
  }
}
