(function () {
  const THEME_KEY = "workoutFlowTheme";
  const root = document.documentElement;
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  function applyTheme(theme) {
    if (theme === "dark") {
      root.classList.add("theme-dark");
    } else {
      root.classList.remove("theme-dark");
    }
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute("data-theme", theme);
    }
  }

  function loadTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") {
      applyTheme(saved);
    } else {
      // по умолчанию светлая
      applyTheme("light");
    }
  }

  function toggleTheme() {
    const isDark = root.classList.contains("theme-dark");
    const next = isDark ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  loadTheme();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }
})();
(function () {
  const STORAGE_KEY = "workoutFlowState.v1";

  const defaultExercises = [
    // Воркаут / свой вес
    {
      id: "pullups",
      name: "Подтягивания",
      type: "reps",
      defaultSets: 5,
      defaultReps: 5,
    },
    {
      id: "pullups-wide",
      name: "Подтягивания широким хватом",
      type: "reps",
      defaultSets: 3,
      defaultReps: 6,
    },
    {
      id: "chinups",
      name: "Подтягивания обратным хватом",
      type: "reps",
      defaultSets: 4,
      defaultReps: 6,
    },
    {
      id: "dips",
      name: "Отжимания на брусьях",
      type: "reps",
      defaultSets: 4,
      defaultReps: 8,
    },
    {
      id: "pushups",
      name: "Отжимания от пола",
      type: "reps",
      defaultSets: 4,
      defaultReps: 15,
    },
    {
      id: "squats",
      name: "Приседания с весом тела",
      type: "reps",
      defaultSets: 4,
      defaultReps: 20,
    },
    {
      id: "plank",
      name: "Планка",
      type: "time",
      defaultSets: 3,
      defaultReps: 40,
    },

    // База зала
    {
      id: "barbell-squat",
      name: "Присед со штангой",
      type: "reps",
      defaultSets: 5,
      defaultReps: 5,
    },
    {
      id: "deadlift",
      name: "Становая тяга",
      type: "reps",
      defaultSets: 5,
      defaultReps: 5,
    },
    {
      id: "bench-press",
      name: "Жим лёжа",
      type: "reps",
      defaultSets: 5,
      defaultReps: 5,
    },
    {
      id: "incline-bench",
      name: "Жим лёжа под углом",
      type: "reps",
      defaultSets: 4,
      defaultReps: 8,
    },
    {
      id: "ohp",
      name: "Жим стоя (штанга)",
      type: "reps",
      defaultSets: 4,
      defaultReps: 6,
    },
    {
      id: "row-barbell",
      name: "Тяга штанги в наклоне",
      type: "reps",
      defaultSets: 4,
      defaultReps: 8,
    },
    {
      id: "lat-pulldown",
      name: "Тяга верхнего блока",
      type: "reps",
      defaultSets: 4,
      defaultReps: 10,
    },
    {
      id: "seated-row",
      name: "Тяга горизонтального блока",
      type: "reps",
      defaultSets: 4,
      defaultReps: 10,
    },

    // Ноги (зал)
    {
      id: "leg-press",
      name: "Жим ногами в тренажёре",
      type: "reps",
      defaultSets: 4,
      defaultReps: 10,
    },
    {
      id: "leg-curl",
      name: "Сгибания ног лёжа",
      type: "reps",
      defaultSets: 3,
      defaultReps: 12,
    },
    {
      id: "leg-extension",
      name: "Разгибания ног",
      type: "reps",
      defaultSets: 3,
      defaultReps: 12,
    },
    {
      id: "calf-raise",
      name: "Подъёмы на икры",
      type: "reps",
      defaultSets: 4,
      defaultReps: 15,
    },

    // Руки / плечи
    {
      id: "barbell-curl",
      name: "Подъём штанги на бицепс",
      type: "reps",
      defaultSets: 4,
      defaultReps: 10,
    },
    {
      id: "dumbbell-curl",
      name: "Сгибания гантелей на бицепс",
      type: "reps",
      defaultSets: 3,
      defaultReps: 12,
    },
    {
      id: "triceps-pushdown",
      name: "Разгибания на блоке (трицепс)",
      type: "reps",
      defaultSets: 3,
      defaultReps: 12,
    },
    {
      id: "skullcrusher",
      name: "Французский жим",
      type: "reps",
      defaultSets: 3,
      defaultReps: 10,
    },
    {
      id: "lateral-raise",
      name: "Махи гантелями в стороны",
      type: "reps",
      defaultSets: 3,
      defaultReps: 15,
    },
    {
      id: "face-pull",
      name: "Тяга к лицу (блок)",
      type: "reps",
      defaultSets: 3,
      defaultReps: 15,
    },
  ];

  const defaultWorkouts = [
    {
      id: "fullbody-basic",
      name: "Full body база (зал)",
      exercises: [
        { exerciseId: "barbell-squat", sets: 5, reps: 5 },
        { exerciseId: "bench-press", sets: 5, reps: 5 },
        { exerciseId: "row-barbell", sets: 4, reps: 8 },
      ],
    },
    {
      id: "upper-push",
      name: "Верх: грудь + плечи + трицепс",
      exercises: [
        { exerciseId: "bench-press", sets: 4, reps: 6 },
        { exerciseId: "incline-bench", sets: 3, reps: 8 },
        { exerciseId: "ohp", sets: 3, reps: 8 },
        { exerciseId: "triceps-pushdown", sets: 3, reps: 12 },
      ],
    },
    {
      id: "upper-pull",
      name: "Верх: спина + бицепс",
      exercises: [
        { exerciseId: "deadlift", sets: 3, reps: 5 },
        { exerciseId: "lat-pulldown", sets: 4, reps: 8 },
        { exerciseId: "seated-row", sets: 3, reps: 10 },
        { exerciseId: "barbell-curl", sets: 3, reps: 10 },
      ],
    },
    {
      id: "lower-body",
      name: "Низ: ноги + корпус",
      exercises: [
        { exerciseId: "barbell-squat", sets: 4, reps: 6 },
        { exerciseId: "leg-press", sets: 3, reps: 10 },
        { exerciseId: "leg-curl", sets: 3, reps: 12 },
        { exerciseId: "plank", sets: 3, reps: 40 },
      ],
    },
    {
      id: "street-workout",
      name: "Улица: турник + брусья",
      exercises: [
        { exerciseId: "pullups", sets: 5, reps: 5 },
        { exerciseId: "dips", sets: 4, reps: 8 },
        { exerciseId: "pushups", sets: 3, reps: 15 },
      ],
    },
  ];
  const defaultGoals = {
    workoutsPerWeek: 3,
    totalRepsPerWeek: 350,
    mainExerciseId: "barbell-squat",
    mainExerciseRepsPerWeek: 80,
  };

  let state = {
    exercises: [],
    workouts: [],
    sessions: [],
    activeWorkout: null,
    goals: null,
  };

  function safeParse(json, fallback) {
    try {
      const data = JSON.parse(json);
      return data || fallback;
    } catch (e) {
      return fallback;
    }
  }

  function ensureDefaultExercises() {
    if (!Array.isArray(state.exercises)) {
      state.exercises = [...defaultExercises];
      return;
    }
    const existingIds = new Set(state.exercises.map((e) => e.id));
    defaultExercises.forEach((def) => {
      if (!existingIds.has(def.id)) {
        state.exercises.push({ ...def });
      }
    });
  }

  function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      state = {
        exercises: defaultExercises,
        workouts: defaultWorkouts,
        sessions: [],
        activeWorkout: null,
        goals: { ...defaultGoals },
      };
      return;
    }
    const parsed = safeParse(raw, {});
    state.exercises = Array.isArray(parsed.exercises)
      ? parsed.exercises
      : defaultExercises;
    ensureDefaultExercises();
    state.workouts = Array.isArray(parsed.workouts)
      ? parsed.workouts
      : defaultWorkouts;
    state.sessions = Array.isArray(parsed.sessions) ? parsed.sessions : [];
    state.activeWorkout = parsed.activeWorkout || null;
    const parsedGoals = parsed.goals;
    state.goals = {
      ...defaultGoals,
      ...(parsedGoals && typeof parsedGoals === "object" ? parsedGoals : {}),
    };
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function uid() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function formatTime(dateStr) {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function startOfDay(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function diffDays(a, b) {
    const ms = startOfDay(a) - startOfDay(b);
    return Math.round(ms / 86400000);
  }

  function startOfWeek(date) {
    const d = startOfDay(date);
    const day = d.getDay(); // 0 (Sun) - 6 (Sat), week starts on Monday
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    return d;
  }

  function computeWeeklyStats() {
    const sessions = state.sessions || [];
    const now = new Date();
    const weekStart = startOfWeek(now);
    let workouts = 0;
    let totalReps = 0;
    const perExercise = {};

    sessions.forEach((s) => {
      const d = new Date(s.date);
      if (d < weekStart) return;
      workouts += 1;
      (s.items || []).forEach((item) => {
        const key = item.exerciseId || item.exerciseName;
        const reps = (item.sets || []).reduce(
          (acc, st) => acc + (st.actualReps || 0),
          0
        );
        totalReps += reps;
        perExercise[key] = (perExercise[key] || 0) + reps;
      });
    });

    return { workouts, totalReps, perExercise };
  }

  const todayLabelEl = document.getElementById("todayLabel");
  const activeWorkoutContainer = document.getElementById(
    "activeWorkoutContainer"
  );
  const quickStartList = document.getElementById("quickStartList");
  const workoutListEl = document.getElementById("workoutList");
  const historyListEl = document.getElementById("historyList");
  const statsSummaryEl = document.getElementById("statsSummary");
  const exerciseStatsEl = document.getElementById("exerciseStats");

  const goalsViewEl = document.getElementById("goalsView");
  const goalsEditorEl = document.getElementById("goalsEditor");
  const toggleGoalsEditBtn = document.getElementById("toggleGoalsEdit");
  const goalMainExerciseSelect = document.getElementById(
    "goalMainExerciseSelect"
  );

  const navButtons = Array.from(document.querySelectorAll(".nav-btn"));
  const screens = {
    "screen-workout": document.getElementById("screen-workout"),
    "screen-history": document.getElementById("screen-history"),
    "screen-stats": document.getElementById("screen-stats"),
  };

  const workoutModalBackdrop = document.getElementById("workoutModalBackdrop");
  const closeWorkoutModalBtn = document.getElementById("closeWorkoutModal");
  const openCreateWorkoutBtn = document.getElementById("openCreateWorkout");
  const workoutNameInput = document.getElementById("workoutNameInput");
  const exerciseRowsContainer = document.getElementById("exerciseRows");
  const addExerciseRowBtn = document.getElementById("addExerciseRow");
  const saveWorkoutBtn = document.getElementById("saveWorkoutBtn");
  const workoutModalTitle = document.getElementById("workoutModalTitle");

  const resetDataBtn = document.getElementById("resetDataBtn");

  let editingWorkoutId = null;

  function renderTodayLabel() {
    const now = new Date();
    const label = now.toLocaleDateString("ru-RU", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
    todayLabelEl.textContent = label;
  }

  function renderActiveWorkout() {
    const aw = state.activeWorkout;
    if (!aw) {
      activeWorkoutContainer.classList.add("card-empty");
      let html =
        "<p>Сейчас отдыхаешь — выбери быстрый старт ниже или собери свою тренировку.</p>";
      const goals = state.goals || defaultGoals;
      const weekly = computeWeeklyStats();
      const mainExercise =
        findExerciseById(goals.mainExerciseId) || state.exercises[0];
      const perExerciseMap = weekly.perExercise || {};
      const mainDone = goals.mainExerciseId
        ? perExerciseMap[goals.mainExerciseId] || 0
        : 0;

      const lines = [];
      if (goals.workoutsPerWeek) {
        lines.push(
          `На этой неделе: ${weekly.workouts}/${goals.workoutsPerWeek} тренировок`
        );
      }
      if (mainExercise && goals.mainExerciseRepsPerWeek) {
        lines.push(
          `${mainExercise.name}: ${mainDone}/${goals.mainExerciseRepsPerWeek} повт.`
        );
      }
      if (lines.length) {
        html += `<p style="margin-top:8px;font-size:12px;color:#9ca3af;">${lines.join(
          "<br/>"
        )}</p>`;
      }

      const lastSession = getLastSession();
      if (lastSession) {
        html +=
          '<button class="btn btn-secondary" data-action="repeat-last-workout" style="margin-top:10px;">Повторить последнюю тренировку</button>';
      }

      activeWorkoutContainer.innerHTML = html;
      return;
    }

    activeWorkoutContainer.classList.remove("card-empty");

    const startedLabel =
      formatDate(aw.startedAt) + " · " + formatTime(aw.startedAt);

    let html = "";
    html += '<div class="active-header">';
    html += `<div><div class="active-title">${escapeHtml(
      aw.name
    )}</div><div class="active-meta">${startedLabel}</div></div>`;
    html += `<button class="btn btn-secondary" data-action="stop-without-save">Сброс</button>`;
    html += "</div>";

    html += '<div class="active-body">';

    aw.items.forEach((item, exIndex) => {
      const exercise = findExerciseById(item.exerciseId);
      const exName = exercise
        ? exercise.name
        : item.exerciseName || "Упражнение";
      const sets = item.sets || [];

      const completedCount = sets.filter((s) => s.completed).length;

      html += '<div class="exercise-block">';
      html += '<div class="exercise-header">';
      html += `<div><div class="exercise-name">${escapeHtml(
        exName
      )}</div><div class="exercise-tag">${
        sets.length
      } сетов · выполнено ${completedCount}</div></div>`;
      html += "</div>";

      html += '<div class="sets-list">';

      sets.forEach((set, setIndex) => {
        const rowCompletedClass = set.completed ? " set-row-completed" : "";
        html += `<div class="set-row${rowCompletedClass}">`;
        html += `<div class="set-label">Сет ${setIndex + 1}</div>`;
        html += '<div class="steppers">';

        html += '<div class="stepper-group">';
        html += `<button class="stepper-button" data-ex-index="${exIndex}" data-set-index="${setIndex}" data-field="reps" data-delta="-1">-</button>`;
        html += `<span class="stepper-value">${set.actualReps}</span>`;
        html += '<span style="font-size:11px;color:#9ca3af;">повт.</span>';
        html += `<button class="stepper-button" data-ex-index="${exIndex}" data-set-index="${setIndex}" data-field="reps" data-delta="1">+</button>`;
        html += "</div>";

        html += '<div class="stepper-group">';
        html += `<button class="stepper-button" data-ex-index="${exIndex}" data-set-index="${setIndex}" data-field="weight" data-delta="-2">-</button>`;
        html += `<span class="stepper-value">${set.weight}</span>`;
        html += '<span style="font-size:11px;color:#9ca3af;">кг</span>';
        html += `<button class="stepper-button" data-ex-index="${exIndex}" data-set-index="${setIndex}" data-field="weight" data-delta="2">+</button>`;
        html += "</div>";

        html += "</div>";
        html += `<button class="set-complete-btn${
          set.completed ? " completed" : ""
        }" data-ex-index="${exIndex}" data-set-index="${setIndex}" data-action="toggle-complete">`;
        html +=
          '<svg viewBox="0 0 24 24"><path d="M5 13.2 9.3 17 19 7" /></svg>';
        html += "</button>";

        html += "</div>";
      });

      html += "</div>";
      html += "</div>";
    });

    html += "</div>";

    html += '<div class="active-footer">';
    html += '<div class="active-footer-controls">';
    html +=
      '<button class="btn btn-secondary btn-secondary-compact" data-action="remove-set">- сет</button>';
    html +=
      '<button class="btn btn-secondary btn-secondary-compact" data-action="add-set">+ сет</button>';
    html += "</div>";
    html +=
      '<button class="btn btn-primary active-footer-finish" data-action="finish-workout">Завершить</button>';
    html += "</div>";

    activeWorkoutContainer.innerHTML = html;
  }

  function findExerciseById(id) {
    return state.exercises.find((e) => e.id === id);
  }

  function renderQuickStart() {
    quickStartList.innerHTML = "";

    state.exercises.forEach((ex) => {
      const chip = document.createElement("button");
      chip.className = "chip";
      chip.dataset.exerciseId = ex.id;
      chip.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="9" width="2.5" height="6" rx="1.2"></rect>
          <rect x="7.2" y="7" width="2.5" height="10" rx="1.2"></rect>
          <rect x="11.4" y="7" width="2.5" height="10" rx="1.2"></rect>
          <rect x="15.6" y="9" width="2.5" height="6" rx="1.2"></rect>
        </svg>
        <div>
          <div class="chip-main">${escapeHtml(ex.name)}</div>
          <div class="chip-sub">${ex.defaultSets}×${ex.defaultReps}${
        ex.type === "time" ? " сек" : ""
      }</div>
        </div>
      `;
      quickStartList.appendChild(chip);
    });
  }

  function renderWorkouts() {
    workoutListEl.innerHTML = "";

    if (!state.workouts.length) {
      const empty = document.createElement("div");
      empty.className = "card card-empty";
      empty.textContent =
        "Сохрани первую тренировку, чтобы запускать её потом в один тап.";
      workoutListEl.appendChild(empty);
      return;
    }

    state.workouts.forEach((w) => {
      const card = document.createElement("div");
      card.className = "card";

      const exercisesText = w.exercises
        .map((e) => {
          const ex = findExerciseById(e.exerciseId);
          const name = ex ? ex.name : "Упражнение";
          return `${name} · ${e.sets}×${e.reps}`;
        })
        .join(" · ");

      card.innerHTML = `
        <div class="workout-card-header">
          <div>
            <div class="workout-title">${escapeHtml(w.name)}</div>
            <div class="workout-meta">${w.exercises.length} упражн.</div>
          </div>
          <div style="display:flex;gap:6px;">
            <button class="btn btn-ghost-small" data-action="start-workout" data-workout-id="${
              w.id
            }">Старт</button>
            <button class="exercise-row-remove" data-action="edit-workout" data-workout-id="${
              w.id
            }">
              <svg viewBox="0 0 24 24">
                <path d="M5 17.6 5 19a1 1 0 0 0 1 1h1.4a1 1 0 0 0 .7-.3L18 9.8 14.2 6 5.3 14.9a1 1 0 0 0-.3.7Z"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="workout-exercises">${escapeHtml(exercisesText)}</div>
      `;

      workoutListEl.appendChild(card);
    });
  }

  function renderHistory() {
    historyListEl.innerHTML = "";

    if (!state.sessions.length) {
      const empty = document.createElement("div");
      empty.className = "card card-empty";
      empty.textContent =
        "Как только завершишь первую тренировку, здесь появится лента с датами, объёмом и лучшими сетами.";
      historyListEl.appendChild(empty);
      return;
    }

    const sessions = [...state.sessions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    sessions.forEach((s) => {
      const card = document.createElement("div");
      card.className = "card history-card";

      const totalSets = s.items.reduce(
        (sum, item) => sum + (item.sets ? item.sets.length : 0),
        0
      );
      const totalReps = s.items.reduce((sum, item) => {
        const itemReps = (item.sets || []).reduce(
          (acc, set) => acc + (set.actualReps || 0),
          0
        );
        return sum + itemReps;
      }, 0);

      const exercisesLines = s.items
        .map((item) => {
          const setsCount = item.sets ? item.sets.length : 0;
          const repsTotal = (item.sets || []).reduce(
            (acc, set) => acc + (set.actualReps || 0),
            0
          );
          const maxWeight = (item.sets || []).reduce(
            (max, set) => Math.max(max, set.weight || 0),
            0
          );
          const weightText = maxWeight > 0 ? `, вес до ${maxWeight} кг` : "";
          return `${item.exerciseName}: ${setsCount} сетов, ${repsTotal} повт.${weightText}`;
        })
        .join("<br/>");

      card.innerHTML = `
        <div class="history-date">${formatDate(s.date)} · ${formatTime(
        s.date
      )}</div>
        <div class="history-title-row">
          <div class="history-title">${escapeHtml(s.name)}</div>
          <div class="history-meta">${totalSets} сетов · ${totalReps} повт.</div>
        </div>
        <div class="history-exercises">${exercisesLines}</div>
      `;

      historyListEl.appendChild(card);
    });
  }

  function calcPercent(done, target) {
    if (!target || target <= 0) return 0;
    const raw = Math.round((done / target) * 100);
    return Math.max(0, Math.min(120, raw));
  }

  function renderGoalsView() {
    if (!goalsViewEl) return;
    const goals = state.goals || defaultGoals;
    const weekly = computeWeeklyStats();
    goalsViewEl.innerHTML = "";

    const workoutsTarget = goals.workoutsPerWeek || 0;
    const workoutsDone = weekly.workouts || 0;
    const totalRepsTarget = goals.totalRepsPerWeek || 0;
    const totalRepsDone = weekly.totalReps || 0;
    const mainExercise =
      findExerciseById(goals.mainExerciseId) || state.exercises[0];
    const mainDone = (weekly.perExercise || {})[goals.mainExerciseId] || 0;
    const mainTarget = goals.mainExerciseRepsPerWeek || 0;
    const mainName = mainExercise ? mainExercise.name : "Упражнение";

    let html = "";

    const workoutsPercent = calcPercent(workoutsDone, workoutsTarget);
    const workoutsHelper = workoutsTarget
      ? workoutsDone >= workoutsTarget
        ? "цель недели закрыта"
        : `осталось ${Math.max(0, workoutsTarget - workoutsDone)} трен.`
      : "задай цель в настройках";
    html += `
    <div class="goal-card">
      <div class="goal-label">Тренировок за неделю</div>
      <div class="goal-value">${workoutsDone}/${workoutsTarget || "—"}</div>
      <div class="goal-sub">${workoutsHelper}</div>
      <div class="goal-progress">
        <div class="goal-progress-bar">
          <div class="goal-progress-fill" style="width:${workoutsPercent}%;"></div>
        </div>
      </div>
    </div>
  `;

    const totalPercent = calcPercent(totalRepsDone, totalRepsTarget);
    const totalHelper = totalRepsTarget
      ? totalRepsDone >= totalRepsTarget
        ? "объём набран"
        : `осталось ${Math.max(0, totalRepsTarget - totalRepsDone)} повт.`
      : "можно задать свой объём";
    html += `
    <div class="goal-card">
      <div class="goal-label">Повторов за неделю</div>
      <div class="goal-value">${totalRepsDone}/${totalRepsTarget || "—"}</div>
      <div class="goal-sub">${totalHelper}</div>
      <div class="goal-progress">
        <div class="goal-progress-bar">
          <div class="goal-progress-fill" style="width:${totalPercent}%;"></div>
        </div>
      </div>
    </div>
  `;

    const mainPercent = calcPercent(mainDone, mainTarget);
    const mainHelper = mainTarget
      ? mainDone >= mainTarget
        ? "главная цель выполнена"
        : `осталось ${Math.max(0, mainTarget - mainDone)} повт.`
      : "выбери цель по упражнению";
    html += `
    <div class="goal-card">
      <div class="goal-label">${escapeHtml(mainName)}</div>
      <div class="goal-value">${mainDone}/${mainTarget || "—"}</div>
      <div class="goal-sub">${mainHelper}</div>
      <div class="goal-progress">
        <div class="goal-progress-bar">
          <div class="goal-progress-fill" style="width:${mainPercent}%;"></div>
        </div>
      </div>
    </div>
  `;

    goalsViewEl.innerHTML = html;
  }

  function renderGoalsEditor() {
    if (!goalsEditorEl) return;
    const goals = state.goals || defaultGoals;

    const workoutsSpan = goalsEditorEl.querySelector(
      '[data-goal-value="workoutsPerWeek"]'
    );
    const totalRepsSpan = goalsEditorEl.querySelector(
      '[data-goal-value="totalRepsPerWeek"]'
    );
    const mainRepsSpan = goalsEditorEl.querySelector(
      '[data-goal-value="mainExerciseRepsPerWeek"]'
    );

    if (workoutsSpan) workoutsSpan.textContent = goals.workoutsPerWeek;
    if (totalRepsSpan) totalRepsSpan.textContent = goals.totalRepsPerWeek;
    if (mainRepsSpan) mainRepsSpan.textContent = goals.mainExerciseRepsPerWeek;

    if (goalMainExerciseSelect) {
      const currentId =
        goals.mainExerciseId || (state.exercises[0] && state.exercises[0].id);
      goalMainExerciseSelect.innerHTML = "";
      (state.exercises || []).forEach((ex) => {
        const opt = document.createElement("option");
        opt.value = ex.id;
        opt.textContent = ex.name;
        goalMainExerciseSelect.appendChild(opt);
      });
      if (currentId) {
        goalMainExerciseSelect.value = currentId;
      }
    }
  }

  function renderStats() {
    statsSummaryEl.innerHTML = "";
    exerciseStatsEl.innerHTML = "";

    renderGoalsView();
    renderGoalsEditor();

    const sessions = state.sessions;
    const totalWorkouts = sessions.length;

    const totalReps = sessions.reduce((sum, s) => {
      return (
        sum +
        s.items.reduce((acc, item) => {
          return (
            acc +
            (item.sets || []).reduce(
              (inner, st) => inner + (st.actualReps || 0),
              0
            )
          );
        }, 0)
      );
    }, 0);

    const now = new Date();
    const cutoff = new Date(now.getTime() - 30 * 86400000);
    const workoutsLast30 = sessions.filter(
      (s) => new Date(s.date) >= cutoff
    ).length;

    const streak = calculateStreak(sessions);

    const summaryData = [
      {
        label: "Тренировок всего",
        value: totalWorkouts,
        helper: totalWorkouts ? "отличный объём" : "ещё всё впереди",
      },
      {
        label: "За 30 дней",
        value: workoutsLast30,
        helper: workoutsLast30 ? "держишь режим" : "пора в зал или на площадку",
      },
      {
        label: "Сумма повторений",
        value: totalReps,
        helper: totalReps ? "дыхалка растёт" : "стартуй с малого",
      },
      {
        label: "Серия по дням",
        value: streak,
        helper: streak ? "не ломай цепочку" : "начни новую серию",
      },
    ];

    summaryData.forEach((s) => {
      const card = document.createElement("div");
      card.className = "stat-card";
      card.innerHTML = `
      <div class="stat-label">${s.label}</div>
      <div class="stat-value">${s.value}</div>
      <div class="stat-helper">${s.helper}</div>
    `;
      statsSummaryEl.appendChild(card);
    });

    if (!sessions.length) {
      const empty = document.createElement("div");
      empty.className = "card card-empty";
      empty.textContent =
        "Проведи хотя бы пару тренировок — и тут появится разбивка по упражнениям и объёму.";
      exerciseStatsEl.appendChild(empty);
      return;
    }

    const exerciseMap = new Map();
    sessions.forEach((s) => {
      s.items.forEach((item) => {
        const key = item.exerciseId || item.exerciseName;
        if (!exerciseMap.has(key)) {
          exerciseMap.set(key, {
            id: key,
            name: item.exerciseName,
            sessions: 0,
            totalReps: 0,
            lastDate: s.date,
            bestSetReps: 0,
            maxWeight: 0,
          });
        }
        const exStat = exerciseMap.get(key);
        exStat.sessions += 1;
        const reps = (item.sets || []).reduce(
          (acc, st) => acc + (st.actualReps || 0),
          0
        );
        exStat.totalReps += reps;
        const bestSet = (item.sets || []).reduce(
          (max, st) => Math.max(max, st.actualReps || 0),
          0
        );
        const maxWeight = (item.sets || []).reduce(
          (max, st) => Math.max(max, st.weight || 0),
          0
        );
        if (bestSet > exStat.bestSetReps) {
          exStat.bestSetReps = bestSet;
        }
        if (maxWeight > exStat.maxWeight) {
          exStat.maxWeight = maxWeight;
        }
        if (new Date(s.date) > new Date(exStat.lastDate)) {
          exStat.lastDate = s.date;
        }
      });
    });

    const exStatsArr = Array.from(exerciseMap.values()).sort(
      (a, b) => b.totalReps - a.totalReps
    );

    exStatsArr.forEach((ex) => {
      const card = document.createElement("div");
      card.className = "card";
      const avgPerSession = ex.sessions
        ? Math.round(ex.totalReps / ex.sessions)
        : 0;
      card.innerHTML = `
      <div class="exercise-stat-title">${escapeHtml(ex.name)}</div>
      <div class="exercise-stat-meta">
        Тренировок: ${ex.sessions} · Повторений всего: ${ex.totalReps}<br/>
        Макс. сет: ${ex.bestSetReps} · Ср. за тренировку: ${avgPerSession}${
        ex.maxWeight && ex.maxWeight > 0
          ? ` · Макс. вес: ${ex.maxWeight} кг`
          : ""
      } · Последний раз: ${formatDate(ex.lastDate)}
      </div>
    `;
      exerciseStatsEl.appendChild(card);
    });
  }

  function calculateStreak(sessions) {
    if (!sessions.length) return 0;

    const days = Array.from(
      new Set(
        sessions.map((s) => startOfDay(s.date).toISOString().slice(0, 10))
      )
    )
      .map((d) => new Date(d))
      .sort((a, b) => b - a);

    const today = startOfDay(new Date());
    if (diffDays(today, days[0]) > 1) {
      return 0;
    }

    let streak = 1;
    for (let i = 0; i < days.length - 1; i++) {
      const diff = diffDays(days[i], days[i + 1]);
      if (diff === 1) streak++;
      else break;
    }
    return streak;
  }

  function escapeHtml(str) {
    if (typeof str !== "string") return str;
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function switchScreen(targetId) {
    Object.entries(screens).forEach(([id, el]) => {
      if (id === targetId) el.classList.add("screen-active");
      else el.classList.remove("screen-active");
    });
    navButtons.forEach((btn) => {
      if (btn.dataset.target === targetId) btn.classList.add("nav-btn-active");
      else btn.classList.remove("nav-btn-active");
    });

    if (targetId === "screen-history") renderHistory();
    if (targetId === "screen-stats") renderStats();
  }

  function openWorkoutModal(editingId) {
    editingWorkoutId = editingId || null;
    workoutModalBackdrop.classList.remove("hidden");
    if (editingWorkoutId) {
      const w = state.workouts.find((w) => w.id === editingWorkoutId);
      if (w) {
        workoutModalTitle.textContent = "Редактирование тренировки";
        workoutNameInput.value = w.name;
        exerciseRowsContainer.innerHTML = "";
        w.exercises.forEach((ex) => addExerciseRow(ex));
      }
    } else {
      workoutModalTitle.textContent = "Новая тренировка";
      workoutNameInput.value = "";
      exerciseRowsContainer.innerHTML = "";
      addExerciseRow();
    }
  }

  function closeWorkoutModal() {
    workoutModalBackdrop.classList.add("hidden");
    editingWorkoutId = null;
  }

  function addExerciseRow(data) {
    const row = document.createElement("div");
    row.className = "exercise-row";

    const select = document.createElement("select");
    state.exercises.forEach((ex) => {
      const opt = document.createElement("option");
      opt.value = ex.id;
      opt.textContent = ex.name;
      select.appendChild(opt);
    });
    if (data && data.exerciseId) {
      select.value = data.exerciseId;
    }

    const setsInput = document.createElement("input");
    setsInput.type = "number";
    setsInput.min = "1";
    setsInput.max = "20";
    setsInput.value = data && data.sets ? data.sets : 4;

    const repsInput = document.createElement("input");
    repsInput.type = "number";
    repsInput.min = "1";
    repsInput.max = "200";
    repsInput.value = data && data.reps ? data.reps : 10;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "exercise-row-remove";
    removeBtn.innerHTML =
      '<svg viewBox="0 0 24 24"><path d="M6.3 6.3a1 1 0 0 1 1.4 0L12 10.6l4.3-4.3a1 1 0 0 1 1.4 1.4L13.4 12l4.3 4.3a1 1 0 0 1-1.4 1.4L12 13.4l-4.3 4.3a1 1 0 0 1-1.4-1.4L10.6 12 6.3 7.7a1 1 0 0 1 0-1.4Z"/></svg>';

    removeBtn.addEventListener("click", () => {
      exerciseRowsContainer.removeChild(row);
      if (!exerciseRowsContainer.children.length) {
        addExerciseRow();
      }
    });

    row.appendChild(select);
    row.appendChild(setsInput);
    row.appendChild(repsInput);
    row.appendChild(removeBtn);

    exerciseRowsContainer.appendChild(row);
  }

  function handleSaveWorkout() {
    const name = workoutNameInput.value.trim();
    if (!name) {
      alert(
        "Дай тренировке короткое понятное название — например «Жим + тяга»."
      );
      return;
    }

    const rows = Array.from(exerciseRowsContainer.children);
    if (!rows.length) {
      alert(
        "Добавь хотя бы одно упражнение — без него тренировка не сохранится."
      );
      return;
    }

    const exercises = [];
    for (const row of rows) {
      const [select, setsInput, repsInput] =
        row.querySelectorAll("select, input");
      const exId = select.value;
      const sets = parseInt(setsInput.value, 10) || 1;
      const reps = parseInt(repsInput.value, 10) || 1;
      exercises.push({ exerciseId: exId, sets, reps });
    }

    if (!exercises.length) {
      alert(
        "Добавь хотя бы одно упражнение — без него тренировка не сохранится."
      );
      return;
    }

    if (editingWorkoutId) {
      const idx = state.workouts.findIndex((w) => w.id === editingWorkoutId);
      if (idx !== -1) {
        state.workouts[idx] = {
          ...state.workouts[idx],
          name,
          exercises,
        };
      }
    } else {
      state.workouts.unshift({
        id: uid(),
        name,
        exercises,
      });
    }

    saveState();
    renderWorkouts();
    closeWorkoutModal();
  }

  function startQuickWorkout(exerciseId) {
    const ex = findExerciseById(exerciseId);
    if (!ex) return;

    const sets = [];
    for (let i = 0; i < ex.defaultSets; i++) {
      sets.push({
        plannedReps: ex.defaultReps,
        actualReps: ex.defaultReps,
        weight: 0,
        completed: false,
      });
    }

    state.activeWorkout = {
      id: uid(),
      name: ex.name,
      startedAt: new Date().toISOString(),
      items: [
        {
          exerciseId: ex.id,
          exerciseName: ex.name,
          sets,
        },
      ],
    };

    saveState();
    renderActiveWorkout();
    switchScreen("screen-workout");
  }

  function startWorkoutFromPreset(workoutId) {
    const w = state.workouts.find((w) => w.id === workoutId);
    if (!w) return;

    const items = w.exercises.map((e) => {
      const ex = findExerciseById(e.exerciseId);
      const name = ex ? ex.name : "Упражнение";
      const setsArr = [];
      for (let i = 0; i < e.sets; i++) {
        setsArr.push({
          plannedReps: e.reps,
          actualReps: e.reps,
          weight: 0,
          completed: false,
        });
      }
      return {
        exerciseId: e.exerciseId,
        exerciseName: name,
        sets: setsArr,
      };
    });

    state.activeWorkout = {
      id: uid(),
      name: w.name,
      startedAt: new Date().toISOString(),
      items,
    };

    saveState();
    renderActiveWorkout();
    switchScreen("screen-workout");
  }

  function addSetToActiveWorkout() {
    const aw = state.activeWorkout;
    if (!aw) return;
    if (!aw.items.length) return;

    const first = aw.items[0];
    const lastSet = first.sets[first.sets.length - 1];
    const newSet = {
      plannedReps: lastSet ? lastSet.plannedReps : 8,
      actualReps: lastSet ? lastSet.actualReps : 8,
      weight: lastSet ? lastSet.weight : 0,
      completed: false,
    };
    first.sets.push(newSet);
    saveState();
    renderActiveWorkout();
  }
  function removeSetFromActiveWorkout() {
    const aw = state.activeWorkout;
    if (!aw) return;
    if (!aw.items.length) return;

    const first = aw.items[0];
    if (!first.sets || first.sets.length <= 1) {
      // не даём удалить последний сет, чтобы тренировка не разваливалась
      return;
    }

    first.sets.pop();
    saveState();
    renderActiveWorkout();
  }
  function finishActiveWorkout() {
    const aw = state.activeWorkout;
    if (!aw) return;

    const items = aw.items.map((item) => ({
      exerciseId: item.exerciseId,
      exerciseName: item.exerciseName,
      sets: item.sets.map((s) => ({
        plannedReps: s.plannedReps,
        actualReps: s.actualReps,
        weight: s.weight,
        completed: s.completed,
      })),
    }));

    state.sessions.push({
      id: aw.id,
      name: aw.name,
      date: new Date().toISOString(),
      items,
    });

    state.activeWorkout = null;
    saveState();

    renderActiveWorkout();
    renderHistory();
    renderStats();
    switchScreen("screen-history");
  }

  function stopActiveWorkoutWithoutSave() {
    if (!state.activeWorkout) return;
    const confirmStop = confirm(
      "Сбросить текущую тренировку без сохранения? Прогресс за эту сессию пропадёт."
    );
    if (!confirmStop) return;
    state.activeWorkout = null;
    saveState();
    renderActiveWorkout();
  }

  function getLastSession() {
    if (!state.sessions || !state.sessions.length) return null;
    const sessions = [...state.sessions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    return sessions[0] || null;
  }

  function repeatLastWorkout() {
    const last = getLastSession();
    if (!last) return;

    const items = (last.items || []).map((item) => {
      const setsArr = (item.sets || []).map((s) => {
        const baseReps = s.plannedReps || s.actualReps || 8;
        return {
          plannedReps: baseReps,
          actualReps: baseReps,
          weight: s.weight || 0,
          completed: false,
        };
      });
      return {
        exerciseId: item.exerciseId,
        exerciseName: item.exerciseName,
        sets: setsArr,
      };
    });

    state.activeWorkout = {
      id: uid(),
      name: `${last.name} (повтор)`,
      startedAt: new Date().toISOString(),
      items,
    };

    saveState();
    renderActiveWorkout();
    switchScreen("screen-workout");
  }

  activeWorkoutContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    const action = target.dataset.action;
    if (action === "finish-workout") {
      finishActiveWorkout();
      return;
    }
    if (action === "stop-without-save") {
      stopActiveWorkoutWithoutSave();
      return;
    }
    if (action === "add-set") {
      addSetToActiveWorkout();
      return;
    }
    if (action === "remove-set") {
      removeSetFromActiveWorkout();
      return;
    }
    if (action === "repeat-last-workout") {
      repeatLastWorkout();
      return;
    }
  });

  activeWorkoutContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    const btn = target.closest(".set-complete-btn");
    if (!btn) return;
    const exIndex = parseInt(btn.dataset.exIndex, 10);
    const setIndex = parseInt(btn.dataset.setIndex, 10);
    const aw = state.activeWorkout;
    if (!aw) return;

    const set = aw.items?.[exIndex]?.sets?.[setIndex];
    if (!set) return;
    set.completed = !set.completed;
    saveState();
    renderActiveWorkout();
  });

  activeWorkoutContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    const btn = target.closest(".stepper-button");
    if (!btn) return;

    const exIndex = parseInt(btn.dataset.exIndex, 10);
    const setIndex = parseInt(btn.dataset.setIndex, 10);
    const field = btn.dataset.field;
    const delta = parseInt(btn.dataset.delta, 10);

    const aw = state.activeWorkout;
    if (!aw) return;
    const set = aw.items?.[exIndex]?.sets?.[setIndex];
    if (!set) return;

    if (field === "reps") {
      set.actualReps = Math.max(1, (set.actualReps || 0) + delta);
    } else if (field === "weight") {
      set.weight = Math.max(0, (set.weight || 0) + delta);
    }

    saveState();
    renderActiveWorkout();
  });

  quickStartList.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    const chip = target.closest(".chip");
    if (!chip) return;
    const exerciseId = chip.dataset.exerciseId;
    startQuickWorkout(exerciseId);
  });

  workoutListEl.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    const startBtn = target.closest("[data-action='start-workout']");
    if (startBtn) {
      const id = startBtn.dataset.workoutId;
      startWorkoutFromPreset(id);
      return;
    }

    const editBtn = target.closest("[data-action='edit-workout']");
    if (editBtn) {
      const id = editBtn.dataset.workoutId;
      openWorkoutModal(id);
      return;
    }
  });

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      if (!targetId) return;
      switchScreen(targetId);
    });
  });

  openCreateWorkoutBtn.addEventListener("click", () => openWorkoutModal(null));
  closeWorkoutModalBtn.addEventListener("click", closeWorkoutModal);
  workoutModalBackdrop.addEventListener("click", (e) => {
    if (e.target === workoutModalBackdrop) {
      closeWorkoutModal();
    }
  });
  addExerciseRowBtn.addEventListener("click", () => addExerciseRow());
  saveWorkoutBtn.addEventListener("click", handleSaveWorkout);

  if (toggleGoalsEditBtn && goalsEditorEl) {
    toggleGoalsEditBtn.addEventListener("click", () => {
      const isHidden = goalsEditorEl.classList.contains("hidden");
      goalsEditorEl.classList.toggle("hidden");
      const labelSpan = toggleGoalsEditBtn.querySelector("span:last-child");
      if (labelSpan) {
        labelSpan.textContent = isHidden ? "Скрыть" : "Настроить";
      }
    });
  }

  if (goalsEditorEl) {
    goalsEditorEl.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const btn = target.closest(".stepper-button");
      if (!btn) return;
      const field = btn.dataset.goalField;
      const delta = parseInt(btn.dataset.delta || "0", 10);
      if (!field || !delta) return;

      const goals = state.goals || { ...defaultGoals };

      if (field === "workoutsPerWeek") {
        goals.workoutsPerWeek = Math.max(
          1,
          Math.min(14, (goals.workoutsPerWeek || 1) + delta)
        );
      } else if (field === "totalRepsPerWeek") {
        goals.totalRepsPerWeek = Math.max(
          0,
          Math.min(5000, (goals.totalRepsPerWeek || 0) + delta)
        );
      } else if (field === "mainExerciseRepsPerWeek") {
        goals.mainExerciseRepsPerWeek = Math.max(
          0,
          Math.min(1000, (goals.mainExerciseRepsPerWeek || 0) + delta)
        );
      }

      state.goals = goals;
      saveState();
      renderGoalsEditor();
      renderGoalsView();
      renderActiveWorkout();
    });
  }

  if (goalMainExerciseSelect) {
    goalMainExerciseSelect.addEventListener("change", () => {
      const goals = state.goals || { ...defaultGoals };
      goals.mainExerciseId = goalMainExerciseSelect.value;
      state.goals = goals;
      saveState();
      renderGoalsEditor();
      renderGoalsView();
      renderActiveWorkout();
    });
  }

  if (resetDataBtn) {
    resetDataBtn.addEventListener("click", () => {
      const confirmed = confirm(
        "Точно удалить историю, прогресс и все сохранённые тренировки? Отменить это действие нельзя."
      );
      if (!confirmed) return;
      localStorage.removeItem(STORAGE_KEY);
      loadState();
      renderEverything();
    });
  }

  function renderEverything() {
    renderTodayLabel();
    renderActiveWorkout();
    renderQuickStart();
    renderWorkouts();
    renderHistory();
    renderStats();
  }

  loadState();
  renderEverything();
})();
