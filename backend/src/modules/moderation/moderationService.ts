import { Content } from "../../models/Content";
import { Rule } from "../../models/Rule";

interface MatchResult {
  pattern: string;
  label: "HATE_SPEECH" | "SPAM" | "VIOLENCE" | "EXPLICIT";
}

// Scans text against database rules
export const scanTextWithRules = async (text: string): Promise<MatchResult[]> => {
  if (!text) return [];
  const cleaned = text.toLowerCase().trim();
  const rules = await Rule.find();
  const matches: MatchResult[] = [];

  for (const rule of rules) {
    if (rule.ruleType === "KEYWORD") {
      const escapedWord = rule.pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const wordRegex = new RegExp(`\\b${escapedWord}\\b`, "i");
      if (wordRegex.test(cleaned)) {
        matches.push({ pattern: rule.pattern, label: rule.label });
      }
    } else if (rule.ruleType === "REGEX") {
      try {
        const customRegex = new RegExp(rule.pattern, "i");
        if (customRegex.test(text)) {
          matches.push({ pattern: rule.pattern, label: rule.label });
        }
      } catch (err) {
        // Skip malformed regexes
        continue;
      }
    }
  }

  return matches;
};

// Simulated NLP Toxicity scoring (representing BERT/DeBERTa)
export const analyzeTextToxicity = (text: string, matches: MatchResult[]): number => {
  const textLower = text.toLowerCase();
  let score = 0.05; // Base toxicity score

  // Rule matches scale score
  for (const m of matches) {
    if (m.label === "HATE_SPEECH") score += 0.50;
    else if (m.label === "VIOLENCE") score += 0.45;
    else if (m.label === "SPAM") score += 0.25;
    else if (m.label === "EXPLICIT") score += 0.40;
  }

  // Trigger keywords for simulated semantic detection
  const semanticTriggers = {
    "destroy": 0.25,
    "scam": 0.35,
    "giveaway": 0.25,
    "double your": 0.40,
    "nude": 0.50,
    "idiot": 0.30
  };

  for (const [key, val] of Object.entries(semanticTriggers)) {
    if (textLower.includes(key)) {
      score += val;
    }
  }

  return Math.min(Math.max(score, 0.0), 1.0);
};

// Simulated CV Image categorization
export const analyzeImageMedia = (url: string): { score: number; tags: string[] } => {
  const urlLower = url.toLowerCase();
  
  let adultScore = 0.02;
  let violenceScore = 0.03;
  let spamScore = 0.05;
  const tags: string[] = [];

  // Artificially trigger based on url keywords to allow interactive sandbox tests
  if (urlLower.includes("adult") || urlLower.includes("nsfw") || urlLower.includes("nude")) {
    adultScore = 0.88;
    tags.push("NSFW_CONTENT");
  }
  if (urlLower.includes("violence") || urlLower.includes("blood") || urlLower.includes("gun")) {
    violenceScore = 0.92;
    tags.push("GORE_VIOLENCE");
  }
  if (urlLower.includes("promo") || urlLower.includes("scam") || urlLower.includes("giveaway")) {
    spamScore = 0.78;
    tags.push("SPAM_BANNER");
  }

  const maxScore = Math.max(adultScore, violenceScore, spamScore);
  return { score: maxScore, tags };
};

// Simulated video frame processing and Whisper speech audio transcripts
export const analyzeVideoMedia = async (url: string): Promise<{ score: number; transcript: string; tags: string[] }> => {
  const urlLower = url.toLowerCase();
  let score = 0.05;
  let transcript = "Default clean video audio transcript.";
  const tags: string[] = [];

  if (urlLower.includes("scam") || urlLower.includes("promo")) {
    transcript = "Hey guys, send me 1 BTC and I will double your crypto double! Click details below.";
    score = 0.82;
    tags.push("SPAM_AUDIO");
  } else if (urlLower.includes("violence") || urlLower.includes("blood") || urlLower.includes("kill")) {
    transcript = "We are going to go and murder them right now, let's kill.";
    score = 0.90;
    tags.push("VIOLENCE_TRANSCRIPT");
  } else if (urlLower.includes("adult") || urlLower.includes("nsfw")) {
    transcript = "Adult content warning.";
    score = 0.85;
    tags.push("EXPLICIT_VIDEO");
  }

  return { score, transcript, tags };
};

// Core moderation orchestrator
export const runModerationPipeline = async (contentId: string): Promise<void> => {
  const content = await Content.findById(contentId);
  if (!content) return;

  // 1. Mark status as under review
  content.status = "under_review";
  await content.save();

  // Simulate queue latency
  await new Promise(resolve => setTimeout(resolve, 1500));

  let finalScore = 0.05;
  let autoDecision: "approved" | "rejected" | "flagged" = "approved";
  const matchedRules: string[] = [];

  if (content.contentType === "text" && content.textPayload) {
    const rulesMatched = await scanTextWithRules(content.textPayload);
    finalScore = analyzeTextToxicity(content.textPayload, rulesMatched);
    rulesMatched.forEach(m => matchedRules.push(`${m.label}: ${m.pattern}`));
  } 
  
  else if (content.contentType === "image" && content.mediaUrl) {
    const imgAnalysis = analyzeImageMedia(content.mediaUrl);
    finalScore = imgAnalysis.score;
    imgAnalysis.tags.forEach(t => matchedRules.push(t));

    // If image has accompanying text payload (OCR), moderating that as well
    if (content.textPayload) {
      const ocrRules = await scanTextWithRules(content.textPayload);
      const ocrScore = analyzeTextToxicity(content.textPayload, ocrRules);
      finalScore = Math.max(finalScore, ocrScore);
      ocrRules.forEach(m => matchedRules.push(`OCR_TEXT_${m.label}: ${m.pattern}`));
    }
  } 
  
  else if (content.contentType === "video" && content.mediaUrl) {
    const vidAnalysis = await analyzeVideoMedia(content.mediaUrl);
    finalScore = vidAnalysis.score;
    vidAnalysis.tags.forEach(t => matchedRules.push(t));

    // Evaluate transcribed audio text against rules
    const audioRules = await scanTextWithRules(vidAnalysis.transcript);
    const audioScore = analyzeTextToxicity(vidAnalysis.transcript, audioRules);
    finalScore = Math.max(finalScore, audioScore);
    audioRules.forEach(m => matchedRules.push(`AUDIO_${m.label}: ${m.pattern}`));
  }

  // 2. Threshold Classification Logic
  // Toxicity Score Limits:
  // < 0.35 : auto-approve
  // > 0.70 : auto-reject
  // 0.35 - 0.70 or has rules: flag for human reviewer
  
  if (finalScore < 0.35 && matchedRules.length === 0) {
    autoDecision = "approved";
  } else if (finalScore > 0.70) {
    autoDecision = "rejected";
  } else {
    autoDecision = "flagged";
  }

  // Update content status with classification
  content.status = autoDecision;
  
  // We can attach the toxicity score and triggers to textPayload or store them.
  // To keep schemas robust, let's append rule triggers to textPayload if flagged,
  // or store in content status.
  await content.save();
};
