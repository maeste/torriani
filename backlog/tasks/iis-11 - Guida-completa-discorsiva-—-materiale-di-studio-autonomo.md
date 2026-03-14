---
id: IIS-11
title: Guida completa discorsiva — materiale di studio autonomo
status: Done
assignee:
  - claude
created_date: '2026-03-13 11:26'
updated_date: '2026-03-13 12:07'
labels:
  - materiale
  - markdown
milestone: m-0
dependencies:
  - IIS-1
  - IIS-2
  - IIS-3
  - IIS-4
  - IIS-5
  - IIS-6
  - IIS-7
  - IIS-8
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Markdown lungo e discorsivo che copre l'intero arco della presentazione, pensato per essere letto con calma dagli studenti dopo la lezione.

**Struttura** (segue la narrativa delle slide):
1. La quinta rivoluzione — contesto storico
2. Dalle parole ai numeri — come un LLM vede il testo
3. Come impara una macchina — gradient descent spiegato
4. L'attenzione — il meccanismo chiave
5. I limiti — cosa gli LLM non sono e non fanno
6. L'arte del prompt — comunicare efficacemente
7. L'IA per ogni futuro — applicazioni per campo
8. Il vostro ruolo — etica, privacy, pensiero critico

Ogni capitolo deve avere:
- Spiegazione discorsiva accessibile (non slide-style, ma narrativa)
- "Per approfondire": link al materiale avanzato (transformer_intro/ esistente)
- 2-3 domande di riflessione

**Tono**: come un buon libro divulgativo italiano. Accessibile ma non banale.

Creare: `guida_completa.md`
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 8 capitoli corrispondenti alle 8 slide
- [x] #2 Tono discorsivo e narrativo, non bullet-point
- [x] #3 Sezione Per approfondire con link a transformer_intro/
- [x] #4 2-3 domande di riflessione per capitolo
- [x] #5 Leggibile autonomamente senza aver visto la presentazione
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
Create `guida_completa.md` in project root: 8-chapter narrative guide following the slide arc, discursive tone, reflection questions, links to transformer_intro/ materials.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented:
- `guida_completa.md`: 6,122 words, 8 narrative chapters following slide arc, discursive Piero Angela-style tone, "Per approfondire" boxes linking to transformer_intro/ files, 2-3 reflection questions per chapter, glossary of 18 key terms. Self-contained and readable without having seen the presentation.
<!-- SECTION:NOTES:END -->
