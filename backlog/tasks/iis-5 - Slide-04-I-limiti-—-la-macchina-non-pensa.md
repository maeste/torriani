---
id: IIS-5
title: 'Slide 04: I limiti — la macchina non pensa'
status: Done
assignee:
  - claude
created_date: '2026-03-13 11:24'
updated_date: '2026-03-13 11:49'
labels:
  - slide
  - sessione-1
  - jsx
  - markdown
milestone: m-0
dependencies:
  - IIS-1
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Sessione 1, Atto 5 (15 min)**

Slide JSX su allucinazioni, bias e limiti fondamentali degli LLM. Include spunti per demo live.

**80% divulgativo**: Esempi di allucinazioni (fatti inventati con sicurezza), bias nei dati come specchio della società, "Non capisce. Predice. La differenza è enorme." Dati di training: da dove vengono, chi decide.
**20% tana del bianconiglio**: RLHF in 30 secondi — umani dicono "questa risposta è meglio". Il problema dell'allineamento come uno dei più importanti della nostra epoca.

Include anche la chiusura Sessione 1 (recap 5 min + teaser Sessione 2).

Creare: `04_limiti.jsx` + `04_limiti.md`

Il markdown deve contenere anche suggerimenti per le demo live (prompt specifici per far allucinare il modello, prompt bias-loaded).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Visualizzazione interattiva allucinazioni vs fatti verificati
- [x] #2 Sezione bias con esempi concreti e visuali
- [x] #3 Schema RLHF semplificato ma corretto
- [x] #4 Markdown con prompt specifici per demo live
- [x] #5 Slide recap Sessione 1 integrata
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create `transformer_intro/04_limiti.jsx`:
   - Hallucination visualizer: side-by-side fact vs hallucination cards with confidence meters
   - Bias section: visual examples of training data bias
   - Simplified RLHF diagram: human feedback loop
   - "Non capisce. Predice." key message
   - Session 1 recap slide integrated at bottom
   - Collapsible rabbit hole: RLHF details, alignment problem
2. Create `transformer_intro/04_limiti.md`:
   - Presenter notes with specific prompts for live demos (hallucination-inducing, bias-loaded)
   - FAQ, 20% hardcore section, session recap script
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented both files:
- `04_limiti.jsx`: Key message banner, 3-tab hallucination visualizer with confidence meters, bias section with funnel diagram, 4-step RLHF diagram, Session 1 recap with teaser, collapsible rabbit hole (Constitutional AI, DPO, alignment, jailbreaking)
- `04_limiti.md`: Timed presenter script, 5 live demo prompts (3 hallucination + 2 bias), 5 FAQ questions, 20% hardcore section, Session 1 recap script, teaser for Session 2
<!-- SECTION:NOTES:END -->
