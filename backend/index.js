/**
 * BetterLife Backend API - MySQL + Traduction Automatique
 * ======================================================
 */

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const nodemailer = require("nodemailer");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { randomBytes } = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { seedTestimonials } = require("./seedTestimonials");
const {
  getHeroSlidesCreateTableSql,
  seedHeroSlidesIfEmpty,
} = require("./heroSlidesSeed");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://betterlife-ong.org",
  "https://www.betterlife-ong.org",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS policy not allowed"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
const uploadDir =
  process.env.UPLOAD_DIR ||
  path.join(__dirname, "..", "frontend", "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));

// Configuration multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Seules les images sont autorisées"), false);
  },
});

// Upload documents (CV / Lettre)
const docUpload = multer({
  storage: storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = new Set([
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]);
    if (allowed.has(file.mimetype)) return cb(null, true);
    return cb(new Error("Formats autorisés: PDF, DOC, DOCX"), false);
  },
});

const membershipUpload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = new Set([
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ]);
    if (allowed.has(file.mimetype)) return cb(null, true);
    return cb(new Error("Formats autorises: PDF, JPEG, PNG"), false);
  },
});

// Database configuration
const DB_CONFIG = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "betterlife_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "+00:00",
};

let mailTransporter = null;
let mailTransportSignature = null;

function parseBooleanEnv(value, fallback = false) {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  return ["1", "true", "yes", "on"].includes(
    String(value).trim().toLowerCase(),
  );
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMailbox(name, address) {
  if (!address) return "";
  if (/<[^>]+>/.test(address)) return address;
  return name ? `"${String(name).replace(/"/g, '\\"')}" <${address}>` : address;
}

function getMailRuntimeConfig(settings = {}) {
  const service = String(process.env.MAIL_SERVICE || "").trim();
  const host = String(
    process.env.SMTP_HOST || process.env.MAIL_HOST || "",
  ).trim();
  const user = String(
    process.env.SMTP_USER || process.env.MAIL_USER || "",
  ).trim();
  const pass = String(
    process.env.SMTP_PASS ||
      process.env.MAIL_PASSWORD ||
      process.env.MAIL_PASS ||
      "",
  ).trim();
  const fromAddress = String(
    process.env.SMTP_FROM ||
      process.env.MAIL_FROM ||
      user ||
      settings.company_email ||
      "",
  ).trim();
  const replyToAddress = String(
    process.env.SMTP_REPLY_TO ||
      process.env.MAIL_REPLY_TO ||
      process.env.GMAIL_REPLY_TO ||
      settings.company_email ||
      fromAddress,
  ).trim();
  const port =
    Number(
      process.env.SMTP_PORT ||
        process.env.MAIL_PORT ||
        (service.toLowerCase() === "gmail" ? 465 : 587),
    ) || 0;
  const secure = parseBooleanEnv(
    process.env.SMTP_SECURE || process.env.MAIL_SECURE,
    port === 465,
  );
  const fromName = String(
    process.env.MAIL_FROM_NAME || settings.site_name || "Better Life",
  ).trim();
  const replyToName = String(process.env.MAIL_REPLY_TO_NAME || fromName).trim();

  const transportOptions = service
    ? {
        service,
        auth: { user, pass },
      }
    : {
        host,
        port,
        secure,
        auth: { user, pass },
        tls: { rejectUnauthorized: false },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
      };

  const isConfigured =
    !!user && !!pass && (!!service || !!host) && !!fromAddress;

  return {
    isConfigured,
    fromAddress,
    fromName,
    replyToAddress,
    replyToName,
    transportOptions,
  };
}

function createMailTransportConfig(host, port, secure, user, pass) {
  return {
    host,
    port,
    secure,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  };
}

async function sendMailRobust(mailOptions, settings = {}) {
  const runtimeConfig = getMailRuntimeConfig(settings);

  if (!runtimeConfig.isConfigured) {
    const error = new Error(
      "Le service email n'est pas configure. Ajoute SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS et SMTP_FROM dans backend/.env.",
    );
    error.statusCode = 503;
    throw error;
  }

  if (runtimeConfig.transportOptions.service) {
    const transporter = nodemailer.createTransport(
      runtimeConfig.transportOptions,
    );
    await transporter.verify();
    return transporter.sendMail(mailOptions);
  }

  const user = runtimeConfig.transportOptions.auth.user;
  const pass = runtimeConfig.transportOptions.auth.pass;
  const configs = [
    runtimeConfig.transportOptions,
    createMailTransportConfig("127.0.0.1", 25, false, user, pass),
    createMailTransportConfig("localhost", 587, false, user, pass),
    createMailTransportConfig("mail.betterlife-ong.org", 465, true, user, pass),
    createMailTransportConfig(
      "mail.betterlife-ong.org",
      587,
      false,
      user,
      pass,
    ),
  ];

  let lastError;
  for (let i = 0; i < configs.length; i += 1) {
    try {
      const transporter = nodemailer.createTransport(configs[i]);
      await transporter.verify();
      const info = await transporter.sendMail(mailOptions);
      console.log(
        `[SMTP] Mail envoye avec succes via config #${i + 1} (${configs[i].host}:${configs[i].port})`,
      );
      return info;
    } catch (err) {
      lastError = err;
      console.warn(
        `[SMTP] Config #${i + 1} echouee (${configs[i].host}:${configs[i].port}): ${err.message}`,
      );
    }
  }

  throw lastError;
}

function getMailTransporter(settings = {}) {
  const config = getMailRuntimeConfig(settings);

  if (!config.isConfigured) {
    return null;
  }

  const signature = JSON.stringify(config.transportOptions);
  if (!mailTransporter || mailTransportSignature !== signature) {
    mailTransporter = nodemailer.createTransport(config.transportOptions);
    mailTransportSignature = signature;
  }

  return {
    transporter: mailTransporter,
    config,
  };
}

// Helper to parse JSON fields safely
function parseExpertise(field) {
  if (!field) return [];
  if (typeof field === "string") {
    try {
      return JSON.parse(field);
    } catch (e) {
      console.warn("[WARN] Failed to parse expertise string:", field);
      return [];
    }
  }
  return Array.isArray(field) ? field : [];
}

let db;
let lastDbError = null;

process.on("uncaughtException", (err) => {
  console.error("[CRITICAL] Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error(
    "[CRITICAL] Unhandled Rejection at:",
    promise,
    "reason:",
    reason,
  );
});

async function ensureColumn(tableName, columnName, definition) {
  try {
    const [rows] = await db.execute(
      `SELECT COUNT(*) AS count FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
      [DB_CONFIG.database, tableName, columnName],
    );
    if (!rows[0]?.count) {
      await db.execute(
        `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`,
      );
    }
  } catch (e) {
    console.warn(
      `[WARN] Could not ensure column ${columnName} in ${tableName}:`,
      e.message,
    );
  }
}

async function ensureIndex(tableName, indexName, definition) {
  try {
    const [rows] = await db.execute(
      `SELECT COUNT(*) AS count FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND INDEX_NAME = ?`,
      [DB_CONFIG.database, tableName, indexName],
    );
    if (!rows[0]?.count) {
      await db.execute(`CREATE ${definition}`);
    }
  } catch (e) {
    console.warn(
      `[WARN] Could not ensure index ${indexName} on ${tableName}:`,
      e.message,
    );
  }
}

function generateMessageUid() {
  return `msg_${randomBytes(12).toString("hex")}`;
}

async function getSettingsRecord() {
  const [rows] = await db.execute("SELECT * FROM settings LIMIT 1");
  return rows[0] || {};
}

function normalizeNullableValue(value) {
  return value ?? null;
}

function normalizeContactMessageDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value;

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed;
}

function buildContactMessageIdentity(row = {}) {
  return {
    id: normalizeNullableValue(row.id),
    name: normalizeNullableValue(row.name),
    email: normalizeNullableValue(row.email),
    phone: normalizeNullableValue(row.phone),
    subject: normalizeNullableValue(row.subject),
    message: normalizeNullableValue(row.message),
    created_at: normalizeContactMessageDate(row.created_at),
    message_uid:
      typeof row.message_uid === "string" ? row.message_uid.trim() : null,
  };
}

function buildLegacyContactMessageReference(row = {}) {
  const payload = Buffer.from(
    JSON.stringify({
      id: normalizeNullableValue(row.id),
      name: normalizeNullableValue(row.name),
      email: normalizeNullableValue(row.email),
      phone: normalizeNullableValue(row.phone),
      subject: normalizeNullableValue(row.subject),
      message: normalizeNullableValue(row.message),
      created_at:
        row.created_at instanceof Date
          ? row.created_at.toISOString()
          : normalizeNullableValue(row.created_at),
    }),
    "utf8",
  ).toString("base64url");

  return `legacy:${payload}`;
}

function parseLegacyContactMessageReference(reference = "") {
  if (!String(reference).startsWith("legacy:")) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(String(reference).slice(7), "base64url").toString("utf8"),
    );
    return buildContactMessageIdentity(payload);
  } catch (e) {
    return null;
  }
}

function buildContactMessageLookup(row = {}) {
  const identity = buildContactMessageIdentity(row);

  if (identity.message_uid) {
    return {
      clause: "message_uid = ?",
      params: [identity.message_uid],
    };
  }

  return {
    clause:
      "id <=> ? AND name <=> ? AND email <=> ? AND phone <=> ? AND subject <=> ? AND message <=> ? AND created_at <=> ?",
    params: [
      identity.id,
      identity.name,
      identity.email,
      identity.phone,
      identity.subject,
      identity.message,
      identity.created_at,
    ],
  };
}

function getContactMessageReference(row = {}) {
  const identity = buildContactMessageIdentity(row);
  return identity.message_uid || buildLegacyContactMessageReference(identity);
}

function serializeContactMessage(row) {
  if (!row) return null;
  return {
    ...row,
    message_uid: buildContactMessageIdentity(row).message_uid,
    message_ref: getContactMessageReference(row),
  };
}

function buildReplySubject(subject, siteName) {
  const baseSubject = String(subject || `Votre message a ${siteName}`).trim();
  return /^re\s*:/i.test(baseSubject) ? baseSubject : `Re: ${baseSubject}`;
}

function buildReplyEmailText(
  contactMessage,
  replyMessage,
  siteName,
  replyToAddress,
) {
  const lines = [
    `Bonjour ${contactMessage.name || ""},`.trim(),
    "",
    `Merci d'avoir contacte ${siteName}.`,
    "",
    "Voici notre reponse :",
    replyMessage,
    "",
    `Vous pouvez repondre directement a cet email${replyToAddress ? `, votre message sera recu a ${replyToAddress}` : ""}.`,
  ];

  if (contactMessage.message) {
    lines.push("", "Message initial :", contactMessage.message);
  }

  return lines.join("\n");
}

function buildReplyEmailHtml(
  contactMessage,
  replyMessage,
  siteName,
  replyToAddress,
) {
  return `
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#0f172a;">
            <p>Bonjour ${escapeHtml(contactMessage.name || "")},</p>
            <p>Merci d'avoir contacte ${escapeHtml(siteName)}.</p>
            <p>Voici notre reponse :</p>
            <div style="white-space:pre-wrap;border-left:4px solid #0f70b7;padding:12px 16px;background:#f8fafc;border-radius:8px;">${escapeHtml(replyMessage)}</div>
            <p style="margin-top:16px;">Vous pouvez repondre directement a cet email${replyToAddress ? `, votre message sera recu a <strong>${escapeHtml(replyToAddress)}</strong>` : ""}.</p>
            ${
              contactMessage.message
                ? `
                <hr style="margin:24px 0;border:none;border-top:1px solid #e2e8f0;" />
                <p style="font-size:13px;color:#475569;margin-bottom:8px;">Message initial</p>
                <div style="white-space:pre-wrap;color:#334155;">${escapeHtml(contactMessage.message)}</div>
            `
                : ""
            }
        </div>
    `.trim();
}

async function sendContactReplyEmail(contactMessage, replyMessage) {
  const settings = await getSettingsRecord();
  const mailRuntime = getMailTransporter(settings);

  if (!mailRuntime) {
    const error = new Error(
      "Le service email n'est pas configure. Ajoute MAIL_HOST ou MAIL_SERVICE, MAIL_USER, MAIL_PASSWORD et MAIL_REPLY_TO dans backend/.env.",
    );
    error.statusCode = 503;
    throw error;
  }

  if (!contactMessage?.email) {
    const error = new Error(
      "Le message selectionne n'a pas d'adresse email valide.",
    );
    error.statusCode = 400;
    throw error;
  }

  const siteName = settings.site_name || "Better Life";
  const subject = buildReplySubject(contactMessage.subject, siteName);
  const mailOptions = {
    from: formatMailbox(
      mailRuntime.config.fromName,
      mailRuntime.config.fromAddress,
    ),
    to: contactMessage.email,
    replyTo: formatMailbox(
      mailRuntime.config.replyToName,
      mailRuntime.config.replyToAddress,
    ),
    subject,
    text: buildReplyEmailText(
      contactMessage,
      replyMessage,
      siteName,
      mailRuntime.config.replyToAddress,
    ),
    html: buildReplyEmailHtml(
      contactMessage,
      replyMessage,
      siteName,
      mailRuntime.config.replyToAddress,
    ),
  };

  const info = await sendMailRobust(mailOptions, settings);
  return {
    messageId: info.messageId || null,
    from: mailRuntime.config.fromAddress,
    replyTo: mailRuntime.config.replyToAddress,
    accepted: Array.isArray(info.accepted) ? info.accepted : [],
    rejected: Array.isArray(info.rejected) ? info.rejected : [],
    pending: Array.isArray(info.pending) ? info.pending : [],
    response: info.response || null,
    envelope: info.envelope || null,
  };
}

function parseFormArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return String(value)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

function formatChoice(value, dictionary = {}) {
  if (Array.isArray(value)) {
    return value.map((item) => dictionary[item] || item).join(", ");
  }
  return dictionary[value] || value || "";
}

function wrapPdfText(text, font, size, maxWidth) {
  const words = String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

function drawPdfTextBlock(page, text, x, y, options) {
  const {
    font,
    size = 10,
    color = rgb(0.15, 0.2, 0.28),
    maxWidth = 460,
    lineHeight = 14,
  } = options;
  const paragraphs = String(text || "").split(/\r?\n/);
  let cursorY = y;

  for (const paragraph of paragraphs) {
    const lines = wrapPdfText(paragraph, font, size, maxWidth);
    for (const line of lines) {
      page.drawText(line, { x, y: cursorY, size, font, color });
      cursorY -= lineHeight;
    }
    cursorY -= 3;
  }

  return cursorY;
}

function addMembershipPdfPage(pdfDoc, fonts, pageNumber) {
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  page.drawRectangle({
    x: 0,
    y: height - 92,
    width,
    height: 92,
    color: rgb(0.05, 0.44, 0.72),
  });
  page.drawText("BETTER LIFE ONG", {
    x: 42,
    y: height - 42,
    size: 18,
    font: fonts.bold,
    color: rgb(1, 1, 1),
  });
  page.drawText("Formulaire d'adhesion pre-rempli", {
    x: 42,
    y: height - 66,
    size: 12,
    font: fonts.regular,
    color: rgb(0.9, 0.96, 1),
  });
  page.drawText(`Page ${pageNumber}`, {
    x: width - 82,
    y: 28,
    size: 9,
    font: fonts.regular,
    color: rgb(0.45, 0.5, 0.58),
  });
  return page;
}

function normalizeMembershipPayload(body = {}) {
  return {
    ...body,
    sectors: parseFormArray(body.sectors),
    contributions: parseFormArray(body.contributions),
    payment_mode: parseFormArray(body.payment_mode),
  };
}

async function buildMembershipPdfBuffer(rawPayload) {
  const payload = normalizeMembershipPayload(rawPayload);
  const pdfDoc = await PDFDocument.create();
  const fonts = {
    regular: await pdfDoc.embedFont(StandardFonts.Helvetica),
    bold: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
  };

  const dictionaries = {
    membershipType: {
      lowIncome: "Adhesion faible revenu",
      basic: "Adhesion de base",
      accompanying: "Membre accompagnateur",
      supporting: "Membre soutien",
      social: "Membre social",
      voluntary: "Membre volontaire",
    },
    civility: { mr: "Monsieur", mrs: "Madame", couple: "Couple" },
    status: { physique: "Personne physique", morale: "Personne morale" },
    yesNo: { yes: "Oui", no: "Non" },
    payment: {
      bank: "Banque",
      card: "Carte",
      cash: "Cash",
      check: "Cheque",
      other: "Autre",
    },
    contributions: {
      financial: "Financier",
      technical: "Technique",
      active_agri: "Activite agricole",
      other: "Autre",
    },
    sectors: {
      food_security: "Securite alimentaire",
      health_insurance: "Mutuelle de sante",
      large_scale_agri: "Agriculture a grande echelle",
      machinery: "Mecanisation agricole",
      carbon_credits: "Credits carbone",
      medicinal_plants: "Plantes medicinales",
      fundraising: "Collecte de fonds",
      env_protection: "Protection de l'environnement",
      training_health_agri: "Formation sante et agriculture",
    },
    relationship: {
      conjoint: "Conjoint(e)",
      parent: "Parent",
      enfant: "Enfant",
      frere_soeur: "Frere/Soeur",
      ami: "Ami(e)",
      collegue: "Collegue",
      autre: "Autre",
    },
  };

  const rows = [
    [
      "Type adhesion",
      formatChoice(payload.membershipType, dictionaries.membershipType),
    ],
    ["Civilite", formatChoice(payload.civility, dictionaries.civility)],
    ["Nom / denomination", payload.lastname],
    ["Statut", formatChoice(payload.status, dictionaries.status)],
    ["Raison sociale", payload.raison_sociale],
    ["Numero identification", payload.id_number],
    ["Profession", payload.profession],
    ["Nationalite", payload.nationality],
    ["Adresse", payload.address],
    ["Quartier", payload.quartier],
    ["Code postal", payload.code_postal],
    ["Ville", payload.city],
    ["Province", payload.province],
    ["Village", payload.village],
    ["Hectares", payload.hectare],
    ["Pays", payload.country],
    ["Telephone", payload.phone],
    ["Email", payload.email],
    ["Benevolat", formatChoice(payload.benevolat, dictionaries.yesNo)],
    [
      "Modes de paiement",
      formatChoice(payload.payment_mode, dictionaries.payment),
    ],
    ["Autre paiement", payload.other_payment_details],
    ["Secteurs", formatChoice(payload.sectors, dictionaries.sectors)],
    [
      "Experience agricole",
      formatChoice(payload.experience, dictionaries.yesNo),
    ],
    ["Details experience", payload.experience_details],
    ["Motivation d'adhesion", payload.why_join],
    [
      "Apports proposes",
      formatChoice(payload.contributions, dictionaries.contributions),
    ],
    ["Autre apport", payload.other_contribution_details],
    ["Reference - nom", payload.reference_lastname],
    ["Reference - prenom", payload.reference_firstname],
    ["Reference - telephone", payload.reference_phone],
    ["Reference - email", payload.reference_email],
    [
      "Reference - lien",
      formatChoice(payload.reference_relationship, dictionaries.relationship),
    ],
    ["Reference - adresse", payload.reference_address],
    ["Date", payload.date],
    [
      "Conditions acceptees",
      payload.agreement === "true" || payload.agreement === true
        ? "Oui"
        : "Non",
    ],
  ].filter(
    ([, value]) =>
      value !== undefined && value !== null && String(value).trim() !== "",
  );

  let pageNumber = 1;
  let page = addMembershipPdfPage(pdfDoc, fonts, pageNumber);
  let y = 710;
  const labelX = 42;
  const valueX = 196;
  const maxValueWidth = 344;

  page.drawText("Informations du souscripteur", {
    x: labelX,
    y,
    size: 14,
    font: fonts.bold,
    color: rgb(0.05, 0.44, 0.72),
  });
  y -= 28;

  for (const [label, value] of rows) {
    if (y < 78) {
      pageNumber += 1;
      page = addMembershipPdfPage(pdfDoc, fonts, pageNumber);
      y = 710;
    }

    const valueLines = wrapPdfText(value, fonts.regular, 10, maxValueWidth);
    page.drawText(`${label} :`, {
      x: labelX,
      y,
      size: 9,
      font: fonts.bold,
      color: rgb(0.1, 0.15, 0.22),
    });
    for (const line of valueLines) {
      page.drawText(line, {
        x: valueX,
        y,
        size: 10,
        font: fonts.regular,
        color: rgb(0.12, 0.18, 0.26),
      });
      y -= 14;
    }
    y -= 8;
  }

  if (y < 170) {
    pageNumber += 1;
    page = addMembershipPdfPage(pdfDoc, fonts, pageNumber);
    y = 710;
  }

  y -= 8;
  page.drawText("Signature du souscripteur", {
    x: labelX,
    y,
    size: 12,
    font: fonts.bold,
    color: rgb(0.05, 0.44, 0.72),
  });
  y -= 94;
  page.drawRectangle({
    x: labelX,
    y,
    width: 240,
    height: 76,
    borderColor: rgb(0.75, 0.8, 0.86),
    borderWidth: 1,
    color: rgb(0.98, 0.99, 1),
  });

  if (
    payload.signature &&
    String(payload.signature).startsWith("data:image/png;base64,")
  ) {
    try {
      const signatureBytes = Buffer.from(
        String(payload.signature).split(",")[1],
        "base64",
      );
      const signatureImage = await pdfDoc.embedPng(signatureBytes);
      const scaled = signatureImage.scaleToFit(220, 58);
      page.drawImage(signatureImage, {
        x: labelX + 10,
        y: y + 9,
        width: scaled.width,
        height: scaled.height,
      });
    } catch (e) {
      page.drawText("Signature jointe non lisible", {
        x: labelX + 12,
        y: y + 32,
        size: 10,
        font: fonts.regular,
        color: rgb(0.6, 0.12, 0.12),
      });
    }
  }

  const createdAt = new Date().toLocaleString("fr-FR", {
    timeZone: "Africa/Lagos",
  });
  drawPdfTextBlock(
    page,
    `Document genere automatiquement le ${createdAt}. Les pieces d'identite fournies par le souscripteur sont jointes a l'email.`,
    labelX,
    y - 22,
    {
      font: fonts.regular,
      size: 9,
      maxWidth: 500,
      color: rgb(0.45, 0.5, 0.58),
      lineHeight: 12,
    },
  );

  return Buffer.from(await pdfDoc.save());
}

function buildMembershipEmailHtml(payload, confirmationUrl) {
  return `
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#0f172a;">
            <p>Bonjour ${escapeHtml(payload.lastname || "")},</p>
            <p>Nous avons bien recu votre demande d'adhesion a Better Life ONG.</p>
            <p>Pour valider votre demande, cliquez sur le bouton ci-dessous.</p>
            <p style="margin:24px 0;">
                <a href="${escapeHtml(confirmationUrl || "")}" style="display:inline-block;background:#63b32e;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 18px;border-radius:10px;">
                    Confirmer ma demande d'adhesion
                </a>
            </p>
            <p>Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :</p>
            <p style="word-break:break-all;color:#0f70b7;">${escapeHtml(confirmationUrl || "")}</p>
            <p>Vous trouverez aussi en piece jointe votre formulaire d'adhesion pre-rempli au format PDF.</p>
            <p style="margin-top:24px;">Cordialement,<br />Better Life ONG</p>
        </div>
    `.trim();
}

function normalizeEmailRecipients(value) {
  return String(value || "")
    .split(/[;,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildMembershipAdminEmailText(payload) {
  return [
    "Nouvelle demande d'adhesion Better Life ONG",
    "",
    `Nom / denomination: ${payload.lastname || "-"}`,
    `Email: ${payload.email || "-"}`,
    `Telephone: ${payload.phone || "-"}`,
    `Ville: ${payload.city || "-"}`,
    `Province: ${payload.province || "-"}`,
    `Type adhesion: ${payload.membershipType || "-"}`,
    "",
    "Motivation:",
    payload.why_join || "-",
    "",
    "Le formulaire PDF pre-rempli et les pieces d'identite sont joints a cet email.",
  ].join("\n");
}

function buildMembershipAdminEmailHtml(payload) {
  return `
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#0f172a;">
            <h2 style="margin:0 0 16px;color:#0f70b7;">Nouvelle demande d'adhesion</h2>
            <p>Une nouvelle demande d'adhesion a ete envoyee depuis le site Better Life ONG.</p>
            <table style="border-collapse:collapse;width:100%;max-width:680px;">
                <tbody>
                    <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold;">Nom / denomination</td><td style="padding:8px;border:1px solid #e2e8f0;">${escapeHtml(payload.lastname || "-")}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #e2e8f0;">${escapeHtml(payload.email || "-")}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold;">Telephone</td><td style="padding:8px;border:1px solid #e2e8f0;">${escapeHtml(payload.phone || "-")}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold;">Ville</td><td style="padding:8px;border:1px solid #e2e8f0;">${escapeHtml(payload.city || "-")}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold;">Province</td><td style="padding:8px;border:1px solid #e2e8f0;">${escapeHtml(payload.province || "-")}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold;">Type adhesion</td><td style="padding:8px;border:1px solid #e2e8f0;">${escapeHtml(payload.membershipType || "-")}</td></tr>
                </tbody>
            </table>
            <p style="margin:18px 0 8px;font-weight:bold;">Motivation</p>
            <div style="white-space:pre-wrap;border-left:4px solid #63b32e;padding:12px 16px;background:#f8fafc;border-radius:8px;">${escapeHtml(payload.why_join || "-")}</div>
            <p>Le formulaire PDF pre-rempli et les pieces d'identite sont joints a cet email.</p>
        </div>
    `.trim();
}

async function sendMembershipConfirmationEmail(
  payload,
  files = {},
  confirmationUrl = "",
) {
  const settings = await getSettingsRecord();
  const mailRuntime = getMailTransporter(settings);

  if (!mailRuntime) {
    const error = new Error(
      "Le service email n'est pas configure. Ajoute SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS et SMTP_FROM dans backend/.env.",
    );
    error.statusCode = 503;
    throw error;
  }

  if (!payload?.email) {
    const error = new Error("L'adresse email du souscripteur est obligatoire.");
    error.statusCode = 400;
    throw error;
  }

  const pdfBuffer = await buildMembershipPdfBuffer(payload);
  const attachments = [
    {
      filename: `adhesion-better-life-${Date.now()}.pdf`,
      content: pdfBuffer,
      contentType: "application/pdf",
    },
  ];

  for (const [fieldName, label] of [
    ["subscriber_id_file", "piece-identite-souscripteur"],
    ["reference_id_file", "piece-identite-reference"],
  ]) {
    const file = files?.[fieldName]?.[0];
    if (file) {
      attachments.push({
        filename: `${label}${path.extname(file.originalname || file.filename)}`,
        path: file.path,
        contentType: file.mimetype,
      });
    }
  }

  const from = formatMailbox(
    mailRuntime.config.fromName,
    mailRuntime.config.fromAddress,
  );
  const replyTo = formatMailbox(
    mailRuntime.config.replyToName,
    mailRuntime.config.replyToAddress,
  );
  const applicantMailOptions = {
    from,
    to: payload.email,
    replyTo,
    subject: "Confirmez votre demande d'adhesion Better Life ONG",
    text: `Bonjour ${payload.lastname || ""},\n\nNous avons bien recu votre demande d'adhesion a Better Life ONG.\nPour valider votre demande, ouvrez ce lien :\n${confirmationUrl}\n\nVous trouverez aussi en piece jointe votre formulaire d'adhesion pre-rempli au format PDF.\n\nCordialement,\nBetter Life ONG`,
    html: buildMembershipEmailHtml(payload, confirmationUrl),
    attachments,
  };

  const adminRecipients = normalizeEmailRecipients(
    process.env.MEMBERSHIP_NOTIFICATION_EMAIL ||
      process.env.MAIL_REPLY_TO ||
      process.env.SMTP_REPLY_TO ||
      settings.company_email ||
      mailRuntime.config.replyToAddress ||
      mailRuntime.config.fromAddress,
  );

  const applicantInfo = await sendMailRobust(applicantMailOptions, settings);
  let adminInfo = null;

  if (adminRecipients.length) {
    const adminMailOptions = {
      from,
      to: adminRecipients,
      replyTo: payload.email,
      subject: `Nouvelle demande d'adhesion - ${payload.lastname || payload.email || "Better Life ONG"}`,
      text: buildMembershipAdminEmailText(payload),
      html: buildMembershipAdminEmailHtml(payload),
      attachments,
    };
    adminInfo = await sendMailRobust(adminMailOptions, settings);
  }

  return {
    applicant: {
      messageId: applicantInfo.messageId || null,
      accepted: Array.isArray(applicantInfo.accepted)
        ? applicantInfo.accepted
        : [],
      rejected: Array.isArray(applicantInfo.rejected)
        ? applicantInfo.rejected
        : [],
      response: applicantInfo.response || null,
    },
    admin: adminInfo
      ? {
          messageId: adminInfo.messageId || null,
          accepted: Array.isArray(adminInfo.accepted) ? adminInfo.accepted : [],
          rejected: Array.isArray(adminInfo.rejected) ? adminInfo.rejected : [],
          response: adminInfo.response || null,
        }
      : null,
  };
}

function fileToPublicUploadPath(file) {
  if (!file?.filename) return null;
  return `/uploads/${file.filename}`;
}

function serializeMembershipApplication(row = {}) {
  let payload = {};
  try {
    payload = row.payload ? JSON.parse(row.payload) : {};
  } catch (e) {
    payload = {};
  }

  let emailDeliveryDetails = null;
  try {
    emailDeliveryDetails = row.email_delivery_details
      ? JSON.parse(row.email_delivery_details)
      : null;
  } catch (e) {
    emailDeliveryDetails = row.email_delivery_details || null;
  }

  return {
    ...row,
    payload,
    email_delivery_details: emailDeliveryDetails,
    amount_paid:
      row.amount_paid === null || row.amount_paid === undefined
        ? null
        : Number(row.amount_paid),
  };
}

function buildPartnerFromMembershipPayload(payload = {}) {
  const isOrganization = payload.status === "morale";
  const displayName = isOrganization
    ? payload.raison_sociale || payload.lastname
    : payload.lastname;
  const region =
    String(payload.province || "autres")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "autres";

  return {
    name: displayName,
    contact: payload.phone || null,
    region,
    type: isOrganization ? "Organisation" : "Particulier",
    title: payload.membershipType || null,
    company: isOrganization ? payload.raison_sociale || null : null,
    category: "Adhesion validee",
    description_fr: [
      payload.city || payload.province
        ? `Membre base a ${[payload.city, payload.province].filter(Boolean).join(", ")}.`
        : "",
      payload.why_join ? `Motivation: ${payload.why_join}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    description_en: null,
    is_active: true,
  };
}

async function ensureContactMessageUids() {
  try {
    const [rows] = await db.execute(
      "SELECT id, name, email, phone, subject, message, created_at, message_uid FROM contact_messages ORDER BY created_at ASC, email ASC, name ASC",
    );
    const seenUids = new Set();

    for (const row of rows) {
      const currentUid =
        typeof row.message_uid === "string" ? row.message_uid.trim() : "";
      const isDuplicateUid = !!currentUid && seenUids.has(currentUid);

      if (currentUid && !isDuplicateUid) {
        seenUids.add(currentUid);
        continue;
      }

      let nextUid = generateMessageUid();
      while (seenUids.has(nextUid)) {
        nextUid = generateMessageUid();
      }

      const lookup = buildContactMessageLookup(row);

      if (currentUid) {
        await db.execute(
          `UPDATE contact_messages SET message_uid = ? WHERE ${lookup.clause} AND message_uid = ? LIMIT 1`,
          [nextUid, ...lookup.params, currentUid],
        );
      } else {
        await db.execute(
          `UPDATE contact_messages SET message_uid = ? WHERE ${lookup.clause} AND (message_uid IS NULL OR message_uid = '') LIMIT 1`,
          [nextUid, ...lookup.params],
        );
      }

      seenUids.add(nextUid);
    }
  } catch (e) {
    console.warn("[WARN] Could not ensure contact message uids:", e.message);
  }
}

async function initializeDatabase() {
  try {
    console.log("[DB] Connecting to MySQL...");
    db = mysql.createPool(DB_CONFIG);
    db.on("error", (err) => {
      console.error("[DB] Pool unexpected error:", err);
    });

    // Test connection
    const conn = await db.getConnection();
    console.log("[DB] Successfully connected to Pool");
    conn.release();

    // Create Tables
    await db.execute(`
            CREATE TABLE IF NOT EXISTS settings (
                id INT PRIMARY KEY AUTO_INCREMENT,
                site_name VARCHAR(255) DEFAULT 'Better Life',
                site_description TEXT,
                company_email VARCHAR(255) DEFAULT 'contact@betterlife-ong.org',
                company_phone VARCHAR(50) DEFAULT '+243 82 9495 919',
                company_address VARCHAR(500) DEFAULT 'N°5 Av. Des Etangs, Q/ Joli Parc, C/ Ngaliema, Kinshasa - RDC',
                facebook_url VARCHAR(500) DEFAULT 'https://www.facebook.com/betterlifedrc/',
                twitter_url VARCHAR(500) DEFAULT 'https://x.com/BETTERLIFE27626',
                linkedin_url VARCHAR(500) DEFAULT 'https://www.linkedin.com/company/better-life-org',
                instagram_url VARCHAR(500) DEFAULT 'https://www.instagram.com/betterlifeong/',
                youtube_url VARCHAR(500) DEFAULT 'https://www.youtube.com/@BetterLifeOrg-s5yn',
                whatsapp_url VARCHAR(500) DEFAULT 'https://wa.me/243829495919',
                tiktok_url VARCHAR(500) DEFAULT 'https://www.tiktok.com/@betterlife_ong',
                logo_path VARCHAR(255) DEFAULT '/images/logo.png',
                theme VARCHAR(20) DEFAULT 'light',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

    // Ensure settings row exists
    const [settingsRows] = await db.execute(
      "SELECT COUNT(*) as count FROM settings",
    );
    if (settingsRows[0].count === 0) {
      await db.execute(
        'INSERT INTO settings (site_name) VALUES ("Better Life")',
      );
    }

    await db.execute(getHeroSlidesCreateTableSql());

    await db.execute(`
            CREATE TABLE IF NOT EXISTS statistics (
                id INT PRIMARY KEY AUTO_INCREMENT,
                stat_key VARCHAR(50) NOT NULL UNIQUE,
                value VARCHAR(20) NOT NULL,
                label VARCHAR(100) NOT NULL,
                suffix VARCHAR(10) DEFAULT '',
                color VARCHAR(20) DEFAULT 'green',
                icon VARCHAR(50) DEFAULT 'FaUsers',
                is_active BOOLEAN DEFAULT TRUE,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

    await db.execute(`
            CREATE TABLE IF NOT EXISTS testimonials (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                location VARCHAR(200),
                role VARCHAR(100),
                short_quote_fr TEXT,
                short_quote_en TEXT,
                short_quote_es TEXT,
                short_quote_sw TEXT,
                full_quote_fr TEXT,
                full_quote_en TEXT,
                full_quote_es TEXT,
                full_quote_sw TEXT,
                image_path VARCHAR(255),
                video_url VARCHAR(500),
                rating INT DEFAULT 5,
                is_featured BOOLEAN DEFAULT FALSE,
                is_active BOOLEAN DEFAULT TRUE,
                sort_order INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

    await db.execute(`
            CREATE TABLE IF NOT EXISTS pages (
                id INT PRIMARY KEY AUTO_INCREMENT,
                slug VARCHAR(255) NOT NULL UNIQUE,
                parent_id INT DEFAULT NULL,
                hero_image VARCHAR(500),
                title_fr VARCHAR(255) NOT NULL,
                title_en VARCHAR(255),
                title_es VARCHAR(255),
                title_sw VARCHAR(255),
                subtitle_fr TEXT,
                subtitle_en TEXT,
                subtitle_es TEXT,
                subtitle_sw TEXT,
                content_fr LONGTEXT,
                content_en LONGTEXT,
                content_es LONGTEXT,
                content_sw LONGTEXT,
                meta_description_fr VARCHAR(500),
                is_active BOOLEAN DEFAULT TRUE,
                sort_order INT DEFAULT 0,
                created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                menu_label_fr VARCHAR(255),
                menu_label_en VARCHAR(255),
                menu_label_es VARCHAR(255),
                menu_label_sw VARCHAR(255),
                menu_icon VARCHAR(100),
                show_in_menu BOOLEAN DEFAULT TRUE,
                content_json LONGTEXT,
                INDEX pages_parent_id_idx (parent_id),
                CONSTRAINT pages_parent_fk FOREIGN KEY (parent_id) REFERENCES pages(id) ON DELETE SET NULL
            )
        `);

    await db.execute(`
            CREATE TABLE IF NOT EXISTS partners (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                contact VARCHAR(50),
                region VARCHAR(50) DEFAULT 'autres',
                type VARCHAR(50) DEFAULT 'Particulier',
                title VARCHAR(100),
                company VARCHAR(100),
                category VARCHAR(100),
                logo_path VARCHAR(500),
                website_url VARCHAR(500),
                description_fr TEXT,
                description_en TEXT,
                sort_order INT DEFAULT 0,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

    await db.execute(`
            CREATE TABLE IF NOT EXISTS membership_applications (
                id INT PRIMARY KEY AUTO_INCREMENT,
                membership_type VARCHAR(60),
                lastname VARCHAR(255) NOT NULL,
                email VARCHAR(120) NOT NULL,
                phone VARCHAR(60),
                city VARCHAR(120),
                province VARCHAR(120),
                country VARCHAR(120),
                amount_paid DECIMAL(12,2) NULL,
                payment_reference VARCHAR(255) NULL,
                payment_received_at TIMESTAMP NULL,
                status VARCHAR(30) DEFAULT 'pending_payment',
                payload LONGTEXT,
                subscriber_id_path VARCHAR(500),
                reference_id_path VARCHAR(500),
                email_delivery_status VARCHAR(30),
                email_delivery_details LONGTEXT,
                validated_at TIMESTAMP NULL,
                validated_by VARCHAR(100) NULL,
                partner_id INT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX membership_applications_status_idx (status),
                INDEX membership_applications_email_idx (email)
            )
        `);

    await db.execute(`
            CREATE TABLE IF NOT EXISTS blog_posts (
                id INT PRIMARY KEY AUTO_INCREMENT,
                title_fr VARCHAR(255) NOT NULL,
                title_en VARCHAR(255),
                content_fr LONGTEXT,
                content_en LONGTEXT,
                excerpt_fr TEXT,
                excerpt_en TEXT,
                image_url VARCHAR(500),
                category VARCHAR(100),
                author VARCHAR(100),
                is_published BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

    await db.execute(`
            CREATE TABLE IF NOT EXISTS team_members (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                role_fr VARCHAR(100) NOT NULL,
                role_en VARCHAR(100),
                role_es VARCHAR(100),
                role_sw VARCHAR(100),
                bio_fr TEXT,
                bio_en TEXT,
                bio_es TEXT,
                bio_sw TEXT,
                email VARCHAR(100),
                phone VARCHAR(50),
                expertise JSON,
                photo_path VARCHAR(255),
                sort_order INT DEFAULT 0,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

    await db.execute(`
            CREATE TABLE IF NOT EXISTS delegates (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                province VARCHAR(100) NOT NULL,
                role VARCHAR(100) DEFAULT 'Délégué Provincial',
                bio_fr TEXT,
                bio_en TEXT,
                bio_es TEXT,
                bio_sw TEXT,
                expertise JSON,
                email VARCHAR(100),
                phone VARCHAR(50),
                photo_path VARCHAR(255),
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

    await db.execute(`
            CREATE TABLE IF NOT EXISTS contact_messages (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(50),
                subject VARCHAR(200),
                message TEXT NOT NULL,
                is_read BOOLEAN DEFAULT FALSE,
                status VARCHAR(30) DEFAULT 'new',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

    await db.execute(`
            CREATE TABLE IF NOT EXISTS career_applications (
                id INT PRIMARY KEY AUTO_INCREMENT,
                type VARCHAR(20) NOT NULL,
                civility VARCHAR(10),
                lastname VARCHAR(120) NOT NULL,
                email VARCHAR(120) NOT NULL,
                phone VARCHAR(60),
                address VARCHAR(255),
                city VARCHAR(120),
                province VARCHAR(120),
                country VARCHAR(120),
                education TEXT,
                experience TEXT,
                motivation LONGTEXT,
                signature VARCHAR(120),
                cv_path VARCHAR(500),
                letter_path VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

    await ensureColumn("career_applications", "offer_id", "INT NULL");
    await ensureColumn(
      "career_applications",
      "offer_title",
      "VARCHAR(255) NULL",
    );

    await db.execute(`
            CREATE TABLE IF NOT EXISTS career_offers (
                id INT PRIMARY KEY AUTO_INCREMENT,
                type VARCHAR(20) NOT NULL,
                title VARCHAR(255) NOT NULL,
                location VARCHAR(255),
                contract_type VARCHAR(100),
                description LONGTEXT,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

    await db.execute(`
            CREATE TABLE IF NOT EXISTS gallery_items (
                id INT PRIMARY KEY AUTO_INCREMENT,
                type VARCHAR(20) NOT NULL DEFAULT 'photo',
                category VARCHAR(50) NOT NULL DEFAULT 'general',
                title_fr VARCHAR(255),
                title_en VARCHAR(255),
                title_es VARCHAR(255),
                title_sw VARCHAR(255),
                description_fr TEXT,
                description_en TEXT,
                description_es TEXT,
                description_sw TEXT,
                image_url VARCHAR(500),
                video_url VARCHAR(500),
                video_duration VARCHAR(10),
                views_count INT DEFAULT 0,
                is_active BOOLEAN DEFAULT TRUE,
                sort_order INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

    await db.execute(`
            CREATE TABLE IF NOT EXISTS about_content (
                id INT PRIMARY KEY AUTO_INCREMENT,
                section VARCHAR(50) NOT NULL,
                key_name VARCHAR(100) NOT NULL,
                title_fr VARCHAR(255),
                title_en VARCHAR(255),
                title_es VARCHAR(255),
                title_sw VARCHAR(255),
                content_fr LONGTEXT,
                content_en LONGTEXT,
                content_es LONGTEXT,
                content_sw LONGTEXT,
                icon VARCHAR(50),
                image_url VARCHAR(500),
                sort_order INT DEFAULT 0,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY unique_section_key (section, key_name)
            )
        `);

    // Ensure extra columns exist
    await ensureColumn("contact_messages", "reply_message", "TEXT NULL");
    await ensureColumn("contact_messages", "replied_at", "TIMESTAMP NULL");
    await ensureColumn("contact_messages", "replied_by", "VARCHAR(100) NULL");
    await ensureColumn(
      "contact_messages",
      "is_favorite",
      "BOOLEAN DEFAULT FALSE",
    );
    await ensureColumn(
      "contact_messages",
      "is_archived",
      "BOOLEAN DEFAULT FALSE",
    );
    await ensureColumn("contact_messages", "message_uid", "VARCHAR(64) NULL");
    await ensureColumn("contact_messages", "email_sent_at", "TIMESTAMP NULL");
    await ensureColumn(
      "contact_messages",
      "email_message_id",
      "VARCHAR(255) NULL",
    );
    await ensureColumn(
      "contact_messages",
      "email_reply_to",
      "VARCHAR(255) NULL",
    );
    await ensureColumn(
      "contact_messages",
      "email_delivery_status",
      "VARCHAR(30) NULL",
    );
    await ensureColumn(
      "contact_messages",
      "email_delivery_details",
      "TEXT NULL",
    );
    await ensureContactMessageUids();
    await ensureIndex(
      "contact_messages",
      "contact_messages_message_uid_uq",
      "UNIQUE INDEX contact_messages_message_uid_uq ON contact_messages (message_uid)",
    );

    await ensureColumn(
      "settings",
      "top_bar_tagline_fr",
      "VARCHAR(255) DEFAULT 'Votre partenaire pour un avenir meilleur'",
    );
    await ensureColumn(
      "settings",
      "top_bar_tagline_en",
      "VARCHAR(255) DEFAULT 'Your partner for a better future'",
    );
    await ensureColumn(
      "settings",
      "top_bar_tagline_es",
      "VARCHAR(255) DEFAULT 'Su socio para un futuro mejor'",
    );
    await ensureColumn(
      "settings",
      "top_bar_tagline_sw",
      "VARCHAR(255) DEFAULT 'Mshirika wako kwa mustakabali bora'",
    );

    // Ensure partners columns
    await ensureColumn("partners", "contact", "VARCHAR(50)");
    await ensureColumn("partners", "region", "VARCHAR(50) DEFAULT 'autres'");
    await ensureColumn("partners", "type", "VARCHAR(50) DEFAULT 'Particulier'");
    await ensureColumn("partners", "title", "VARCHAR(100)");
    await ensureColumn("partners", "company", "VARCHAR(100)");
    await ensureColumn("partners", "category", "VARCHAR(100)");
    await ensureColumn("partners", "logo_path", "VARCHAR(500)");
    await ensureColumn("partners", "website_url", "VARCHAR(500)");
    await ensureColumn("partners", "description_fr", "TEXT");
    await ensureColumn("partners", "description_en", "TEXT");
    await ensureColumn("partners", "sort_order", "INT DEFAULT 0");

    await ensureColumn(
      "membership_applications",
      "amount_paid",
      "DECIMAL(12,2) NULL",
    );
    await ensureColumn(
      "membership_applications",
      "payment_reference",
      "VARCHAR(255) NULL",
    );
    await ensureColumn(
      "membership_applications",
      "payment_received_at",
      "TIMESTAMP NULL",
    );
    await ensureColumn(
      "membership_applications",
      "email_delivery_status",
      "VARCHAR(30) NULL",
    );
    await ensureColumn(
      "membership_applications",
      "email_delivery_details",
      "LONGTEXT NULL",
    );
    await ensureColumn(
      "membership_applications",
      "validated_at",
      "TIMESTAMP NULL",
    );
    await ensureColumn(
      "membership_applications",
      "validated_by",
      "VARCHAR(100) NULL",
    );
    await ensureColumn("membership_applications", "partner_id", "INT NULL");

    // Ensure statistics columns
    await ensureColumn("statistics", "label_fr", "VARCHAR(100)");
    await ensureColumn("statistics", "label_en", "VARCHAR(100)");
    await ensureColumn("statistics", "label_es", "VARCHAR(100)");
    await ensureColumn("statistics", "label_sw", "VARCHAR(100)");
    await ensureColumn("statistics", "sort_order", "INT DEFAULT 0");

    // Update statistics label if label_fr is missing
    try {
      await db.execute(
        "UPDATE statistics SET label_fr = label WHERE label_fr IS NULL AND label IS NOT NULL",
      );
    } catch (e) {
      /* ignore */
    }

    await seedHeroSlidesIfEmpty(db);

    // Seed testimonials
    await seedTestimonials(db);

    // Views
    const views = [
      {
        name: "active_statistics",
        query:
          "CREATE OR REPLACE VIEW active_statistics AS SELECT * FROM statistics WHERE is_active = 1",
      },
      {
        name: "active_testimonials",
        query:
          "CREATE OR REPLACE VIEW active_testimonials AS SELECT * FROM testimonials WHERE is_active = 1",
      },
      {
        name: "published_blog_posts",
        query:
          "CREATE OR REPLACE VIEW published_blog_posts AS SELECT * FROM blog_posts WHERE is_published = 1",
      },
    ];

    for (const view of views) {
      try {
        await db.execute(`DROP VIEW IF EXISTS ${view.name}`);
        await db.execute(view.query);
      } catch (vErr) {
        console.warn(
          `[WARN] View ${view.name} creation skipped:`,
          vErr.message,
        );
      }
    }

    console.log("[DB] Initialization complete");
  } catch (error) {
    console.error("[DB] Error during initialization:", error.message);
    throw error;
  }
}

// ============ ROUTES ============
const apiRouter = express.Router();

apiRouter.get("/health", (req, res) => res.json({ status: "ok", db: !!db }));
apiRouter.get("/debug", (req, res) =>
  res.json({
    env: process.env.NODE_ENV,
    db_connected: !!db,
    db_config: {
      host: DB_CONFIG.host,
      user: DB_CONFIG.user,
      database: DB_CONFIG.database,
    },
  }),
);

// Admin Auth
const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "BetterLife2025";
const JWT_SECRET = process.env.JWT_SECRET || "betterlife_super_secret_key_2025";

apiRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Super admin
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ username, role: "admin" }, JWT_SECRET, {
      expiresIn: "8h",
    });
    return res.json({
      success: true,
      token,
      user: { username, role: "admin", display_name: "Admin BetterLife" },
    });
  }

  // Autres users : team members et délégués
  try {
    const [teamRows] = await db.execute(
      "SELECT id, name, role_fr, email, phone, photo_path, is_active FROM team_members WHERE is_active = 1",
    );
    const [delegateRows] = await db.execute(
      "SELECT id, name, province, role, email, phone, photo_path, is_active FROM delegates WHERE is_active = 1",
    );

    // Chercher dans les team members
    for (const row of teamRows) {
      const entry = {
        id: row.id,
        display_name: row.name,
        role_label: row.role_fr,
        email: row.email,
        phone: row.phone,
        photo_path: row.photo_path,
        is_active: !!row.is_active,
      };
      const expectedUsername = buildPanelUsername({ ...entry }, "team");
      const expectedPassword = buildPanelDefaultPassword({ ...entry }, "team");
      if (username === expectedUsername && password === expectedPassword) {
        const roleKey = inferPanelRoleKey(entry.role_label, "team");
        const token = jwt.sign(
          { username, role: roleKey, source_type: "team", source_id: row.id },
          JWT_SECRET,
          { expiresIn: "8h" },
        );
        return res.json({
          success: true,
          token,
          user: {
            username,
            role: roleKey,
            source_type: "team",
            source_id: row.id,
            display_name: row.name,
            email: row.email,
            photo_path: row.photo_path,
          },
        });
      }
    }

    // Chercher dans les délégués
    for (const row of delegateRows) {
      const entry = {
        id: row.id,
        display_name: row.name,
        role_label: row.role || "Delegue Provincial",
        province: row.province,
        email: row.email,
        phone: row.phone,
        photo_path: row.photo_path,
        is_active: !!row.is_active,
      };
      const expectedUsername = buildPanelUsername({ ...entry }, "delegate");
      const expectedPassword = buildPanelDefaultPassword(
        { ...entry },
        "delegate",
      );
      if (username === expectedUsername && password === expectedPassword) {
        const token = jwt.sign(
          {
            username,
            role: "delegue",
            source_type: "delegate",
            source_id: row.id,
          },
          JWT_SECRET,
          { expiresIn: "8h" },
        );
        return res.json({
          success: true,
          token,
          user: {
            username,
            role: "delegue",
            source_type: "delegate",
            source_id: row.id,
            display_name: row.name,
            email: row.email,
            photo_path: row.photo_path,
          },
        });
      }
    }
  } catch (err) {
    console.error("[LOGIN] Error checking panel users:", err.message);
    return res.status(500).json({ success: false, error: "Erreur serveur" });
  }

  return res
    .status(401)
    .json({ success: false, error: "Identifiants invalides" });
});

apiRouter.get("/verify-token", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer "))
    return res.status(401).json({ valid: false });
  try {
    const payload = jwt.verify(auth.split(" ")[1], JWT_SECRET);
    res.json({ valid: true, user: payload });
  } catch (e) {
    res.status(401).json({ valid: false });
  }
});

function normalizePanelAccessToken(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inferPanelRoleKey(roleLabel, sourceType) {
  const role = normalizePanelAccessToken(roleLabel);

  if (sourceType === "delegate" || role.includes("delegue")) return "delegue";
  if (role.includes("coord")) return "cordon";
  if (role.includes("communication")) return "dircom";
  if (role.includes("tech")) return "dirtec";
  if (role.includes("financ") || role.includes("compta")) return "dirfin";
  if (role === "rh" || role.includes("ressources-humaines")) return "dirrh";
  if (role.includes("secret")) return "secadmin";
  if (role.includes("projet")) return "gestproj";
  return sourceType === "delegate" ? "delegue" : "staff";
}

function buildPanelUsername(entry, sourceType) {
  if (sourceType === "delegate") {
    const provinceToken = normalizePanelAccessToken(
      entry.province || entry.display_name || entry.email || "",
    );
    return provinceToken ? `delegue-${provinceToken}` : `delegue-${entry.id}`;
  }

  const roleKey = inferPanelRoleKey(entry.role_label, sourceType);
  if (roleKey !== "staff") return roleKey;

  const emailToken = normalizePanelAccessToken(
    String(entry.email || "").split("@")[0],
  );
  if (emailToken) return emailToken;

  const nameToken = normalizePanelAccessToken(entry.display_name || "");
  return nameToken || `user-${entry.id}`;
}

function buildPanelDefaultPassword(entry, sourceType) {
  return `${inferPanelRoleKey(entry.role_label, sourceType)}Better2026`;
}

function serializePanelUser(entry, sourceType) {
  const roleLabel = entry.role_label || "";
  return {
    source_type: sourceType,
    source_id: entry.id,
    display_name: entry.display_name || "",
    role_label: roleLabel,
    username: buildPanelUsername(
      { ...entry, role_label: roleLabel },
      sourceType,
    ),
    default_password: buildPanelDefaultPassword(
      { ...entry, role_label: roleLabel },
      sourceType,
    ),
    email: entry.email || "",
    phone: entry.phone || "",
    photo_path: entry.photo_path || "",
    is_active: entry.is_active !== false,
  };
}

apiRouter.get("/users", async (req, res) => {
  try {
    const requestUsername = getAdminUsernameFromRequest(req);
    if (!requestUsername) {
      return res.status(401).json({ error: "Authentification requise" });
    }
    if (requestUsername !== ADMIN_USER) {
      return res
        .status(403)
        .json({ error: "Acces reserve au compte admin principal" });
    }

    const [teamRows] = await db.execute(
      "SELECT id, name, role_fr, email, phone, photo_path, is_active, sort_order FROM team_members ORDER BY sort_order ASC, id ASC",
    );
    const [delegateRows] = await db.execute(
      "SELECT id, name, province, role, email, phone, photo_path, is_active FROM delegates ORDER BY province ASC, id ASC",
    );

    const users = [
      {
        source_type: "admin",
        source_id: 0,
        display_name: "Admin BetterLife",
        role_label: "Super Administrateur",
        username: ADMIN_USER,
        default_password: ADMIN_PASS,
        email: process.env.ADMIN_EMAIL || "",
        phone: process.env.ADMIN_PHONE || "",
        photo_path: "",
        is_active: true,
      },
      ...teamRows.map((row) =>
        serializePanelUser(
          {
            id: row.id,
            display_name: row.name,
            role_label: row.role_fr,
            email: row.email,
            phone: row.phone,
            photo_path: row.photo_path,
            is_active: !!row.is_active,
          },
          "team",
        ),
      ),
      ...delegateRows.map((row) =>
        serializePanelUser(
          {
            id: row.id,
            display_name: row.name,
            role_label: row.role || "Delegue Provincial",
            province: row.province,
            email: row.email,
            phone: row.phone,
            photo_path: row.photo_path,
            is_active: !!row.is_active,
          },
          "delegate",
        ),
      ),
    ];

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ SETTINGS ============
apiRouter.get("/settings", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM settings LIMIT 1");
    res.json(rows[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.put("/settings", async (req, res) => {
  try {
    const allowed = [
      "site_name",
      "site_description",
      "company_email",
      "company_phone",
      "company_address",
      "facebook_url",
      "twitter_url",
      "linkedin_url",
      "instagram_url",
      "youtube_url",
      "whatsapp_url",
      "tiktok_url",
      "logo_path",
      "theme",
      "top_bar_tagline_fr",
      "top_bar_tagline_en",
      "top_bar_tagline_es",
      "top_bar_tagline_sw",
    ];
    const updates = [];
    const values = [];
    for (const field of allowed) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates.push(`${field} = ?`);
        values.push(req.body[field]);
      }
    }
    if (updates.length > 0) {
      values.push(1);
      await db.execute(
        `UPDATE settings SET ${updates.join(", ")} WHERE id = ?`,
        values,
      );
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/settings", async (req, res) => {
  try {
    const allowed = [
      "site_name",
      "site_description",
      "company_email",
      "company_phone",
      "company_address",
      "facebook_url",
      "twitter_url",
      "linkedin_url",
      "instagram_url",
      "youtube_url",
      "whatsapp_url",
      "tiktok_url",
      "logo_path",
      "theme",
      "top_bar_tagline_fr",
      "top_bar_tagline_en",
      "top_bar_tagline_es",
      "top_bar_tagline_sw",
    ];
    const updates = [];
    const values = [];
    for (const field of allowed) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates.push(`${field} = ?`);
        values.push(req.body[field]);
      }
    }
    if (updates.length > 0) {
      values.push(1);
      await db.execute(
        `UPDATE settings SET ${updates.join(", ")} WHERE id = ?`,
        values,
      );
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ HERO SLIDES ============
function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function normalizeOptionalHeroValue(value) {
  if (value === undefined) return undefined;
  const normalized = String(value ?? "").trim();
  return normalized ? normalized : null;
}

function normalizeRequiredHeroValue(value, fieldName) {
  const normalized = String(value ?? "").trim();
  if (!normalized) {
    throw createHttpError(400, `${fieldName} est obligatoire`);
  }
  return normalized;
}

function normalizeHeroSlidePayload(payload = {}, existing = null) {
  const next = {
    image_url:
      payload.image_url !== undefined
        ? normalizeRequiredHeroValue(payload.image_url, "image_url")
        : normalizeRequiredHeroValue(existing?.image_url, "image_url"),
    title_fr:
      payload.title_fr !== undefined
        ? normalizeRequiredHeroValue(payload.title_fr, "title_fr")
        : normalizeRequiredHeroValue(existing?.title_fr, "title_fr"),
    title_en:
      payload.title_en !== undefined
        ? normalizeOptionalHeroValue(payload.title_en)
        : (existing?.title_en ?? null),
    title_es:
      payload.title_es !== undefined
        ? normalizeOptionalHeroValue(payload.title_es)
        : (existing?.title_es ?? null),
    title_sw:
      payload.title_sw !== undefined
        ? normalizeOptionalHeroValue(payload.title_sw)
        : (existing?.title_sw ?? null),
    description_fr:
      payload.description_fr !== undefined
        ? normalizeOptionalHeroValue(payload.description_fr)
        : (existing?.description_fr ?? null),
    description_en:
      payload.description_en !== undefined
        ? normalizeOptionalHeroValue(payload.description_en)
        : (existing?.description_en ?? null),
    description_es:
      payload.description_es !== undefined
        ? normalizeOptionalHeroValue(payload.description_es)
        : (existing?.description_es ?? null),
    description_sw:
      payload.description_sw !== undefined
        ? normalizeOptionalHeroValue(payload.description_sw)
        : (existing?.description_sw ?? null),
    is_active:
      payload.is_active !== undefined
        ? !!payload.is_active
        : !!existing?.is_active,
  };

  next.alt_fr =
    payload.alt_fr !== undefined
      ? normalizeOptionalHeroValue(payload.alt_fr)
      : (existing?.alt_fr ?? null);
  next.alt_en =
    payload.alt_en !== undefined
      ? normalizeOptionalHeroValue(payload.alt_en)
      : (existing?.alt_en ?? null);
  next.alt_es =
    payload.alt_es !== undefined
      ? normalizeOptionalHeroValue(payload.alt_es)
      : (existing?.alt_es ?? null);
  next.alt_sw =
    payload.alt_sw !== undefined
      ? normalizeOptionalHeroValue(payload.alt_sw)
      : (existing?.alt_sw ?? null);

  next.alt_fr = next.alt_fr || next.title_fr;
  next.alt_en = next.alt_en || next.title_en || next.title_fr;
  next.alt_es = next.alt_es || next.title_es || next.title_fr;
  next.alt_sw = next.alt_sw || next.title_sw || next.title_fr;

  return next;
}

function toHeroSlideParams(slide, position) {
  return [
    position,
    slide.image_url,
    slide.alt_fr,
    slide.alt_en,
    slide.alt_es,
    slide.alt_sw,
    slide.title_fr,
    slide.title_en,
    slide.title_es,
    slide.title_sw,
    slide.description_fr,
    slide.description_en,
    slide.description_es,
    slide.description_sw,
    slide.is_active,
  ];
}

function clampHeroSlidePosition(position, total) {
  const numeric = Number(position);
  if (!Number.isFinite(numeric) || numeric < 1) {
    return total > 0 ? total : 1;
  }
  return Math.min(Math.max(Math.trunc(numeric), 1), Math.max(total, 1));
}

async function offsetHeroSlidePositions(connection, ids) {
  if (!ids.length) return;
  await connection.execute(
    `UPDATE hero_slides
         SET position = position + 1000
         WHERE id IN (${ids.map(() => "?").join(", ")})`,
    ids,
  );
}

async function applyHeroSlideOrder(connection, orderedIds) {
  if (!orderedIds.length) return;

  await offsetHeroSlidePositions(connection, orderedIds);

  for (let index = 0; index < orderedIds.length; index += 1) {
    await connection.execute(
      "UPDATE hero_slides SET position = ? WHERE id = ?",
      [index + 1, orderedIds[index]],
    );
  }
}

async function normalizeHeroSlidePositions(connection) {
  const [rows] = await connection.execute(
    "SELECT id FROM hero_slides ORDER BY position ASC, id ASC FOR UPDATE",
  );
  const orderedIds = rows.map((row) => row.id);
  await applyHeroSlideOrder(connection, orderedIds);
  return orderedIds;
}

async function reorderHeroSlide(connection, slideId, requestedPosition) {
  const [rows] = await connection.execute(
    "SELECT id FROM hero_slides ORDER BY position ASC, id ASC FOR UPDATE",
  );
  const orderedIds = rows.map((row) => row.id);
  const fromIndex = orderedIds.indexOf(slideId);

  if (fromIndex === -1) {
    throw createHttpError(404, "Slide non trouve");
  }

  const [movingId] = orderedIds.splice(fromIndex, 1);
  const targetIndex =
    clampHeroSlidePosition(requestedPosition, orderedIds.length + 1) - 1;
  orderedIds.splice(targetIndex, 0, movingId);

  await applyHeroSlideOrder(connection, orderedIds);
  return targetIndex + 1;
}

async function insertHeroSlide(connection, slide, requestedPosition) {
  const [rows] = await connection.execute(
    "SELECT id FROM hero_slides ORDER BY position ASC, id ASC FOR UPDATE",
  );
  const targetPosition = clampHeroSlidePosition(
    requestedPosition,
    rows.length + 1,
  );
  const trailingIds = rows.slice(targetPosition - 1).map((row) => row.id);

  if (trailingIds.length) {
    await offsetHeroSlidePositions(connection, trailingIds);
    for (let index = 0; index < trailingIds.length; index += 1) {
      await connection.execute(
        "UPDATE hero_slides SET position = ? WHERE id = ?",
        [targetPosition + index + 1, trailingIds[index]],
      );
    }
  }

  const [result] = await connection.execute(
    `INSERT INTO hero_slides (
            position, image_url,
            alt_fr, alt_en, alt_es, alt_sw,
            title_fr, title_en, title_es, title_sw,
            description_fr, description_en, description_es, description_sw,
            is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    toHeroSlideParams(slide, targetPosition),
  );

  return { id: result.insertId, position: targetPosition };
}

const setNoStore = (res) => {
  res.set({
    "Cache-Control": "no-store, no-cache, must-revalidate, private",
    Pragma: "no-cache",
    Expires: "0",
  });
};

apiRouter.get("/hero-slides", async (req, res) => {
  try {
    setNoStore(res);
    const langKey = ["fr", "en", "es", "sw"].includes(req.query?.lang)
      ? req.query.lang
      : "fr";
    const [rows] = await db.execute(
      "SELECT * FROM hero_slides WHERE is_active = TRUE ORDER BY position ASC",
    );
    res.json(
      rows.map((row) => ({
        id: row.id,
        position: row.position,
        image_url: row.image_url,
        is_active: !!row.is_active,
        title: row[`title_${langKey}`] || row.title_fr || "",
        description: row[`description_${langKey}`] || row.description_fr || "",
        alt: row[`alt_${langKey}`] || row.alt_fr || "",
      })),
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get("/hero-slides/admin", async (req, res) => {
  try {
    setNoStore(res);
    const [rows] = await db.execute(
      "SELECT * FROM hero_slides ORDER BY position ASC, id ASC",
    );
    res.json(
      rows.map((row) => ({
        ...row,
        is_active: !!row.is_active,
      })),
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/hero-slides", async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const slide = normalizeHeroSlidePayload(req.body || {});
    const { position } = req.body || {};
    const created = await insertHeroSlide(connection, slide, position);

    await connection.commit();
    res.json({
      success: true,
      id: created.id,
      position: created.position,
      created: true,
    });
  } catch (error) {
    await connection.rollback();
    res.status(error.status || 500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

apiRouter.put("/hero-slides/reorder", async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const slides = Array.isArray(req.body?.slides) ? req.body.slides : [];
    if (!slides.length) {
      throw createHttpError(400, "Aucun ordre de slides fourni");
    }

    const orderedIds = slides
      .map((slide) => Number(slide?.id))
      .filter((id) => Number.isFinite(id) && id > 0);

    const [rows] = await connection.execute(
      "SELECT id FROM hero_slides ORDER BY position ASC, id ASC FOR UPDATE",
    );
    const currentIds = rows.map((row) => row.id);

    if (
      orderedIds.length !== currentIds.length ||
      currentIds.some((id) => !orderedIds.includes(id))
    ) {
      throw createHttpError(400, "Liste de slides invalide pour le reorder");
    }

    await applyHeroSlideOrder(connection, orderedIds);
    await connection.commit();
    res.json({ success: true, reordered: true });
  } catch (error) {
    await connection.rollback();
    res.status(error.status || 500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

apiRouter.put("/hero-slides/:id", async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const slideId = Number(req.params.id);
    const [rows] = await connection.execute(
      "SELECT * FROM hero_slides WHERE id = ? LIMIT 1",
      [slideId],
    );
    if (!rows.length) {
      throw createHttpError(404, "Slide non trouve");
    }

    const existing = rows[0];
    const nextSlide = normalizeHeroSlidePayload(req.body || {}, existing);
    let nextPosition = existing.position;

    if (Object.prototype.hasOwnProperty.call(req.body || {}, "position")) {
      const requestedPosition = Number(req.body.position);
      if (Number.isFinite(requestedPosition) && requestedPosition > 0) {
        nextPosition = await reorderHeroSlide(
          connection,
          slideId,
          requestedPosition,
        );
      }
    }

    await connection.execute(
      `UPDATE hero_slides SET
                position = ?, image_url = ?,
                alt_fr = ?, alt_en = ?, alt_es = ?, alt_sw = ?,
                title_fr = ?, title_en = ?, title_es = ?, title_sw = ?,
                description_fr = ?, description_en = ?, description_es = ?, description_sw = ?,
                is_active = ?
             WHERE id = ?`,
      [...toHeroSlideParams(nextSlide, nextPosition), slideId],
    );

    await connection.commit();
    res.json({ success: true, updated: true });
  } catch (error) {
    await connection.rollback();
    res.status(error.status || 500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

apiRouter.delete("/hero-slides/:id", async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute("DELETE FROM hero_slides WHERE id = ?", [
      req.params.id,
    ]);
    await normalizeHeroSlidePositions(connection);
    await connection.commit();
    res.json({ success: true });
  } catch (error) {
    await connection.rollback();
    res.status(error.status || 500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// ============ STATISTICS ============
const STATISTIC_PRIORITY = {
  beneficiaries: 1,
  trees: 2,
  actions: 3,
  provinces: 4,
};

function normalizeStatisticPayload(
  payload = {},
  existing = null,
  fallbackStatKey = null,
) {
  const statKey = String(
    payload.stat_key ?? fallbackStatKey ?? existing?.stat_key ?? "",
  ).trim();
  const value = String(payload.value ?? existing?.value ?? "").trim();
  const label = String(payload.label ?? existing?.label ?? "").trim();

  if (!statKey) {
    throw createHttpError(400, "stat_key est obligatoire");
  }
  if (!value) {
    throw createHttpError(400, "value est obligatoire");
  }
  if (!label) {
    throw createHttpError(400, "label est obligatoire");
  }

  return {
    stat_key: statKey,
    value,
    label,
    suffix: String(payload.suffix ?? existing?.suffix ?? "").trim(),
    color:
      String(payload.color ?? existing?.color ?? "green").trim() || "green",
    icon:
      String(payload.icon ?? existing?.icon ?? "FaUsers").trim() || "FaUsers",
    is_active:
      payload.is_active !== undefined
        ? !!payload.is_active
        : existing?.is_active !== false,
  };
}

function sortStatistics(rows) {
  return [...rows].sort((a, b) => {
    const orderA = STATISTIC_PRIORITY[a.stat_key] ?? 999;
    const orderB = STATISTIC_PRIORITY[b.stat_key] ?? 999;
    if (orderA !== orderB) return orderA - orderB;
    return String(a.stat_key || "").localeCompare(String(b.stat_key || ""));
  });
}

apiRouter.get("/statistics", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, stat_key, value, label, suffix, color, icon, is_active, updated_at FROM statistics WHERE is_active = 1",
    );
    res.json(
      sortStatistics(rows).map((row) => ({
        ...row,
        is_active: !!row.is_active,
      })),
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get("/statistics/admin", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, stat_key, value, label, suffix, color, icon, is_active, updated_at FROM statistics",
    );
    res.json(
      sortStatistics(rows).map((row) => ({
        ...row,
        is_active: !!row.is_active,
      })),
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/statistics", async (req, res) => {
  try {
    const nextStatistic = normalizeStatisticPayload(req.body || {});
    const [result] = await db.execute(
      `INSERT INTO statistics (stat_key, value, label, suffix, color, icon, is_active)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        nextStatistic.stat_key,
        nextStatistic.value,
        nextStatistic.label,
        nextStatistic.suffix,
        nextStatistic.color,
        nextStatistic.icon,
        nextStatistic.is_active,
      ],
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

apiRouter.put("/statistics/:id", async (req, res) => {
  try {
    const statKey = String(req.params.id || "").trim();
    const [rows] = await db.execute(
      "SELECT id, stat_key, value, label, suffix, color, icon, is_active FROM statistics WHERE stat_key = ? LIMIT 1",
      [statKey],
    );
    const existing = rows[0] || null;
    const nextStatistic = normalizeStatisticPayload(
      req.body || {},
      existing,
      statKey,
    );

    if (existing) {
      await db.execute(
        `UPDATE statistics
                 SET stat_key = ?, value = ?, label = ?, suffix = ?, color = ?, icon = ?, is_active = ?
                 WHERE stat_key = ?`,
        [
          nextStatistic.stat_key,
          nextStatistic.value,
          nextStatistic.label,
          nextStatistic.suffix,
          nextStatistic.color,
          nextStatistic.icon,
          nextStatistic.is_active,
          statKey,
        ],
      );
      return res.json({ success: true, updated: true });
    }

    const [result] = await db.execute(
      `INSERT INTO statistics (stat_key, value, label, suffix, color, icon, is_active)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        nextStatistic.stat_key,
        nextStatistic.value,
        nextStatistic.label,
        nextStatistic.suffix,
        nextStatistic.color,
        nextStatistic.icon,
        nextStatistic.is_active,
      ],
    );
    res.json({ success: true, created: true, id: result.insertId });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

apiRouter.delete("/statistics/:id", async (req, res) => {
  try {
    await db.execute("DELETE FROM statistics WHERE stat_key = ?", [
      req.params.id,
    ]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ TESTIMONIALS ============
apiRouter.get("/testimonials", async (req, res) => {
  try {
    const { lang = "fr", admin } = req.query || {};
    const isAdmin = admin === "1" || admin === "true";
    const where = isAdmin ? "" : "WHERE is_active = TRUE";
    const [rows] = await db.execute(
      `SELECT * FROM testimonials ${where} ORDER BY sort_order ASC, created_at DESC`,
    );
    res.json(
      rows.map((t) => ({
        ...t,
        short_quote: t[`short_quote_${lang}`] || t.short_quote_fr,
        full_quote: t[`full_quote_${lang}`] || t.full_quote_fr,
        is_featured: !!t.is_featured,
        is_active: t.is_active !== false,
      })),
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get("/testimonials/admin", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM testimonials ORDER BY sort_order ASC, created_at DESC",
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get("/testimonials/:id", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM testimonials WHERE id = ? LIMIT 1",
      [req.params.id],
    );
    if (!rows || rows.length === 0)
      return res.status(404).json({ error: "Testimonial not found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.put("/testimonials/:id", async (req, res) => {
  try {
    const allowed = [
      "name",
      "location",
      "role",
      "short_quote_fr",
      "short_quote_en",
      "short_quote_es",
      "short_quote_sw",
      "full_quote_fr",
      "full_quote_en",
      "full_quote_es",
      "full_quote_sw",
      "image_path",
      "video_url",
      "rating",
      "is_featured",
      "sort_order",
      "is_active",
    ];
    const updates = [];
    const values = [];
    for (const field of allowed) {
      if (Object.prototype.hasOwnProperty.call(req.body || {}, field)) {
        let value = req.body[field];
        if (field === "is_featured" || field === "is_active") value = !!value;
        else if (field === "rating" || field === "sort_order")
          value = value === "" || value == null ? null : Number(value);
        updates.push(`${field} = ?`);
        values.push(value);
      }
    }
    if (updates.length === 0) return res.json({ success: true, skipped: true });
    values.push(req.params.id);
    await db.execute(
      `UPDATE testimonials SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/testimonials", async (req, res) => {
  try {
    const {
      name,
      location,
      role,
      short_quote_fr,
      full_quote_fr,
      image_path,
      video_url,
      rating = 5,
      is_featured = false,
      is_active = true,
      sort_order = 0,
    } = req.body;
    const [result] = await db.execute(
      `INSERT INTO testimonials (name, location, role, short_quote_fr, full_quote_fr, image_path, video_url, rating, is_featured, is_active, sort_order)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        location || null,
        role || null,
        short_quote_fr || null,
        full_quote_fr || null,
        image_path || null,
        video_url || null,
        rating,
        !!is_featured,
        !!is_active,
        sort_order,
      ],
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.delete("/testimonials/:id", async (req, res) => {
  try {
    await db.execute("DELETE FROM testimonials WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ PAGES ============
function mapPageRow(row, lang = "fr") {
  return {
    ...row,
    is_active: row.is_active !== false && row.is_active !== 0,
    show_in_menu: row.show_in_menu !== false && row.show_in_menu !== 0,
    title: row[`title_${lang}`] || row.title_fr || "",
    subtitle: row[`subtitle_${lang}`] || row.subtitle_fr || "",
    content: row[`content_${lang}`] || row.content_fr || "",
  };
}

function normalizePageFieldValue(value) {
  if (value === undefined) return undefined;
  if (value === null) return null;
  return value;
}

function normalizePagePayload(payload = {}, { currentPageId = null } = {}) {
  const normalized = {};
  const fieldNames = [
    "slug",
    "title_fr",
    "title_en",
    "title_es",
    "title_sw",
    "subtitle_fr",
    "subtitle_en",
    "subtitle_es",
    "subtitle_sw",
    "content_fr",
    "content_en",
    "content_es",
    "content_sw",
    "hero_image",
    "meta_description_fr",
    "menu_label_fr",
    "menu_label_en",
    "menu_label_es",
    "menu_label_sw",
    "menu_icon",
    "content_json",
  ];

  fieldNames.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(payload, field)) {
      normalized[field] = normalizePageFieldValue(payload[field]);
    }
  });

  if (Object.prototype.hasOwnProperty.call(payload, "meta_description")) {
    normalized.meta_description_fr = normalizePageFieldValue(
      payload.meta_description,
    );
  }

  if (Object.prototype.hasOwnProperty.call(payload, "is_active")) {
    normalized.is_active = !!payload.is_active;
  }
  if (Object.prototype.hasOwnProperty.call(payload, "show_in_menu")) {
    normalized.show_in_menu = !!payload.show_in_menu;
  }
  if (Object.prototype.hasOwnProperty.call(payload, "sort_order")) {
    const sortOrder = Number(payload.sort_order);
    normalized.sort_order = Number.isFinite(sortOrder)
      ? Math.trunc(sortOrder)
      : 0;
  }
  if (Object.prototype.hasOwnProperty.call(payload, "parent_id")) {
    const parentId = Number(payload.parent_id);
    normalized.parent_id =
      Number.isFinite(parentId) &&
      parentId > 0 &&
      parentId !== Number(currentPageId)
        ? parentId
        : null;
  }

  return normalized;
}

apiRouter.get("/pages", async (req, res) => {
  try {
    const lang = req.query.lang || "fr";
    const [rows] = await db.execute(
      "SELECT * FROM pages WHERE is_active = TRUE ORDER BY COALESCE(parent_id, 0) ASC, sort_order ASC, slug ASC",
    );
    res.json(rows.map((page) => mapPageRow(page, lang)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get("/pages/admin", async (req, res) => {
  try {
    const lang = req.query.lang || "fr";
    const [rows] = await db.execute(
      "SELECT * FROM pages ORDER BY COALESCE(parent_id, 0) ASC, sort_order ASC, slug ASC",
    );
    res.json(rows.map((page) => mapPageRow(page, lang)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get("/pages/slug/:slug", async (req, res) => {
  try {
    const lang = req.query.lang || "fr";
    const [rows] = await db.execute(
      "SELECT * FROM pages WHERE LOWER(slug) = LOWER(?) LIMIT 1",
      [req.params.slug],
    );
    if (!rows.length) return res.status(404).json({ error: "Page not found" });
    res.json(mapPageRow(rows[0], lang));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get("/pages/:slug", async (req, res) => {
  try {
    const lang = req.query.lang || "fr";
    const [rows] = await db.execute(
      "SELECT * FROM pages WHERE LOWER(slug) = LOWER(?) LIMIT 1",
      [req.params.slug],
    );
    if (!rows.length) return res.status(404).json({ error: "Page not found" });
    res.json(mapPageRow(rows[0], lang));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.put("/pages/:id", async (req, res) => {
  try {
    const allowedPayload = normalizePagePayload(req.body || {}, {
      currentPageId: req.params.id,
    });
    const updates = [];
    const values = [];
    for (const [field, value] of Object.entries(allowedPayload)) {
      if (value !== undefined) {
        updates.push(`${field} = ?`);
        values.push(value);
      }
    }
    if (updates.length === 0) return res.json({ success: true });
    values.push(req.params.id);
    await db.execute(
      `UPDATE pages SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/pages", async (req, res) => {
  try {
    const payload = normalizePagePayload(req.body || {});
    const slug = String(payload.slug || "").trim();
    const titleFr = String(payload.title_fr || "").trim();
    if (!slug || !titleFr) {
      return res
        .status(400)
        .json({ error: "slug et title_fr sont obligatoires" });
    }
    const [result] = await db.execute(
      `INSERT INTO pages (
                slug, parent_id, hero_image,
                title_fr, title_en, title_es, title_sw,
                subtitle_fr, subtitle_en, subtitle_es, subtitle_sw,
                content_fr, content_en, content_es, content_sw,
                meta_description_fr, is_active, sort_order,
                menu_label_fr, menu_label_en, menu_label_es, menu_label_sw,
                menu_icon, show_in_menu, content_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        slug,
        payload.parent_id ?? null,
        payload.hero_image ?? null,
        titleFr,
        payload.title_en ?? null,
        payload.title_es ?? null,
        payload.title_sw ?? null,
        payload.subtitle_fr ?? null,
        payload.subtitle_en ?? null,
        payload.subtitle_es ?? null,
        payload.subtitle_sw ?? null,
        payload.content_fr ?? "",
        payload.content_en ?? null,
        payload.content_es ?? null,
        payload.content_sw ?? null,
        payload.meta_description_fr ?? null,
        payload.is_active !== false,
        payload.sort_order ?? 0,
        payload.menu_label_fr ?? null,
        payload.menu_label_en ?? null,
        payload.menu_label_es ?? null,
        payload.menu_label_sw ?? null,
        payload.menu_icon ?? null,
        payload.show_in_menu !== false,
        payload.content_json ?? null,
      ],
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.delete("/pages/:id", async (req, res) => {
  try {
    await db.execute("DELETE FROM pages WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ PARTNERS ============
apiRouter.get("/partners", async (req, res) => {
  try {
    const isAdmin = req.query.admin === "1" || req.query.admin === "true";
    const region = String(req.query.region || "")
      .trim()
      .toLowerCase();
    const filters = [];
    const values = [];

    if (!isAdmin) {
      filters.push("is_active = TRUE");
    }

    if (region && region !== "all") {
      filters.push("region = ?");
      values.push(region);
    }

    const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
    const [rows] = await db.execute(
      `SELECT * FROM partners ${where} ORDER BY sort_order ASC, id ASC`,
      values,
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get("/partners/admin", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM partners ORDER BY sort_order, id",
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/partners", async (req, res) => {
  try {
    const {
      name,
      contact,
      region = "autres",
      type = "Particulier",
      title,
      company,
      category,
      logo_path,
      website_url,
      description_fr,
      description_en,
      sort_order = 0,
      is_active = true,
    } = req.body;
    const [result] = await db.execute(
      `INSERT INTO partners (
                name, contact, region, type, title, company, category,
                logo_path, website_url, description_fr, description_en, sort_order, is_active
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        contact || null,
        region || "autres",
        type || "Particulier",
        title || null,
        company || null,
        category || null,
        logo_path || null,
        website_url || null,
        description_fr || null,
        description_en || null,
        sort_order,
        !!is_active,
      ],
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.put("/partners/:id", async (req, res) => {
  try {
    const {
      name,
      contact,
      region = "autres",
      type = "Particulier",
      title,
      company,
      category,
      logo_path,
      website_url,
      description_fr,
      description_en,
      sort_order,
      is_active,
    } = req.body;
    await db.execute(
      `UPDATE partners
             SET name = ?, contact = ?, region = ?, type = ?, title = ?, company = ?, category = ?,
                 logo_path = ?, website_url = ?, description_fr = ?, description_en = ?, sort_order = ?, is_active = ?
             WHERE id = ?`,
      [
        name,
        contact || null,
        region || "autres",
        type || "Particulier",
        title || null,
        company || null,
        category || null,
        logo_path || null,
        website_url || null,
        description_fr || null,
        description_en || null,
        sort_order || 0,
        is_active !== false,
        req.params.id,
      ],
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.delete("/partners/:id", async (req, res) => {
  try {
    await db.execute("DELETE FROM partners WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ TEAM ============
apiRouter.get("/team", async (req, res) => {
  try {
    const lang = req.query.lang || "fr";
    const [rows] = await db.execute(
      "SELECT * FROM team_members WHERE is_active = TRUE ORDER BY sort_order",
    );
    res.json(
      rows.map((m) => ({
        id: m.id,
        name: m.name,
        role: m[`role_${lang}`] || m.role_fr,
        bio: m[`bio_${lang}`] || m.bio_fr,
        email: m.email,
        photo_path: m.photo_path,
        expertise: parseExpertise(m.expertise),
      })),
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get("/team/admin", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM team_members ORDER BY sort_order, id",
    );
    res.json(
      rows.map((m) => ({ ...m, expertise: parseExpertise(m.expertise) })),
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/team", async (req, res) => {
  try {
    const {
      name,
      role_fr,
      role_en,
      role_es,
      role_sw,
      bio_fr,
      bio_en,
      bio_es,
      bio_sw,
      email,
      phone,
      photo_path,
      expertise = [],
      sort_order = 0,
      is_active = true,
    } = req.body;
    const [result] = await db.execute(
      `INSERT INTO team_members (name, role_fr, role_en, role_es, role_sw, bio_fr, bio_en, bio_es, bio_sw, email, phone, photo_path, expertise, sort_order, is_active)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        role_fr,
        role_en || null,
        role_es || null,
        role_sw || null,
        bio_fr || null,
        bio_en || null,
        bio_es || null,
        bio_sw || null,
        email || null,
        phone || null,
        photo_path || null,
        JSON.stringify(expertise || []),
        sort_order,
        !!is_active,
      ],
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.put("/team/:id", async (req, res) => {
  try {
    const {
      name,
      role_fr,
      role_en,
      role_es,
      role_sw,
      bio_fr,
      bio_en,
      bio_es,
      bio_sw,
      email,
      phone,
      photo_path,
      expertise = [],
      sort_order = 0,
      is_active = true,
    } = req.body;
    await db.execute(
      `UPDATE team_members SET name = ?, role_fr = ?, role_en = ?, role_es = ?, role_sw = ?, bio_fr = ?, bio_en = ?, bio_es = ?, bio_sw = ?, email = ?, phone = ?, photo_path = ?, expertise = ?, sort_order = ?, is_active = ? WHERE id = ?`,
      [
        name,
        role_fr,
        role_en || null,
        role_es || null,
        role_sw || null,
        bio_fr || null,
        bio_en || null,
        bio_es || null,
        bio_sw || null,
        email || null,
        phone || null,
        photo_path || null,
        JSON.stringify(expertise || []),
        sort_order,
        !!is_active,
        req.params.id,
      ],
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.delete("/team/:id", async (req, res) => {
  try {
    await db.execute("DELETE FROM team_members WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ DELEGATES ============
apiRouter.get("/delegates", async (req, res) => {
  try {
    const lang = req.query.lang || "fr";
    const [rows] = await db.execute(
      "SELECT * FROM delegates WHERE is_active = TRUE ORDER BY province",
    );
    res.json(
      rows.map((d) => ({
        id: d.id,
        name: d.name,
        province: d.province,
        role: d.role,
        bio: d[`bio_${lang}`] || d.bio_fr,
        email: d.email,
        photo_path: d.photo_path,
        expertise: parseExpertise(d.expertise),
      })),
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get("/delegates/admin", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM delegates ORDER BY province, id",
    );
    res.json(
      rows.map((d) => ({ ...d, expertise: parseExpertise(d.expertise) })),
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/delegates", async (req, res) => {
  try {
    const {
      name,
      province,
      role,
      bio_fr,
      bio_en,
      bio_es,
      bio_sw,
      expertise = [],
      email,
      phone,
      photo_path,
      is_active = true,
    } = req.body;
    const [result] = await db.execute(
      `INSERT INTO delegates (name, province, role, bio_fr, bio_en, bio_es, bio_sw, expertise, email, phone, photo_path, is_active)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        province,
        role || "Délégué Provincial",
        bio_fr || null,
        bio_en || null,
        bio_es || null,
        bio_sw || null,
        JSON.stringify(expertise || []),
        email || null,
        phone || null,
        photo_path || null,
        !!is_active,
      ],
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.put("/delegates/:id", async (req, res) => {
  try {
    const {
      name,
      province,
      role,
      bio_fr,
      bio_en,
      bio_es,
      bio_sw,
      expertise = [],
      email,
      phone,
      photo_path,
      is_active = true,
    } = req.body;
    await db.execute(
      `UPDATE delegates SET name = ?, province = ?, role = ?, bio_fr = ?, bio_en = ?, bio_es = ?, bio_sw = ?, expertise = ?, email = ?, phone = ?, photo_path = ?, is_active = ? WHERE id = ?`,
      [
        name,
        province,
        role || "Délégué Provincial",
        bio_fr || null,
        bio_en || null,
        bio_es || null,
        bio_sw || null,
        JSON.stringify(expertise || []),
        email || null,
        phone || null,
        photo_path || null,
        !!is_active,
        req.params.id,
      ],
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.delete("/delegates/:id", async (req, res) => {
  try {
    await db.execute("DELETE FROM delegates WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ BLOG ============
let blogColumnsCache = null;

async function getBlogColumns() {
  if (blogColumnsCache) return blogColumnsCache;
  const [columns] = await db.execute("SHOW COLUMNS FROM blog_posts");
  blogColumnsCache = new Set(columns.map((column) => column.Field));
  return blogColumnsCache;
}

function makeSlug(value) {
  const base = String(value || "article")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
  return base || `article-${Date.now()}`;
}

function serializeBlogPost(row) {
  const title = row.title_fr || row.title_en || row.title || "";
  const excerpt = row.excerpt_fr || row.excerpt_en || row.excerpt || "";
  const content = row.content_fr || row.content_en || row.content || "";
  const image = row.featured_image || row.image_url || "";
  const publishedAt =
    row.published_at || row.created_at || row.updated_at || null;

  return {
    ...row,
    title,
    excerpt,
    content,
    image,
    image_url: row.image_url || image,
    featured_image: row.featured_image || image,
    slug: row.slug || String(row.id),
    read_time: row.read_time || 5,
    is_published: row.is_published === undefined ? true : !!row.is_published,
    published_at: publishedAt,
    created_at: row.created_at || publishedAt,
  };
}

async function buildBlogPayload(body = {}, columns, existing = null) {
  const payload = {};
  const titleFr = String(
    body.title_fr || body.title || existing?.title_fr || "",
  ).trim();
  const contentFr = String(
    body.content_fr || body.content || existing?.content_fr || "",
  ).trim();
  const excerptFr = String(
    body.excerpt_fr || body.excerpt || existing?.excerpt_fr || "",
  ).trim();
  const image = String(
    body.featured_image ||
      body.image_url ||
      existing?.featured_image ||
      existing?.image_url ||
      "",
  ).trim();
  const slug = makeSlug(body.slug || existing?.slug || titleFr);

  if (columns.has("slug")) payload.slug = slug;
  if (columns.has("title_fr")) payload.title_fr = titleFr;
  if (columns.has("title_en") && body.title_en !== undefined)
    payload.title_en = body.title_en || null;
  if (columns.has("title_es") && body.title_es !== undefined)
    payload.title_es = body.title_es || null;
  if (columns.has("title_sw") && body.title_sw !== undefined)
    payload.title_sw = body.title_sw || null;
  if (columns.has("excerpt_fr")) payload.excerpt_fr = excerptFr || null;
  if (columns.has("excerpt_en") && body.excerpt_en !== undefined)
    payload.excerpt_en = body.excerpt_en || null;
  if (columns.has("excerpt_es") && body.excerpt_es !== undefined)
    payload.excerpt_es = body.excerpt_es || null;
  if (columns.has("excerpt_sw") && body.excerpt_sw !== undefined)
    payload.excerpt_sw = body.excerpt_sw || null;
  if (columns.has("content_fr")) payload.content_fr = contentFr;
  if (columns.has("content_en") && body.content_en !== undefined)
    payload.content_en = body.content_en || null;
  if (columns.has("content_es") && body.content_es !== undefined)
    payload.content_es = body.content_es || null;
  if (columns.has("content_sw") && body.content_sw !== undefined)
    payload.content_sw = body.content_sw || null;
  if (columns.has("featured_image")) payload.featured_image = image || null;
  if (columns.has("image_url")) payload.image_url = image || null;
  if (columns.has("author"))
    payload.author = body.author || existing?.author || "Equipe BetterLife";
  if (columns.has("category"))
    payload.category = body.category || existing?.category || "general";
  if (columns.has("tags")) payload.tags = body.tags || existing?.tags || null;
  if (columns.has("read_time"))
    payload.read_time = Number(body.read_time || existing?.read_time || 5);
  if (columns.has("is_featured"))
    payload.is_featured =
      body.is_featured === undefined
        ? !!existing?.is_featured
        : !!body.is_featured;
  if (columns.has("is_published"))
    payload.is_published =
      body.is_published === undefined ? true : !!body.is_published;
  if (columns.has("published_at") && !existing)
    payload.published_at = body.published_at || new Date();

  return payload;
}

async function getBlogPostByIdOrSlug(idOrSlug) {
  const columns = await getBlogColumns();
  const clauses = ["id = ?"];
  const params = [idOrSlug];
  if (columns.has("slug")) {
    clauses.push("slug = ?");
    params.push(idOrSlug);
  }
  const [rows] = await db.execute(
    `SELECT * FROM blog_posts WHERE ${clauses.join(" OR ")} LIMIT 1`,
    params,
  );
  return rows[0] || null;
}

apiRouter.get("/blog/posts", async (req, res) => {
  try {
    const columns = await getBlogColumns();
    const where =
      columns.has("is_published") && req.query.admin !== "1"
        ? "WHERE is_published = 1"
        : "";
    // Determine ORDER BY column safely - fallback to id if columns unknown
    let orderColumn = "id DESC";
    if (columns.has("published_at")) {
      orderColumn = "published_at DESC, id DESC";
    } else if (columns.has("created_at")) {
      orderColumn = "created_at DESC, id DESC";
    }
    const [rows] = await db.execute(
      `SELECT * FROM blog_posts ${where} ORDER BY ${orderColumn}`,
    );
    res.json(rows.map(serializeBlogPost));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.get("/blog/posts/:idOrSlug", async (req, res) => {
  try {
    const row = await getBlogPostByIdOrSlug(req.params.idOrSlug);
    if (!row) return res.status(404).json({ error: "Article introuvable" });
    res.json(serializeBlogPost(row));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.post("/blog/posts", async (req, res) => {
  try {
    const columns = await getBlogColumns();
    const payload = await buildBlogPayload(req.body, columns);
    if (!payload.title_fr || !payload.content_fr) {
      return res
        .status(400)
        .json({ error: "Le titre et le contenu sont obligatoires" });
    }
    const fields = Object.keys(payload);
    const placeholders = fields.map(() => "?").join(", ");
    const [result] = await db.execute(
      `INSERT INTO blog_posts (${fields.join(", ")}) VALUES (${placeholders})`,
      fields.map((field) => payload[field]),
    );
    const created = await getBlogPostByIdOrSlug(result.insertId);
    res.json({
      success: true,
      id: result.insertId,
      post: serializeBlogPost(created || { id: result.insertId, ...payload }),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.put("/blog/posts/:id", async (req, res) => {
  try {
    const existing = await getBlogPostByIdOrSlug(req.params.id);
    if (!existing)
      return res.status(404).json({ error: "Article introuvable" });
    const columns = await getBlogColumns();
    const payload = await buildBlogPayload(req.body, columns, existing);
    delete payload.published_at;
    const fields = Object.keys(payload);
    if (!fields.length)
      return res.json({ success: true, post: serializeBlogPost(existing) });
    await db.execute(
      `UPDATE blog_posts SET ${fields.map((field) => `${field} = ?`).join(", ")} WHERE id = ?`,
      [...fields.map((field) => payload[field]), existing.id],
    );
    const updated = await getBlogPostByIdOrSlug(existing.id);
    res.json({ success: true, post: serializeBlogPost(updated) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ============ CONTACT MESSAGES ============
apiRouter.post("/contact-messages", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const messageUid = generateMessageUid();
    const [result] = await db.execute(
      "INSERT INTO contact_messages (id, message_uid, name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [0, messageUid, name, email, phone || null, subject || null, message],
    );
    const createdMessage = await getContactMessageByReference(messageUid);
    res.json({
      success: true,
      id: result.insertId,
      message: serializeContactMessage(createdMessage),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.get("/contact-messages", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM contact_messages ORDER BY created_at DESC",
    );
    res.json(rows.map(serializeContactMessage));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.get("/contact-messages/:messageRef", async (req, res) => {
  try {
    const message = await getContactMessageByReference(req.params.messageRef);
    if (!message) return res.status(404).json({ error: "Message not found" });
    res.json(serializeContactMessage(message));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

async function getContactMessageByReference(messageRef) {
  const reference = String(messageRef || "").trim();
  if (!reference) {
    return null;
  }

  if (reference.startsWith("legacy:")) {
    const legacyIdentity = parseLegacyContactMessageReference(reference);
    if (!legacyIdentity) {
      return null;
    }

    const lookup = buildContactMessageLookup(legacyIdentity);
    const [rows] = await db.execute(
      `SELECT * FROM contact_messages WHERE ${lookup.clause} LIMIT 1`,
      lookup.params,
    );
    return rows[0] || null;
  }

  if (/^\d+$/.test(reference) && reference !== "0") {
    const [rows] = await db.execute(
      "SELECT * FROM contact_messages WHERE id = ? LIMIT 1",
      [Number(reference)],
    );
    return rows[0] || null;
  }

  const [rows] = await db.execute(
    "SELECT * FROM contact_messages WHERE message_uid = ? LIMIT 1",
    [reference],
  );
  return rows[0] || null;
}

async function updateContactMessageFields(messageRef, fields = {}) {
  const targetMessage = await getContactMessageByReference(messageRef);
  if (!targetMessage) {
    return null;
  }

  const allowed = [
    "is_read",
    "status",
    "reply_message",
    "replied_at",
    "replied_by",
    "is_favorite",
    "is_archived",
    "email_sent_at",
    "email_message_id",
    "email_reply_to",
    "email_delivery_status",
    "email_delivery_details",
  ];
  const updates = [];
  const values = [];

  for (const field of allowed) {
    if (Object.prototype.hasOwnProperty.call(fields, field)) {
      updates.push(`${field} = ?`);
      values.push(fields[field]);
    }
  }

  if (updates.length === 0) {
    return serializeContactMessage(targetMessage);
  }

  const lookup = buildContactMessageLookup(targetMessage);
  const [result] = await db.execute(
    `UPDATE contact_messages SET ${updates.join(", ")} WHERE ${lookup.clause} LIMIT 1`,
    [...values, ...lookup.params],
  );
  if (!result.affectedRows) {
    return null;
  }

  const updatedMessage = await getContactMessageByReference(
    getContactMessageReference(targetMessage),
  );
  return serializeContactMessage(updatedMessage);
}

async function updateContactMessageBooleanFlag(
  messageRef,
  fieldName,
  requestedValue,
) {
  const targetMessage = await getContactMessageByReference(messageRef);
  if (!targetMessage) {
    return null;
  }

  const nextValue =
    typeof requestedValue === "boolean"
      ? requestedValue
      : !Boolean(targetMessage[fieldName]);

  return updateContactMessageFields(messageRef, { [fieldName]: nextValue });
}

function getAdminUsernameFromRequest(req) {
  const auth = req.headers.authorization || "";
  if (!auth.startsWith("Bearer ")) {
    return null;
  }

  try {
    const payload = jwt.verify(auth.slice(7), JWT_SECRET);
    return payload?.username || null;
  } catch (e) {
    return null;
  }
}

async function saveContactMessageReply(req, res) {
  const replyMessage = String(req.body?.reply_message || "").trim();
  if (!replyMessage) {
    return res.status(400).json({ error: "reply_message is required" });
  }

  try {
    const targetMessage = await getContactMessageByReference(
      req.params.messageRef,
    );
    if (!targetMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    const delivery = await sendContactReplyEmail(targetMessage, replyMessage);
    const updatedMessage = await updateContactMessageFields(
      req.params.messageRef,
      {
        reply_message: replyMessage,
        status: "replied",
        is_read: true,
        replied_at: new Date(),
        replied_by: getAdminUsernameFromRequest(req),
        email_sent_at: new Date(),
        email_message_id: delivery.messageId,
        email_reply_to: delivery.replyTo,
        email_delivery_status: delivery.rejected?.length
          ? "rejected"
          : "accepted",
        email_delivery_details: JSON.stringify({
          accepted: delivery.accepted,
          rejected: delivery.rejected,
          pending: delivery.pending,
          response: delivery.response,
          envelope: delivery.envelope,
        }),
      },
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    return res.json({ success: true, message: updatedMessage, delivery });
  } catch (e) {
    return res.status(e.statusCode || 500).json({ error: e.message });
  }
}

apiRouter.put("/contact-messages/:messageRef/read", async (req, res) => {
  try {
    const updatedMessage = await updateContactMessageFields(
      req.params.messageRef,
      { is_read: true },
    );
    if (!updatedMessage)
      return res.status(404).json({ error: "Message not found" });
    res.json({ success: true, message: updatedMessage });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.put("/contact-messages/:messageRef/favorite", async (req, res) => {
  try {
    const updatedMessage = await updateContactMessageBooleanFlag(
      req.params.messageRef,
      "is_favorite",
      req.body?.value,
    );
    if (!updatedMessage)
      return res.status(404).json({ error: "Message not found" });
    res.json({ success: true, message: updatedMessage });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.put("/contact-messages/:messageRef/archive", async (req, res) => {
  try {
    const updatedMessage = await updateContactMessageBooleanFlag(
      req.params.messageRef,
      "is_archived",
      req.body?.value,
    );
    if (!updatedMessage)
      return res.status(404).json({ error: "Message not found" });
    res.json({ success: true, message: updatedMessage });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.put("/contact-messages/:messageRef/reply", saveContactMessageReply);
apiRouter.post("/contact-messages/:messageRef/reply", saveContactMessageReply);

apiRouter.put("/contact-messages/:messageRef", async (req, res) => {
  try {
    const updatedMessage = await updateContactMessageFields(
      req.params.messageRef,
      req.body || {},
    );
    if (!updatedMessage)
      return res.status(404).json({ error: "Message not found" });
    res.json({ success: true, message: updatedMessage });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.delete("/contact-messages/:messageRef", async (req, res) => {
  try {
    const targetMessage = await getContactMessageByReference(
      req.params.messageRef,
    );
    if (!targetMessage)
      return res.status(404).json({ error: "Message not found" });

    const lookup = buildContactMessageLookup(targetMessage);
    await db.execute(
      `DELETE FROM contact_messages WHERE ${lookup.clause} LIMIT 1`,
      lookup.params,
    );
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ============ MEMBERSHIP APPLICATIONS ============
apiRouter.post(
  "/membership-applications",
  membershipUpload.fields([
    { name: "subscriber_id_file", maxCount: 1 },
    { name: "reference_id_file", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const payload = normalizeMembershipPayload(req.body || {});

      if (
        !payload.membershipType ||
        !payload.lastname ||
        !payload.email ||
        !payload.phone ||
        !payload.why_join
      ) {
        return res.status(400).json({ error: "Champs obligatoires manquants" });
      }

      if (!req.files?.subscriber_id_file?.[0]) {
        return res
          .status(400)
          .json({
            error: "La piece d'identite du souscripteur est obligatoire",
          });
      }

      const subscriberFile = req.files?.subscriber_id_file?.[0] || null;
      const referenceFile = req.files?.reference_id_file?.[0] || null;
      const [insertResult] = await db.execute(
        `INSERT INTO membership_applications (
                    membership_type, lastname, email, phone, city, province, country,
                    status, payload, subscriber_id_path, reference_id_path, email_delivery_status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          payload.membershipType || null,
          payload.lastname,
          payload.email,
          payload.phone || null,
          payload.city || null,
          payload.province || null,
          payload.country || null,
          "pending_payment",
          JSON.stringify(payload),
          fileToPublicUploadPath(subscriberFile),
          fileToPublicUploadPath(referenceFile),
          "pending",
        ],
      );

      let delivery = null;
      let emailError = null;

      try {
        delivery = await sendMembershipConfirmationEmail(payload, req.files);
        await db.execute(
          `UPDATE membership_applications
                     SET email_delivery_status = ?, email_delivery_details = ?
                     WHERE id = ?`,
          [
            delivery?.admin?.rejected?.length ||
            delivery?.applicant?.rejected?.length
              ? "rejected"
              : "sent",
            JSON.stringify(delivery),
            insertResult.insertId,
          ],
        );
      } catch (mailError) {
        emailError = mailError;
        await db.execute(
          `UPDATE membership_applications
                     SET email_delivery_status = ?, email_delivery_details = ?
                     WHERE id = ?`,
          [
            "failed",
            JSON.stringify({
              message: mailError.message,
              code: mailError.code,
              response: mailError.response,
            }),
            insertResult.insertId,
          ],
        );
        console.error("[MEMBERSHIP EMAIL ERROR]", mailError);
      }

      res.json({
        success: true,
        id: insertResult.insertId,
        delivery,
        email_warning: emailError ? emailError.message : null,
      });
    } catch (e) {
      console.error("[MEMBERSHIP APPLICATION ERROR]", e);
      res.status(e.statusCode || 500).json({ error: e.message });
    }
  },
);

apiRouter.get("/membership-applications/admin", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM membership_applications ORDER BY created_at DESC, id DESC",
    );
    res.json(rows.map(serializeMembershipApplication));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.put("/membership-applications/:id/payment", async (req, res) => {
  try {
    const amount =
      req.body?.amount_paid === undefined || req.body?.amount_paid === ""
        ? null
        : Number(req.body.amount_paid);
    const paymentReference =
      String(req.body?.payment_reference || "").trim() || null;
    const status =
      req.body?.payment_received === false
        ? "pending_payment"
        : "payment_received";

    await db.execute(
      `UPDATE membership_applications
             SET amount_paid = ?, payment_reference = ?, payment_received_at = ?, status = ?
             WHERE id = ?`,
      [
        Number.isFinite(amount) ? amount : null,
        paymentReference,
        status === "payment_received" ? new Date() : null,
        status,
        req.params.id,
      ],
    );

    const [rows] = await db.execute(
      "SELECT * FROM membership_applications WHERE id = ? LIMIT 1",
      [req.params.id],
    );
    res.json({
      success: true,
      application: serializeMembershipApplication(rows[0]),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.put("/membership-applications/:id/validate", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM membership_applications WHERE id = ? LIMIT 1",
      [req.params.id],
    );
    const application = rows[0];
    if (!application)
      return res.status(404).json({ error: "Demande introuvable" });
    if (application.partner_id) {
      return res.json({
        success: true,
        partner_id: application.partner_id,
        application: serializeMembershipApplication(application),
      });
    }
    if (application.status !== "payment_received") {
      return res
        .status(400)
        .json({
          error:
            "Le versement doit etre marque comme recu avant la validation.",
        });
    }

    const payload = serializeMembershipApplication(application).payload;
    const partner = buildPartnerFromMembershipPayload(payload);
    const [partnerResult] = await db.execute(
      `INSERT INTO partners (
                name, contact, region, type, title, company, category,
                description_fr, description_en, sort_order, is_active
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        partner.name,
        partner.contact,
        partner.region,
        partner.type,
        partner.title,
        partner.company,
        partner.category,
        partner.description_fr,
        partner.description_en,
        0,
        true,
      ],
    );

    await db.execute(
      `UPDATE membership_applications
             SET status = 'validated', validated_at = ?, validated_by = ?, partner_id = ?
             WHERE id = ?`,
      [
        new Date(),
        getAdminUsernameFromRequest(req),
        partnerResult.insertId,
        req.params.id,
      ],
    );

    const [updatedRows] = await db.execute(
      "SELECT * FROM membership_applications WHERE id = ? LIMIT 1",
      [req.params.id],
    );
    res.json({
      success: true,
      partner_id: partnerResult.insertId,
      application: serializeMembershipApplication(updatedRows[0]),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ============ UPLOAD ============
apiRouter.post("/upload/image", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file received" });
  res.json({ success: true, image_url: `/uploads/${req.file.filename}` });
});

// ============ CAREER APPLICATIONS ============
apiRouter.post(
  "/career-applications",
  docUpload.fields([
    { name: "cv", maxCount: 1 },
    { name: "letter", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const type = (req.body?.type || "").toString();
      const allowedTypes = new Set(["job", "internship"]);
      if (!allowedTypes.has(type))
        return res.status(400).json({ error: "Invalid type" });

      const {
        civility,
        lastname,
        email,
        phone,
        address,
        city,
        province,
        country,
        education,
        experience,
        motivation,
        signature,
        offer_id,
        offer_title,
      } = req.body || {};

      if (!lastname || !email || !education || !motivation || !signature) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const cvFile = req.files?.cv?.[0];
      const letterFile = req.files?.letter?.[0];
      const cvPath = cvFile ? `/uploads/${cvFile.filename}` : null;
      const letterPath = letterFile ? `/uploads/${letterFile.filename}` : null;

      const [result] = await db.execute(
        `INSERT INTO career_applications
                (type, civility, lastname, email, phone, address, city, province, country, education, experience, motivation, signature, cv_path, letter_path, offer_id, offer_title)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          type,
          civility || null,
          lastname,
          email,
          phone || null,
          address || null,
          city || null,
          province || null,
          country || null,
          education || null,
          experience || null,
          motivation || null,
          signature || null,
          cvPath,
          letterPath,
          offer_id ? Number(offer_id) : null,
          offer_title || null,
        ],
      );

      res.json({
        success: true,
        id: result.insertId,
        cv_path: cvPath,
        letter_path: letterPath,
      });
    } catch (e) {
      console.error("[CAREER APPLICATION ERROR]", e);
      res.status(500).json({ error: e.message });
    }
  },
);

apiRouter.get("/career-applications/admin", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM career_applications ORDER BY created_at DESC, id DESC",
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ============ CAREER OFFERS ============
apiRouter.get("/career-offers", async (req, res) => {
  try {
    const type = (req.query?.type || "").toString();
    const values = [];
    let where = "WHERE is_active = TRUE";
    if (type === "job" || type === "internship") {
      where += " AND type = ?";
      values.push(type);
    }
    const [rows] = await db.execute(
      `SELECT id, type, title, location, contract_type, description, is_active, created_at
             FROM career_offers ${where} ORDER BY created_at DESC, id DESC`,
      values,
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.get("/career-offers/admin", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, type, title, location, contract_type, description, is_active, created_at FROM career_offers ORDER BY created_at DESC, id DESC",
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.post("/career-offers", async (req, res) => {
  try {
    const {
      type,
      title,
      location,
      contract_type,
      description,
      is_active = true,
    } = req.body || {};
    const allowedTypes = new Set(["job", "internship"]);
    if (!allowedTypes.has(type))
      return res.status(400).json({ error: "Invalid type" });
    if (!title) return res.status(400).json({ error: "Title is required" });

    const [result] = await db.execute(
      `INSERT INTO career_offers (type, title, location, contract_type, description, is_active)
             VALUES (?, ?, ?, ?, ?, ?)`,
      [
        type,
        title,
        location || null,
        contract_type || null,
        description || null,
        !!is_active,
      ],
    );
    res.json({ success: true, id: result.insertId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.put("/career-offers/:id", async (req, res) => {
  try {
    const { type, title, location, contract_type, description, is_active } =
      req.body || {};

    const updates = [];
    const values = [];

    if (type) {
      const allowedTypes = new Set(["job", "internship"]);
      if (!allowedTypes.has(type))
        return res.status(400).json({ error: "Invalid type" });
      updates.push("type = ?");
      values.push(type);
    }
    if (typeof title === "string") {
      updates.push("title = ?");
      values.push(title);
    }
    if (typeof location !== "undefined") {
      updates.push("location = ?");
      values.push(location || null);
    }
    if (typeof contract_type !== "undefined") {
      updates.push("contract_type = ?");
      values.push(contract_type || null);
    }
    if (typeof description !== "undefined") {
      updates.push("description = ?");
      values.push(description || null);
    }
    if (typeof is_active !== "undefined") {
      updates.push("is_active = ?");
      values.push(!!is_active);
    }

    if (!updates.length) return res.json({ success: true });

    values.push(req.params.id);
    await db.execute(
      `UPDATE career_offers SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

apiRouter.delete("/career-offers/:id", async (req, res) => {
  try {
    const offerId = req.params.id;
    await db.execute("DELETE FROM career_applications WHERE offer_id = ?", [
      offerId,
    ]);
    await db.execute("DELETE FROM career_offers WHERE id = ?", [offerId]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ============ GALLERY ============
apiRouter.get("/gallery", async (req, res) => {
  try {
    const { lang = "fr", category, type, admin } = req.query || {};
    const isAdmin = admin === "1" || admin === "true";
    let whereClause = "";
    const params = [];

    if (!isAdmin) {
      whereClause = "WHERE is_active = TRUE";
    }
    if (category && category !== "all") {
      whereClause += whereClause ? " AND category = ?" : "WHERE category = ?";
      params.push(category);
    }
    if (type && type !== "all") {
      whereClause += whereClause ? " AND type = ?" : "WHERE type = ?";
      params.push(type);
    }

    const [rows] = await db.execute(
      `SELECT * FROM gallery_items ${whereClause} ORDER BY sort_order ASC, created_at DESC`,
      params,
    );

    res.json(
      rows.map((item) => ({
        ...item,
        is_active: !!item.is_active,
        title: item[`title_${lang}`] || item.title_fr || "",
        description: item[`description_${lang}`] || item.description_fr || "",
      })),
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get("/gallery/admin", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM gallery_items ORDER BY sort_order ASC, created_at DESC",
    );
    res.json(rows.map((item) => ({ ...item, is_active: !!item.is_active })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get("/gallery/:id", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM gallery_items WHERE id = ?",
      [req.params.id],
    );
    if (!rows.length) return res.status(404).json({ error: "Item not found" });
    res.json({ ...rows[0], is_active: !!rows[0].is_active });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/gallery", async (req, res) => {
  try {
    const {
      type = "photo",
      category = "general",
      title_fr,
      title_en,
      title_es,
      title_sw,
      description_fr,
      description_en,
      description_es,
      description_sw,
      image_url,
      video_url,
      video_duration,
      is_active = true,
      sort_order = 0,
    } = req.body;

    const [result] = await db.execute(
      `INSERT INTO gallery_items (type, category, title_fr, title_en, title_es, title_sw,
             description_fr, description_en, description_es, description_sw,
             image_url, video_url, video_duration, is_active, sort_order)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        type,
        category,
        title_fr,
        title_en,
        title_es,
        title_sw,
        description_fr,
        description_en,
        description_es,
        description_sw,
        image_url,
        video_url,
        video_duration,
        !!is_active,
        sort_order,
      ],
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.put("/gallery/:id", async (req, res) => {
  try {
    const allowed = [
      "type",
      "category",
      "title_fr",
      "title_en",
      "title_es",
      "title_sw",
      "description_fr",
      "description_en",
      "description_es",
      "description_sw",
      "image_url",
      "video_url",
      "video_duration",
      "is_active",
      "sort_order",
    ];
    const updates = [];
    const values = [];

    for (const field of allowed) {
      if (Object.prototype.hasOwnProperty.call(req.body || {}, field)) {
        let value = req.body[field];
        if (field === "is_active") value = !!value;
        updates.push(`${field} = ?`);
        values.push(value);
      }
    }

    if (!updates.length) return res.json({ success: true, skipped: true });
    values.push(req.params.id);

    await db.execute(
      `UPDATE gallery_items SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.delete("/gallery/:id", async (req, res) => {
  try {
    await db.execute("DELETE FROM gallery_items WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ ABOUT CONTENT (Mission/Vision/Values/Impact) ============
apiRouter.get("/about-content", async (req, res) => {
  try {
    const { lang = "fr", section, admin } = req.query || {};
    const isAdmin = admin === "1" || admin === "true";
    let whereClause = "";
    const params = [];

    if (!isAdmin) {
      whereClause = "WHERE is_active = TRUE";
    }
    if (section) {
      whereClause += whereClause ? " AND section = ?" : "WHERE section = ?";
      params.push(section);
    }

    const [rows] = await db.execute(
      `SELECT * FROM about_content ${whereClause} ORDER BY section ASC, sort_order ASC`,
      params,
    );

    res.json(
      rows.map((item) => ({
        ...item,
        is_active: !!item.is_active,
        title: item[`title_${lang}`] || item.title_fr || "",
        content: item[`content_${lang}`] || item.content_fr || "",
      })),
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get("/about-content/admin", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM about_content ORDER BY section ASC, sort_order ASC",
    );
    res.json(rows.map((item) => ({ ...item, is_active: !!item.is_active })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.get("/about-content/:id", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM about_content WHERE id = ?",
      [req.params.id],
    );
    if (!rows.length)
      return res.status(404).json({ error: "Content not found" });
    res.json({ ...rows[0], is_active: !!rows[0].is_active });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post("/about-content", async (req, res) => {
  try {
    const {
      section,
      key_name,
      title_fr,
      title_en,
      title_es,
      title_sw,
      content_fr,
      content_en,
      content_es,
      content_sw,
      icon,
      image_url,
      sort_order = 0,
      is_active = true,
    } = req.body;

    if (!section || !key_name) {
      return res
        .status(400)
        .json({ error: "section and key_name are required" });
    }

    const [result] = await db.execute(
      `INSERT INTO about_content (section, key_name, title_fr, title_en, title_es, title_sw,
             content_fr, content_en, content_es, content_sw,
             icon, image_url, sort_order, is_active)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        section,
        key_name,
        title_fr,
        title_en,
        title_es,
        title_sw,
        content_fr,
        content_en,
        content_es,
        content_sw,
        icon,
        image_url,
        sort_order,
        !!is_active,
      ],
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({
          error: "Content with this section and key_name already exists",
        });
    }
    res.status(500).json({ error: error.message });
  }
});

apiRouter.put("/about-content/:id", async (req, res) => {
  try {
    const allowed = [
      "section",
      "key_name",
      "title_fr",
      "title_en",
      "title_es",
      "title_sw",
      "content_fr",
      "content_en",
      "content_es",
      "content_sw",
      "icon",
      "image_url",
      "sort_order",
      "is_active",
    ];
    const updates = [];
    const values = [];

    for (const field of allowed) {
      if (Object.prototype.hasOwnProperty.call(req.body || {}, field)) {
        let value = req.body[field];
        if (field === "is_active") value = !!value;
        updates.push(`${field} = ?`);
        values.push(value);
      }
    }

    if (!updates.length) return res.json({ success: true, skipped: true });
    values.push(req.params.id);

    await db.execute(
      `UPDATE about_content SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );
    res.json({ success: true });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({
          error: "Content with this section and key_name already exists",
        });
    }
    res.status(500).json({ error: error.message });
  }
});

apiRouter.delete("/about-content/:id", async (req, res) => {
  try {
    await db.execute("DELETE FROM about_content WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mount API router
app.use("/api", apiRouter);

// Frontend static
const frontendBuildDir = String(process.env.FRONTEND_BUILD_DIR || "").trim();
const frontendPath = frontendBuildDir
  ? path.resolve(__dirname, frontendBuildDir)
  : path.join(__dirname, "..", "betterlife-ong.org");
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.use((req, res) => {
    if (req.path.startsWith("/api"))
      return res.status(404).json({ error: "Not Found" });
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) =>
    res.json({ message: "BetterLife Backend is running" }),
  );
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res
    .status(500)
    .json({ error: "Internal Server Error", message: err.message });
});

// Start
async function start() {
  try {
    await initializeDatabase();
    app.listen(PORT, () =>
      console.log(`[START] Server running on port ${PORT}`),
    );
  } catch (e) {
    console.error("[START] Fatal start error:", e.message);
    // Fallback start without DB
    app.listen(PORT, () =>
      console.log(`[START] Server running on port ${PORT} (SANS DATABASE)`),
    );
  }
}

start();
