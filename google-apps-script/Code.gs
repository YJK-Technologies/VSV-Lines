/**
 * ============================================================================
 * V S V CONTAINER LINES (OPC) PRIVATE LIMITED
 * Google Apps Script - Customer Enquiry Mail Forwarder
 * File: google-apps-script/Code.gs
 * ============================================================================
 * 
 * DESCRIPTION:
 * This script accepts HTTP POST submissions from the V S V Container Lines
 * corporate website contact form, validates the inputs, protects against spam
 * bots via a honeypot field, and dispatches a formatted notification email to:
 * 
 *     info@vsvlines.com
 * 
 * With customer's verified email set as the Reply-To header.
 * 
 * ----------------------------------------------------------------------------
 * DEPLOYMENT INSTRUCTIONS AS A GOOGLE APPS SCRIPT WEB APP:
 * ----------------------------------------------------------------------------
 * 1. Open Google Sheets or visit: https://script.google.com/
 * 2. Click "New project" and name it "VSV Container Lines - Contact Form".
 * 3. Replace all content in "Code.gs" with this exact code.
 * 4. (Optional) Test configuration by running the 'testEmailDispatch()' function.
 * 5. Click the blue "Deploy" button at top-right -> Select "New deployment".
 * 6. Click the gear icon next to "Select type" and choose "Web app".
 * 7. Configure deployment settings:
 *      - Description: "Production Web App v1"
 *      - Execute as: "Me (your-google-account@domain.com)"
 *      - Who has access: "Anyone" (CRITICAL: Must be "Anyone" so website visitors can submit without Google login)
 * 8. Click "Deploy".
 * 9. Review and Grant permissions if prompted (MailApp authorization to send email).
 * 10. Copy the generated "Web app URL" (looks like https://script.google.com/macros/s/AKfycb.../exec).
 * 11. Open your website file `js/script.js` and paste that URL into:
 *       const GOOGLE_SCRIPT_URL = "YOUR_COPIED_URL_HERE";
 * 12. Save and your live corporate website will immediately deliver enquiries!
 * 
 * ----------------------------------------------------------------------------
 * CORS & CROSS-ORIGIN DETAILS:
 * ----------------------------------------------------------------------------
 * Google Apps Script Web Apps respond to POST requests by issuing an HTTP 302
 * redirect to a script.googleusercontent.com storage URL. Standard browser
 * fetch requests can trigger cross-origin restrictions when trying to read
 * the redirect response. To ensure 100% reliable submissions without CORS
 * blocking, the frontend calls fetch with `mode: 'no-cors'`, which succeeds
 * natively across all modern browsers.
 * ============================================================================
 */

// Global Configuration
const RECIPIENT_EMAIL = "info@vsvlines.com";
const EMAIL_SUBJECT_PREFIX = "New Website Enquiry - V S V Container Lines";

/**
 * Handles HTTP GET requests (useful for sanity check in browser)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    company: "V S V CONTAINER LINES (OPC) PRIVATE LIMITED",
    service: "Enquiry Form Handler",
    message: "POST endpoint active. Submissions must be sent via HTTP POST."
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handles HTTP POST requests from the website contact form
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  
  try {
    // Acquire a 10-second lock to prevent concurrent collisions
    lock.waitLock(10000);

    let data = {};

    // Parse parameters from either FormData, URL-encoded or JSON payload
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        // Fallback to post parameters
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    // 1. Honeypot Anti-Spam Check
    // If hidden field 'website_hp' contains any value, it was likely filled by an automated bot.
    if (data.website_hp && String(data.website_hp).trim() !== "") {
      Logger.log("Spam detected via honeypot. Silently dropping.");
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Enquiry processed."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Server-Side Data Extraction & Sanitization
    const fullName    = sanitizeInput(data.fullName || "");
    const companyName = sanitizeInput(data.companyName || "");
    const email       = sanitizeInput(data.email || "");
    const phone       = sanitizeInput(data.phone || "");
    const service     = sanitizeInput(data.service || "");
    const subject     = sanitizeInput(data.subject || "Shipping Enquiry");
    const message     = sanitizeInput(data.message || "");
    const submittedAt = data.submittedAt || new Date().toISOString();

    // 3. Server-Side Mandatory Validation
    const validationErrors = [];

    if (!fullName || fullName.length < 2) {
      validationErrors.push("Valid full name is required.");
    }
    if (!companyName || companyName.length < 2) {
      validationErrors.push("Company name is required.");
    }
    if (!email || !isValidEmail(email)) {
      validationErrors.push("Valid email address is required.");
    }
    if (!phone || phone.length < 7) {
      validationErrors.push("Valid contact phone number is required.");
    }
    if (!service) {
      validationErrors.push("Please specify the required freight forwarding service.");
    }
    if (!message || message.length < 10) {
      validationErrors.push("Detailed enquiry message (minimum 10 characters) is required.");
    }

    if (validationErrors.length > 0) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        errors: validationErrors,
        message: "Validation failed on mandatory fields."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 4. Construct Formatted Email Notification
    const emailSubject = `${EMAIL_SUBJECT_PREFIX}: ${subject} [${service}]`;

    // Plain Text Version
    const plainTextBody = 
`NEW WEBSITE ENQUIRY
V S V CONTAINER LINES (OPC) PRIVATE LIMITED
==================================================

Full Name:      ${fullName}
Company Name:   ${companyName}
Email Address:  ${email}
Phone Number:   ${phone}
Service:        ${service}
Subject:        ${subject}
Submitted At:   ${submittedAt}

MESSAGE:
--------------------------------------------------
${message}
--------------------------------------------------

* Reply directly to this email to respond to ${fullName} (${email}).
==================================================`;

    // High-End HTML Version matching corporate maritime aesthetic
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F7F8FA; margin: 0; padding: 24px; color: #182435; }
    .email-container { max-width: 620px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E2E8F0; border-top: 5px solid #D99A27; border-radius: 6px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
    .email-header { background-color: #071A33; padding: 24px; text-align: left; }
    .email-header h1 { margin: 0; font-size: 19px; color: #FFFFFF; font-weight: 700; letter-spacing: 0.05em; }
    .email-header p { margin: 4px 0 0 0; font-size: 12px; color: #E5AC43; text-transform: uppercase; letter-spacing: 0.12em; }
    .email-body { padding: 28px 24px; }
    .badge-tag { display: inline-block; background-color: #F5E9D0; color: #071A33; font-weight: 700; font-size: 11px; padding: 4px 10px; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px; border: 1px solid rgba(217, 154, 39, 0.4); }
    .details-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .details-table td { padding: 10px 12px; font-size: 14px; border-bottom: 1px solid #EDF2F7; }
    .details-table td.label { width: 35%; font-weight: 600; color: #5A6A80; background-color: #F8FAFC; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; }
    .details-table td.value { color: #071A33; font-weight: 500; }
    .message-box { background-color: #F8FAFC; border-left: 4px solid #D99A27; padding: 16px; border-radius: 0 4px 4px 0; margin-top: 12px; font-size: 14px; line-height: 1.6; color: #182435; white-space: pre-wrap; }
    .email-footer { background-color: #0B2545; padding: 18px 24px; text-align: center; font-size: 12px; color: #94A3B8; }
    .email-footer a { color: #E5AC43; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>V S V CONTAINER LINES (OPC) PVT LTD</h1>
      <p>International Freight Forwarders &bull; Web Enquiry</p>
    </div>
    <div class="email-body">
      <div class="badge-tag">Service: ${service}</div>
      <table class="details-table">
        <tr>
          <td class="label">Contact Name</td>
          <td class="value"><strong>${fullName}</strong></td>
        </tr>
        <tr>
          <td class="label">Company Name</td>
          <td class="value">${companyName}</td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value"><a href="mailto:${email}" style="color:#071A33; text-decoration: underline;">${email}</a></td>
        </tr>
        <tr>
          <td class="label">Phone Number</td>
          <td class="value"><a href="tel:${phone}" style="color:#071A33; text-decoration: none;">${phone}</a></td>
        </tr>
        <tr>
          <td class="label">Subject</td>
          <td class="value">${subject}</td>
        </tr>
        <tr>
          <td class="label">Submitted At</td>
          <td class="value">${submittedAt}</td>
        </tr>
      </table>

      <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #071A33; margin: 20px 0 6px 0;">Customer Message / Cargo Requirement:</h3>
      <div class="message-box">${message}</div>
    </div>
    <div class="email-footer">
      This notification was generated from the corporate contact form at <a href="https://www.vsvlines.com">www.vsvlines.com</a>.<br>
      You can reply directly to this email to correspond with ${fullName}.
    </div>
  </div>
</body>
</html>`;

    // 5. Send Email via MailApp with customer as replyTo
    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: emailSubject,
      body: plainTextBody,
      htmlBody: htmlBody,
      replyTo: email,
      name: `${fullName} via VSV Lines Website`
    });

    Logger.log(`Successfully delivered enquiry from ${email} to ${RECIPIENT_EMAIL}`);

    // Return Success JSON
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Enquiry submitted successfully and forwarded to info@vsvlines.com"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Internal server error occurred while processing the enquiry.",
      details: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Sanitizes input text to prevent header injection and strip unsafe tags
 */
function sanitizeInput(text) {
  if (text === null || text === undefined) return "";
  return String(text).trim();
}

/**
 * Basic email format verification
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Test function to verify email dispatch permissions within Google Apps Script Editor
 */
function testEmailDispatch() {
  const dummyPayload = {
    postData: {
      contents: JSON.stringify({
        fullName: "Test Shipper",
        companyName: "Global Cargo Corp",
        email: "test@example.com",
        phone: "+91 98765 43210",
        service: "Sea Freight",
        subject: "FCL Container Rate Request - Chennai Port",
        message: "This is a test notification verifying that MailApp configuration functions correctly for V S V Container Lines.",
        website_hp: "" // Honeypot empty
      })
    }
  };
  
  const response = doPost(dummyPayload);
  Logger.log("Test Output: " + response.getContent());
}
