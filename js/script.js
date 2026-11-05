/**
 * V S V CONTAINER LINES (OPC) PRIVATE LIMITED
 * Official Corporate Website Interactions
 * Vanilla JavaScript (ES6+)
 */

// =============================================================================
// 1. CONFIGURATION
// =============================================================================
// When deploying your Google Apps Script Web App (from google-apps-script/Code.gs),
// paste the generated Web App Executable URL below:
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyjGjmFFOuS9Q_-zt9KqAfYgTCKHaUEPN1TZgsMGStQv2NtCp4BvOe8BmHvBdk9RtjpmA/exec";

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileNavClose();
  initScrollTopButton();
  initContactForm();
  initSmoothScroll();
});

// =============================================================================
// 2. NAVBAR SCROLL & ACTIVE STATE
// =============================================================================
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-vsv');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// Close mobile navigation drawer when a link is clicked
function initMobileNavClose() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link-vsv, .nav-cta-btn');
  const navbarCollapse = document.getElementById('vsvNavbarNav');

  if (!navbarCollapse) return;

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        // Trigger Bootstrap's collapse toggle if available or remove 'show'
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        } else {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });
}

// =============================================================================
// 3. SMOOTH SCROLL & ACTIVE LINK HIGHLIGHTING
// =============================================================================
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link-vsv');

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

// =============================================================================
// 4. SCROLL TO TOP BUTTON
// =============================================================================
function initScrollTopButton() {
  const btn = document.getElementById('btnScrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// =============================================================================
// 5. CONTACT FORM VALIDATION & GOOGLE APPS SCRIPT SUBMISSION
// =============================================================================
function initContactForm() {
  const form = document.getElementById('vsvContactForm');
  if (!form) return;

  const submitBtn = document.getElementById('contactSubmitBtn');
  const btnText = document.getElementById('contactBtnText');
  const btnSpinner = document.getElementById('contactBtnSpinner');
  const alertBox = document.getElementById('formAlertBox');

  // Input elements
  const fullNameInput = document.getElementById('fullName');
  const companyNameInput = document.getElementById('companyName');
  const emailInput = document.getElementById('emailAddress');
  const phoneInput = document.getElementById('phoneNumber');
  const serviceInput = document.getElementById('serviceRequired');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const honeypotInput = document.getElementById('website_hp');

  const showAlert = (type, message) => {
    alertBox.className = `form-status-alert alert-${type}`;
    alertBox.innerHTML = message;
    alertBox.style.display = 'block';
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const clearAlert = () => {
    alertBox.style.display = 'none';
    alertBox.innerHTML = '';
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    // Allows +, digits, spaces, hyphens, min 7 digits
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    const re = /^\+?[0-9]{7,15}$/;
    return re.test(cleaned);
  };

  const setValidationState = (input, isValid) => {
    if (isValid) {
      input.classList.remove('is-invalid');
    } else {
      input.classList.add('is-invalid');
    }
  };

  // Live validation on blur
  fullNameInput.addEventListener('blur', () => {
    setValidationState(fullNameInput, fullNameInput.value.trim().length >= 2);
  });

  companyNameInput.addEventListener('blur', () => {
    setValidationState(companyNameInput, companyNameInput.value.trim().length >= 2);
  });

  emailInput.addEventListener('blur', () => {
    setValidationState(emailInput, validateEmail(emailInput.value.trim()));
  });

  phoneInput.addEventListener('blur', () => {
    setValidationState(phoneInput, validatePhone(phoneInput.value.trim()));
  });

  serviceInput.addEventListener('change', () => {
    setValidationState(serviceInput, serviceInput.value !== '');
  });

  subjectInput.addEventListener('blur', () => {
    setValidationState(subjectInput, subjectInput.value.trim().length >= 3);
  });

  messageInput.addEventListener('blur', () => {
    setValidationState(messageInput, messageInput.value.trim().length >= 10);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert();

    // 1. Anti-spam honeypot verification
    if (honeypotInput && honeypotInput.value.trim() !== '') {
      console.warn('Bot detected via honeypot.');
      showAlert('danger', 'Submission failed validation. Please refresh and try again.');
      return;
    }

    // 2. Validate all fields
    const fullName = fullNameInput.value.trim();
    const companyName = companyNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const service = serviceInput.value;
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    let hasError = false;

    if (fullName.length < 2) {
      setValidationState(fullNameInput, false);
      hasError = true;
    } else {
      setValidationState(fullNameInput, true);
    }

    if (companyName.length < 2) {
      setValidationState(companyNameInput, false);
      hasError = true;
    } else {
      setValidationState(companyNameInput, true);
    }

    if (!validateEmail(email)) {
      setValidationState(emailInput, false);
      hasError = true;
    } else {
      setValidationState(emailInput, true);
    }

    if (!validatePhone(phone)) {
      setValidationState(phoneInput, false);
      hasError = true;
    } else {
      setValidationState(phoneInput, true);
    }

    if (!service) {
      setValidationState(serviceInput, false);
      hasError = true;
    } else {
      setValidationState(serviceInput, true);
    }

    if (subject.length < 3) {
      setValidationState(subjectInput, false);
      hasError = true;
    } else {
      setValidationState(subjectInput, true);
    }

    if (message.length < 10) {
      setValidationState(messageInput, false);
      hasError = true;
    } else {
      setValidationState(messageInput, true);
    }

    if (hasError) {
      showAlert('danger', '<i class="bi bi-exclamation-triangle-fill me-2"></i>Please correct the highlighted fields before submitting.');
      return;
    }

    // Payload object
    const payload = {
      fullName,
      companyName,
      email,
      phone,
      service,
      subject,
      message,
      submittedAt: new Date().toISOString()
    };

    // UI Loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Transmitting Enquiry...';
    btnSpinner.classList.remove('d-none');

    // 3. Handle Placeholder vs Real Google Apps Script Endpoint
    const isPlaceholder = GOOGLE_SCRIPT_URL === "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE" || !GOOGLE_SCRIPT_URL.startsWith('http');

    if (isPlaceholder) {
      // Friendly simulation mode that demonstrates form submission and instructs configuration
      setTimeout(() => {
        submitBtn.disabled = false;
        btnText.textContent = 'Send Enquiry';
        btnSpinner.classList.add('d-none');

        showAlert('info', `
          <div class="d-flex align-items-start gap-2">
            <i class="bi bi-info-circle-fill fs-5 mt-1 text-primary"></i>
            <div>
              <strong>Enquiry Validated Successfully!</strong><br>
              Thank you, <strong>${escapeHtml(fullName)}</strong> from <strong>${escapeHtml(companyName)}</strong>. All mandatory fields passed strict corporate validation.<br>
              <div class="mt-2 p-2 bg-white rounded border text-dark font-monospace small">
                <strong>Recipient:</strong> info@vsvlines.com<br>
                <strong>Service Requested:</strong> ${escapeHtml(service)}<br>
                <strong>Subject:</strong> ${escapeHtml(subject)}
              </div>
              <small class="d-block mt-2 text-muted">
                <i class="bi bi-gear-fill me-1"></i> <strong>Deployment Note:</strong> The frontend <code>GOOGLE_SCRIPT_URL</code> is currently set to the default placeholder. To enable direct live email dispatch via Google Apps Script, deploy <code>google-apps-script/Code.gs</code> as a Web App and paste its URL into <code>js/script.js</code> (see README.md for complete instructions).
              </small>
            </div>
          </div>
        `);
        form.reset();
      }, 700);
      return;
    }

    // 4. Live Submission to Google Apps Script
    try {
      // Google Apps Script Web Apps handle POST via redirect.
      // Using URLSearchParams or FormData with no-cors or standard fetch:
      const formData = new FormData();
      Object.keys(payload).forEach(key => formData.append(key, payload[key]));

      // Note: Google Apps Script Web App redirects 302 to a userContent domain.
      // Standard fetch with mode 'no-cors' succeeds without browser CORS block.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });

      submitBtn.disabled = false;
      btnText.textContent = 'Send Enquiry';
      btnSpinner.classList.add('d-none');

      showAlert('success', `
        <div class="d-flex align-items-start gap-2">
          <i class="bi bi-check-circle-fill fs-5 mt-1 text-success"></i>
          <div>
            <strong>Enquiry Sent Successfully!</strong><br>
            Thank you, <strong>${escapeHtml(fullName)}</strong>. Your shipping enquiry has been routed to <strong>info@vsvlines.com</strong>. Our freight forwarding coordination team will contact you shortly.
          </div>
        </div>
      `);
      form.reset();

    } catch (err) {
      console.error('Error submitting form to Google Apps Script:', err);
      submitBtn.disabled = false;
      btnText.textContent = 'Send Enquiry';
      btnSpinner.classList.add('d-none');

      showAlert('danger', `
        <div class="d-flex align-items-start gap-2">
          <i class="bi bi-x-circle-fill fs-5 mt-1 text-danger"></i>
          <div>
            <strong>Transmission Error.</strong><br>
            Unable to connect to the mail forwarding service. Please email us directly at <a href="mailto:info@vsvlines.com" class="text-danger fw-bold">info@vsvlines.com</a> or call <a href="tel:+917904536399" class="text-danger fw-bold">+91 79045 36399</a>.
          </div>
        </div>
      `);
    }
  });
}

// Utility to escape HTML to prevent XSS in dynamic feedback
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
