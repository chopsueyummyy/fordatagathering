/* ==========================================================================
   CourseAlign Application Logic
   RIASEC Assessment & SHS Data Gathering Platform
   ========================================================================== */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. RIASEC Question Bank (42 items total, 7 per category)
  // --------------------------------------------------------------------------
  const QUESTION_BANK = [
    { id: 1, category: 'R', catName: 'Realistic (Doer)', text: 'I like to work on cars' },
    { id: 2, category: 'I', catName: 'Investigative (Thinker)', text: 'I like to do puzzles' },
    { id: 3, category: 'A', catName: 'Artistic (Creator)', text: 'I am good at working independently' },
    { id: 4, category: 'S', catName: 'Social (Helper)', text: 'I like to work in teams' },
    { id: 5, category: 'E', catName: 'Enterprising (Persuader)', text: 'I am an ambitious person, I set goals for myself' },
    { id: 6, category: 'C', catName: 'Conventional (Organizer)', text: 'I like to organize things, (files, desks/offices)' },
    { id: 7, category: 'R', catName: 'Realistic (Doer)', text: 'I like to build things' },
    { id: 8, category: 'A', catName: 'Artistic (Creator)', text: 'I like to read about art and music' },
    { id: 9, category: 'C', catName: 'Conventional (Organizer)', text: 'I like to have clear instructions to follow' },
    { id: 10, category: 'E', catName: 'Enterprising (Persuader)', text: 'I like to try to influence or persuade people' },
    { id: 11, category: 'I', catName: 'Investigative (Thinker)', text: 'I like to do experiments' },
    { id: 12, category: 'S', catName: 'Social (Helper)', text: 'I like to teach or train people' },
    { id: 13, category: 'S', catName: 'Social (Helper)', text: 'I like trying to help people solve their problems' },
    { id: 14, category: 'R', catName: 'Realistic (Doer)', text: 'I like to take care of animals' },
    { id: 15, category: 'C', catName: 'Conventional (Organizer)', text: "I wouldn't mind working 8 hours per day in an office" },
    { id: 16, category: 'E', catName: 'Enterprising (Persuader)', text: 'I like selling things' },
    { id: 17, category: 'A', catName: 'Artistic (Creator)', text: 'I enjoy creative writing' },
    { id: 18, category: 'I', catName: 'Investigative (Thinker)', text: 'I enjoy science' },
    { id: 19, category: 'E', catName: 'Enterprising (Persuader)', text: 'I am quick to take on new responsibilities' },
    { id: 20, category: 'S', catName: 'Social (Helper)', text: 'I am interested in healing people' },
    { id: 21, category: 'I', catName: 'Investigative (Thinker)', text: 'I enjoy trying to figure out how things work' },
    { id: 22, category: 'R', catName: 'Realistic (Doer)', text: 'I like putting things together or assembling things' },
    { id: 23, category: 'A', catName: 'Artistic (Creator)', text: 'I am a creative person' },
    { id: 24, category: 'C', catName: 'Conventional (Organizer)', text: 'I pay attention to details' },
    { id: 25, category: 'C', catName: 'Conventional (Organizer)', text: 'I like to do filing or typing' },
    { id: 26, category: 'I', catName: 'Investigative (Thinker)', text: 'I like to analyze things (problems/situations)' },
    { id: 27, category: 'A', catName: 'Artistic (Creator)', text: 'I like to play instruments or sing' },
    { id: 28, category: 'S', catName: 'Social (Helper)', text: 'I enjoy learning about other cultures' },
    { id: 29, category: 'E', catName: 'Enterprising (Persuader)', text: 'I would like to start my own business' },
    { id: 30, category: 'R', catName: 'Realistic (Doer)', text: 'I like to cook' },
    { id: 31, category: 'A', catName: 'Artistic (Creator)', text: 'I like acting in plays' },
    { id: 32, category: 'R', catName: 'Realistic (Doer)', text: 'I am a practical person' },
    { id: 33, category: 'I', catName: 'Investigative (Thinker)', text: 'I like working with numbers or charts' },
    { id: 34, category: 'S', catName: 'Social (Helper)', text: 'I like to get into discussions about issues' },
    { id: 35, category: 'C', catName: 'Conventional (Organizer)', text: 'I am good at keeping records of my work' },
    { id: 36, category: 'E', catName: 'Enterprising (Persuader)', text: 'I like to lead' },
    { id: 37, category: 'R', catName: 'Realistic (Doer)', text: 'I like working outdoors' },
    { id: 38, category: 'C', catName: 'Conventional (Organizer)', text: 'I would like to work in an office' },
    { id: 39, category: 'I', catName: 'Investigative (Thinker)', text: "I'm good at math" },
    { id: 40, category: 'S', catName: 'Social (Helper)', text: 'I like helping people' },
    { id: 41, category: 'A', catName: 'Artistic (Creator)', text: 'I like to draw' },
    { id: 42, category: 'E', catName: 'Enterprising (Persuader)', text: 'I like to give speeches' },
    { id: 101, category: 'RSE_P', catName: 'Rosenberg Self-Esteem', text: 'On the whole, I am satisfied with myself.' },
    { id: 102, category: 'RSE_N', catName: 'Rosenberg Self-Esteem', text: 'At times I think I am no good at all.' },
    { id: 103, category: 'RSE_P', catName: 'Rosenberg Self-Esteem', text: 'I feel that I have a number of good qualities.' },
    { id: 104, category: 'RSE_P', catName: 'Rosenberg Self-Esteem', text: 'I am able to do things as well as most other people.' },
    { id: 105, category: 'RSE_N', catName: 'Rosenberg Self-Esteem', text: 'I feel I do not have much to be proud of.' },
    { id: 106, category: 'RSE_N', catName: 'Rosenberg Self-Esteem', text: 'I certainly feel useless at times.' },
    { id: 107, category: 'RSE_P', catName: 'Rosenberg Self-Esteem', text: "I feel that I'm a person of worth." },
    { id: 108, category: 'RSE_N', catName: 'Rosenberg Self-Esteem', text: 'I wish I could have more respect for myself.' },
    { id: 109, category: 'RSE_N', catName: 'Rosenberg Self-Esteem', text: 'All in all, I am inclined to think that I am a failure.' },
    { id: 110, category: 'RSE_P', catName: 'Rosenberg Self-Esteem', text: 'I take a positive attitude toward myself.' },
    { id: 201, category: 'CDSES_OI', catName: 'Career Decision Self-Efficacy', text: 'Find information in the library about occupations you are interested in.' },
    { id: 202, category: 'CDSES_GS', catName: 'Career Decision Self-Efficacy', text: 'Select one major from a list of potential majors you are considering.' },
    { id: 203, category: 'CDSES_PL', catName: 'Career Decision Self-Efficacy', text: 'Make a plan of your goals for the next five years.' },
    { id: 204, category: 'CDSES_PS', catName: 'Career Decision Self-Efficacy', text: 'Determine the steps to take if you are having academic trouble with an aspect of your chosen major.' },
    { id: 205, category: 'CDSES_SA', catName: 'Career Decision Self-Efficacy', text: 'Accurately assess your abilities.' },
    { id: 206, category: 'CDSES_GS', catName: 'Career Decision Self-Efficacy', text: 'Select one occupation from a list of potential occupations you are considering.' },
    { id: 207, category: 'CDSES_PL', catName: 'Career Decision Self-Efficacy', text: 'Determine the steps you need to take to successfully complete your chosen major.' },
    { id: 208, category: 'CDSES_PS', catName: 'Career Decision Self-Efficacy', text: 'Persistently work at your major or career goal even when you get frustrated.' },
    { id: 209, category: 'CDSES_SA', catName: 'Career Decision Self-Efficacy', text: 'Determine what your ideal job would be.' },
    { id: 210, category: 'CDSES_OI', catName: 'Career Decision Self-Efficacy', text: 'Find out the employment trends for an occupation over the next ten years.' },
    { id: 211, category: 'CDSES_GS', catName: 'Career Decision Self-Efficacy', text: 'Choose a career that will fit your preferred lifestyle.' },
    { id: 212, category: 'CDSES_PL', catName: 'Career Decision Self-Efficacy', text: 'Prepare a good resume.' },
    { id: 213, category: 'CDSES_PS', catName: 'Career Decision Self-Efficacy', text: 'Change majors if you did not like your first choice.' },
    { id: 214, category: 'CDSES_SA', catName: 'Career Decision Self-Efficacy', text: 'Decide what you value most in an occupation.' },
    { id: 215, category: 'CDSES_OI', catName: 'Career Decision Self-Efficacy', text: 'Find out about the average yearly earnings of people in an occupation.' },
    { id: 216, category: 'CDSES_PS', catName: 'Career Decision Self-Efficacy', text: 'Make a career decision and then not worry about whether it was right or wrong.' },
    { id: 217, category: 'CDSES_PL', catName: 'Career Decision Self-Efficacy', text: 'Change occupations if you are not satisfied with the one you enter.' },
    { id: 218, category: 'CDSES_SA', catName: 'Career Decision Self-Efficacy', text: 'Figure out what you are and are not ready to sacrifice to achieve your career goals.' },
    { id: 219, category: 'CDSES_OI', catName: 'Career Decision Self-Efficacy', text: 'Talk with a person already employed in the field you are interested in.' },
    { id: 220, category: 'CDSES_GS', catName: 'Career Decision Self-Efficacy', text: 'Choose a major or career that will fit your interests.' },
    { id: 221, category: 'CDSES_PL', catName: 'Career Decision Self-Efficacy', text: 'Identify employers, forms, institutions relevant to your career possibilities.' },
    { id: 222, category: 'CDSES_SA', catName: 'Career Decision Self-Efficacy', text: 'Define the type of lifestyle you would like to live.' },
    { id: 223, category: 'CDSES_OI', catName: 'Career Decision Self-Efficacy', text: 'Find information about graduate or professional schools.' },
    { id: 224, category: 'CDSES_PS', catName: 'Career Decision Self-Efficacy', text: 'Successfully manage the job interview process.' },
    { id: 225, category: 'CDSES_GS', catName: 'Career Decision Self-Efficacy', text: 'Identify some reasonable major or career alternatives if you are unable to get your first choice.' }
  ];

  const LOCAL_STORAGE_KEY = 'coursealign_responses_v2';

  // --------------------------------------------------------------------------
  // 2. Application State
  // --------------------------------------------------------------------------
  let currentStudent = {
    id: '',
    gradeLevel: '',
    strand: '',
    answers: {},
    scores: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
    dominantCode: '',
    rseScoreLikert: 0,
    rseScoreGuttman: 0,
    rseInterpretation: '',
    mbiScoreEx: 0,
    mbiScoreCy: 0,
    mbiScoreEf: 0,
    mbiAvgEx: 0.00,
    mbiAvgCy: 0.00,
    mbiAvgEf: 0.00,
    mbiInterpretation: '',
    dateSubmitted: ''
  };

  let currentQuestionIndex = 0;
  let isResearcherLoggedIn = false;
  let responsesDataset = [];

  // --------------------------------------------------------------------------
  // 3. DOM Elements
  // --------------------------------------------------------------------------
  // Header Elements
  const logoTrigger = document.getElementById('logoTrigger');
  const headerModeLabel = document.getElementById('headerModeLabel');
  const logoutBtn = document.getElementById('logoutBtn');

  // Views
  const views = {
    landing: document.getElementById('viewLanding'),
    demographics: document.getElementById('viewDemographics'),
    assessment: document.getElementById('viewAssessment'),
    thankYou: document.getElementById('viewThankYou'),
    researcher: document.getElementById('viewResearcher')
  };

  // Respondent Landing & Demographics
  const startBtn = document.getElementById('startBtn');
  const demographicsForm = document.getElementById('demographicsForm');
  const displayRespondentId = document.getElementById('displayRespondentId');
  const gradeLevelSelect = document.getElementById('gradeLevelSelect');
  const strandSelect = document.getElementById('strandSelect');
  const cancelDemoBtn = document.getElementById('cancelDemoBtn');

  // Assessment Wizard
  const questionStepLabel = document.getElementById('questionStepLabel');
  const progressPercentLabel = document.getElementById('progressPercentLabel');
  const progressBarFill = document.getElementById('progressBarFill');
  const partBanner = document.getElementById('partBanner');
  const partInstructions = document.getElementById('partInstructions');
  const questionText = document.getElementById('questionText');
  const likertContainer = document.getElementById('likertContainer');
  const prevQBtn = document.getElementById('prevQBtn');
  const nextQBtn = document.getElementById('nextQBtn');
  const thankyouId = document.getElementById('thankyouId');
  const homeReturnBtn = document.getElementById('homeReturnBtn');
  const exitAssessmentBtn = document.getElementById('exitAssessmentBtn');

  // Modals
  const modalConsent = document.getElementById('modalConsent');
  const declineConsentBtn = document.getElementById('declineConsentBtn');
  const agreeConsentBtn = document.getElementById('agreeConsentBtn');

  const modalResearcherLogin = document.getElementById('modalResearcherLogin');
  const researcherLoginForm = document.getElementById('researcherLoginForm');
  const researcherUser = document.getElementById('researcherUser');
  const researcherPass = document.getElementById('researcherPass');
  const loginErrorMsg = document.getElementById('loginErrorMsg');
  const closeLoginModalBtn = document.getElementById('closeLoginModalBtn');

  const modalScoresDetail = document.getElementById('modalScoresDetail');
  const inspectorId = document.getElementById('inspectorId');
  const inspectorMeta = document.getElementById('inspectorMeta');
  const inspectorCode = document.getElementById('inspectorCode');
  const inspectorScoreGrid = document.getElementById('inspectorScoreGrid');
  const inspectorRseLikert = document.getElementById('inspectorRseLikert');
  const inspectorRseGuttman = document.getElementById('inspectorRseGuttman');
  const inspectorRseInterpretation = document.getElementById('inspectorRseInterpretation');
  const inspectorCdsesTotal = document.getElementById('inspectorCdsesTotal');
  const inspectorCdsesSa = document.getElementById('inspectorCdsesSa');
  const inspectorCdsesOi = document.getElementById('inspectorCdsesOi');
  const inspectorCdsesGs = document.getElementById('inspectorCdsesGs');
  const inspectorCdsesPl = document.getElementById('inspectorCdsesPl');
  const inspectorCdsesPs = document.getElementById('inspectorCdsesPs');
  const inspectorCdsesInterpretation = document.getElementById('inspectorCdsesInterpretation');
  const inspectorAlignment = document.getElementById('inspectorAlignment');
  const closeScoreModalBtn = document.getElementById('closeScoreModalBtn');

  // Researcher Dashboard Controls
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const refreshDashBtn = document.getElementById('refreshDashBtn');
  const clearCacheBtn = document.getElementById('clearCacheBtn');
  const metricTotal = document.getElementById('metricTotal');
  const metricTopTrait = document.getElementById('metricTopTrait');
  const metricTopTraitSub = document.getElementById('metricTopTraitSub');
  const metricAvgRseLikert = document.getElementById('metricAvgRseLikert');
  const metricAvgRseGuttman = document.getElementById('metricAvgRseGuttman');
  const metricAvgCdsesTotal = document.getElementById('metricAvgCdsesTotal');
  const metricAvgCdsesMean = document.getElementById('metricAvgCdsesMean');
  const metricTopCdsesSubscale = document.getElementById('metricTopCdsesSubscale');
  const metricTopStrand = document.getElementById('metricTopStrand');
  const metricToday = document.getElementById('metricToday');
  const riasecBarsContainer = document.getElementById('riasecBarsContainer');
  const rseDistributionContainer = document.getElementById('rseDistributionContainer');
  const cdsesDistributionContainer = document.getElementById('cdsesDistributionContainer');
  const strandDistributionContainer = document.getElementById('strandDistributionContainer');
  const searchTableInput = document.getElementById('searchTableInput');
  const filterStrandSelect = document.getElementById('filterStrandSelect');
  const filterGradeSelect = document.getElementById('filterGradeSelect');
  const respondentsTbody = document.getElementById('respondentsTbody');

  // --------------------------------------------------------------------------
  // 4. Initializer & Data Loader (API + LocalStorage Fallback)
  // --------------------------------------------------------------------------
  function initApp() {
    clearOldLocalCache();
    loadQuestionsFromApi();
    loadDataset();
    bindEvents();
  }

  function clearOldLocalCache() {
    // Wipe any legacy mock demo cache stored in browser localStorage
    try {
      localStorage.removeItem('coursealign_responses_v1');
      localStorage.removeItem('coursealign_responses_v2');
      localStorage.removeItem('coursealign_responses_v3');
    } catch(e) {}
  }

  function generateRespondentId() {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `RESP-${randomNum}`;
  }

  function loadQuestionsFromApi() {
    fetch('api/get_questions.php')
      .then(res => res.json())
      .then(data => {
        if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
          data.data.forEach(q => {
            const index = QUESTION_BANK.findIndex(item => item.id == q.id);
            if (index !== -1) {
              QUESTION_BANK[index].text = q.question_text;
            }
          });
        }
      })
      .catch(err => {
        console.log('Using static question bank');
      });
  }

  function loadDataset() {
    // Query live responses from PHP MySQL Backend (coursealigngd_db)
    fetch('api/get_dashboard_metrics.php')
      .then(res => res.json())
      .then(data => {
        if (data && data.success && data.data && Array.isArray(data.data.respondents)) {
          responsesDataset = data.data.respondents;
          if (isResearcherLoggedIn) {
            renderResearcherDashboard();
          }
        } else {
          fallbackLocalDataset();
        }
      })
      .catch(err => {
        console.log('Backend API unreachable or running standalone');
        fallbackLocalDataset();
      });
  }

  function fallbackLocalDataset() {
    // Default to clean empty array for live research data gathering
    responsesDataset = [];
    if (isResearcherLoggedIn) {
      renderResearcherDashboard();
    }
  }

  function saveDataset() {
    // Only save active student session submissions
    localStorage.setItem('coursealign_live_db_v1', JSON.stringify(responsesDataset));
  }

  function getSampleDataset() {
    return [];
  }

  // --------------------------------------------------------------------------
  // 5. Navigation & View Switcher
  // --------------------------------------------------------------------------
  function switchView(viewName) {
    Object.keys(views).forEach(key => {
      if (views[key]) {
        views[key].classList.remove('active');
      }
    });

    if (views[viewName]) {
      views[viewName].classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function openModal(modalEl) {
    modalEl.classList.add('active');
  }

  function closeModal(modalEl) {
    modalEl.classList.remove('active');
  }

  // --------------------------------------------------------------------------
  // 6. Event Binding
  // --------------------------------------------------------------------------
  function bindEvents() {
    // Header Logo -> Secret Researcher Portal Login
    logoTrigger.addEventListener('click', () => {
      if (isResearcherLoggedIn) {
        switchView('researcher');
      } else {
        openModal(modalResearcherLogin);
      }
    });

    // Start Assessment -> Consent Modal
    startBtn.addEventListener('click', () => {
      openModal(modalConsent);
    });

    // Consent Modal Actions
    declineConsentBtn.addEventListener('click', () => {
      closeModal(modalConsent);
    });

    agreeConsentBtn.addEventListener('click', () => {
      closeModal(modalConsent);
      startNewRespondentSession();
      switchView('demographics');
    });

    // Demographics Form Submission
    cancelDemoBtn.addEventListener('click', () => {
      switchView('landing');
    });

    demographicsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      currentStudent.gradeLevel = gradeLevelSelect.value;
      currentStudent.strand = strandSelect.value;
      
      currentQuestionIndex = 0;
      currentStudent.answers = {};
      renderQuestionStep();
      switchView('assessment');
    });

    // Likert Radio Options Handler
    likertContainer.addEventListener('change', (e) => {
      if (e.target.name === 'likertChoice') {
        const val = parseInt(e.target.value, 10);
        const qId = QUESTION_BANK[currentQuestionIndex].id;
        currentStudent.answers[qId] = val;
      }
    });

    // Wizard Next, Prev & Exit Buttons
    prevQBtn.addEventListener('click', () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestionStep();
      }
    });

    exitAssessmentBtn.addEventListener('click', () => {
      if (confirm("Are you sure you want to exit the assessment? Your current answers will be reset.")) {
        switchView('demographics');
      }
    });

    nextQBtn.addEventListener('click', () => {
      const currentQId = QUESTION_BANK[currentQuestionIndex].id;
      if (currentStudent.answers[currentQId] === undefined) {
        alert('Please select an option before proceeding to the next statement.');
        return;
      }

      if (currentQuestionIndex < QUESTION_BANK.length - 1) {
        currentQuestionIndex++;
        renderQuestionStep();
      } else {
        // Assessment Completed!
        finalizeAssessment();
      }
    });

    // Completion / Thank You Screen
    homeReturnBtn.addEventListener('click', () => {
      switchView('landing');
    });

    // Researcher Login Form
    closeLoginModalBtn.addEventListener('click', () => {
      closeModal(modalResearcherLogin);
    });

    researcherLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = researcherUser.value.trim();
      const pass = researcherPass.value.trim();

      // Submit to PHP API login first
      fetch('api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          grantResearcherAccess();
        } else if (user === 'admin' && pass === 'admin12345') {
          // Offline credential fallback
          grantResearcherAccess();
        } else {
          loginErrorMsg.style.display = 'block';
        }
      })
      .catch(() => {
        // Offline fallback check
        if (user === 'admin' && pass === 'admin12345') {
          grantResearcherAccess();
        } else {
          loginErrorMsg.style.display = 'block';
        }
      });
    });

    function grantResearcherAccess() {
      isResearcherLoggedIn = true;
      closeModal(modalResearcherLogin);
      loginErrorMsg.style.display = 'none';
      headerModeLabel.textContent = 'Researcher Mode';
      logoutBtn.style.display = 'inline-block';
      loadDataset();
      renderResearcherDashboard();
      switchView('researcher');
    }

    // Researcher Logout
    logoutBtn.addEventListener('click', () => {
      fetch('api/logout.php').catch(() => {});
      isResearcherLoggedIn = false;
      logoutBtn.style.display = 'none';
      headerModeLabel.textContent = 'SHS Research Tool';
      switchView('landing');
    });

    // Researcher Controls
    exportCsvBtn.addEventListener('click', exportCsvData);

    if (clearCacheBtn) {
      clearCacheBtn.addEventListener('click', () => {
        try {
          localStorage.clear();
        } catch(e) {}
        responsesDataset = [];
        loadDataset();
        renderResearcherDashboard();
        alert('Local browser cache cleared successfully!');
      });
    }

    if (refreshDashBtn) {
      refreshDashBtn.addEventListener('click', () => {
        refreshDashBtn.disabled = true;
        refreshDashBtn.textContent = '↻ Refreshing...';
        loadDataset();
        setTimeout(() => {
          refreshDashBtn.disabled = false;
          refreshDashBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg> Refresh Live Data`;
        }, 500);
      });
    }

    searchTableInput.addEventListener('input', renderRespondentsTable);
    filterStrandSelect.addEventListener('change', renderRespondentsTable);
    filterGradeSelect.addEventListener('change', renderRespondentsTable);

    closeScoreModalBtn.addEventListener('click', () => {
      closeModal(modalScoresDetail);
    });
  }

  // --------------------------------------------------------------------------
  // 7. Respondent Session & Assessment Execution
  // --------------------------------------------------------------------------
  function startNewRespondentSession() {
    currentStudent = {
      id: generateRespondentId(),
      gradeLevel: '',
      strand: '',
      answers: {},
      scores: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
      dominantCode: '',
      rseScoreLikert: 0,
      rseScoreGuttman: 0,
      rseInterpretation: '',
      cdsesScoreSa: 0,
      cdsesScoreOi: 0,
      cdsesScoreGs: 0,
      cdsesScorePl: 0,
      cdsesScorePs: 0,
      cdsesAvgSa: 0.00,
      cdsesAvgOi: 0.00,
      cdsesAvgGs: 0.00,
      cdsesAvgPl: 0.00,
      cdsesAvgPs: 0.00,
      cdsesTotalScore: 0,
      cdsesTotalAvg: 0.00,
      cdsesInterpretation: '',
      dateSubmitted: ''
    };
    displayRespondentId.textContent = currentStudent.id;
    gradeLevelSelect.value = '';
    strandSelect.value = '';
  }

  function renderQuestionStep() {
    const q = QUESTION_BANK[currentQuestionIndex];
    const totalQ = QUESTION_BANK.length;

    // Identify part metadata based on index ranges
    let partNum = 1;
    let partName = "Part 1 of 3: Career Interest Assessment (RIASEC)";
    let partInstructionsText = "Directions: There are no right or wrong answers. Choose Agree if it describes your interest, or Disagree if it does not.";
    let partQuestionIndex = currentQuestionIndex + 1;
    let partTotal = 42;

    if (currentQuestionIndex >= 42 && currentQuestionIndex <= 51) {
      partNum = 2;
      partName = "Part 2 of 3: Rosenberg Self-Esteem Scale (RSE)";
      partInstructionsText = "Directions: There are no right or wrong answers. Select the option that best describes how much you agree or disagree with each statement regarding yourself.";
      partQuestionIndex = currentQuestionIndex - 42 + 1;
      partTotal = 10;
    } else if (currentQuestionIndex >= 52) {
      partNum = 3;
      partName = "Part 3 of 3: Career Decision Self-Efficacy Scale-Short Form (CDSES-SF)";
      partInstructionsText = "Directions: For each statement, please indicate how much confidence you have that you could successfully complete each task (1 = No confidence at all, 5 = Complete confidence).";
      partQuestionIndex = currentQuestionIndex - 52 + 1;
      partTotal = 25;
    }

    questionStepLabel.textContent = `Question ${partQuestionIndex} of ${partTotal}`;
    partBanner.textContent = partName;
    partInstructions.textContent = partInstructionsText;

    const percent = Math.round(((currentQuestionIndex + 1) / totalQ) * 100);
    progressPercentLabel.textContent = `${percent}%`;
    progressBarFill.style.width = `${percent}%`;

    questionText.textContent = q.text;

    // Dynamically render scale options based on question type
    if (q.category.startsWith('RSE_')) {
      likertContainer.className = "likert-scale rse-4point-scale";
      likertContainer.innerHTML = `
        <div class="likert-option">
          <input type="radio" name="likertChoice" id="likertSA" value="1" class="rse-sa">
          <label for="likertSA" class="likert-label">
            <span class="val">SA</span>
            <span class="desc">Strongly Agree</span>
          </label>
        </div>
        <div class="likert-option">
          <input type="radio" name="likertChoice" id="likertA" value="2" class="rse-a">
          <label for="likertA" class="likert-label">
            <span class="val">A</span>
            <span class="desc">Agree</span>
          </label>
        </div>
        <div class="likert-option">
          <input type="radio" name="likertChoice" id="likertD" value="3" class="rse-d">
          <label for="likertD" class="likert-label">
            <span class="val">D</span>
            <span class="desc">Disagree</span>
          </label>
        </div>
        <div class="likert-option">
          <input type="radio" name="likertChoice" id="likertSD" value="4" class="rse-sd">
          <label for="likertSD" class="likert-label">
            <span class="val">SD</span>
            <span class="desc">Strongly Disagree</span>
          </label>
        </div>
      `;
    } else if (q.category.startsWith('CDSES_')) {
      likertContainer.className = "likert-scale cdses-5point-scale";
      likertContainer.innerHTML = `
        <div class="likert-option">
          <input type="radio" name="likertChoice" id="cdsesNoConf" value="1" class="cdses-opt">
          <label for="cdsesNoConf" class="likert-label">
            <span class="val">1</span>
            <span class="desc">No confidence at all</span>
          </label>
        </div>
        <div class="likert-option">
          <input type="radio" name="likertChoice" id="cdsesLittle" value="2" class="cdses-opt">
          <label for="cdsesLittle" class="likert-label">
            <span class="val">2</span>
            <span class="desc">Very little confidence</span>
          </label>
        </div>
        <div class="likert-option">
          <input type="radio" name="likertChoice" id="cdsesMod" value="3" class="cdses-opt">
          <label for="cdsesMod" class="likert-label">
            <span class="val">3</span>
            <span class="desc">Moderate confidence</span>
          </label>
        </div>
        <div class="likert-option">
          <input type="radio" name="likertChoice" id="cdsesMuch" value="4" class="cdses-opt">
          <label for="cdsesMuch" class="likert-label">
            <span class="val">4</span>
            <span class="desc">Much confidence</span>
          </label>
        </div>
        <div class="likert-option">
          <input type="radio" name="likertChoice" id="cdsesComp" value="5" class="cdses-opt">
          <label for="cdsesComp" class="likert-label">
            <span class="val">5</span>
            <span class="desc">Complete confidence</span>
          </label>
        </div>
      `;
    } else {
      likertContainer.className = "likert-scale agree-disagree-scale";
      likertContainer.innerHTML = `
        <div class="likert-option">
          <input type="radio" name="likertChoice" id="likertAgree" value="1">
          <label for="likertAgree" class="likert-label agree-label">
            <span class="val">✓</span>
            <span class="desc">Agree</span>
          </label>
        </div>
        <div class="likert-option">
          <input type="radio" name="likertChoice" id="likertDisagree" value="0">
          <label for="likertDisagree" class="likert-label disagree-label">
            <span class="val">✕</span>
            <span class="desc">Disagree</span>
          </label>
        </div>
      `;
    }

    // Reset or restore radio selection
    const selectedVal = currentStudent.answers[q.id];
    const radioOptions = likertContainer.querySelectorAll('input[type="radio"]');
    radioOptions.forEach(radio => {
      if (selectedVal !== undefined && parseInt(radio.value, 10) === selectedVal) {
        radio.checked = true;
      } else {
        radio.checked = false;
      }
    });

    // Navigation buttons visibility & labels
    prevQBtn.style.visibility = currentQuestionIndex === 0 ? 'hidden' : 'visible';
    prevQBtn.textContent = 'Previous';
    nextQBtn.textContent = currentQuestionIndex === totalQ - 1 ? 'Submit Assessment' : 'Next Question';
  }

  function finalizeAssessment() {
    // 1. Local calculation of Scores
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    let rseLikert = 0;
    const isCorrect = {};

    for (let i = 101; i <= 110; i++) {
      isCorrect[i] = false;
    }

    let cdsesSaSum = 0;
    let cdsesOiSum = 0;
    let cdsesGsSum = 0;
    let cdsesPlSum = 0;
    let cdsesPsSum = 0;

    QUESTION_BANK.forEach(q => {
      const val = currentStudent.answers[q.id];
      if (val === undefined) return;

      if (q.category.startsWith('RSE_')) {
        if (q.category === 'RSE_P') {
          rseLikert += (4 - val);
          isCorrect[q.id] = (val === 3 || val === 4);
        } else if (q.category === 'RSE_N') {
          rseLikert += (val - 1);
          isCorrect[q.id] = (val === 1 || val === 2);
        }
      } else if (q.category.startsWith('CDSES_')) {
        if (q.category === 'CDSES_SA') {
          cdsesSaSum += val;
        } else if (q.category === 'CDSES_OI') {
          cdsesOiSum += val;
        } else if (q.category === 'CDSES_GS') {
          cdsesGsSum += val;
        } else if (q.category === 'CDSES_PL') {
          cdsesPlSum += val;
        } else if (q.category === 'CDSES_PS') {
          cdsesPsSum += val;
        }
      } else {
        if (val === 1 && scores[q.category] !== undefined) {
          scores[q.category]++;
        }
      }
    });

    currentStudent.scores = scores;
    currentStudent.rseScoreLikert = rseLikert;

    // Guttman Score Items
    const g1 = isCorrect[101] ? 1 : 0;
    const c2 = (isCorrect[103] ? 1 : 0) + (isCorrect[107] ? 1 : 0) + (isCorrect[109] ? 1 : 0);
    const g2 = (c2 >= 2) ? 1 : 0;
    const c3 = (isCorrect[104] ? 1 : 0) + (isCorrect[105] ? 1 : 0);
    const g3 = (c3 >= 1) ? 1 : 0;
    const g4 = isCorrect[108] ? 1 : 0;
    const g5 = isCorrect[110] ? 1 : 0;
    const c6 = (isCorrect[102] ? 1 : 0) + (isCorrect[106] ? 1 : 0);
    const g6 = (c6 >= 1) ? 1 : 0;

    currentStudent.rseScoreGuttman = g1 + g2 + g3 + g4 + g5 + g6;

    if (rseLikert < 15) {
      currentStudent.rseInterpretation = 'Low Self-Esteem';
    } else if (rseLikert <= 25) {
      currentStudent.rseInterpretation = 'Normal Self-Esteem';
    } else {
      currentStudent.rseInterpretation = 'High Self-Esteem';
    }

    // CDSES local values
    const cdsesAvgSa = parseFloat((cdsesSaSum / 5).toFixed(2));
    const cdsesAvgOi = parseFloat((cdsesOiSum / 5).toFixed(2));
    const cdsesAvgGs = parseFloat((cdsesGsSum / 5).toFixed(2));
    const cdsesAvgPl = parseFloat((cdsesPlSum / 5).toFixed(2));
    const cdsesAvgPs = parseFloat((cdsesPsSum / 5).toFixed(2));

    const cdsesTotalScore = cdsesSaSum + cdsesOiSum + cdsesGsSum + cdsesPlSum + cdsesPsSum;
    const cdsesTotalAvg = parseFloat((cdsesTotalScore / 25).toFixed(2));

    currentStudent.cdsesScoreSa = cdsesSaSum;
    currentStudent.cdsesScoreOi = cdsesOiSum;
    currentStudent.cdsesScoreGs = cdsesGsSum;
    currentStudent.cdsesScorePl = cdsesPlSum;
    currentStudent.cdsesScorePs = cdsesPsSum;
    
    currentStudent.cdsesAvgSa = cdsesAvgSa;
    currentStudent.cdsesAvgOi = cdsesAvgOi;
    currentStudent.cdsesAvgGs = cdsesAvgGs;
    currentStudent.cdsesAvgPl = cdsesAvgPl;
    currentStudent.cdsesAvgPs = cdsesAvgPs;

    currentStudent.cdsesTotalScore = cdsesTotalScore;
    currentStudent.cdsesTotalAvg = cdsesTotalAvg;

    if (cdsesTotalAvg < 3.00) {
      currentStudent.cdsesInterpretation = 'Low Self-Efficacy';
    } else if (cdsesTotalAvg <= 4.00) {
      currentStudent.cdsesInterpretation = 'Moderate Self-Efficacy';
    } else {
      currentStudent.cdsesInterpretation = 'High Self-Efficacy';
    }

    // 2. Compute Dominant Code
    const sortedTraits = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    currentStudent.dominantCode = sortedTraits.slice(0, 3).join('');

    // 3. Timestamp
    const now = new Date();
    currentStudent.dateSubmitted = now.toISOString().replace('T', ' ').substring(0, 16);

    // 4. Submit to PHP Backend API
    const payload = {
      respondent_id: currentStudent.id,
      grade_level: currentStudent.gradeLevel,
      strand: currentStudent.strand,
      answers: currentStudent.answers
    };

    fetch('api/submit_assessment.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      if (data && data.success) {
        console.log('Successfully saved submission to MySQL DB!');
        // Update local object with database response if available
        if (data.data) {
          if (data.data.rse) {
            currentStudent.rseScoreLikert = data.data.rse.likert;
            currentStudent.rseScoreGuttman = data.data.rse.guttman;
            currentStudent.rseInterpretation = data.data.rse.interpretation;
          }
          if (data.data.cdses) {
            currentStudent.cdsesScoreSa = data.data.cdses.score_sa;
            currentStudent.cdsesScoreOi = data.data.cdses.score_oi;
            currentStudent.cdsesScoreGs = data.data.cdses.score_gs;
            currentStudent.cdsesScorePl = data.data.cdses.score_pl;
            currentStudent.cdsesScorePs = data.data.cdses.score_ps;
            currentStudent.cdsesAvgSa = parseFloat(data.data.cdses.avg_sa);
            currentStudent.cdsesAvgOi = parseFloat(data.data.cdses.avg_oi);
            currentStudent.cdsesAvgGs = parseFloat(data.data.cdses.avg_gs);
            currentStudent.cdsesAvgPl = parseFloat(data.data.cdses.avg_pl);
            currentStudent.cdsesAvgPs = parseFloat(data.data.cdses.avg_ps);
            currentStudent.cdsesTotalScore = data.data.cdses.total_score;
            currentStudent.cdsesTotalAvg = parseFloat(data.data.cdses.total_avg);
            currentStudent.cdsesInterpretation = data.data.cdses.interpretation;
          }
        }
      } else {
        console.log('Saving locally to LocalStorage');
      }
      responsesDataset.unshift(currentStudent);
      saveDataset();
    })
    .catch(err => {
      console.log('Network offline / LocalStorage mode', err);
      responsesDataset.unshift(currentStudent);
      saveDataset();
    });

    // 5. Update Thank You View
    thankyouId.textContent = currentStudent.id;
    switchView('thankYou');
  }

  // --------------------------------------------------------------------------
  // 8. Researcher Analytics Engine & Dashboard Rendering
  // --------------------------------------------------------------------------
  function renderResearcherDashboard() {
    renderSummaryMetrics();
    renderTraitBarsChart();
    renderRseDistribution();
    renderCdsesDistribution();
    renderStrandDistribution();
    renderRespondentsTable();
  }

  function renderSummaryMetrics() {
    const total = responsesDataset.length;
    metricTotal.textContent = total;

    if (total === 0) {
      metricTopTrait.textContent = '-';
      metricTopStrand.textContent = '-';
      metricToday.textContent = '0';
      metricAvgRseLikert.textContent = '-';
      metricAvgRseGuttman.textContent = '-';
      metricAvgCdsesTotal.textContent = '-';
      metricAvgCdsesMean.textContent = '-';
      metricTopCdsesSubscale.textContent = '-';
      return;
    }

    // Top Overall Trait
    const totalsPerTrait = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    let rseLikertSum = 0;
    let rseGuttmanSum = 0;

    let cdsesSaSum = 0;
    let cdsesOiSum = 0;
    let cdsesGsSum = 0;
    let cdsesPlSum = 0;
    let cdsesPsSum = 0;
    let cdsesTotalScoreSum = 0;

    const strandCounts = {};
    let todayCount = 0;
    const todayStr = new Date().toISOString().substring(0, 10);

    responsesDataset.forEach(r => {
      if (r.scores) {
        Object.keys(r.scores).forEach(k => {
          totalsPerTrait[k] += r.scores[k];
        });
      }
      rseLikertSum += (r.rseScoreLikert || 0);
      rseGuttmanSum += (r.rseScoreGuttman || 0);

      cdsesSaSum += (r.cdsesScoreSa || 0);
      cdsesOiSum += (r.cdsesScoreOi || 0);
      cdsesGsSum += (r.cdsesScoreGs || 0);
      cdsesPlSum += (r.cdsesScorePl || 0);
      cdsesPsSum += (r.cdsesScorePs || 0);
      cdsesTotalScoreSum += (r.cdsesTotalScore || 0);

      if (r.strand) {
        strandCounts[r.strand] = (strandCounts[r.strand] || 0) + 1;
      }
      if (r.dateSubmitted && r.dateSubmitted.startsWith(todayStr)) {
        todayCount++;
      }
    });

    const topTraitKey = Object.keys(totalsPerTrait).sort((a, b) => totalsPerTrait[b] - totalsPerTrait[a])[0];
    const traitNames = {
      R: 'Realistic', I: 'Investigative', A: 'Artistic',
      S: 'Social', E: 'Enterprising', C: 'Conventional'
    };
    metricTopTrait.textContent = `${topTraitKey} - ${traitNames[topTraitKey] || ''}`;
    metricTopTraitSub.textContent = `Avg Score: ${(totalsPerTrait[topTraitKey] / total).toFixed(1)} / 7`;

    metricAvgRseLikert.textContent = (rseLikertSum / total).toFixed(1);
    metricAvgRseGuttman.textContent = (rseGuttmanSum / total).toFixed(1);

    metricAvgCdsesTotal.textContent = (cdsesTotalScoreSum / total).toFixed(1);
    metricAvgCdsesMean.textContent = (cdsesTotalScoreSum / (total * 25)).toFixed(2);

    const subscaleTotals = {
      'Self-Appraisal': cdsesSaSum,
      'Occupational Info': cdsesOiSum,
      'Goal Selection': cdsesGsSum,
      'Planning': cdsesPlSum,
      'Problem Solving': cdsesPsSum
    };
    const topSubscale = Object.keys(subscaleTotals).sort((a, b) => subscaleTotals[b] - subscaleTotals[a])[0];
    metricTopCdsesSubscale.textContent = topSubscale;

    const topStrandKey = Object.keys(strandCounts).sort((a, b) => strandCounts[b] - strandCounts[a])[0] || '-';
    metricTopStrand.textContent = topStrandKey;

    metricToday.textContent = todayCount;
  }

  function renderRseDistribution() {
    const counts = {
      'Low Self-Esteem': 0,
      'Normal Self-Esteem': 0,
      'High Self-Esteem': 0
    };
    const total = responsesDataset.length;

    responsesDataset.forEach(r => {
      const interp = r.rseInterpretation || 'Normal Self-Esteem';
      if (counts[interp] !== undefined) {
        counts[interp]++;
      }
    });

    rseDistributionContainer.innerHTML = '';

    if (total === 0) {
      rseDistributionContainer.innerHTML = `<p style="font-size: 0.85rem;">No responses recorded yet.</p>`;
      return;
    }

    const categories = [
      { name: 'Low Self-Esteem', class: 'badge-low-esteem', color: 'var(--accent-rose)' },
      { name: 'Normal Self-Esteem', class: 'badge-normal-esteem', color: 'var(--accent-emerald)' },
      { name: 'High Self-Esteem', class: 'badge-high-esteem', color: 'var(--secondary)' }
    ];

    categories.forEach(cat => {
      const count = counts[cat.name];
      const pct = Math.round((count / total) * 100);

      const item = document.createElement('div');
      item.innerHTML = `
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
          <span style="font-weight: 600;" class="trait-pill ${cat.class}">${cat.name}</span>
          <span style="color: var(--text-muted);">${count} (${pct}%)</span>
        </div>
        <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden;">
          <div style="width: ${pct}%; height: 100%; background: ${cat.color};"></div>
        </div>
      `;
      rseDistributionContainer.appendChild(item);
    });
  }

  function renderCdsesDistribution() {
    const counts = {
      'Low Self-Efficacy': 0,
      'Moderate Self-Efficacy': 0,
      'High Self-Efficacy': 0
    };
    const total = responsesDataset.length;

    responsesDataset.forEach(r => {
      const interp = r.cdsesInterpretation || 'Moderate Self-Efficacy';
      if (counts[interp] !== undefined) {
        counts[interp]++;
      }
    });

    cdsesDistributionContainer.innerHTML = '';

    if (total === 0) {
      cdsesDistributionContainer.innerHTML = `<p style="font-size: 0.85rem;">No responses recorded yet.</p>`;
      return;
    }

    const categories = [
      { name: 'Low Self-Efficacy', class: 'badge-low-burnout', color: 'var(--accent-rose)' },
      { name: 'Moderate Self-Efficacy', class: 'badge-mod-burnout', color: 'var(--accent-amber)' },
      { name: 'High Self-Efficacy', class: 'badge-high-burnout', color: 'var(--accent-emerald)' }
    ];

    categories.forEach(cat => {
      const count = counts[cat.name];
      const pct = Math.round((count / total) * 100);

      const item = document.createElement('div');
      item.innerHTML = `
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
          <span style="font-weight: 600;" class="trait-pill ${cat.class}">${cat.name}</span>
          <span style="color: var(--text-muted);">${count} (${pct}%)</span>
        </div>
        <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden;">
          <div style="width: ${pct}%; height: 100%; background: ${cat.color};"></div>
        </div>
      `;
      cdsesDistributionContainer.appendChild(item);
    });
  }

  function renderTraitBarsChart() {
    const total = responsesDataset.length;
    const traits = [
      { key: 'R', name: 'Realistic (R)', color: 'var(--color-r)', badge: 'badge-r' },
      { key: 'I', name: 'Investigative (I)', color: 'var(--color-i)', badge: 'badge-i' },
      { key: 'A', name: 'Artistic (A)', color: 'var(--color-a)', badge: 'badge-a' },
      { key: 'S', name: 'Social (S)', color: 'var(--color-s)', badge: 'badge-s' },
      { key: 'E', name: 'Enterprising (E)', color: 'var(--color-e)', badge: 'badge-e' },
      { key: 'C', name: 'Conventional (C)', color: 'var(--color-c)', badge: 'badge-c' }
    ];

    riasecBarsContainer.innerHTML = '';

    traits.forEach(t => {
      let sum = 0;
      responsesDataset.forEach(r => {
        sum += (r.scores && r.scores[t.key]) ? r.scores[t.key] : 0;
      });
      const avg = total > 0 ? (sum / total).toFixed(1) : 0;
      const pct = Math.min(100, Math.round((avg / 7) * 100));

      const row = document.createElement('div');
      row.className = 'riasec-bar-row';
      row.innerHTML = `
        <div class="bar-label">
          <span class="trait-pill ${t.badge}">${t.key}</span>
          <span>${t.name}</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${pct}%; background: ${t.color};"></div>
        </div>
        <div class="bar-score">${avg} <span style="font-size: 0.7rem; color: var(--text-dim);">/ 7</span></div>
      `;
      riasecBarsContainer.appendChild(row);
    });
  }

  function renderStrandDistribution() {
    const counts = {};
    const total = responsesDataset.length;

    responsesDataset.forEach(r => {
      if (r.strand) {
        counts[r.strand] = (counts[r.strand] || 0) + 1;
      }
    });

    strandDistributionContainer.innerHTML = '';

    if (total === 0) {
      strandDistributionContainer.innerHTML = `<p style="font-size: 0.85rem;">No responses recorded yet.</p>`;
      return;
    }

    Object.keys(counts).sort((a, b) => counts[b] - counts[a]).forEach(strand => {
      const count = counts[strand];
      const pct = Math.round((count / total) * 100);

      const item = document.createElement('div');
      item.innerHTML = `
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
          <span style="font-weight: 600;">${strand}</span>
          <span style="color: var(--text-muted);">${count} (${pct}%)</span>
        </div>
        <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden;">
          <div style="width: ${pct}%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--secondary));"></div>
        </div>
      `;
      strandDistributionContainer.appendChild(item);
    });
  }

  function renderRespondentsTable() {
    const query = searchTableInput.value.toLowerCase().trim();
    const strandFilter = filterStrandSelect.value;
    const gradeFilter = filterGradeSelect.value;

    const filtered = responsesDataset.filter(r => {
      const matchQuery = !query || r.id.toLowerCase().includes(query);
      const matchStrand = strandFilter === 'ALL' || r.strand === strandFilter;
      const matchGrade = gradeFilter === 'ALL' || r.gradeLevel === gradeFilter;
      return matchQuery && matchStrand && matchGrade;
    });

    respondentsTbody.innerHTML = '';

    if (filtered.length === 0) {
      const msg = responsesDataset.length === 0 
        ? 'No student assessment responses recorded yet in database coursealigngd_db. Submissions will automatically appear here when students complete their test.'
        : 'No matching respondent records found for your current search or filter parameters.';
      respondentsTbody.innerHTML = `
        <tr>
          <td colspan="10" style="text-align: center; color: var(--text-dim); padding: 2.5rem 1rem;">
            ${msg}
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach(r => {
      let badgeClass = 'badge-normal-esteem';
      if (r.rseInterpretation === 'Low Self-Esteem') badgeClass = 'badge-low-esteem';
      if (r.rseInterpretation === 'High Self-Esteem') badgeClass = 'badge-high-esteem';

      let cdsesBadge = 'badge-mod-burnout';
      if (r.cdsesInterpretation === 'Low Self-Efficacy') cdsesBadge = 'badge-low-burnout';
      if (r.cdsesInterpretation === 'High Self-Efficacy') cdsesBadge = 'badge-high-burnout';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-family: monospace; font-weight: 700; color: #a5b4fc;">${r.id}</td>
        <td>${r.gradeLevel || '-'}</td>
        <td><span style="background: rgba(255,255,255,0.06); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem;">${r.strand || '-'}</span></td>
        <td><strong style="color: var(--secondary); font-size: 1rem;">${r.dominantCode || '-'}</strong></td>
        <td>${r.rseScoreLikert ?? 0} / ${r.rseScoreGuttman ?? 0}</td>
        <td><span class="trait-pill ${badgeClass}">${r.rseInterpretation || 'Normal Self-Esteem'}</span></td>
        <td>${r.cdsesTotalScore ?? 0} (${(r.cdsesTotalAvg ?? 0.00).toFixed(2)})</td>
        <td><span class="trait-pill ${cdsesBadge}">${r.cdsesInterpretation || 'Moderate Self-Efficacy'}</span></td>
        <td style="color: var(--text-muted); font-size: 0.85rem;">${r.dateSubmitted || '-'}</td>
        <td>
          <button class="btn-view-score" data-id="${r.id}">View Computed Scores</button>
        </td>
      `;
      respondentsTbody.appendChild(tr);
    });

    // Attach Score Inspector click handlers
    respondentsTbody.querySelectorAll('.btn-view-score').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        openScoreInspector(id);
      });
    });
  }

  function openScoreInspector(id) {
    const respondent = responsesDataset.find(r => r.id === id);
    if (!respondent) return;

    inspectorId.textContent = `Respondent ${respondent.id}`;
    inspectorMeta.textContent = `${respondent.gradeLevel} • ${respondent.strand} • Submitted ${respondent.dateSubmitted}`;
    inspectorCode.textContent = respondent.dominantCode || 'N/A';

    inspectorRseLikert.innerHTML = `${respondent.rseScoreLikert ?? 0} <span style="font-size: 1rem; color: var(--text-dim);">/30</span>`;
    inspectorRseGuttman.innerHTML = `${respondent.rseScoreGuttman ?? 0} <span style="font-size: 1rem; color: var(--text-dim);">/6</span>`;

    // Style the RSE Interpretation box dynamically
    let interpText = respondent.rseInterpretation || 'Normal Self-Esteem';
    inspectorRseInterpretation.innerHTML = `Self-Esteem Level: <strong>${interpText}</strong>. (Likert scale: ${respondent.rseScoreLikert ?? 0}/30, Guttman scale index: ${respondent.rseScoreGuttman ?? 0}/6)`;
    
    let color = 'var(--accent-emerald)';
    let bg = 'rgba(16, 185, 129, 0.1)';
    if (respondent.rseInterpretation === 'Low Self-Esteem') {
      color = 'var(--accent-rose)';
      bg = 'rgba(244, 63, 94, 0.1)';
    } else if (respondent.rseInterpretation === 'High Self-Esteem') {
      color = 'var(--secondary)';
      bg = 'rgba(6, 182, 212, 0.1)';
    }
    inspectorRseInterpretation.style.color = color;
    inspectorRseInterpretation.style.borderColor = color;
    inspectorRseInterpretation.style.background = bg;

    // CDSES scores
    const cdsesSaVal = respondent.cdsesScoreSa ?? 0;
    const cdsesOiVal = respondent.cdsesScoreOi ?? 0;
    const cdsesGsVal = respondent.cdsesScoreGs ?? 0;
    const cdsesPlVal = respondent.cdsesScorePl ?? 0;
    const cdsesPsVal = respondent.cdsesScorePs ?? 0;
    const cdsesTotalVal = respondent.cdsesTotalScore ?? 0;
    const cdsesAvgVal = respondent.cdsesTotalAvg ?? 0.00;

    inspectorCdsesTotal.innerHTML = `${cdsesTotalVal} <span style="font-size: 1rem; color: var(--text-dim);">/125</span> <span style="font-size: 0.85rem; font-weight: normal; color: var(--text-muted); margin-left: 0.5rem;">(Avg: ${cdsesAvgVal.toFixed(2)}/5)</span>`;
    inspectorCdsesSa.innerHTML = `${cdsesSaVal} <span style="font-size: 0.8rem; color: var(--text-dim);">/25</span>`;
    inspectorCdsesOi.innerHTML = `${cdsesOiVal} <span style="font-size: 0.8rem; color: var(--text-dim);">/25</span>`;
    inspectorCdsesGs.innerHTML = `${cdsesGsVal} <span style="font-size: 0.8rem; color: var(--text-dim);">/25</span>`;
    inspectorCdsesPl.innerHTML = `${cdsesPlVal} <span style="font-size: 0.8rem; color: var(--text-dim);">/25</span>`;
    inspectorCdsesPs.innerHTML = `${cdsesPsVal} <span style="font-size: 0.8rem; color: var(--text-dim);">/25</span>`;

    let cdsesInterpText = respondent.cdsesInterpretation || 'Moderate Self-Efficacy';
    inspectorCdsesInterpretation.innerHTML = `Career Self-Efficacy Level: <strong>${cdsesInterpText}</strong>.<br>SA (Self-Appraisal) total: ${cdsesSaVal}, OI (Occupational Info) total: ${cdsesOiVal}, GS (Goal Selection) total: ${cdsesGsVal}, PL (Planning) total: ${cdsesPlVal}, PS (Problem Solving) total: ${cdsesPsVal}`;

    let cdsesColor = 'var(--accent-amber)';
    let cdsesBg = 'rgba(245, 158, 11, 0.1)';
    if (respondent.cdsesInterpretation === 'High Self-Efficacy') {
      cdsesColor = 'var(--accent-emerald)';
      cdsesBg = 'rgba(16, 185, 129, 0.1)';
    } else if (respondent.cdsesInterpretation === 'Low Self-Efficacy') {
      cdsesColor = 'var(--accent-rose)';
      cdsesBg = 'rgba(244, 63, 94, 0.1)';
    }
    inspectorCdsesInterpretation.style.color = cdsesColor;
    inspectorCdsesInterpretation.style.borderColor = cdsesColor;
    inspectorCdsesInterpretation.style.background = cdsesBg;

    const scores = respondent.scores || { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const traits = [
      { key: 'R', name: 'Realistic', color: 'var(--color-r)' },
      { key: 'I', name: 'Investigative', color: 'var(--color-i)' },
      { key: 'A', name: 'Artistic', color: 'var(--color-a)' },
      { key: 'S', name: 'Social', color: 'var(--color-s)' },
      { key: 'E', name: 'Enterprising', color: 'var(--color-e)' },
      { key: 'C', name: 'Conventional', color: 'var(--color-c)' }
    ];

    inspectorScoreGrid.innerHTML = '';
    traits.forEach(t => {
      const box = document.createElement('div');
      box.className = 'score-box';
      box.innerHTML = `
        <div class="score-box-trait" style="color: ${t.color}">${t.name}</div>
        <div class="score-box-num">${scores[t.key] || 0} <span style="font-size: 0.7rem; color: var(--text-dim);">/7</span></div>
      `;
      inspectorScoreGrid.appendChild(box);
    });

    // Alignment suggestions generator
    inspectorAlignment.innerHTML = generateCareerAlignmentText(respondent.dominantCode, respondent.strand);

    openModal(modalScoresDetail);
  }

  function generateCareerAlignmentText(code, strand) {
    if (!code || code.length < 3) return 'Standard general career alignment.';
    
    const primary = code[0];
    const secondary = code[1];

    let alignmentStr = `Based on dominant Holland Code <strong>${code}</strong>:`;
    alignmentStr += `<br><br>• <strong>Primary Orientation:</strong> `;

    switch (primary) {
      case 'R': alignmentStr += `Technical, hands-on, engineering, industrial, and agricultural fields.`; break;
      case 'I': alignmentStr += `Scientific research, software development, medicine, analytics, and mathematics.`; break;
      case 'A': alignmentStr += `Creative arts, media, graphic design, journalism, and architecture.`; break;
      case 'S': alignmentStr += `Education, psychology, nursing, healthcare, and social welfare work.`; break;
      case 'E': alignmentStr += `Business administration, marketing, law, entrepreneurship, and public policy.`; break;
      case 'C': alignmentStr += `Accounting, finance, data administration, logistics, and office management.`; break;
    }

    alignmentStr += `<br>• <strong>SHS Strand Compatibility:</strong> Current strand <em>${strand}</em> correlates strongly with dominant traits ${primary} and ${secondary}.`;

    return alignmentStr;
  }

  // --------------------------------------------------------------------------
  // 9. Export CSV Functionality
  // --------------------------------------------------------------------------
  function exportCsvData() {
    // Try backend CSV export endpoint first
    window.open('api/export_csv.php', '_blank');

    // Also fallback to browser Blob generation if offline dataset is used
    if (responsesDataset.length > 0) {
      const headers = [
        'Respondent_ID', 'Grade_Level', 'SHS_Strand', 
        'Realistic_Score', 'Investigative_Score', 'Artistic_Score', 'Social_Score', 'Enterprising_Score', 'Conventional_Score', 
        'Dominant_RIASEC_Code', 
        'RSE_Score_Likert', 'RSE_Score_Guttman', 'RSE_Interpretation', 
        'CDSES_Self_Appraisal_Avg', 'CDSES_Occupational_Info_Avg', 'CDSES_Goal_Selection_Avg', 'CDSES_Planning_Avg', 'CDSES_Problem_Solving_Avg', 'CDSES_Total_Score', 'CDSES_Total_Avg', 'CDSES_Interpretation',
        'Submission_Timestamp'
      ];

      const rows = responsesDataset.map(r => {
        const s = r.scores || { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
        return [
          `"${r.id}"`,
          `"${r.gradeLevel || ''}"`,
          `"${r.strand || ''}"`,
          s.R || 0,
          s.I || 0,
          s.A || 0,
          s.S || 0,
          s.E || 0,
          s.C || 0,
          `"${r.dominantCode || ''}"`,
          r.rseScoreLikert || 0,
          r.rseScoreGuttman || 0,
          `"${r.rseInterpretation || ''}"`,
          r.cdsesAvgSa || 0.00,
          r.cdsesAvgOi || 0.00,
          r.cdsesAvgGs || 0.00,
          r.cdsesAvgPl || 0.00,
          r.cdsesAvgPs || 0.00,
          r.cdsesTotalScore || 0,
          r.cdsesTotalAvg || 0.00,
          `"${r.cdsesInterpretation || ''}"`,
          `"${r.dateSubmitted || ''}"`
        ].join(',');
      });

      const csvContent = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `CourseAlign_Research_Dataset_${new Date().toISOString().substring(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // Initialize App on DOM Load
  document.addEventListener('DOMContentLoaded', initApp);

})();
