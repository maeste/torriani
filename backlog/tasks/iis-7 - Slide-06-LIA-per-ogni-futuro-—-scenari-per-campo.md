---
id: IIS-7
title: 'Slide 06: L''IA per ogni futuro — scenari per campo'
status: Done
assignee:
  - claude
created_date: '2026-03-13 11:25'
updated_date: '2026-03-13 11:54'
labels:
  - slide
  - sessione-2
  - jsx
  - markdown
milestone: m-0
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Sessione 2, Atto 3 (20 min)**

Slide JSX con carousel interattivo di scenari d'uso per campi diversi.

Carousel dove scegli il campo e vedi caso d'uso concreto:
- **Medicina**: analisi sintomi, diagnosi differenziali (con disclaimer etico)
- **Giurisprudenza**: analisi contratti, clausole critiche
- **Lettere/Filosofia**: confronto concetti (Kant vs Sartre), analisi testi
- **Economia**: analisi dati vendita, identificazione trend
- **Arte/Design**: generazione immagini, brainstorming creativo
- **Scienze**: progettazione esperimenti, verifica ipotesi
- **Musica**: composizione, analisi armonica

Messaggio chiave: "Non è uno strumento da informatici. È il nuovo foglio di calcolo."

Per 2-3 scenari: preparare prompt esatti per demo live con Claude Code.

Creare: `06_ia_per_ogni_futuro.jsx` + `06_ia_per_ogni_futuro.md`
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Carousel interattivo con almeno 7 campi
- [x] #2 Ogni campo ha descrizione, esempio prompt, output atteso
- [x] #3 Design visivamente accattivante per ogni campo
- [x] #4 Markdown con prompt esatti per 2-3 demo live
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create `transformer_intro/06_ia_per_ogni_futuro.jsx`: Carousel with 7 fields (medicina, giurisprudenza, lettere, economia, arte, scienze, musica), each with icon, description, example prompt, expected output. Key message card.
2. Create `transformer_intro/06_ia_per_ogni_futuro.md`: Presenter notes, 2-3 exact demo prompts, FAQ, 20% hardcore section.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented both files:
- `06_ia_per_ogni_futuro.jsx`: Hero banner, 7-field interactive carousel (medicina, giurisprudenza, lettere, economia, arte, scienze, musica) with prompts and ethical caveats, before/after comparison grid
- `06_ia_per_ogni_futuro.md`: Presenter script, 3 exact live demo prompts, 5 FAQ, 20% hardcore section (AlphaFold, multimodal, fine-tuning)
<!-- SECTION:NOTES:END -->
