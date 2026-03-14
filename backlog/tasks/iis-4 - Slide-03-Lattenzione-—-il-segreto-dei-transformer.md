---
id: IIS-4
title: 'Slide 03: L''attenzione — il segreto dei transformer'
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
references:
  - transformer_intro/01_attention_memory.md
  - transformer_intro/04_attention_matrix_deep.md
  - transformer_intro/attention_memory.jsx
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Sessione 1, Atto 4 (20 min)**

Slide JSX con visualizzazione semplificata del meccanismo di attenzione. Versione "lite" rispetto ai moduli transformer_intro esistenti.

**80% divulgativo**: Frase esempio "Il gatto si sedette sul tappeto perché era stanco" — chi è "era"? Matrice di attenzione colorata con pattern visibili. Next token prediction: la macchina scrive UNA parola alla volta.
**20% tana del bianconiglio**: Formula Attention(Q,K,V) = softmax(QK^T/√d)·V — "tutto il paper Attention Is All You Need è qui". Crescita quadratica: 1000 parole = 1M calcoli, 100K parole = 10 miliardi. Tabella memoria semplificata (dal modulo 04 esistente).

Creare: `03_attenzione.jsx` + `03_attenzione.md`
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Frase interattiva con highlight attenzione parola-per-parola
- [x] #2 Matrice di attenzione colorata e navigabile
- [x] #3 Demo next token prediction visuale
- [x] #4 Formula attention mostrata in modo chiaro ma non intimidatorio
- [x] #5 Markdown con note presentatore, FAQ, sezione hardcore
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create `transformer_intro/03_attenzione.jsx`:
   - Interactive sentence "Il gatto si sedette sul tappeto perché era stanco" with word-by-word attention highlight
   - Colored attention matrix (simplified, clickable cells)
   - Next token prediction demo: show probability distribution for next word
   - Attention formula shown clearly with Formula component
   - Collapsible rabbit hole: quadratic scaling, memory table from existing module 04
2. Create `transformer_intro/03_attenzione.md`:
   - Presenter notes for each section, FAQ, 20% hardcore separated
   - Reference existing modules 01/04 for deeper content
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented both files:
- `03_attenzione.jsx`: Interactive sentence with clickable attention highlights, 9x9 attention matrix with hover, 3-step next token prediction demo, attention formula with Q/K/V analogy cards, collapsible rabbit hole with scaling and memory table
- `03_attenzione.md`: Full presenter notes with 7-section script, 6 FAQ questions, 20% hardcore section, references to deeper modules
<!-- SECTION:NOTES:END -->
