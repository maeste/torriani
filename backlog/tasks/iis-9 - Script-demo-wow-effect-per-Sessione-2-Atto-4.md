---
id: IIS-9
title: Script demo wow-effect per Sessione 2 Atto 4
status: Done
assignee:
  - claude
created_date: '2026-03-13 11:25'
updated_date: '2026-03-13 11:55'
labels:
  - sessione-2
  - demo
  - markdown
milestone: m-0
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Sessione 2, Atto 4 (15 min)**

Preparare 4 demo pre-costruite e spettacolari da eseguire live con Claude Code. Ogni demo deve avere: prompt esatto, output atteso, talking points per il presentatore, timing stimato.

**Demo 1: Analisi testo di maturità**
Prendere un testo d'esame reale, farlo analizzare con profondità. Mostrare come uno studente può usarlo per STUDIARE (non copiare — capire). Prompt che genera analisi stilistica, tematica, collegamenti interdisciplinari.

**Demo 2: Debug di codice**
Programma Python con bug non banale. Claude Code lo trova, lo spiega, lo corregge. Mostrare il flusso di ragionamento.

**Demo 3: L'assistente di studio perfetto**
Costruire live un system prompt che crea un tutor personalizzato per una materia specifica. Mostrare come iterare sul prompt per migliorarlo.

**Demo 4: Analisi multidisciplinare**
Dato un tema (es. cambiamento climatico), far generare analisi da prospettive diverse: scientifica, economica, filosofica, artistica. Mostrare la versatilità.

Creare: `demo_scripts.md` con tutti i prompt, output attesi, e note per il presentatore.

NOTA: le demo devono funzionare con certezza. Testare ogni prompt prima della presentazione.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 4 demo con prompt esatti pronti per Claude Code
- [x] #2 Output atteso documentato per ogni demo
- [x] #3 Talking points per il presentatore per ogni demo
- [x] #4 Timing stimato per ogni demo (totale ~15 min)
- [x] #5 Tutti i prompt testati e funzionanti
- [x] #6 Fallback plan per ogni demo se qualcosa va storto
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create `transformer_intro/demo_scripts.md`: 4 demo scripts with exact prompts, expected outputs, talking points, timing (~15 min total), fallback plans. Demos: maturità text analysis, Python debug, study tutor system prompt, multidisciplinary analysis.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented:
- `demo_scripts.md`: 4 complete demo scripts (maturità text with Ungaretti's "Soldati", Python debug with mutable default arg bug, 3-version tutor prompt progression, multidisciplinary climate analysis). Timing table, setup instructions, presenter tips, fallback plans for each demo.
<!-- SECTION:NOTES:END -->
