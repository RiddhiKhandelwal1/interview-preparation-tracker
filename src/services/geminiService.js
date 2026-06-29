/**
 * geminiService.js
 *
 * Calls the Gemini API with aggregated user problem-solving stats
 * and returns a structured, personalized study plan.
 */

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

/**
 * Builds a structured prompt from the user's problem-solving data.
 */
function buildPrompt(stats) {
  const {
    totalSolved,
    totalProblems,
    solveRate,
    easy,
    medium,
    hard,
    streak,
    topicBreakdown,
    weakTopics,
    strongTopics,
  } = stats;

  return `You are an expert DSA and interview preparation coach. Analyze the following student's problem-solving statistics and provide a highly personalized, actionable study plan.

## Student Stats:
- Total problems tracked: ${totalProblems}
- Problems solved: ${totalSolved} (${solveRate}% solve rate)
- Easy solved: ${easy} | Medium solved: ${medium} | Hard solved: ${hard}
- Current streak: ${streak} days
- Topics covered (solved count): ${JSON.stringify(topicBreakdown)}
- Weakest topics (least solved): ${weakTopics.join(', ') || 'None yet'}
- Strongest topics (most solved): ${strongTopics.join(', ') || 'None yet'}

## Instructions:
Respond ONLY in the following JSON format (no markdown, no extra text):
{
  "summary": "2-3 sentence honest assessment of their preparation level",
  "nextDifficultyTarget": "easy|medium|hard",
  "weeklyGoal": "X problems per day recommendation as a short sentence",
  "focusTopics": ["topic1", "topic2", "topic3"],
  "avoidTopics": ["topic1"],
  "dailyPlan": [
    { "day": "Day 1–2", "task": "specific actionable task" },
    { "day": "Day 3–4", "task": "specific actionable task" },
    { "day": "Day 5–7", "task": "specific actionable task" }
  ],
  "tip": "One powerful motivational or strategic tip tailored to their profile"
}`;
}

/**
 * Aggregates raw problems array into structured stats for the prompt.
 */
function aggregateStats(problems) {
  const solved = problems.filter((p) => p.solved);
  const totalSolved = solved.length;
  const totalProblems = problems.length;
  const solveRate = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

  const easy = solved.filter((p) => p.difficulty === 'easy').length;
  const medium = solved.filter((p) => p.difficulty === 'medium').length;
  const hard = solved.filter((p) => p.difficulty === 'hard').length;

  // Topic breakdown
  const topicMap = {};
  solved.forEach((p) => {
    const t = p.topic || 'Unknown';
    topicMap[t] = (topicMap[t] || 0) + 1;
  });

  const topicEntries = Object.entries(topicMap).sort((a, b) => b[1] - a[1]);
  const strongTopics = topicEntries.slice(0, 3).map(([t]) => t);
  const weakTopics = topicEntries.slice(-3).map(([t]) => t).filter((t) => !strongTopics.includes(t));

  // Streak calculation
  const dates = solved.filter((p) => p.dateSolved).map((p) => p.dateSolved);
  const uniqueDates = [...new Set(dates.map((d) => d.split('T')[0]))].sort().reverse();
  let streak = 0;
  if (uniqueDates.length > 0) {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (uniqueDates[0] === today || uniqueDates[0] === yesterday) {
      streak = 1;
      for (let i = 1; i < uniqueDates.length; i++) {
        const diff = (new Date(uniqueDates[i - 1]) - new Date(uniqueDates[i])) / 86400000;
        if (diff === 1) streak++;
        else break;
      }
    }
  }

  return {
    totalSolved,
    totalProblems,
    solveRate,
    easy,
    medium,
    hard,
    streak,
    topicBreakdown: topicMap,
    weakTopics,
    strongTopics,
  };
}

/**
 * Main function: calls Gemini and returns parsed coaching advice.
 * @param {Array} problems - raw problems array from Redux
 * @returns {Promise<Object>} parsed JSON coaching plan
 */
export async function getAICoachingPlan(problems) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('VITE_GEMINI_API_KEY is not set in your .env file.');

  const stats = aggregateStats(problems);
  const prompt = buildPrompt(stats);

  const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      // Lower temperature = more deterministic JSON, higher token limit for 7-day plan
      generationConfig: { temperature: 0.1, maxOutputTokens: 2048 },
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || 'Gemini API request failed.');
  }

  const data = await res.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

  console.log('[Gemini] Raw response:', rawText);

  return extractJSON(rawText);
}

/**
 * Robustly extracts a JSON object from a Gemini response string.
 * Handles markdown fences, leading prose, trailing text, and truncated responses.
 */
function extractJSON(raw) {
  if (!raw || !raw.trim()) {
    throw new Error('Gemini returned an empty response. Please try again.');
  }

  // Strategy 1: strip markdown fences and try direct parse
  const stripped = raw
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim();

  try {
    return JSON.parse(stripped);
  } catch {
    // fall through
  }

  // Strategy 2: find the outermost { ... } block
  const start = stripped.indexOf('{');
  const end = stripped.lastIndexOf('}');

  if (start !== -1 && end !== -1 && end > start) {
    const candidate = stripped.substring(start, end + 1);
    try {
      return JSON.parse(candidate);
    } catch {
      // fall through to strategy 3
    }

    // Strategy 3: the JSON was truncated — close any open arrays/objects
    try {
      const fixed = closeOpenJSON(candidate);
      return JSON.parse(fixed);
    } catch {
      // fall through
    }
  }

  throw new Error(
    'Could not parse AI response. The model may have returned malformed JSON. Please try again.'
  );
}

/**
 * Attempts to close a truncated JSON string by counting unclosed brackets.
 */
function closeOpenJSON(str) {
  const stack = [];
  let inString = false;
  let escape = false;

  for (const ch of str) {
    if (escape) { escape = false; continue; }
    if (ch === '\\' && inString) { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === '{' || ch === '[') stack.push(ch === '{' ? '}' : ']');
    if (ch === '}' || ch === ']') stack.pop();
  }

  // Close any hanging string, then close all open brackets in reverse
  let fixed = str;
  if (inString) fixed += '"';
  return fixed + stack.reverse().join('');
}

