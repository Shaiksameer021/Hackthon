/**
 * BrandMind — Agent 03: Shape
 * Architecture Role:
 *   • Brand name
 *   • Tagline
 *   • Personality
 *   • Voice
 * Translates Discover and Position insights into living brand assets.
 */

import { executeStagePrompt } from '../services/aiEngine.js';
import { parseIdea } from '../utils/ideaParser.js';

export function runShapeFallback(context, parsedIdea) {
  const discover = context.discover || {};
  const position = context.position || {};
  const audience = discover.targetAudience?.primary || parsedIdea.actors || 'Users';
  const coreProblem = discover.coreProblem || parsedIdea.problem || 'friction';

  const brandName = parsedIdea.baseName || 'BrandMind';
  const draftTagline = `The simplest way for ${audience.toLowerCase()} to succeed without ${coreProblem.toLowerCase()}.`;

  const personality = [
    'Empathetic & Attentive',
    'Clear & Unpretentious',
    'Practical & Dependable'
  ];

  const voice = {
    tone: `Warm, direct, and conversational — like a competent colleague explaining something simply.`,
    rules: {
      do: [
        'Use plain, active verbs that respect the user’s time',
        'Speak directly to the user as "you"',
        'State concrete facts and real-world outcomes'
      ],
      dont: [
        'Never use corporate buzzwords like "synergy", "paradigm", or "revolutionary"',
        'Avoid passive sentences that obscure who is doing what',
        'Never make hyperbolic claims that cannot be proven'
      ]
    }
  };

  const guidingPrinciples = [
    `Solve the user's real daily pain (${coreProblem.toLowerCase()}) before adding new bells and whistles.`,
    `Speak with complete transparency: clear pricing, clear language, clear outcomes.`,
    `Respect the intelligence and time of ${audience.toLowerCase()} in every touchpoint.`
  ];

  return {
    brandName,
    selectedName: brandName,
    draftTagline,
    personality,
    personalityTraits: personality,
    voice,
    voiceAndStyle: {
      tone: voice.tone,
      personalityTraits: personality
    },
    guidingPrinciples,
    messageHierarchy: {
      primaryHeadline: `${brandName}: Built for ${audience}`,
      subheadline: draftTagline,
      keyProofPoints: [
        `Laser-focused on solving "${coreProblem.toLowerCase()}"`,
        `Intuitive from minute one — zero steep onboarding curve`,
        `Built around real ${audience.toLowerCase()} feedback`
      ]
    },
    decisionTrace: {
      stage: 'shape',
      decision: `Shaped the brand as "${brandName}" with draft tagline "${draftTagline}"`,
      reason: `Name is derived directly from the concept core; voice prioritizes clarity over corporate jargon`,
      result: `Delivered name, tagline, personality, and voice rules to Visualize and Challenge agents`
    }
  };
}

export async function runShapeAgent(context) {
  const parsedIdea = context.parsedIdea || parseIdea(context.originalIdea, context.clarificationAnswers);

  const prompt = `
You are Agent 03 (Shape) in the BrandMind Multi-Agent System.
Your job is to give this brand its human form: its name, tagline, personality, and voice.

Context:
- Idea: "${context.originalIdea}"
- Audience: "${context.discover?.targetAudience?.primary || parsedIdea.actors}"
- Core Problem: "${context.discover?.coreProblem || parsedIdea.problem}"
- Category: "${context.position?.category || parsedIdea.category}"
- Value Proposition: "${context.position?.valueProposition}"
- Differentiator: "${context.position?.differentiator}"

RESPONSIBILITIES:
1. Brand Name: Create a punchy, memorable, modern name (1-2 words max). Avoid generic buzzwords.
2. Tagline: An initial draft tagline (this will be stress-tested by Agent 05 Challenge).
3. Personality: 3 distinct character traits that define how the brand acts.
4. Voice: Tone definition and clear DOs / DONTs for writing copy.

Output strict JSON:
{
  "brandName": "A catchy, modern name (e.g. Lumio, ToolNest, LedgerFlow)",
  "selectedName": "Same as brandName",
  "draftTagline": "A clear, active draft tagline summarizing the primary benefit",
  "personality": ["Trait 1", "Trait 2", "Trait 3"],
  "personalityTraits": ["Trait 1", "Trait 2", "Trait 3"],
  "voice": {
    "tone": "Description of voice tone in everyday words",
    "rules": {
      "do": ["Do rule 1", "Do rule 2"],
      "dont": ["Dont rule 1", "Dont rule 2"]
    }
  },
  "guidingPrinciples": ["Principle 1", "Principle 2", "Principle 3"],
  "messageHierarchy": {
    "primaryHeadline": "Hero headline for the concept",
    "subheadline": "Supporting subhead",
    "keyProofPoints": ["Proof point 1", "Proof point 2", "Proof point 3"]
  },
  "decisionTrace": {
    "stage": "shape",
    "decision": "Brand name, tagline, and personality established",
    "reason": "Why these choices emotionally connect with the target audience",
    "result": "Passed to Visualize for visual branding and Challenge for critique"
  }
}
`;

  return await executeStagePrompt({
    stageName: 'shape',
    prompt,
    fallbackFn: runShapeFallback,
    context,
    parsedIdea
  });
}
