// ==========================================================================
// COURSEBOOK INTERACTIVE JAVASCRIPT
// Instant Dark/Light Theme (SVG Icon), Sidebar Auto-Scroll, TOC, Code Copy
// & Interactive 3D Japanese Study Decks (Separated Kanji & Vocabulary)
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

// ==========================================================================
// NATURAL JAPANESE AUDIO & INTERACTIVE STUDY DECK ENGINE
// ==========================================================================

let japaneseVoice = null;

function loadBestJapaneseVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || !voices.length) return null;

  const jpVoices = voices.filter(v => 
    v.lang === 'ja-JP' || v.lang === 'ja_JP' || v.lang.startsWith('ja') || v.name.toLowerCase().includes('japanese')
  );
  if (!jpVoices.length) return null;

  // Preference hierarchy for the most natural, human-sounding voice:
  const preferred = [
    'google 日本語',
    'kyoko (enhanced)',
    'kyoko',
    'otoya (enhanced)',
    'otoya',
    'nanami',
    'keita',
    'ayumi',
    'haruka',
    'ichiro'
  ];

  for (const name of preferred) {
    const match = jpVoices.find(v => v.name.toLowerCase().includes(name));
    if (match) {
      japaneseVoice = match;
      return match;
    }
  }

  japaneseVoice = jpVoices[0];
  return japaneseVoice;
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    loadBestJapaneseVoice();
  };
}

let activeAudioElement = null;

function playNaturalJapaneseAudio(text, btn) {
  if (!text) return;

  if (btn) btn.classList.add('playing');

  // Cancel any ongoing Web Speech synthesis
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  // Stop any active audio object
  if (activeAudioElement) {
    activeAudioElement.pause();
    activeAudioElement = null;
  }

  // High-fidelity fallback function via Web Speech API with natural voice & cadence
  let fallbackInvoked = false;
  const invokeWebSpeechFallback = () => {
    if (fallbackInvoked) return;
    fallbackInvoked = true;

    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'ja-JP';
      utter.rate = 0.92;  // Natural, articulate cadence
      utter.pitch = 1.0;

      const voice = japaneseVoice || loadBestJapaneseVoice();
      if (voice) utter.voice = voice;

      utter.onend = () => { if (btn) btn.classList.remove('playing'); };
      utter.onerror = () => { if (btn) btn.classList.remove('playing'); };

      window.speechSynthesis.speak(utter);
    } else {
      if (btn) btn.classList.remove('playing');
    }
  };

  try {
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encodeURIComponent(text)}`;
    const audio = new Audio(audioUrl);
    activeAudioElement = audio;

    audio.onended = () => {
      if (btn) btn.classList.remove('playing');
    };

    audio.onerror = () => {
      invokeWebSpeechFallback();
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        invokeWebSpeechFallback();
      });
    }
  } catch (err) {
    invokeWebSpeechFallback();
  }
}

function initJapaneseStudyDeck() {
  const container = document.querySelector('.japanese-page-container');
  if (!container) return;

  const levelId = container.getAttribute('data-level') || '1';
  loadBestJapaneseVoice();

  // --- 1. Natural Audio Pronunciation Setup ---
  container.querySelectorAll('.audio-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const text = btn.getAttribute('data-speak');
      playNaturalJapaneseAudio(text, btn);
    });
  });

  // --- 2. 3D Card Flip Interaction ---
  container.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't flip if clicking interactive action buttons
      if (e.target.closest('.audio-btn') || e.target.closest('.master-toggle-btn')) {
        return;
      }
      card.classList.toggle('is-flipped');
    });

    // Flip prompt link on front
    const flipPrompt = card.querySelector('.flip-prompt-btn');
    if (flipPrompt) {
      flipPrompt.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.toggle('is-flipped');
      });
    }

    // Flip back icon on back
    const flipBackIcon = card.querySelector('.flip-back-icon');
    if (flipBackIcon) {
      flipBackIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.remove('is-flipped');
      });
    }
  });

  // --- 3. Independent Kanji Section Controller ---
  setupSectionController({
    sectionEl: document.getElementById('kanji-study-section'),
    storageKey: `coursebook_jp_kanji_lvl_${levelId}`,
    type: 'kanji',
    progressFillSelector: '.progress-fill-kanji',
    progressTextSelector: '#kanji-progress-text',
    statTotalSelector: '#kanji-stat-total',
    statMasteredSelector: '#kanji-stat-mastered',
    statLearningSelector: '#kanji-stat-learning',
    badgeTotalSelector: '#kanji-badge-all',
    badgeMasteredSelector: '#kanji-badge-mastered',
    badgeLearningSelector: '#kanji-badge-learning',
    searchInputId: 'kanji-search-input',
    filterPillSelector: '.filter-pill-kanji'
  });

  // --- 4. Independent Vocabulary Section Controller ---
  setupSectionController({
    sectionEl: document.getElementById('vocab-study-section'),
    storageKey: `coursebook_jp_vocab_lvl_${levelId}`,
    type: 'vocab',
    progressFillSelector: '.progress-fill-vocab',
    progressTextSelector: '#vocab-progress-text',
    statTotalSelector: '#vocab-stat-total',
    statMasteredSelector: '#vocab-stat-mastered',
    statLearningSelector: '#vocab-stat-learning',
    badgeTotalSelector: '#vocab-badge-all',
    badgeMasteredSelector: '#vocab-badge-mastered',
    badgeLearningSelector: '#vocab-badge-learning',
    searchInputId: 'vocab-search-input',
    filterPillSelector: '.filter-pill-vocab',
    furiganaToggleId: 'toggle-furigana-btn'
  });
}

function setupSectionController(config) {
  const section = config.sectionEl;
  if (!section) return;

  const storageKey = config.storageKey;
  let masteredSet = new Set(JSON.parse(localStorage.getItem(storageKey) || '[]'));
  const cards = Array.from(section.querySelectorAll('.flip-card'));
  const totalCount = cards.length;

  // Initialize card states
  cards.forEach(card => {
    const itemId = card.getAttribute('data-item-id');
    if (masteredSet.has(itemId)) {
      card.classList.add('mastered');
      card.querySelectorAll('.master-toggle-btn').forEach(b => b.innerHTML = '✓ Mastered');
    }
  });

  updateStats();

  // Mastered Toggle Buttons
  cards.forEach(card => {
    const itemId = card.getAttribute('data-item-id');
    card.querySelectorAll('.master-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (card.classList.contains('mastered')) {
          card.classList.remove('mastered');
          card.querySelectorAll('.master-toggle-btn').forEach(b => b.innerHTML = '○ Mark Learned');
          masteredSet.delete(itemId);
        } else {
          card.classList.add('mastered');
          card.querySelectorAll('.master-toggle-btn').forEach(b => b.innerHTML = '✓ Mastered');
          masteredSet.add(itemId);
        }
        localStorage.setItem(storageKey, JSON.stringify(Array.from(masteredSet)));
        updateStats();
        applyFilter();
      });
    });
  });

  // Filter Pills (All, Learning, Mastered)
  let currentFilter = 'all';
  const filterPills = section.querySelectorAll(config.filterPillSelector);
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter');
      applyFilter();
    });
  });

  // Search Input
  const searchInput = document.getElementById(config.searchInputId);
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      applyFilter();
    });
  }

  // Optional Furigana Toggle
  if (config.furiganaToggleId) {
    const furiganaBtn = document.getElementById(config.furiganaToggleId);
    if (furiganaBtn) {
      furiganaBtn.addEventListener('click', () => {
        document.body.classList.toggle('hide-furigana');
        furiganaBtn.classList.toggle('active');
      });
    }
  }

  function applyFilter() {
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

    cards.forEach(card => {
      const isMastered = card.classList.contains('mastered');
      const text = card.textContent.toLowerCase();

      let matchesFilter = true;
      if (currentFilter === 'learning' && isMastered) matchesFilter = false;
      else if (currentFilter === 'mastered' && !isMastered) matchesFilter = false;

      let matchesSearch = true;
      if (query && !text.includes(query)) {
        matchesSearch = false;
      }

      if (matchesFilter && matchesSearch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function updateStats() {
    const mastered = masteredSet.size;
    const learning = totalCount - mastered;
    const pct = totalCount > 0 ? Math.round((mastered / totalCount) * 100) : 0;

    const progressFill = section.querySelector(config.progressFillSelector);
    if (progressFill) progressFill.style.width = `${pct}%`;

    const progressText = section.querySelector(config.progressTextSelector);
    if (progressText) progressText.textContent = `${mastered}/${totalCount} (${pct}%)`;

    const statTotal = section.querySelector(config.statTotalSelector);
    if (statTotal) statTotal.textContent = totalCount;

    const statMastered = section.querySelector(config.statMasteredSelector);
    if (statMastered) statMastered.textContent = mastered;

    const statLearning = section.querySelector(config.statLearningSelector);
    if (statLearning) statLearning.textContent = learning;

    const badgeAll = section.querySelector(config.badgeTotalSelector);
    if (badgeAll) badgeAll.textContent = totalCount;

    const badgeMastered = section.querySelector(config.badgeMasteredSelector);
    if (badgeMastered) badgeMastered.textContent = mastered;

    const badgeLearning = section.querySelector(config.badgeLearningSelector);
    if (badgeLearning) badgeLearning.textContent = learning;
  }
}
