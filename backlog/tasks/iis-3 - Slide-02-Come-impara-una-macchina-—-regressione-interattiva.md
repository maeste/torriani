---
id: IIS-3
title: 'Slide 02: Come impara una macchina — regressione interattiva'
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
references:
  - how_llms_work.ipynb (sezione regressione da convertire)
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Sessione 1, Atto 3 (20 min)**

Slide JSX che ricrea il contenuto del notebook Jupyter sulla regressione lineare/gradient descent in formato interattivo. NON usare notebook — tutto in JSX.

**80% divulgativo**: Punti su grafico con linea adattabile, slider per slope/intercept (i ragazzi suggeriscono), bottone "Train" che mostra la macchina provare-sbagliare-correggere. "Tutto il ML è questo: provare, misurare errore, correggere. Miliardi di volte."
**20% tana del bianconiglio**: Grafico MSE che scende (loss function), "GPT-4 ha fatto questo con 13 trilioni di token, training costato ~100M$"

Creare: `02_come_impara_una_macchina.jsx` + `02_come_impara_una_macchina.md`

Riferimento: contenuto regressione dal notebook `how_llms_work.ipynb` da convertire in JSX interattivo.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Grafico scatter con punti e linea di regressione interattiva
- [x] #2 Slider per slope e intercept manipolabili manualmente
- [x] #3 Bottone Train con animazione gradient descent
- [x] #4 Grafico loss function che scende durante training
- [x] #5 Markdown con note, FAQ, riferimenti al notebook originale
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create `transformer_intro/02_come_impara_una_macchina.jsx` with:
   - Same design system (COLORS, Section, Tag, Formula)
   - Scatter plot with data points and regression line (Recharts)
   - Slope and intercept sliders for manual manipulation
   - "Train" button with animated gradient descent (step-by-step MSE reduction)
   - Loss function chart showing MSE decreasing during training
   - Reference content from how_llms_work.ipynb regression section
   - useState for slope, intercept, training state, history
2. Create `transformer_intro/02_come_impara_una_macchina.md` with:
   - Presenter notes, FAQ, hardcore section (loss function, GPT-4 training cost)
   - References to original notebook
   - Italian language
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented both files:
- `02_come_impara_una_macchina.jsx`: ComposedChart with scatter+line, slope/intercept sliders, gradient descent animation (15 steps via setInterval), loss history chart, key message box, collapsible rabbit hole with formulas and training cost comparison
- `02_come_impara_una_macchina.md`: Full presenter notes with interactive demo script, FAQ, 20% hardcore section, notebook reference, transition to next slide
<!-- SECTION:NOTES:END -->
