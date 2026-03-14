---
id: IIS-2
title: 'Slide 01: Dalle parole ai numeri — token, embedding, vettori'
status: Done
assignee:
  - claude
created_date: '2026-03-13 11:24'
updated_date: '2026-03-13 11:40'
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
**Sessione 1, Atto 2 (20 min)**

Slide JSX con esplorazione interattiva di tokenizzazione e embedding.

**80% divulgativo**: Demo tokenizer (scrivi frase → vedi token), embedding come punti nello spazio, aritmetica vettoriale (Re - Uomo + Donna = Regina) con slider interattivo, analogia GPS per concetti
**20% tana del bianconiglio**: Vettori a 4096 dimensioni, flash sulla formula dell'embedding e softmax — "non dovete capirla ora, ma è tutta qui"

Creare: `01_dalle_parole_ai_numeri.jsx` + `01_dalle_parole_ai_numeri.md`
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Tokenizer interattivo: input testo → visualizzazione token
- [x] #2 Spazio embedding 2D/3D navigabile con slider
- [x] #3 Aritmetica vettoriale visuale e interattiva
- [x] #4 Markdown con note presentatore, FAQ, sezione hardcore
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create `transformer_intro/01_dalle_parole_ai_numeri.jsx` with:
   - Same design system (COLORS, Section, Tag, Formula)
   - Interactive tokenizer: text input → colored token blocks with IDs
   - 2D embedding space with navigable scatter plot (predefined word vectors)
   - Vector arithmetic visualization: Re - Uomo + Donna = Regina with animated arrows
   - Slider to explore embedding dimensions
   - useState for input text, selected vectors, animation state
2. Create `transformer_intro/01_dalle_parole_ai_numeri.md` with:
   - Presenter notes, FAQ, hardcore section (4096 dims, softmax formula)
   - Italian language
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented both files:
- `01_dalle_parole_ai_numeri.jsx`: Interactive tokenizer with subword splits, SVG 2D embedding space with 18 words in 5 clusters, vector arithmetic animation (Re - Uomo + Donna = Regina), collapsible rabbit hole with dimensionality, embedding matrix, cosine similarity
- `01_dalle_parole_ai_numeri.md`: Full presenter notes with demo instructions, FAQ, 20% hardcore section, transition to next slide
<!-- SECTION:NOTES:END -->
