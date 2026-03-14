---
id: IIS-1
title: 'Slide 00: La Quinta Rivoluzione — timeline rivoluzioni industriali'
status: Done
assignee:
  - claude
created_date: '2026-03-13 11:24'
updated_date: '2026-03-13 11:37'
labels:
  - slide
  - sessione-1
  - jsx
  - markdown
milestone: m-0
dependencies: []
references:
  - transformer_intro/attention_memory.jsx (design system reference)
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Sessione 1, Atto 1 (10 min)**

Slide JSX con timeline interattiva delle rivoluzioni industriali: vapore → elettricità → computer → internet → IA. Per ogni rivoluzione mostrare cosa è cambiato nel lavoro e chi ha vinto. Pattern ricorrente: chi abbraccia lo strumento prospera.

**80% divulgativo**: Timeline visuale animata, analogie storiche concrete, "Oggi siete nel 1995 di internet"
**20% tana del bianconiglio**: Parametri dei modelli attuali vs sinapsi cervello di un topo; la ricerca aperta su perché funzionano

Creare: `00_la_quinta_rivoluzione.jsx` + `00_la_quinta_rivoluzione.md`

Design system: sfondo #0a0e1a, cyan #00d4ff primary, orange #ff6b35 secondary, purple #a855f7 accent. Self-contained CSS-in-JS, useState, Recharts se serve.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 JSX renderizza correttamente come artifact Claude
- [x] #2 Timeline interattiva con hover/click su ogni rivoluzione
- [x] #3 Markdown con note presentatore e sezione FAQ
- [x] #4 Sezione 20% hardcore chiaramente separata nelle note
- [x] #5 Lingua italiana, termini tecnici in inglese
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create `transformer_intro/00_la_quinta_rivoluzione.jsx` with:
   - COLORS/Section/Tag/Formula reusable components (same design system as attention_memory.jsx)
   - Timeline component with 5 revolutions: Vapore (1760), Elettricità (1870), Computer (1950), Internet (1990), IA (2020)
   - Each revolution: clickable/hoverable card showing what changed in work and who won
   - Visual pattern: "chi abbraccia lo strumento prospera"
   - "Tana del bianconiglio" section: model params vs mouse synapses, open research on why they work
   - useState for selected revolution, interactive hover effects
2. Create `transformer_intro/00_la_quinta_rivoluzione.md` with:
   - Presenter notes for each revolution
   - FAQ section
   - Clearly separated 20% hardcore section
   - Italian language, English technical terms
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented both files:
- `00_la_quinta_rivoluzione.jsx`: Interactive timeline with 5 revolutions, hover/click cards, pattern visualization, collapsible rabbit hole section with model params vs synapses comparison
- `00_la_quinta_rivoluzione.md`: Full presenter notes, FAQ, 20% hardcore section, transition to next slide
<!-- SECTION:NOTES:END -->
