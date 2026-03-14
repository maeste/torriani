---
id: IIS-6
title: 'Slide 05: L''arte del prompt — comunicare con l''IA'
status: Done
assignee:
  - claude
created_date: '2026-03-13 11:25'
updated_date: '2026-03-13 11:50'
labels:
  - slide
  - sessione-2
  - jsx
  - markdown
milestone: m-0
dependencies: []
references:
  - prompt_engineering.md (contenuto da adattare)
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Sessione 2, Atto 1-2 (10 min recap + 25 min prompt engineering)**

Slide JSX con recap visuale rapido Sessione 1 + prompt engineering interattivo.

**Recap (10 min)**: 1 slide riassuntiva interattiva della Sessione 1. "L'unica interfaccia tra voi e questa potenza è il linguaggio naturale."

**Prompt engineering (25 min)**:
**80% divulgativo**: 3 dimostrazioni — generico vs specifico (Rinascimento), ruolo ("Sei un professore di storia dell'arte"), chain of thought (problema logica con/senza ragionamento step-by-step). Visualizzazione side-by-side dei risultati.
**20% tana del bianconiglio**: Few-shot learning — il modello "capisce" il pattern da 3 esempi senza ri-addestramento, nessuno sa completamente come. System prompt vs user prompt — ogni chatbot ha una personalità nascosta.

Creare: `05_arte_del_prompt.jsx` + `05_arte_del_prompt.md`

Il markdown deve includere i prompt esatti da usare nelle demo live con Claude Code.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Slide recap interattiva della Sessione 1
- [x] #2 Confronto side-by-side prompt generico vs specifico
- [x] #3 Visualizzazione effetto del ruolo sul tono
- [x] #4 Demo chain of thought con/senza
- [x] #5 Markdown con tutti i prompt esatti per demo live
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create `transformer_intro/05_arte_del_prompt.jsx`:
   - Session 1 recap: interactive summary card with key concepts
   - Side-by-side comparison: generic vs specific prompt (Rinascimento example)
   - Role effect visualization: same question with different roles
   - Chain of thought demo: with/without step-by-step reasoning
   - Collapsible rabbit hole: few-shot learning, system prompt vs user prompt
2. Create `transformer_intro/05_arte_del_prompt.md`:
   - Presenter notes with exact prompts for live Claude Code demos
   - FAQ, 20% hardcore section
   - Reference prompt_engineering.md content
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented both files:
- `05_arte_del_prompt.jsx`: Session 1 recap with expandable pills, generic vs specific comparison (Rinascimento), 3-role demo (biologo/maestro/poeta), chain of thought toggle, prompt recipe blocks, collapsible rabbit hole (few-shot, system prompt, temperature, prompt injection)
- `05_arte_del_prompt.md`: Timed presenter script (10+25 min), exact copy-paste prompts for all demos + 2 bonus wow prompts, 5 FAQ, 20% hardcore section, transition to next slide
<!-- SECTION:NOTES:END -->
