/**
 * Mangalore Fashion Survey — Google Sheets backend
 *
 * Sheets created automatically:
 *   Responses   : one row per survey submission
 *   Products    : one row per selected product + preferences + price
 *   MultiSelect : one row per selected multi-choice value
 *   Metadata    : backend/version information
 *
 * Deploy as Web App:
 *   Execute as: Me
 *   Who has access: Anyone
 */

const CONFIG = {
  VERSION: "2.0",
  RESPONSE_SHEET: "Responses",
  PRODUCTS_SHEET: "Products",
  MULTI_SHEET: "MultiSelect",
  META_SHEET: "Metadata"
};

const RESPONSE_HEADERS = [
  "Response ID",
  "Timestamp",
  "Age",
  "Occupation",
  "Area",
  "Gender",
  "Shops For",
  "Purchase Frequency",
  "Usual Stores",
  "Typical Trip Spend",
  "Last Purchase Product",
  "Last Purchase Channel",
  "Last Purchase Spend",
  "Last Purchase Purpose",
  "Frustrations",
  "Frustration Details",
  "First Visit Reasons",
  "Top First Visit Reason",
  "Concept Appeal",
  "Choose New Store Factors",
  "Travel Distance",
  "Return Factors",
  "Location Preference",
  "Return/Trust Factors",
  "Final Comment",
  "WhatsApp",
  "Instagram",
  "Raw JSON"
];

const PRODUCT_HEADERS = [
  "Response ID",
  "Timestamp",
  "Product ID",
  "Product",
  "Category",
  "Fit / Format",
  "Look",
  "Preferred Size",
  "Price Preference"
];

const MULTI_HEADERS = [
  "Response ID",
  "Timestamp",
  "Question",
  "Value"
];

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      ok: true,
      service: "mangalore-fashion-survey",
      version: CONFIG.VERSION
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const payload = parsePayload_(e);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    const responseSheet = getOrCreateSheet_(ss, CONFIG.RESPONSE_SHEET, RESPONSE_HEADERS);
    const productsSheet = getOrCreateSheet_(ss, CONFIG.PRODUCTS_SHEET, PRODUCT_HEADERS);
    const multiSheet = getOrCreateSheet_(ss, CONFIG.MULTI_SHEET, MULTI_HEADERS);
    getOrCreateSheet_(ss, CONFIG.META_SHEET, ["Key", "Value"]);

    const timestamp = new Date();
    const responseId = makeResponseId_(timestamp);

    const answers = payload.answers || {};
    const row = [
      responseId,
      timestamp,
      value_(answers.age),
      value_(answers.occupation),
      value_(answers.area),
      value_(answers.gender),
      join_(answers.shopsFor),
      value_(answers.purchaseFrequency),
      join_(answers.usualStores),
      value_(answers.typicalTripSpend),
      value_(answers.lastPurchaseProduct),
      value_(answers.lastPurchaseChannel),
      value_(answers.lastPurchaseSpend),
      value_(answers.lastPurchasePurpose),
      join_(answers.frustrations),
      value_(answers.frustrationDetails),
      join_(answers.firstVisitTriggers),
      value_(answers.topVisitTrigger),
      value_(answers.conceptAppeal),
      join_(answers.chooseNewStoreFactors),
      value_(answers.travelDistance),
      join_(answers.returnFactors),
      value_(answers.locationPreference),
      join_(answers.returnTrustFactors),
      value_(answers.finalComment),
      value_(answers.whatsapp),
      value_(answers.instagram),
      JSON.stringify(payload)
    ];

    appendRow_(responseSheet, row);

    // Normalize selected products.
    const products = Array.isArray(payload.selectedProducts)
      ? payload.selectedProducts
      : normalizeProductsFromState_(payload);

    if (products.length) {
      const productRows = products.map(p => [
        responseId,
        timestamp,
        value_(p.id),
        value_(p.label || p.product),
        value_(p.category),
        value_(p.preferences && (p.preferences.styles || p.preferences.fit)),
        value_(p.preferences && p.preferences.looks),
        value_(p.preferences && (p.preferences.size || p.preferences.preferredSize)),
        value_(p.price)
      ]);
      appendRows_(productsSheet, productRows);
    }

    // Normalize multi-select fields.
    const multiFields = {
      shopsFor: "Who they shop for",
      usualStores: "Usual stores",
      frustrations: "Frustrations",
      firstVisitTriggers: "First visit reasons",
      chooseNewStoreFactors: "Reasons to choose new store",
      returnFactors: "Reasons to return",
      returnTrustFactors: "Return/trust factors"
    };

    const multiRows = [];
    Object.keys(multiFields).forEach(key => {
      const values = asArray_(answers[key]);
      values.forEach(v => {
        if (String(v).trim()) {
          multiRows.push([responseId, timestamp, multiFields[key], String(v)]);
        }
      });
    });

    if (multiRows.length) {
      appendRows_(multiSheet, multiRows);
    }

    updateMetadata_(ss);

    return json_({
      ok: true,
      responseId: responseId,
      message: "Response saved"
    });

  } catch (err) {
    console.error(err && err.stack ? err.stack : err);
    return json_({
      ok: false,
      error: String(err && err.message ? err.message : err)
    });
  } finally {
    lock.releaseLock();
  }
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("Missing POST body");
  }

  const raw = e.postData.contents;
  let data;

  try {
    data = JSON.parse(raw);
  } catch (err) {
    throw new Error("Invalid JSON payload");
  }

  if (!data || typeof data !== "object") {
    throw new Error("Invalid payload");
  }

  return data;
}

function getOrCreateSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);

  if (!sheet) {
    sheet = ss.insertSheet(name);
  }

  ensureHeaders_(sheet, headers);
  return sheet;
}

function ensureHeaders_(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    return;
  }

  const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  let changed = false;

  headers.forEach((header, i) => {
    if (current[i] !== header) {
      current[i] = header;
      changed = true;
    }
  });

  if (changed) {
    sheet.getRange(1, 1, 1, headers.length).setValues([current]);
  }

  sheet.setFrozenRows(1);
}

function appendRow_(sheet, row) {
  sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length).setValues([row]);
}

function appendRows_(sheet, rows) {
  if (!rows.length) return;
  sheet.getRange(
    sheet.getLastRow() + 1,
    1,
    rows.length,
    rows[0].length
  ).setValues(rows);
}

function makeResponseId_(date) {
  const tz = Session.getScriptTimeZone() || "Asia/Kolkata";
  const stamp = Utilities.formatDate(date, tz, "yyyyMMdd");
  const random = Utilities.getUuid().replace(/-/g, "").substring(0, 6).toUpperCase();
  return "MGF-" + stamp + "-" + random;
}

function normalizeProductsFromState_(payload) {
  const ids = Array.isArray(payload.products) ? payload.products : [];
  const styles = payload.styles || {};
  const prices = payload.prices || {};

  return ids.map(id => ({
    id: id,
    label: id,
    preferences: styles[id] || {},
    price: prices[id] || ""
  }));
}

function asArray_(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
}

function join_(value) {
  return asArray_(value).join(" | ");
}

function value_(value) {
  if (value === undefined || value === null) return "";
  if (Array.isArray(value)) return value.join(" | ");
  if (typeof value === "object") return JSON.stringify(value);
  return value;
}

function updateMetadata_(ss) {
  const sheet = ss.getSheetByName(CONFIG.META_SHEET);
  if (!sheet) return;

  const rows = [
    ["Backend Version", CONFIG.VERSION],
    ["Last Response Received", new Date()],
    ["Timezone", Session.getScriptTimeZone() || "Asia/Kolkata"]
  ];

  sheet.clearContents();
  sheet.getRange(1, 1, rows.length, 2).setValues(rows);
  sheet.setFrozenRows(0);
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
