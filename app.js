// app.js

const GLOBAL_GEMINI_KEY = 'AQ.Ab8RN6J17aNzQqOCxRj96jNnfluS0A3Cg4wI2tcq8lpLeNAhLQ';
let pastedImageFile = null;

// API Usage tracking state and operations
let apiUsage = {
  calls: 0,
  inputTokens: 0,
  outputTokens: 0
};

function loadAPIUsage() {
  apiUsage.calls = parseInt(localStorage.getItem('tg_usage_calls') || '0', 10);
  apiUsage.inputTokens = parseInt(localStorage.getItem('tg_usage_input_tokens') || '0', 10);
  apiUsage.outputTokens = parseInt(localStorage.getItem('tg_usage_output_tokens') || '0', 10);
  renderAPIUsage();
}

function renderAPIUsage() {
  const elCalls = document.getElementById('usage-calls');
  const elInput = document.getElementById('usage-input');
  const elOutput = document.getElementById('usage-output');

  if (elCalls) elCalls.textContent = apiUsage.calls;
  if (elInput) elInput.textContent = apiUsage.inputTokens.toLocaleString();
  if (elOutput) elOutput.textContent = apiUsage.outputTokens.toLocaleString();
}

function trackAPIUsage(metadata) {
  if (!metadata) return;
  apiUsage.calls += 1;
  apiUsage.inputTokens += metadata.promptTokenCount || 0;
  apiUsage.outputTokens += metadata.candidatesTokenCount || 0;

  localStorage.setItem('tg_usage_calls', apiUsage.calls);
  localStorage.setItem('tg_usage_input_tokens', apiUsage.inputTokens);
  localStorage.setItem('tg_usage_output_tokens', apiUsage.outputTokens);

  renderAPIUsage();
}

function resetAPIUsage() {
  if (confirm("Are you sure you want to reset all Gemini API usage statistics?")) {
    apiUsage = { calls: 0, inputTokens: 0, outputTokens: 0 };
    localStorage.setItem('tg_usage_calls', 0);
    localStorage.setItem('tg_usage_input_tokens', 0);
    localStorage.setItem('tg_usage_output_tokens', 0);
    renderAPIUsage();
  }
}


// Default Application State
let state = {
  confNum: "Confirmed by Mr. Shubham",
  bookingStatus: "SECURED & CONFIRMED",
  hotelName: "Aloha on the Ganges",
  hotelWebsite: "https://www.alohaontheganges.com",
  hotelImageUrl: "",
  logoUrl: "TripGuru Logo WITHOUT BACKGROUND WITHOUT INDIA.png",
  hotelSubtitle: "Premium Riverside Resort — Rishikesh, Uttarakhand",
  hotelLocation: "Rishikesh, Uttarakhand",
  hotelAddress: "NH 58, Tapovan, Rishikesh, Uttarakhand 249192",
  hotelMaps: "https://maps.app.goo.gl/wRBD57Yn2f7Qj92M7", // Sample link
  guestName: "Yamini Gupta",
  guestCount: "2 Adults, 2 Children (Ages 8 & 4 Years Old)",
  checkinDate: "Jun 14, 2026",
  checkinTime: "From 03:00 PM onwards",
  checkoutDate: "Jun 17, 2026",
  checkoutTime: "Until 11:00 AM",
  roomCat: "Deluxe Royal Kids Suite",
  roomCount: "1 Room",
  mealCode: "MAP PLAN",
  mealDesc: "(Includes Accommodation, Daily Buffet Breakfast & Dinner)",
  agencyName: "TripGuru",
  agencyCorp: "Corporate Office: Sector 78, Noida",
  agencyBranch: "Branch Office: Baldev Plaza, Gorakhpur",
  agencyWeb: "www.tripguruindia.com",
  agencyPhone1: "+91 99714 86796",
  agencyPhone2: "+91 97113 19554",
  agencyEmail: "travel@tripguruindia.com",
  
  // Custom Amenity Tags
  tags: [
    { icon: "🌊", text: "Ganges View Property" },
    { icon: "⭐", text: "4.5+ Star Luxury Resort" },
    { icon: "🧘", text: "Spa & Wellness Hub" },
    { icon: "🍽️", text: "Gourmet Dining" }
  ],

  // Terms & Conditions (Key-value like clauses)
  disclaimers: [
    {
      title: "Check-in/Check-out",
      desc: "Early check-in or late check-out is strictly subject to room availability and hotel discretion. Additional charges may apply."
    },
    {
      title: "Identity Verification",
      desc: "All guests (including children) must present a valid government-approved photo ID (Passport, Aadhar Card, Driving License, or Voter ID) at check-in. PAN cards are not accepted as proof of address."
    },
    {
      title: "Extra Expenses",
      desc: "This voucher covers only the room stay and meal inclusions explicitly stated under the MAP plan. All personal extras such as room service, laundry, telephone calls, mini-bar, or spa treatments must be paid directly to the resort prior to departure."
    },
    {
      title: "Force Majeure Disclaimer",
      desc: "TripGuru acts solely as a booking agent and shall not be held liable or responsible for any changes, modifications, cancellations, or service deficiencies caused by unexpected weather conditions, natural disasters, road blockages, state emergencies, or sudden hotel policy amendments."
    }
  ]
};

// DOM Elements - Editor inputs
const inputs = {
  confNum: document.getElementById('input-conf-num'),
  bookingStatus: document.getElementById('input-booking-status'),
  hotelName: document.getElementById('input-hotel-name'),
  hotelWebsite: document.getElementById('input-hotel-website'),
  hotelSubtitle: document.getElementById('input-hotel-subtitle'),
  hotelLocation: document.getElementById('input-hotel-location'),
  hotelAddress: document.getElementById('input-hotel-address'),
  hotelMaps: document.getElementById('input-hotel-maps'),
  guestName: document.getElementById('input-guest-name'),
  guestCount: document.getElementById('input-guest-count'),
  checkinDate: document.getElementById('input-checkin-date'),
  checkinTime: document.getElementById('input-checkin-time'),
  checkoutDate: document.getElementById('input-checkout-date'),
  checkoutTime: document.getElementById('input-checkout-time'),
  roomCat: document.getElementById('input-room-cat'),
  roomCount: document.getElementById('input-room-count'),
  mealCode: document.getElementById('input-meal-code'),
  mealDesc: document.getElementById('input-meal-desc'),
  agencyName: document.getElementById('input-agency-name'),
  agencyCorp: document.getElementById('input-agency-corp'),
  agencyBranch: document.getElementById('input-agency-branch'),
  agencyWeb: document.getElementById('input-agency-web'),
  agencyPhone1: document.getElementById('input-agency-phone1'),
  agencyPhone2: document.getElementById('input-agency-phone2'),
  agencyEmail: document.getElementById('input-agency-email'),
};

// DOM Elements - Preview items
const previews = {
  confNum: document.getElementById('preview-conf-num'),
  bookingStatus: document.getElementById('preview-booking-status'),
  hotelName: document.getElementById('preview-hotel-name'),
  hotelNameDetail: document.getElementById('preview-hotel-name-detail'),
  hotelSubtitle: document.getElementById('preview-hotel-subtitle'),
  hotelLocation: document.getElementById('preview-hotel-location'),
  hotelAddress: document.getElementById('preview-hotel-address'),
  hotelMaps: document.getElementById('preview-hotel-maps'),
  guestName: document.getElementById('preview-guest-name'),
  guestCount: document.getElementById('preview-guest-count'),
  checkinDate: document.getElementById('preview-checkin-date'),
  checkinTime: document.getElementById('preview-checkin-time'),
  checkoutDate: document.getElementById('preview-checkout-date'),
  checkoutTime: document.getElementById('preview-checkout-time'),
  roomCat: document.getElementById('preview-room-cat'),
  roomCount: document.getElementById('preview-room-count'),
  mealCode: document.getElementById('preview-meal-code'),
  mealDesc: document.getElementById('preview-meal-desc'),
  agencyName: document.getElementById('preview-agency-name'),
  agencyCorp: document.getElementById('preview-agency-corp'),
  agencyBranch: document.getElementById('preview-agency-branch'),
  agencyWeb: document.getElementById('preview-agency-web'),
  agencyPhone1: document.getElementById('preview-agency-phone1'),
  agencyPhone2: document.getElementById('preview-agency-phone2'),
  agencyEmail: document.getElementById('preview-agency-email'),
  logoUrl: document.getElementById('preview-logo'),
  hotelImageUrl: document.getElementById('preview-hotel-image'),
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  setupCollapsibleSections();
  bindInputListeners();
  setupHotelImageEvents();
  setupTagEvents();
  setupDisclaimerEvents();
  setupActionButtons();
  setupAIParser();
  
  // Sync state values to form elements and preview
  syncStateToInputs();
  renderAll();

  // Dynamic preview scaling
  adjustPreviewScale();
  window.addEventListener('resize', adjustPreviewScale);
});

// 1. Collapsible Form Sections logic
function setupCollapsibleSections() {
  const sections = document.querySelectorAll('.form-section');
  
  sections.forEach(section => {
    const toggleBtn = section.querySelector('.section-toggle');
    
    toggleBtn.addEventListener('click', () => {
      const isActive = section.classList.contains('active');
      
      // Close other active sections
      sections.forEach(s => s.classList.remove('active'));
      
      // If the clicked section wasn't active, open it
      if (!isActive) {
        section.classList.add('active');
      }
    });
  });
}

// Helper functions for date/time conversion between native pickers and state strings
function parseFormattedDateToYMD(str) {
  if (!str) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
  const dateObj = new Date(str);
  if (isNaN(dateObj.getTime())) return '';
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatYMDToFormattedDate(ymd) {
  if (!ymd) return '';
  const parts = ymd.split('-');
  if (parts.length !== 3) return ymd;
  const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
  if (isNaN(dateObj.getTime())) return ymd;
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return dateObj.toLocaleDateString('en-US', options);
}

function parseFormattedTimeTo24H(str) {
  if (!str) return '12:00';
  const match = str.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return '12:00';
  let hrs = parseInt(match[1], 10);
  const mins = match[2];
  const ampm = match[3].toUpperCase();
  if (ampm === 'PM' && hrs < 12) hrs += 12;
  if (ampm === 'AM' && hrs === 12) hrs = 0;
  return `${String(hrs).padStart(2, '0')}:${mins}`;
}

function format24HToTimeStr(val, type) {
  if (!val) return '';
  const parts = val.split(':');
  let hrs = parseInt(parts[0], 10);
  const mins = parts[1];
  const ampm = hrs >= 12 ? 'PM' : 'AM';
  hrs = hrs % 12;
  if (hrs === 0) hrs = 12;
  const timeStr = `${String(hrs).padStart(2, '0')}:${mins} ${ampm}`;
  if (type === 'checkin') {
    return `From ${timeStr} onwards`;
  } else {
    return `Until ${timeStr}`;
  }
}

// 2. Real-time value binding
function bindInputListeners() {
  Object.keys(inputs).forEach(key => {
    if (inputs[key]) {
      inputs[key].addEventListener('input', (e) => {
        let val = e.target.value;
        if (key === 'checkinDate' || key === 'checkoutDate') {
          state[key] = formatYMDToFormattedDate(val);
        } else if (key === 'checkinTime') {
          state[key] = format24HToTimeStr(val, 'checkin');
        } else if (key === 'checkoutTime') {
          state[key] = format24HToTimeStr(val, 'checkout');
        } else {
          state[key] = val;
        }
        updatePreviewField(key);
      });
    }
  });
}

function syncStateToInputs() {
  Object.keys(inputs).forEach(key => {
    if (inputs[key]) {
      let val = state[key];
      if (key === 'checkinDate' || key === 'checkoutDate') {
        inputs[key].value = parseFormattedDateToYMD(val);
      } else if (key === 'checkinTime' || key === 'checkoutTime') {
        inputs[key].value = parseFormattedTimeTo24H(val);
      } else {
        inputs[key].value = val;
      }
    }
  });
}

function updatePreviewField(key) {
  const val = state[key];
  if (!previews[key] && key !== 'hotelName' && key !== 'agencyWeb' && key !== 'hotelWebsite') return;

  if (key === 'hotelName') {
    if (previews.hotelName) previews.hotelName.textContent = val;
    if (previews.hotelNameDetail) previews.hotelNameDetail.textContent = val;
  } else if (key === 'hotelWebsite') {
    if (previews.hotelNameDetail) {
      previews.hotelNameDetail.setAttribute('href', val);
    }
    const bannerLink = document.getElementById('preview-hotel-name');
    if (bannerLink) {
      bannerLink.setAttribute('href', val);
    }
  } else if (key === 'hotelMaps') {
    if (previews.hotelMaps) {
      previews.hotelMaps.setAttribute('href', val);
    }
  } else if (key === 'agencyWeb') {
    if (previews.agencyWeb) {
      previews.agencyWeb.textContent = val;
      previews.agencyWeb.setAttribute('href', val.startsWith('http') ? val : `http://${val}`);
    }
  } else if (key === 'logoUrl') {
    if (previews.logoUrl) {
      previews.logoUrl.src = val;
    }
  } else if (key === 'hotelImageUrl') {
    if (previews.hotelImageUrl) {
      const placeholder = document.getElementById('preview-hotel-image-placeholder');
      if (val) {
        previews.hotelImageUrl.src = val;
        previews.hotelImageUrl.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
      } else {
        previews.hotelImageUrl.src = '';
        previews.hotelImageUrl.style.display = 'none';
        if (placeholder) placeholder.style.display = 'flex';
      }
    }
    
    // Also sync the editor's styled upload block preview
    const dropzone = document.getElementById('hotel-image-dropzone');
    const previewWrapper = document.getElementById('hotel-image-preview-wrapper');
    const previewThumb = document.getElementById('hotel-image-preview-thumb');
    
    if (val) {
      if (previewThumb) previewThumb.src = val;
      if (previewWrapper) previewWrapper.style.display = 'flex';
      if (dropzone) dropzone.style.display = 'none';
    } else {
      if (previewThumb) previewThumb.src = '';
      if (previewWrapper) previewWrapper.style.display = 'none';
      if (dropzone) dropzone.style.display = 'flex';
    }
  } else if (key === 'checkinTime' || key === 'checkoutTime') {
    if (previews[key]) {
      previews[key].textContent = val ? `(${val})` : '';
    }
  } else {
    if (previews[key]) {
      previews[key].textContent = val;
    }
  }
}

// 3. Dynamic Amenities Tags logic
function setupTagEvents() {
  const btnAdd = document.getElementById('btn-add-tag');
  const inputTxt = document.getElementById('input-tag-text');
  const selectIcon = document.getElementById('select-tag-icon');

  btnAdd.addEventListener('click', () => {
    const text = inputTxt.value.trim();
    const icon = selectIcon.value;

    if (text) {
      state.tags.push({ icon, text });
      inputTxt.value = '';
      renderTags();
    }
  });

  inputTxt.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      btnAdd.click();
    }
  });
}

function renderTags() {
  const editorList = document.getElementById('editor-tag-list');
  const previewList = document.getElementById('preview-hotel-tags');
  
  editorList.innerHTML = '';
  previewList.innerHTML = '';

  state.tags.forEach((tag, idx) => {
    // Render in editor
    const editPill = document.createElement('span');
    editPill.className = 'tag-pill';
    editPill.innerHTML = `
      <span>${tag.icon} ${tag.text}</span>
      <button type="button" onclick="deleteTag(${idx})"><i class="fa-solid fa-xmark"></i></button>
    `;
    editorList.appendChild(editPill);

    // Render in preview
    const previewTag = document.createElement('span');
    previewTag.className = 'hotel-tag';
    previewTag.innerHTML = `<span>${tag.icon}</span> ${tag.text}`;
    previewList.appendChild(previewTag);
  });
}

window.deleteTag = function(idx) {
  state.tags.splice(idx, 1);
  renderTags();
};

// 4. Dynamic Disclaimers logic
function setupDisclaimerEvents() {
  const btnAdd = document.getElementById('btn-add-disclaimer');
  const inputTitle = document.getElementById('input-disclaimer-title');
  const inputDesc = document.getElementById('input-disclaimer-desc');

  btnAdd.addEventListener('click', () => {
    const title = inputTitle.value.trim();
    const desc = inputDesc.value.trim();

    if (title && desc) {
      state.disclaimers.push({ title, desc });
      inputTitle.value = '';
      inputDesc.value = '';
      renderDisclaimers();
    }
  });
}

function renderDisclaimers() {
  const editorList = document.getElementById('editor-disclaimer-list');
  const previewList = document.getElementById('preview-disclaimers');
  
  editorList.innerHTML = '';
  previewList.innerHTML = '';

  state.disclaimers.forEach((clause, idx) => {
    // Render in editor
    const editPill = document.createElement('div');
    editPill.className = 'item-pill';
    editPill.style.width = '100%';
    editPill.style.justifyContent = 'space-between';
    editPill.innerHTML = `
      <span style="font-weight:600; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 80%;">
        <strong>${clause.title}:</strong> ${clause.desc}
      </span>
      <button type="button" onclick="deleteDisclaimer(${idx})"><i class="fa-solid fa-trash"></i></button>
    `;
    editorList.appendChild(editPill);

    // Render in preview
    const previewItem = document.createElement('li');
    previewItem.className = 'terms-item';
    previewItem.innerHTML = `• <strong>${clause.title}:</strong> ${clause.desc}`;
    previewList.appendChild(previewItem);
  });
}

window.deleteDisclaimer = function(idx) {
  state.disclaimers.splice(idx, 1);
  renderDisclaimers();
};

// 5. Save/Load and Print Actions
function setupActionButtons() {
  const btnPrint = document.getElementById('btn-export-pdf');
  const btnSaveTpl = document.getElementById('btn-save-tpl');
  const btnLoadTplTrigger = document.getElementById('btn-load-tpl-trigger');
  const inputLoadTpl = document.getElementById('input-load-tpl');

  btnPrint.addEventListener('click', () => {
    window.print();
  });

  btnSaveTpl.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    
    // Create a filename using the guest name and hotel name
    const sanitizedGuest = state.guestName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const sanitizedHotel = state.hotelName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    downloadAnchor.setAttribute("download", `voucher_tpl_${sanitizedGuest}_${sanitizedHotel}.json`);
    
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.removeChild(downloadAnchor);
  });

  btnLoadTplTrigger.addEventListener('click', () => {
    inputLoadTpl.click();
  });

  inputLoadTpl.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const loadedState = JSON.parse(event.target.result);
        
        // Merge loaded state into current state
        state = { ...state, ...loadedState };
        
        // Sync inputs and re-render everything
        syncStateToInputs();
        renderAll();
        
        // Reset file input value so it triggers change event even on same file selection
        inputLoadTpl.value = '';
        
        alert("Template loaded successfully!");
      } catch (err) {
        alert("Error loading template: Invalid JSON format.");
        console.error(err);
      }
    };
    reader.readAsText(file);
  });
}

// Full view render sync
function renderAll() {
  Object.keys(state).forEach(key => {
    if (key !== 'tags' && key !== 'disclaimers') {
      updatePreviewField(key);
    }
  });
  renderTags();
  renderDisclaimers();
}

// Dynamic Preview Scaler to fit viewport width
function adjustPreviewScale() {
  const container = document.querySelector('.preview-container');
  if (!container) return;
  
  // Measure container width, subtract padding (40px)
  const containerWidth = container.clientWidth;
  const padding = 40;
  const availableWidth = containerWidth - padding;
  
  // 210mm in pixels at 96 dpi is ~794px. Baseline is 794px
  const pageBaselineWidth = 794;
  
  let scale = 1;
  if (availableWidth < pageBaselineWidth) {
    scale = availableWidth / pageBaselineWidth;
  }
  
  // Clamp minimum scale to 0.2 for extreme cases
  scale = Math.max(0.2, scale);
  
  document.documentElement.style.setProperty('--preview-scale', scale);
}

function setupHotelImageEvents() {
  const inputImg = document.getElementById('input-hotel-image-upload');
  const dropzone = document.getElementById('hotel-image-dropzone');
  const previewWrapper = document.getElementById('hotel-image-preview-wrapper');
  const previewThumb = document.getElementById('hotel-image-preview-thumb');
  const btnRemove = document.getElementById('btn-remove-hotel-image');

  function handleFileSelected(file) {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        state.hotelImageUrl = event.target.result;
        updatePreviewField('hotelImageUrl');
      };
      reader.readAsDataURL(file);
    }
  }

  if (dropzone && inputImg) {
    dropzone.addEventListener('click', () => {
      inputImg.click();
    });

    inputImg.addEventListener('change', (e) => {
      const file = e.target.files[0];
      handleFileSelected(file);
    });

    // Drag and drop listeners
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'rgba(59, 130, 246, 0.9)';
      dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.style.borderColor = 'var(--dash-border)';
      dropzone.style.backgroundColor = 'rgba(15, 23, 42, 0.4)';
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--dash-border)';
      dropzone.style.backgroundColor = 'rgba(15, 23, 42, 0.4)';
      
      const file = e.dataTransfer.files[0];
      handleFileSelected(file);
    });
  }

  if (btnRemove) {
    btnRemove.addEventListener('click', () => {
      state.hotelImageUrl = '';
      updatePreviewField('hotelImageUrl');
      if (inputImg) inputImg.value = '';
    });
  }
}

// 6. AI Smart Import Parser logic
function setupAIParser() {
  const btnProcess = document.getElementById('btn-ai-process');
  const btnClear = document.getElementById('btn-ai-clear');
  const promptInput = document.getElementById('ai-prompt-input');
  const dropzone = document.getElementById('ai-image-dropzone');
  const fileInput = document.getElementById('ai-image-file');
  const previewContainer = document.getElementById('ai-image-preview-container');
  const previewImg = document.getElementById('ai-image-preview');
  const btnRemoveImage = document.getElementById('btn-remove-ai-image');

  // Initial badge state setup
  updateAIPanelState();

  // Helper to load and display pasted/uploaded image
  function handleAIImageSelection(file) {
    if (file && file.type.startsWith('image/')) {
      pastedImageFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (previewImg) previewImg.src = e.target.result;
        if (previewContainer) previewContainer.style.display = 'flex';
        if (dropzone) dropzone.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  }

  // Remove selected image
  if (btnRemoveImage) {
    btnRemoveImage.addEventListener('click', () => {
      pastedImageFile = null;
      if (previewImg) previewImg.src = '';
      if (previewContainer) previewContainer.style.display = 'none';
      if (dropzone) dropzone.style.display = 'flex';
      if (fileInput) fileInput.value = '';
    });
  }

  // Clipboard Paste listener
  if (promptInput) {
    promptInput.addEventListener('paste', (e) => {
      const items = (e.clipboardData || e.originalEvent.clipboardData).items;
      for (let item of items) {
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          const file = item.getAsFile();
          handleAIImageSelection(file);
          e.preventDefault(); // Prevent pasting binary string inside textarea
        }
      }
    });
  }

  // Dropzone click trigger
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      handleAIImageSelection(file);
    });

    // Drag and drop bindings
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'rgba(168, 85, 247, 0.9)';
      dropzone.style.backgroundColor = 'rgba(168, 85, 247, 0.05)';
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.style.borderColor = 'var(--dash-border)';
      dropzone.style.backgroundColor = 'rgba(15, 23, 42, 0.4)';
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--dash-border)';
      dropzone.style.backgroundColor = 'rgba(15, 23, 42, 0.4)';
      
      const file = e.dataTransfer.files[0];
      handleAIImageSelection(file);
    });
  }

  if (btnClear) {
    btnClear.addEventListener('click', () => {
      promptInput.value = '';
      if (btnRemoveImage) btnRemoveImage.click(); // Also clear selected image
    });
  }

  if (btnProcess) {
    btnProcess.addEventListener('click', async () => {
      const text = promptInput.value.trim();
      if (!text && !pastedImageFile) {
        alert("Please paste booking text or paste a screenshot image first.");
        return;
      }

      const apiKey = (localStorage.getItem('tg_gemini_key') || GLOBAL_GEMINI_KEY || '').trim();
      let parsed = null;

      // Show loading spinner state on the process button
      const originalBtnHTML = btnProcess.innerHTML;
      btnProcess.disabled = true;
      btnProcess.innerHTML = '<i class="fa-solid fa-spinner"></i> AI processing...';

      try {
        if (apiKey) {
          // Direct Gemini LLM Lookup
          parsed = await runGeminiLLMParser(text, pastedImageFile, apiKey);
        } else {
          // Fallback to local regex parser (only works for text)
          if (pastedImageFile) {
            alert("Local fallback parser does not support image reading. Please enter a Gemini API Key to enable screenshot processing!");
          } else {
            parsed = runAIParser(text);
            alert("Using Local Fallback Parser. Enter your Gemini API Key in the settings below to enable smart lookups (automatic address, location, website, maps URL, and tags)!");
          }
        }

        if (parsed) {
          applyParsedVoucherData(parsed);
          
          // Clear image preview on success
          if (btnRemoveImage && pastedImageFile) {
            btnRemoveImage.click();
          }
        }
      } catch (err) {
        console.error(err);
        alert("Error generating content via Gemini API: " + err.message + "\n\nFalling back to Local Regex Parser...");
        // Fallback to local regex parser on API failure
        if (text) {
          parsed = runAIParser(text);
          if (parsed) {
            applyParsedVoucherData(parsed);
          }
        }
      } finally {
        // Restore button state
        btnProcess.disabled = false;
        btnProcess.innerHTML = originalBtnHTML;
      }
    });
  }

  // API Usage Panel Toggling
  const btnToggleUsage = document.getElementById('btn-toggle-usage');
  const usageDetails = document.getElementById('usage-details');
  const usageChevron = document.getElementById('usage-chevron');
  const btnResetUsage = document.getElementById('btn-reset-usage');

  if (btnToggleUsage && usageDetails) {
    btnToggleUsage.addEventListener('click', () => {
      const isHidden = usageDetails.style.display === 'none';
      usageDetails.style.display = isHidden ? 'flex' : 'none';
      if (usageChevron) {
        usageChevron.classList.toggle('expanded', isHidden);
      }
    });
  }

  if (btnResetUsage) {
    btnResetUsage.addEventListener('click', resetAPIUsage);
  }

  // API Key Settings Panel Toggling and Saving
  const btnApiSettings = document.getElementById('btn-api-settings');
  const apiSettingsPanel = document.getElementById('ai-api-settings-panel');
  const inputGeminiKey = document.getElementById('input-gemini-key');
  const btnSaveKey = document.getElementById('btn-save-key');
  const keyStatusLabel = document.getElementById('key-status-label');

  if (btnApiSettings && apiSettingsPanel) {
    // Toggle settings panel visibility
    btnApiSettings.addEventListener('click', () => {
      const isHidden = apiSettingsPanel.style.display === 'none';
      apiSettingsPanel.style.display = isHidden ? 'block' : 'none';
    });

    // Populate initial key state on load
    const savedKey = localStorage.getItem('tg_gemini_key') || '';
    if (savedKey) {
      inputGeminiKey.value = savedKey;
      if (keyStatusLabel) {
        keyStatusLabel.textContent = 'Custom Key Saved';
        keyStatusLabel.style.color = '#10b981'; // green
      }
    } else {
      if (keyStatusLabel) {
        keyStatusLabel.textContent = 'Using Default Key';
        keyStatusLabel.style.color = '#a855f7'; // purple
      }
    }

    // Save key button action
    if (btnSaveKey && inputGeminiKey) {
      btnSaveKey.addEventListener('click', () => {
        const val = inputGeminiKey.value.trim();
        if (val) {
          localStorage.setItem('tg_gemini_key', val);
          if (keyStatusLabel) {
            keyStatusLabel.textContent = 'Custom Key Saved';
            keyStatusLabel.style.color = '#10b981';
          }
          alert('Custom Gemini API Key saved successfully!');
        } else {
          localStorage.removeItem('tg_gemini_key');
          if (keyStatusLabel) {
            keyStatusLabel.textContent = 'Using Default Key';
            keyStatusLabel.style.color = '#a855f7';
          }
          alert('Custom key cleared. Falling back to default system key.');
        }
        updateAIPanelState();
      });
    }
  }

  // Load saved API usage stats
  loadAPIUsage();
}

function updateAIPanelState() {
  const badge = document.getElementById('ai-badge');
  const key = localStorage.getItem('tg_gemini_key') || GLOBAL_GEMINI_KEY || '';
  if (badge) {
    if (key) {
      badge.textContent = 'GEMINI ACTIVE';
      badge.style.background = 'linear-gradient(135deg, #a855f7, #10b981)';
    } else {
      badge.textContent = 'LOCAL PARSER';
      badge.style.background = 'linear-gradient(135deg, #64748b, #475569)';
    }
  }
}

function applyParsedVoucherData(parsed) {
  // Prevent hallucinated/broken short maps links from the AI
  if (parsed.hotelMaps && parsed.hotelMaps.includes('maps.app.goo.gl')) {
    const name = parsed.hotelName || state.hotelName || '';
    const addr = parsed.hotelAddress || state.hotelAddress || '';
    const query = `${name} ${addr}`.trim();
    if (query) {
      parsed.hotelMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    }
  } else if (!parsed.hotelMaps && parsed.hotelName) {
    const name = parsed.hotelName;
    const addr = parsed.hotelAddress || state.hotelAddress || '';
    const query = `${name} ${addr}`.trim();
    parsed.hotelMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  const updatedKeys = [];

  Object.keys(parsed).forEach(key => {
    if (key === 'tags' && Array.isArray(parsed.tags)) {
      state.tags = parsed.tags;
      updatedKeys.push('tags');
    } else if (parsed[key] !== undefined && parsed[key] !== state[key]) {
      state[key] = parsed[key];
      updatedKeys.push(key);
    }
  });

  if (updatedKeys.length > 0) {
    // Sync state and render
    syncStateToInputs();
    renderAll();

    // Highlight the modified inputs with temporary glow
    updatedKeys.forEach(key => {
      if (key === 'tags') return;
      const el = inputs[key];
      if (el) {
        el.classList.remove('input-highlight');
        void el.offsetWidth; // Trigger reflow to restart animation
        el.classList.add('input-highlight');
        
        setTimeout(() => {
          el.classList.remove('input-highlight');
        }, 2200);
      }
    });
    
    // Automatically expand form sections containing modifications
    const sectionMappings = [
      { idx: 0, keys: ['confNum', 'bookingStatus'] },
      { idx: 1, keys: ['hotelName', 'hotelWebsite', 'hotelSubtitle', 'hotelLocation', 'hotelAddress', 'hotelMaps'] },
      { idx: 2, keys: ['guestName', 'guestCount'] },
      { idx: 3, keys: ['checkinDate', 'checkinTime', 'checkoutDate', 'checkoutTime', 'roomCat', 'roomCount'] },
      { idx: 4, keys: ['mealCode', 'mealDesc'] }
    ];

    const sections = document.querySelectorAll('.form-section');
    sections.forEach(s => s.classList.remove('active'));

    let expandedCount = 0;
    sectionMappings.forEach(mapping => {
      const hasUpdates = mapping.keys.some(k => updatedKeys.includes(k));
      if (hasUpdates && sections[mapping.idx]) {
        sections[mapping.idx].classList.add('active');
        expandedCount++;
      }
    });

    if (expandedCount === 0 && sections[0]) {
      sections[0].classList.add('active');
    }
  } else {
    alert("Parsed the text but found no changes to apply compared to the current voucher.");
  }
}

async function runGeminiLLMParser(text, imageFile, apiKey) {
  const parts = [];

  const prompt = `You are a travel voucher details extractor. Analyze the provided image (and optional accompanying text) and return a structured JSON object containing the voucher fields.

Extract these fields directly from the image/text:
- "guestName": Full client/guest name in title case (e.g. Yamini Gupta).
- "confNum": Confirmation details or confirmation number (e.g. "CNF: 1610785" or "Confirmed by Mr. Shubham").
- "checkinDate": Check-in date in "Mmm DD, YYYY" format (e.g. "Jun 14, 2026"). Assume the year is 2026 if not specified.
- "checkoutDate": Check-out date in "Mmm DD, YYYY" format (e.g. "Jun 17, 2026").
- "guestCount": Standard passenger description (e.g. "2 Adults, 2 Children (Ages 8 & 4 Years Old)").
- "roomCat": Room category in title case.
- "roomCount": Number of rooms, formatted like "1 Room" or "2 Rooms", etc. (e.g., "1 Room" or "2 Rooms").
- "mealCode": Standard meal code (e.g. "MAP PLAN", "AP PLAN", "CP PLAN", "EP PLAN", "MAPAI PLAN").
- "mealDesc": Description of inclusions for that meal plan code (e.g. "(Includes Accommodation, Daily Buffet Breakfast & Dinner)").

For fields that are NOT explicitly mentioned but can be resolved via search/knowledge lookup, you MUST provide the correct official values:
- "hotelName": Full official name of the hotel (e.g. "The Oasis Mussoorie, A Member Of Radisson Individuals").
- "hotelSubtitle": A premium description subtitle for the hotel, formatted exactly as "Description or Brand — City, State" (e.g. "A Member Of Radisson Individuals — Mussoorie, Uttarakhand" or "Premium Riverside Resort — Rishikesh, Uttarakhand").
- "hotelLocation": The city and state of the hotel in title case (e.g. "Mussoorie, Uttarakhand" or "Rishikesh, Uttarakhand").
- "hotelAddress": The full official postal address of the hotel.
- "hotelWebsite": The official website URL of the hotel.
- "hotelMaps": A standard Google Maps search URL using the search API. Do NOT guess or hallucinate a short link (e.g., maps.app.goo.gl) because they are dynamic and will fail. Instead, construct it using this format: https://www.google.com/maps/search/?api=1&query=HotelName+HotelAddress (URL-encoded).
- "tags": Array of 3-4 custom amenity/highlight tags for this hotel (e.g. [{"icon": "⛰️", "text": "Hill Station View"}, {"icon": "⭐", "text": "Radisson Hotel"}]).

Respond ONLY with a valid JSON object matching this schema. Do not write any markdown code blocks, explanation text, or notes. Just the raw JSON object.`;

  parts.push({ text: prompt });

  if (text) {
    parts.push({ text: `Accompanying notes/text: "${text}"` });
  }

  if (imageFile) {
    const base64DataUrl = await readFileAsBase64(imageFile);
    const base64Data = base64DataUrl.split(',')[1];
    parts.push({
      inlineData: {
        mimeType: imageFile.type,
        data: base64Data
      }
    });
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{ parts: parts }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const errMsg = errData.error ? errData.error.message : response.statusText;
    throw new Error(errMsg);
  }

  const result = await response.json();
  if (result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts[0]) {
    if (result.usageMetadata) {
      trackAPIUsage(result.usageMetadata);
    }
    const jsonText = result.candidates[0].content.parts[0].text.trim();
    return JSON.parse(jsonText);
  } else {
    throw new Error("Invalid response format received from Gemini API.");
  }
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

function runAIParser(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) return null;

  const result = {};
  const matchedLines = new Set();

  const normalizeMonthName = (m) => {
    const months = {
      jan: "Jan", february: "Feb", march: "Mar", april: "Apr", may: "May", june: "Jun",
      july: "Jul", august: "Aug", september: "Sep", october: "Oct", november: "Nov", december: "Dec",
      january: "Jan", feb: "Feb", mar: "Mar", apr: "Apr", jun: "Jun", jul: "Jul", aug: "Aug", sep: "Sep", oct: "Oct", nov: "Nov", dec: "Dec"
    };
    const key = m.toLowerCase().trim();
    return months[key] || (m.charAt(0).toUpperCase() + m.slice(1).toLowerCase());
  };

  // 1. Client / Primary Guest Name
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/(?:client\s*name|guest\s*name|client|guest|pax)\s*[-:]\s*(.+)/i);
    if (match) {
      result.guestName = match[1].trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      matchedLines.add(i);
      break;
    }
  }

  // 2. Confirmation Number/Status
  for (let i = 0; i < lines.length; i++) {
    if (matchedLines.has(i)) continue;
    const line = lines[i];
    const match = line.match(/(?:cnf|conf|confirmation|ref|reference)\s*[-:]\s*(.+)/i);
    if (match) {
      result.confNum = match[1].trim();
      matchedLines.add(i);
      break;
    }
  }

  // 3. Date range
  for (let i = 0; i < lines.length; i++) {
    if (matchedLines.has(i)) continue;
    const line = lines[i];
    
    // Try: 14-17 june
    let m1 = line.match(/^(\d{1,2})\s*[-–—to]\s*(\d{1,2})\s*([a-zA-Z]+)(?:\s*,?\s*(\d{4}))?$/i);
    if (m1) {
      const day1 = m1[1];
      const day2 = m1[2];
      const month = normalizeMonthName(m1[3]);
      const year = m1[4] || new Date().getFullYear();
      result.checkinDate = `${month} ${day1}, ${year}`;
      result.checkoutDate = `${month} ${day2}, ${year}`;
      matchedLines.add(i);
      break;
    }

    // Try: 14 june - 17 june
    let m2 = line.match(/^(\d{1,2})\s*([a-zA-Z]+)\s*[-–—to]\s*(\d{1,2})\s*([a-zA-Z]+)(?:\s*,?\s*(\d{4}))?$/i);
    if (m2) {
      const day1 = m2[1];
      const month1 = normalizeMonthName(m2[2]);
      const day2 = m2[3];
      const month2 = normalizeMonthName(m2[4]);
      const year = m2[5] || new Date().getFullYear();
      result.checkinDate = `${month1} ${day1}, ${year}`;
      result.checkoutDate = `${month2} ${day2}, ${year}`;
      matchedLines.add(i);
      break;
    }

    // Try: Jun 14 - Jun 17
    let m3 = line.match(/^([a-zA-Z]+)\s*(\d{1,2})\s*[-–—to]\s*([a-zA-Z]+)\s*(\d{1,2})(?:\s*,?\s*(\d{4}))?$/i);
    if (m3) {
      const month1 = normalizeMonthName(m3[1]);
      const day1 = m3[2];
      const month2 = normalizeMonthName(m3[3]);
      const day2 = m3[4];
      const year = m3[5] || new Date().getFullYear();
      result.checkinDate = `${month1} ${day1}, ${year}`;
      result.checkoutDate = `${month2} ${day2}, ${year}`;
      matchedLines.add(i);
      break;
    }

    // Try: Jun 14 - 17
    let m4 = line.match(/^([a-zA-Z]+)\s*(\d{1,2})\s*[-–—to]\s*(\d{1,2})(?:\s*,?\s*(\d{4}))?$/i);
    if (m4) {
      const month = normalizeMonthName(m4[1]);
      const day1 = m4[2];
      const day2 = m4[3];
      const year = m4[4] || new Date().getFullYear();
      result.checkinDate = `${month} ${day1}, ${year}`;
      result.checkoutDate = `${month} ${day2}, ${year}`;
      matchedLines.add(i);
      break;
    }
  }

  // 4. Passenger Count
  for (let i = 0; i < lines.length; i++) {
    if (matchedLines.has(i)) continue;
    const line = lines[i];
    let adultMatch = line.match(/(\d+)\s*(?:ad|adult|pax)/i);
    let childMatch = line.match(/(\d+)\s*(?:chd|child|kid)/i);

    if (adultMatch || childMatch) {
      let adultCount = adultMatch ? parseInt(adultMatch[1]) : 0;
      let childCount = childMatch ? parseInt(childMatch[1]) : 0;
      let desc = '';

      if (adultCount > 0) {
        desc += `${adultCount} Adult${adultCount > 1 ? 's' : ''}`;
      }
      
      if (childCount > 0) {
        if (desc) desc += ', ';
        desc += `${childCount} Child${childCount > 1 ? 'ren' : ''}`;
        
        let remainder = line.substring(Math.max(
          line.toLowerCase().indexOf('chd'),
          line.toLowerCase().indexOf('child'),
          line.toLowerCase().indexOf('kid')
        ));
        let ageMatches = remainder.match(/\b\d+\b/g);
        if (ageMatches && ageMatches.length > 0) {
          if (parseInt(ageMatches[0]) === childCount) {
            ageMatches.shift();
          }
          if (ageMatches.length > 0) {
            desc += ` (Ages ${ageMatches.join(' & ')} Years Old)`;
          }
        }
      }
      result.guestCount = desc;
      matchedLines.add(i);
      break;
    }
  }

  // 5. Meal Plan
  for (let i = 0; i < lines.length; i++) {
    if (matchedLines.has(i)) continue;
    const line = lines[i];
    const upper = line.toUpperCase();
    if (upper.includes('MAP') || upper.includes('AP PLAN') || upper.includes('CP PLAN') || upper.includes('EP PLAN') || upper.includes('ROOM ONLY')) {
      if (upper.includes('MAP')) {
        result.mealCode = "MAP PLAN";
        result.mealDesc = "(Includes Accommodation, Daily Buffet Breakfast & Dinner)";
      } else if (upper.includes('AP')) {
        result.mealCode = "AP PLAN";
        result.mealDesc = "(Includes Accommodation, Breakfast, Lunch & Dinner)";
      } else if (upper.includes('CP')) {
        result.mealCode = "CP PLAN";
        result.mealDesc = "(Includes Accommodation & Daily Buffet Breakfast)";
      } else if (upper.includes('EP') || upper.includes('ROOM ONLY')) {
        result.mealCode = "EP PLAN";
        result.mealDesc = "(Room Only)";
      }
      matchedLines.add(i);
      break;
    }
  }

  // 6. Room Category
  for (let i = 0; i < lines.length; i++) {
    if (matchedLines.has(i)) continue;
    const line = lines[i];
    const keywords = /suite|room|dlx|deluxe|villa|cottage|royal|kids|executive|standard|superior/i;
    if (keywords.test(line)) {
      let cleaned = line
        .replace(/\bdlx\b/gi, 'Deluxe')
        .replace(/\bsup\b/gi, 'Superior')
        .replace(/\bexec\b/gi, 'Executive')
        .replace(/\bstd\b/gi, 'Standard');
      
      result.roomCat = cleaned.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      matchedLines.add(i);
      break;
    }
  }

  // 6b. Room Count
  for (let i = 0; i < lines.length; i++) {
    if (matchedLines.has(i)) continue;
    const line = lines[i];
    const match = line.match(/(?:no\s*of\s*rooms|rooms|room\s*count|number\s*of\s*rooms)\s*[-:]\s*(.+)/i);
    if (match) {
      let val = match[1].trim();
      if (!val.toLowerCase().includes('room')) {
        val = `${val} Room${val !== '1' ? 's' : ''}`;
      }
      result.roomCount = val.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      matchedLines.add(i);
      break;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    if (matchedLines.has(i)) continue;
    const line = lines[i];
    const match = line.match(/^(\d+)\s*rooms?$/i);
    if (match) {
      const num = match[1];
      result.roomCount = `${num} Room${num !== '1' ? 's' : ''}`;
      matchedLines.add(i);
      break;
    }
  }

  // 7. URLs (Website / Maps)
  for (let i = 0; i < lines.length; i++) {
    if (matchedLines.has(i)) continue;
    const line = lines[i];
    if (line.startsWith('http') || line.includes('.com') || line.includes('google.com') || line.includes('goo.gl')) {
      if (line.includes('maps') || line.includes('goo.gl')) {
        result.hotelMaps = line;
      } else {
        result.hotelWebsite = line;
      }
      matchedLines.add(i);
    }
  }

  // 8. Hotel Name (The first unmatched line at the top)
  for (let i = 0; i < lines.length; i++) {
    if (!matchedLines.has(i)) {
      result.hotelName = lines[i].split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      matchedLines.add(i);
      break;
    }
  }

  return result;
}
