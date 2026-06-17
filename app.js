// DBMS Study Dashboard Application Logic

// Global State
let currentSubject = dbms_data;
let currentUnitIndex = 0;
let currentMode = 'study';
let currentFlashcardIndex = 0;
let flashcardList = [];

// LocalStorage key
const PROGRESS_KEY = 'sem4_dbms_study_progress';

function getProgress() {
  const data = localStorage.getItem(PROGRESS_KEY);
  return data ? JSON.parse(data) : {};
}

function saveQuestionProgress(qId, status) {
  const progress = getProgress();
  progress[qId] = status;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  calculateAndRenderStats();
}

// Fallback Markdown Parser
function fallbackMarkdown(md) {
  let html = md;
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
    return `<pre><code>${code.trim()}</code></pre>`;
  });
  html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/\*\*([\s\S]*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/^\s*[\-\*]\s+(.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, (match) => {
    return `<ul>${match}</ul>`;
  });
  html = html.replace(/<\/ul>\s*<ul>/g, '');

  html = html.replace(/^\|([\s\S]*?)\|$/gm, (match, row) => {
    const cols = row.split('|').map(c => c.trim());
    const isHeader = match.includes('---');
    if (isHeader) return '';
    const tag = 'td';
    const cells = cols.map(c => `<${tag}>${c}</${tag}>`).join('');
    return `<tr>${cells}</tr>`;
  });
  html = html.replace(/((?:<tr>[\s\S]*?<\/tr>)+)/g, '<table>$1</table>');
  html = html.replace(/^---$/gm, '<hr>');
  html = html.replace(/\n\n/g, '</p><p>');
  html = `<p>${html}</p>`;
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p><hr><\/p>/g, '<hr>');
  html = html.replace(/<p><h3>(.*?)<\/h3><\/p>/g, '<h3>$1</h3>');
  html = html.replace(/<p><table>(.*?)<\/table><\/p>/g, '<table>$1</table>');
  html = html.replace(/<p><pre>([\s\S]*?)<\/pre><\/p>/g, '<pre>$1</pre>');

  return html;
}

function renderMarkdown(md) {
  if (window.marked && typeof window.marked.parse === 'function') {
    return window.marked.parse(md);
  }
  return fallbackMarkdown(md);
}

function calculateAndRenderStats() {
  const progress = getProgress();
  const allQuestions = [];
  
  const unitStats = currentSubject.units.map(unit => {
    let mastered = 0;
    let learning = 0;
    let notStarted = 0;
    
    unit.questions.forEach(q => {
      allQuestions.push(q);
      const status = progress[q.id] || 'not-started';
      if (status === 'mastered') mastered++;
      else if (status === 'learning') learning++;
      else notStarted++;
    });
    
    const total = unit.questions.length;
    const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;
    
    return { unitNum: unit.unitNum, mastered, learning, notStarted, total, pct };
  });
  
  let totalMastered = 0, totalLearning = 0, totalNotStarted = 0;
  
  allQuestions.forEach(q => {
    const status = progress[q.id] || 'not-started';
    if (status === 'mastered') totalMastered++;
    else if (status === 'learning') totalLearning++;
    else totalNotStarted++;
  });
  
  const totalQuestions = allQuestions.length;
  const overallPct = totalQuestions > 0 ? Math.round((totalMastered / totalQuestions) * 100) : 0;
  
  document.getElementById('overall-progress-pct').textContent = `${overallPct}%`;
  document.getElementById('overall-progress-fill').style.width = `${overallPct}%`;
  document.getElementById('count-not-started').textContent = totalNotStarted;
  document.getElementById('count-learning').textContent = totalLearning;
  document.getElementById('count-mastered').textContent = totalMastered;
  
  unitStats.forEach(stat => {
    const bar = document.getElementById(`nav-progress-bar-${stat.unitNum}`);
    if (bar) bar.style.width = `${stat.pct}%`;
  });
}

function renderSidebarUnits() {
  const navList = document.getElementById('nav-list');
  navList.innerHTML = '';
  
  currentSubject.units.forEach((unit, idx) => {
    const li = document.createElement('li');
    li.className = 'nav-item';
    const activeClass = idx === currentUnitIndex && currentMode === 'study' ? 'active' : '';
    
    li.innerHTML = `
      <div class="nav-link ${activeClass}" onclick="switchUnit(${idx})">
        <span class="nav-unit-num">Unit ${unit.unitNum}</span>
        <span class="nav-unit-title">${unit.unitTitle}</span>
        <div class="nav-unit-progress">
          <div class="nav-unit-bar" id="nav-progress-bar-${unit.unitNum}"></div>
        </div>
      </div>
    `;
    navList.appendChild(li);
  });
}

window.switchUnit = function(unitIdx) {
  if (currentMode !== 'study' && currentMode !== 'flash' && currentMode !== 'revision') {
    currentMode = 'study';
  }
  currentUnitIndex = unitIdx;
  
  document.getElementById('btn-mode-study').classList.remove('active');
  document.getElementById('btn-mode-flash').classList.remove('active');
  document.getElementById('btn-mode-revision').classList.remove('active');
  
  document.getElementById('qa-layout').classList.add('hidden');
  document.getElementById('flashcard-layout').classList.remove('active');
  document.getElementById('revision-layout').classList.add('hidden');
  
  if (currentMode === 'study') {
    document.getElementById('btn-mode-study').classList.add('active');
    document.getElementById('qa-layout').classList.remove('hidden');
    renderQuestions();
  } else if (currentMode === 'revision') {
    document.getElementById('btn-mode-revision').classList.add('active');
    document.getElementById('revision-layout').classList.remove('hidden');
    renderRevision();
  } else {
    document.getElementById('btn-mode-flash').classList.add('active');
    document.getElementById('flashcard-layout').classList.add('active');
    const unit = currentSubject.units[currentUnitIndex];
    flashcardList = [...unit.questions];
    shuffleArray(flashcardList);
    currentFlashcardIndex = 0;
    renderFlashcard();
  }
  
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link, idx) => {
    if (idx === unitIdx) link.classList.add('active');
    else link.classList.remove('active');
  });
  
  closeMobileSidebar();
};

function renderQuestions(filterQuery = '') {
  const container = document.getElementById('qa-list-container');
  container.innerHTML = '';
  
  const unit = currentSubject.units[currentUnitIndex];
  
  document.getElementById('header-unit-title').textContent = `Unit ${unit.unitNum}: ${unit.unitTitle}`;
  document.getElementById('header-subject-title').textContent = currentSubject.subjectName;
  
  const progress = getProgress();
  
  let questionsToRender = unit.questions;
  let isSearchingAll = false;
  
  if (filterQuery.trim() !== '') {
    const query = filterQuery.toLowerCase().trim();
    questionsToRender = [];
    currentSubject.units.forEach(u => {
      u.questions.forEach(q => {
        if (
          q.question.toLowerCase().includes(query) ||
          q.answer.toLowerCase().includes(query) ||
          `q${q.number}`.includes(query)
        ) {
          questionsToRender.push({ ...q, unitNum: u.unitNum });
        }
      });
    });
    isSearchingAll = true;
    document.getElementById('header-unit-title').textContent = `Search Results for "${filterQuery}"`;
  }
  
  if (questionsToRender.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>No matches found</h3>
        <p>Try searching other keywords, or clear the search bar.</p>
      </div>
    `;
    return;
  }
  
  questionsToRender.forEach(q => {
    const card = document.createElement('div');
    card.className = 'qa-card';
    card.id = `card-${q.id}`;
    
    const status = progress[q.id] || 'not-started';
    const unitCtx = isSearchingAll ? `<span class="qa-marks">Unit ${q.unitNum}</span>` : '';
    
    let highlightedQuestion = q.question;
    let highlightedAnswer = renderMarkdown(q.answer);
    
    if (filterQuery.trim() !== '') {
      const queryEscaped = filterQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(${queryEscaped})`, 'gi');
      highlightedQuestion = q.question.replace(regex, '<mark>$1</mark>');
      highlightedAnswer = highlightedAnswer.replace(/(<[^>]+>)|([^<]+)/g, (match, isTag, text) => {
        if (isTag) return isTag;
        return text.replace(regex, '<mark>$1</mark>');
      });
    }
    
    card.innerHTML = `
      <div class="qa-header" onclick="toggleCard('${q.id}')">
        <div class="qa-title-wrapper">
          <div class="qa-meta">
            <span class="qa-num">Question ${q.number}</span>
            ${unitCtx}
            <span class="qa-marks">${q.marks} Marks</span>
          </div>
          <h3 class="qa-question">${highlightedQuestion}</h3>
        </div>
        
        <div class="state-selector-wrapper" onclick="event.stopPropagation()">
          <span class="state-indicator ${status}" id="indicator-${q.id}"></span>
          <select class="state-select" onchange="changeProgress('${q.id}', this.value)">
            <option value="not-started" ${status === 'not-started' ? 'selected' : ''}>🔴 Not Started</option>
            <option value="learning" ${status === 'learning' ? 'selected' : ''}>🟡 Learning</option>
            <option value="mastered" ${status === 'mastered' ? 'selected' : ''}>🟢 Mastered</option>
          </select>
        </div>
        
        <div class="expand-icon">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div class="qa-body">
        <div class="qa-content">
          ${highlightedAnswer}
        </div>
      </div>
    `;
    
    container.appendChild(card);
  });
}

window.toggleCard = function(qId) {
  const card = document.getElementById(`card-${qId}`);
  if (!card) return;
  if (card.classList.contains('expanded')) {
    card.classList.remove('expanded');
  } else {
    card.classList.add('expanded');
  }
};

window.changeProgress = function(qId, status) {
  saveQuestionProgress(qId, status);
  const indicator = document.getElementById(`indicator-${qId}`);
  if (indicator) indicator.className = `state-indicator ${status}`;
};

window.setMode = function(mode) {
  currentMode = mode;
  const searchInput = document.getElementById('search-input');
  
  document.getElementById('btn-mode-study').classList.remove('active');
  document.getElementById('btn-mode-flash').classList.remove('active');
  document.getElementById('btn-mode-revision').classList.remove('active');
  
  document.getElementById('qa-layout').classList.add('hidden');
  document.getElementById('flashcard-layout').classList.remove('active');
  document.getElementById('revision-layout').classList.add('hidden');
  
  if (mode === 'study') {
    searchInput.disabled = false;
    document.getElementById('btn-mode-study').classList.add('active');
    document.getElementById('qa-layout').classList.remove('hidden');
    switchUnit(currentUnitIndex);
  } else if (mode === 'revision') {
    searchInput.disabled = true;
    searchInput.value = '';
    document.getElementById('btn-mode-revision').classList.add('active');
    document.getElementById('revision-layout').classList.remove('hidden');
    renderRevision();
  } else {
    searchInput.disabled = true;
    searchInput.value = '';
    
    document.getElementById('btn-mode-flash').classList.add('active');
    document.getElementById('flashcard-layout').classList.add('active');
    
    const unit = currentSubject.units[currentUnitIndex];
    flashcardList = [...unit.questions];
    shuffleArray(flashcardList);
    currentFlashcardIndex = 0;
    renderFlashcard();
  }
};

function renderRevision() {
  const container = document.getElementById('revision-list-container');
  container.innerHTML = '';
  
  const unit = currentSubject.units[currentUnitIndex];
  document.getElementById('header-unit-title').textContent = `Revision — Unit ${unit.unitNum}: ${unit.unitTitle}`;
  document.getElementById('header-subject-title').textContent = currentSubject.subjectName;
  
  const revisionsToRender = revision_data.filter(rev => rev.unit === unit.unitNum);
  
  if (revisionsToRender.length === 0) {
    container.innerHTML = `<div class="empty-state"><h3>No revision notes available for this unit.</h3></div>`;
    return;
  }
  
  revisionsToRender.forEach((rev, idx) => {
    const card = document.createElement('div');
    card.className = 'revision-card';
    
    const pointsHtml = rev.points.map(pt => {
      let text = pt;
      text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      return `<li>${text}</li>`;
    }).join('');
    
    card.innerHTML = `
      <div class="revision-card-header">
        <span class="revision-card-num">Question ${idx + 1}</span>
        <h3 class="revision-card-title">${rev.question}</h3>
      </div>
      <div class="revision-card-body">
        <ul>
          ${pointsHtml}
        </ul>
      </div>
    `;
    container.appendChild(card);
  });
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function renderFlashcard() {
  const container = document.getElementById('flashcard-inner-container');
  container.innerHTML = '';
  
  if (flashcardList.length === 0) {
    container.innerHTML = `<div class="empty-state"><h3>No questions available in this unit.</h3></div>`;
    return;
  }
  
  const q = flashcardList[currentFlashcardIndex];
  const progress = getProgress();
  const status = progress[q.id] || 'not-started';
  
  document.getElementById('header-unit-title').textContent = `Flashcards — Unit ${currentSubject.units[currentUnitIndex].unitNum}`;
  
  const cardContainer = document.createElement('div');
  cardContainer.className = 'card-flip-container';
  cardContainer.id = 'active-flashcard';
  cardContainer.onclick = function() { this.classList.toggle('flipped'); };
  
  cardContainer.innerHTML = `
    <div class="fc-side fc-front">
      <div class="fc-front-meta">Question ${q.number} • ${q.marks} Marks</div>
      <h2 class="fc-front-title">${q.question}</h2>
      <div class="fc-hint">Click Card to Reveal Answer</div>
    </div>
    <div class="fc-side fc-back" onclick="event.stopPropagation()">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:12px;">
        <span class="fc-front-meta" style="margin-bottom:0;">Answer for Q${q.number}</span>
        <div class="state-selector-wrapper">
          <span class="state-indicator ${status}" id="fc-indicator-${q.id}"></span>
          <select class="state-select" onchange="changeProgress('${q.id}', this.value); document.getElementById('fc-indicator-${q.id}').className='state-indicator '+this.value;">
            <option value="not-started" ${status === 'not-started' ? 'selected' : ''}>🔴 Not Started</option>
            <option value="learning" ${status === 'learning' ? 'selected' : ''}>🟡 Learning</option>
            <option value="mastered" ${status === 'mastered' ? 'selected' : ''}>🟢 Mastered</option>
          </select>
        </div>
      </div>
      <div class="qa-content" style="padding:0;">
        ${renderMarkdown(q.answer)}
      </div>
      <div class="fc-hint" style="text-align:center; margin-top:20px; color:var(--text-muted);">Click anywhere outside this content to flip back</div>
    </div>
  `;
  
  container.appendChild(cardContainer);
  document.getElementById('fc-progress').textContent = `${currentFlashcardIndex + 1} / ${flashcardList.length}`;
}

window.prevFlashcard = function() {
  if (currentFlashcardIndex > 0) { currentFlashcardIndex--; renderFlashcard(); }
};

window.nextFlashcard = function() {
  if (currentFlashcardIndex < flashcardList.length - 1) { currentFlashcardIndex++; renderFlashcard(); }
};

let searchDebounceTimeout = null;
window.handleSearch = function(val) {
  clearTimeout(searchDebounceTimeout);
  if (currentMode !== 'study') {
    currentMode = 'study';
    document.getElementById('btn-mode-study').classList.add('active');
    document.getElementById('btn-mode-flash').classList.remove('active');
    document.getElementById('qa-layout').classList.remove('hidden');
    document.getElementById('flashcard-layout').classList.remove('active');
  }
  searchDebounceTimeout = setTimeout(() => { renderQuestions(val); }, 250);
};

window.toggleMobileSidebar = function() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('active');
};

window.closeMobileSidebar = function() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('active');
};

function init() {
  renderSidebarUnits();
  calculateAndRenderStats();
  switchUnit(0);
}

window.addEventListener('DOMContentLoaded', init);
