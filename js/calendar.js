// ==========================================================================
// MASTER'S DEGREE & LIFE OS CALENDAR ENGINE (2026 - 2028)
// Interactive 2-Year Monthly Planner, Japan Holidays, Habit Tracker & Tasks
// ==========================================================================

const JAPAN_HOLIDAYS = {
  // 2026
  "2026-01-01": "元日",
  "2026-01-12": "成人の日",
  "2026-02-11": "建国記念の日",
  "2026-02-23": "天皇誕生日",
  "2026-03-20": "春分の日",
  "2026-04-29": "昭和の日",
  "2026-05-03": "憲法記念日",
  "2026-05-04": "みどりの日",
  "2026-05-05": "こどもの日",
  "2026-05-06": "振替休日",
  "2026-07-20": "海の日",
  "2026-08-11": "山の日",
  "2026-09-21": "敬老の日",
  "2026-09-22": "国民の休日",
  "2026-09-23": "秋分の日",
  "2026-10-12": "スポーツの日",
  "2026-11-03": "文化の日",
  "2026-11-23": "勤労感謝の日",

  // 2027
  "2027-01-01": "元日",
  "2027-01-11": "成人の日",
  "2027-02-11": "建国記念の日",
  "2027-02-23": "天皇誕生日",
  "2027-03-21": "春分の日",
  "2027-03-22": "振替休日",
  "2027-04-29": "昭和の日",
  "2027-05-03": "憲法記念日",
  "2027-05-04": "みどりの日",
  "2027-05-05": "こどもの日",
  "2027-07-19": "海の日",
  "2027-08-11": "山の日",
  "2027-09-20": "敬老の日",
  "2027-09-23": "秋分の日",
  "2027-10-11": "スポーツの日",
  "2027-11-03": "文化の日",
  "2027-11-23": "勤労感謝の日",

  // 2028
  "2028-01-01": "元日",
  "2028-01-10": "成人の日",
  "2028-02-11": "建国記念の日",
  "2028-02-23": "天皇誕生日",
  "2028-03-20": "春分の日",
  "2028-04-29": "昭和の日",
  "2028-05-03": "憲法記念日",
  "2028-05-04": "みどりの日",
  "2028-05-05": "こどもの日",
  "2028-07-17": "海の日",
  "2028-08-11": "山の日",
  "2028-09-18": "敬老の日",
  "2028-09-22": "秋分の日",
  "2028-10-09": "スポーツの日",
  "2028-11-03": "文化の日",
  "2028-11-23": "勤労感謝の日"
};

const NEPALI_FESTIVALS = {
  // 2026
  "2026-09-14": "🪷 Teej (हरितालिका तीज)",
  "2026-10-10": "🌾 Dashain: Ghatasthapana (घटस्थापना)",
  "2026-10-16": "🌸 Dashain: Fulpati (फूलपाती)",
  "2026-10-17": "⚔️ Dashain: Maha Ashtami (महाष्टमी)",
  "2026-10-18": "🛡️ Dashain: Maha Navami (महानवमी)",
  "2026-10-19": "🇳🇵 Dashain: Vijaya Dashami (बडा दशैं - टीका)",
  "2026-10-24": "🌕 Dashain: Kojagrat Purnima (कोजाग्रत पूर्णिमा)",
  "2026-11-07": "🦅 Tihar: Kaag Tihar (काग तिहार)",
  "2026-11-08": "🐕 Tihar: Kukur Tihar & 🪔 Laxmi Puja (लक्ष्मी पूजा)",
  "2026-11-09": "🐮 Tihar: Govardhan Puja / Mha Puja (गोवर्धन / म्ह पूजा)",
  "2026-11-10": "🌺 Tihar: Bhai Tika (भाइटीका)",
  "2026-11-15": "☀️ Chhath Puja (छठ पर्व)",
  "2027-01-14": "🍲 Maghe Sankranti (माघे संक्रान्ति)",
  "2027-03-06": "🔱 Maha Shivaratri (महाशिवरात्रि)",
  "2027-03-23": "🎨 Holi: Fagu Purnima (होली)",
  "2027-04-14": "🇳🇵 Nepali New Year 2084 (नयाँ वर्ष बैशाख १)",
  "2027-05-20": "☸️ Buddha Jayanti (बुद्ध जयन्ती)",

  // 2027
  "2027-09-04": "🪷 Teej (हरितालिका तीज)",
  "2027-09-30": "🌾 Dashain: Ghatasthapana (घटस्थापना)",
  "2027-10-06": "🌸 Dashain: Fulpati (फूलपाती)",
  "2027-10-07": "⚔️ Dashain: Maha Ashtami (महाष्टमी)",
  "2027-10-08": "🛡️ Dashain: Maha Navami (महानवमी)",
  "2027-10-09": "🇳🇵 Dashain: Vijaya Dashami (बडा दशैं - टीका)",
  "2027-10-14": "🌕 Dashain: Kojagrat Purnima (कोजाग्रत पूर्णिमा)",
  "2027-10-28": "🦅 Tihar: Kaag Tihar (काग तिहार)",
  "2027-10-29": "🪔 Tihar: Laxmi Puja (लक्ष्मी पूजा)",
  "2027-10-30": "🐮 Tihar: Govardhan Puja / Mha Puja (गोवर्धन / म्ह पूजा)",
  "2027-10-31": "🌺 Tihar: Bhai Tika (भाइटीका)",
  "2027-11-04": "☀️ Chhath Puja (छठ पर्व)",
  "2028-01-15": "🍲 Maghe Sankranti (माघे संक्रान्ति)",
  "2028-02-23": "🔱 Maha Shivaratri (महाशिवरात्रि)",
  "2028-03-11": "🎨 Holi: Fagu Purnima (होली)",
  "2028-04-13": "🇳🇵 Nepali New Year 2085 (नयाँ वर्ष बैशाख १)",
  "2028-05-09": "☸️ Buddha Jayanti (बुद्ध जयन्ती)",

  // 2028
  "2028-08-23": "🪷 Teej (हरितालिका तीज)",
  "2028-10-18": "🌾 Dashain: Ghatasthapana (घटस्थापना)",
  "2028-10-25": "🌸 Dashain: Fulpati (फूलपाती)",
  "2028-10-26": "⚔️ Dashain: Maha Ashtami / Navami (अष्टमी/नवमी)",
  "2028-10-27": "🇳🇵 Dashain: Vijaya Dashami (बडा दशैं - टीका)",
  "2028-11-16": "🪔 Tihar: Laxmi Puja (लक्ष्मी पूजा)",
  "2028-11-17": "🐮 Tihar: Govardhan Puja (गोवर्धन पूजा)",
  "2028-11-18": "🌺 Tihar: Bhai Tika (भाइटीका)",
  "2028-11-22": "☀️ Chhath Puja (छठ पर्व)"
};

const ACADEMIC_MILESTONES = {
  "2026-09-01": { title: "🍁 Fall 2026 Semester Starts", type: "univ" },
  "2026-09-15": { title: "🔬 Lab Orientation & Research Topic", type: "research" },
  "2026-10-01": { title: "🐍 CS106A + CME193 Midpoint", type: "course" },
  "2026-11-15": { title: "📝 Fall Course Midterm Reports", type: "univ" },
  "2026-12-25": { title: "❄️ Winter Break Starts", type: "personal" },
  "2027-01-15": { title: "📊 Term Exams & First Lab Presentation", type: "research" },
  "2027-04-01": { title: "🌸 Spring 2027 Semester Starts", type: "univ" },
  "2027-05-10": { title: "🧬 CS279 Biomolecular Project Kickoff", type: "course" },
  "2027-07-20": { title: "🔬 Master's Thesis Topic Proposal", type: "research" },
  "2027-09-01": { title: "🍁 Fall 2027 Semester (M2 Year)", type: "univ" },
  "2027-10-15": { title: "⚡ Deep Learning & Flow Models (DLWP/MIT)", type: "course" },
  "2027-12-01": { title: "🧪 Thesis Core Experiment Milestone", type: "research" },
  "2028-04-01": { title: "🌸 Spring 2028 Final Semester", type: "univ" },
  "2028-06-15": { title: "📑 Master's Thesis Draft Submission", type: "research" },
  "2028-07-25": { title: "🎓 Final Master's Thesis Defense", type: "research" },
  "2028-09-20": { title: "🎉 Master's Degree Graduation Ceremony", type: "univ" }
};

// Current active view state (defaulting to Aug/Sep 2026)
let currentYear = 2026;
let currentMonth = 7; // August (0-indexed: 7 = August)
let selectedDateStr = "2026-08-31";

// Persistent Data Model
const STORAGE_KEY_CALENDAR = "coursebook_master_calendar_data";
const STORAGE_KEY_HABITS = "coursebook_daily_habits";

let userCalendarData = JSON.parse(localStorage.getItem(STORAGE_KEY_CALENDAR) || "{}");
let userHabitsData = JSON.parse(localStorage.getItem(STORAGE_KEY_HABITS) || "{}");

document.addEventListener("DOMContentLoaded", () => {
  renderCalendar();
  initCalendarEvents();
  initHabitCheckboxes();
});

function renderCalendar() {
  const monthDisplay = document.getElementById("month-display-title");
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  if (monthDisplay) {
    monthDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
  }

  // Highlight current active semester pill
  updateActiveSemesterPill();

  const daysGrid = document.getElementById("calendar-days-grid");
  if (!daysGrid) return;

  daysGrid.innerHTML = "";

  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Render ONLY the current month's days
  for (let day = 1; day <= lastDate; day++) {
    const dateStr = formatDateKey(currentYear, currentMonth, day);
    const cell = createDayCell(day, dateStr);
    
    // Offset the first day to the correct weekday column in the 7-day grid
    if (day === 1 && firstDayIndex > 0) {
      cell.style.gridColumnStart = firstDayIndex + 1;
    }
    
    daysGrid.appendChild(cell);
  }
}

function createDayCell(dayNum, dateStr) {
  const cell = document.createElement("div");
  cell.className = "cal-day-cell";
  cell.setAttribute("data-date", dateStr);

  const todayStr = "2026-08-31"; // Current anchored reference date
  if (dateStr === todayStr) {
    cell.classList.add("is-today");
  }
  if (dateStr === selectedDateStr) {
    cell.classList.add("is-selected");
  }

  const holidayName = JAPAN_HOLIDAYS[dateStr];
  const nepaliFestival = NEPALI_FESTIVALS[dateStr];
  const milestone = ACADEMIC_MILESTONES[dateStr];
  const userTasks = userCalendarData[dateStr] || [];

  let badgesHtml = "";
  if (nepaliFestival) {
    badgesHtml += `<span class="cal-nepal-festival-badge" title="Nepali Festival: ${nepaliFestival}">${nepaliFestival}</span>`;
  }
  if (holidayName) {
    badgesHtml += `<span class="cal-jp-holiday-badge" title="Japanese Holiday: ${holidayName}">🎌 ${holidayName}</span>`;
  }

  // Combine items to show max 2 items cleanly without overflowing
  const allEvents = [];
  if (milestone) {
    allEvents.push({ title: milestone.title, type: milestone.type });
  }
  userTasks.forEach(task => {
    allEvents.push({ title: `${task.completed ? "✓ " : ""}${task.text}`, type: "personal" });
  });

  let eventsHtml = "";
  allEvents.slice(0, 2).forEach(ev => {
    eventsHtml += `<span class="cal-event-pill event-${ev.type}" title="${ev.title}">${ev.title}</span>`;
  });

  if (allEvents.length > 2) {
    eventsHtml += `<span style="font-size:0.64rem;font-weight:600;color:var(--text-muted);padding-left:2px;">+${allEvents.length - 2} more</span>`;
  }

  cell.innerHTML = `
    <div class="cal-day-top">
      <span class="cal-day-num">${dayNum}</span>
      <div class="cal-day-badges-wrapper">
        ${badgesHtml}
      </div>
    </div>
    <div class="cal-day-events">
      ${eventsHtml}
    </div>
  `;

  cell.addEventListener("click", () => {
    openDayModal(dateStr);
  });

  return cell;
}

function formatDateKey(year, monthIndex, day) {
  const y = year;
  const m = String(monthIndex + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function updateActiveSemesterPill() {
  document.querySelectorAll(".semester-pill").forEach(pill => {
    const startY = parseInt(pill.getAttribute("data-start-year"), 10);
    const startM = parseInt(pill.getAttribute("data-start-month"), 10);
    const endY = parseInt(pill.getAttribute("data-end-year"), 10);
    const endM = parseInt(pill.getAttribute("data-end-month"), 10);

    const isCurrent = (currentYear > startY || (currentYear === startY && currentMonth >= startM)) &&
                      (currentYear < endY || (currentYear === endY && currentMonth <= endM));

    if (isCurrent) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  });
}

function initCalendarEvents() {
  const prevBtn = document.getElementById("prev-month-btn");
  const nextBtn = document.getElementById("next-month-btn");
  const todayBtn = document.getElementById("today-btn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    });
  }

  if (todayBtn) {
    todayBtn.addEventListener("click", () => {
      currentYear = 2026;
      currentMonth = 7; // August
      renderCalendar();
      openDayModal("2026-08-31");
    });
  }

  // Semester Quick Jump
  document.querySelectorAll(".semester-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      currentYear = parseInt(pill.getAttribute("data-start-year"), 10);
      currentMonth = parseInt(pill.getAttribute("data-start-month"), 10);
      renderCalendar();
    });
  });

  // Modal Close Events
  const modalBackdrop = document.getElementById("day-modal-backdrop");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  if (modalCloseBtn && modalBackdrop) {
    modalCloseBtn.addEventListener("click", () => {
      modalBackdrop.classList.remove("active");
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove("active");
      }
    });
  }

  // Add Task Input Handler
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("new-task-input");

  if (addTaskBtn && taskInput) {
    addTaskBtn.addEventListener("click", () => {
      handleAddTask();
    });

    taskInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleAddTask();
      }
    });
  }
}

function openDayModal(dateStr) {
  selectedDateStr = dateStr;
  const modalBackdrop = document.getElementById("day-modal-backdrop");
  const modalTitle = document.getElementById("day-modal-date-title");
  const holidayNote = document.getElementById("day-modal-holiday-note");

  if (!modalBackdrop) return;

  const dateObj = new Date(dateStr + "T00:00:00");
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);

  if (modalTitle) modalTitle.textContent = formattedDate;

  // Holiday, Nepali Festival or Academic Milestone Banner
  const holiday = JAPAN_HOLIDAYS[dateStr];
  const nepali = NEPALI_FESTIVALS[dateStr];
  const milestone = ACADEMIC_MILESTONES[dateStr];

  if (holidayNote) {
    let noteHtml = "";
    if (nepali) {
      noteHtml += `<div style="color:#b45309;font-weight:700;font-size:0.88rem;margin-bottom:6px;background:#fef3c7;padding:6px 12px;border-radius:6px;border:1px solid #fde68a;">🇳🇵 Nepali Festival: ${nepali}</div>`;
    }
    if (holiday) {
      noteHtml += `<div style="color:#e11d48;font-weight:600;font-size:0.85rem;margin-bottom:4px;">🎌 Japanese Holiday: ${holiday}</div>`;
    }
    if (milestone) {
      noteHtml += `<div style="color:var(--accent-primary);font-weight:600;font-size:0.85rem;">🎓 Milestone: ${milestone.title}</div>`;
    }
    holidayNote.innerHTML = noteHtml;
  }

  renderDayTasks(dateStr);
  modalBackdrop.classList.add("active");

  // Re-render calendar grid to update selection
  renderCalendar();
}

function renderDayTasks(dateStr) {
  const listEl = document.getElementById("modal-tasks-list");
  if (!listEl) return;

  listEl.innerHTML = "";
  const tasks = userCalendarData[dateStr] || [];

  if (tasks.length === 0) {
    listEl.innerHTML = `<div style="text-align:center;color:var(--text-muted);font-size:0.84rem;padding:12px;">No tasks added for this day yet. Add one below!</div>`;
    return;
  }

  tasks.forEach((task, idx) => {
    const item = document.createElement("div");
    item.className = `modal-task-item ${task.completed ? "completed" : ""}`;
    item.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;">
        <input type="checkbox" ${task.completed ? "checked" : ""} data-idx="${idx}">
        <span>${task.text}</span>
      </div>
      <button class="task-del-btn" data-idx="${idx}" title="Delete task">✕</button>
    `;

    const checkbox = item.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", (e) => {
      tasks[idx].completed = e.target.checked;
      userCalendarData[dateStr] = tasks;
      saveCalendarData();
      renderDayTasks(dateStr);
      renderCalendar();
    });

    const delBtn = item.querySelector(".task-del-btn");
    delBtn.addEventListener("click", () => {
      tasks.splice(idx, 1);
      if (tasks.length === 0) {
        delete userCalendarData[dateStr];
      } else {
        userCalendarData[dateStr] = tasks;
      }
      saveCalendarData();
      renderDayTasks(dateStr);
      renderCalendar();
    });

    listEl.appendChild(item);
  });
}

function handleAddTask() {
  const taskInput = document.getElementById("new-task-input");
  if (!taskInput || !taskInput.value.trim()) return;

  const text = taskInput.value.trim();
  if (!userCalendarData[selectedDateStr]) {
    userCalendarData[selectedDateStr] = [];
  }

  userCalendarData[selectedDateStr].push({
    text: text,
    completed: false,
    created_at: new Date().toISOString()
  });

  saveCalendarData();
  taskInput.value = "";
  renderDayTasks(selectedDateStr);
  renderCalendar();
}

function saveCalendarData() {
  localStorage.setItem(STORAGE_KEY_CALENDAR, JSON.stringify(userCalendarData));
}

// --- Daily Consistency Habit Checklist ---
function initHabitCheckboxes() {
  const todayKey = "2026-08-31";
  const todayHabits = userHabitsData[todayKey] || {};

  document.querySelectorAll(".habit-checkbox-item").forEach(item => {
    const habitId = item.getAttribute("data-habit-id");
    if (todayHabits[habitId]) {
      item.classList.add("checked");
    }

    item.addEventListener("click", () => {
      item.classList.toggle("checked");
      const isChecked = item.classList.contains("checked");

      if (!userHabitsData[todayKey]) {
        userHabitsData[todayKey] = {};
      }
      userHabitsData[todayKey][habitId] = isChecked;

      localStorage.setItem(STORAGE_KEY_HABITS, JSON.stringify(userHabitsData));
    });
  });
}
