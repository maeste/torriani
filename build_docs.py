#!/usr/bin/env python3
"""Build student document HTML pages from Markdown files in transformer_intro/.

Generates styled HTML pages in docs/ with the same dark theme design system
as the interactive slides. Quiz sections become interactive with JS validation.

Run: python3 build_docs.py
"""

import json
import os
import re

import markdown

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SOURCE_DIR = os.path.join(SCRIPT_DIR, "transformer_intro")
OUTPUT_DIR = os.path.join(SCRIPT_DIR, "docs")
QUIZ_RISOLTI_PATH = os.path.join(SOURCE_DIR, "quiz_risolti.md")

# Slide name -> (md filename, display title, session label)
SLIDES = [
    ("00_la_quinta_rivoluzione", "La Quinta Rivoluzione", "Sessione 1"),
    ("01_dalle_parole_ai_numeri", "Dalle Parole ai Numeri", "Sessione 1"),
    ("02_come_impara_una_macchina", "Come Impara una Macchina", "Sessione 1"),
    ("03_attenzione", "L'Attenzione", "Sessione 1"),
    ("scaling_laws", "Il Paper che Ha Cambiato Tutto", "Sessione 1"),
    ("reinforcement_learning", "Imparare Giocando", "Sessione 1"),
    ("04_limiti", "I Limiti", "Sessione 1"),
    ("generazione_immagini", "Creare con l'IA: Immagini", "Sessione 2"),
    ("generazione_video", "Creare con l'IA: Video", "Sessione 2"),
    ("reasoning_models", "Quando l'IA Ragiona", "Sessione 2"),
    ("modelli_architetture", "Sotto il Cofano", "Sessione 2"),
    ("05_arte_del_prompt", "L'Arte del Prompt", "Sessione 3"),
    ("06_ia_per_ogni_futuro", "L'IA per Ogni Futuro", "Sessione 3"),
    ("strumenti_studenti", "La Cassetta degli Attrezzi", "Sessione 3"),
    ("07_il_vostro_ruolo", "Il Vostro Ruolo", "Sessione 3"),
    ("08_agenti_ia", "Gli Agenti IA", "Sessione 4"),
    ("09_il_lavoro_che_cambia", "Il Lavoro che Cambia", "Sessione 4"),
    ("11_physical_ai", "Physical AI", "Sessione 4"),
    ("10_verso_agi", "Verso l'AGI", "Sessione 4"),
    ("attention_memory", "Memoria e Contesto", "Deep Dive"),
    ("transformer_anatomy", "Anatomia del Transformer", "Deep Dive"),
    ("kv_cache_invalidation", "KV Cache", "Deep Dive"),
    ("attention_matrix_deep", "Attention Matrix Deep Dive", "Deep Dive"),
]

EXTRA_DOCS = [
    ("Torriani_links_clean", "Link e Risorse"),
]

# ---------------------------------------------------------------------------
# Quiz answer extraction from quiz_risolti.md
# ---------------------------------------------------------------------------

def parse_quiz_risolti(path):
    """Parse quiz_risolti.md and return a list of answer sets (one per section).

    Each answer set is a list of dicts: [{"correct": "b", "explanation": "..."}, ...]
    The list index matches the SLIDES order.
    """
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Split by ## headers (skip the first # header)
    sections = re.split(r"^## ", content, flags=re.MULTILINE)[1:]  # drop preamble

    all_answers = []
    for section in sections:
        questions = []
        # Split by question headers: **1. ... **2. etc.
        q_parts = re.split(r"\*\*\d+\.", section)[1:]  # skip section title
        for q_part in q_parts:
            correct_letter = None
            explanation = ""
            for line in q_part.split("\n"):
                line_stripped = line.strip()
                # Find the line with ✅
                if "✅" in line_stripped:
                    # Extract letter: handle "b) **text** ✅", "- **B) text** ✅", etc.
                    m = re.search(r"(?:^[-*\s]*)(?:\*\*)?([A-Da-d])\)", line_stripped)
                    if m:
                        correct_letter = m.group(1).lower()
                # Find explanation (> blockquote)
                if line_stripped.startswith(">"):
                    explanation = line_stripped[1:].strip()
            if correct_letter:
                questions.append({"correct": correct_letter, "explanation": explanation})
        all_answers.append(questions)

    return all_answers


def build_quiz_answer_map(quiz_answers):
    """Map slide_name -> list of answer dicts."""
    answer_map = {}
    for i, (slide_name, _, _) in enumerate(SLIDES):
        if i < len(quiz_answers):
            answer_map[slide_name] = quiz_answers[i]
    return answer_map


# ---------------------------------------------------------------------------
# Quiz section parsing from student docs
# ---------------------------------------------------------------------------

def split_md_at_quiz(md_content):
    """Split MD content into (before_quiz, quiz_section) at '## Mettiti alla Prova'.

    Returns (full_content, None) if no quiz section found.
    """
    marker = "## Mettiti alla Prova"
    idx = md_content.find(marker)
    if idx == -1:
        return md_content, None
    return md_content[:idx], md_content[idx:]


def parse_quiz_from_md(quiz_md):
    """Parse the quiz section from a student doc MD into structured data.

    Returns list of dicts: [{"num": 1, "question": "...", "options": [("a", "text"), ...]}]
    """
    questions = []
    # Split by question numbers
    q_splits = re.split(r"\*\*(\d+)\.", quiz_md)
    # q_splits: ['header...', '1', ' question...**\noptions...', '2', ' question...', ...]

    for i in range(1, len(q_splits) - 1, 2):
        q_num = int(q_splits[i])
        q_body = q_splits[i + 1]

        # Extract question text (up to **)
        q_match = re.match(r"\s*(.+?)\*\*", q_body, re.DOTALL)
        q_text = q_match.group(1).strip() if q_match else ""

        # Extract options - handle both "a) text" and "- A) text" formats
        options = []
        for m in re.finditer(
            r"(?:^|\n)\s*(?:-\s*)?([A-Da-d])\)\s*(.+?)(?=\n\s*(?:-\s*)?[A-Da-d]\)|\n\s*$|\n\*\*|\Z)",
            q_body,
            re.DOTALL,
        ):
            letter = m.group(1).lower()
            text = m.group(2).strip()
            options.append((letter, text))

        if q_text and options:
            questions.append({"num": q_num, "question": q_text, "options": options})

    return questions


def generate_quiz_html(questions, answers):
    """Generate interactive quiz HTML from parsed questions and answer data."""
    if not questions:
        return ""

    # Build answer JSON for JS
    answer_data = {}
    for i, ans in enumerate(answers):
        answer_data[str(i + 1)] = ans

    html_parts = [
        '<div class="quiz-container" id="quiz">',
        '  <h2>Mettiti alla Prova</h2>',
        '  <p class="quiz-intro">Seleziona una risposta per ogni domanda, poi clicca "Verifica" per controllare.</p>',
    ]

    for q in questions:
        qn = q["num"]
        html_parts.append(f'  <div class="quiz-question" data-q="{qn}">')
        q_text = escape_html(q["question"])
        html_parts.append(f"    <p class=\"quiz-q-text\"><strong>{qn}. {q_text}</strong></p>")
        for letter, text in q["options"]:
            opt_text = escape_html(text)
            html_parts.append(f'    <label class="quiz-option" data-letter="{letter}">')
            html_parts.append(f'      <input type="radio" name="q{qn}" value="{letter}">')
            html_parts.append(f'      <span class="quiz-letter">{letter})</span>')
            html_parts.append(f'      <span class="quiz-opt-text">{opt_text}</span>')
            html_parts.append("    </label>")
        html_parts.append(f'    <div class="quiz-feedback" id="fb-{qn}"></div>')
        html_parts.append("  </div>")

    html_parts.append('  <button class="quiz-submit" onclick="checkQuiz()">Verifica Risposte</button>')
    html_parts.append('  <div class="quiz-score" id="quiz-score"></div>')
    html_parts.append('  <button class="quiz-retry" id="quiz-retry" onclick="resetQuiz()">Riprova</button>')
    html_parts.append("</div>")

    # Add JS with embedded answers
    answers_json = json.dumps(answer_data, ensure_ascii=False)
    html_parts.append("<script>")
    html_parts.append(f"var QUIZ_ANSWERS = {answers_json};")
    html_parts.append(QUIZ_JS)
    html_parts.append("</script>")

    return "\n".join(html_parts)


def escape_html(text):
    """Basic HTML escaping."""
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


# ---------------------------------------------------------------------------
# Quiz CSS and JS
# ---------------------------------------------------------------------------

QUIZ_CSS = """\
    .quiz-container {
      margin-top: 48px; padding-top: 8px;
      border-top: 1px solid #1e2d4a;
    }
    .quiz-container h2 {
      color: #ff6b35; font-size: 1.4rem; font-weight: 600;
      margin-bottom: 8px; padding-bottom: 8px;
      border-bottom: 1px solid #1e2d4a;
    }
    .quiz-intro {
      color: #64748b; font-size: 0.9rem; margin-bottom: 24px;
    }
    .quiz-question {
      background: #0d1220; border: 1px solid #1e2d4a;
      border-radius: 12px; padding: 20px; margin-bottom: 16px;
      transition: border-color 0.3s;
    }
    .quiz-question.correct { border-color: #22c55e; }
    .quiz-question.incorrect { border-color: #ef4444; }
    .quiz-question.unanswered { border-color: #f59e0b; }
    .quiz-q-text {
      margin-bottom: 12px; font-size: 1rem;
    }
    .quiz-option {
      display: flex; align-items: flex-start; gap: 10px;
      padding: 10px 14px; margin: 4px 0;
      border-radius: 8px; cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.2s;
    }
    .quiz-option:hover {
      background: #0f1729; border-color: #1e2d4a;
    }
    .quiz-option input[type="radio"] {
      margin-top: 4px; accent-color: #00d4ff;
      flex-shrink: 0;
    }
    .quiz-letter {
      color: #64748b; font-family: 'JetBrains Mono', monospace;
      font-size: 0.85em; flex-shrink: 0; min-width: 20px;
    }
    .quiz-opt-text { color: #e2e8f0; }
    .quiz-option.is-correct {
      background: #052e16; border-color: #22c55e;
    }
    .quiz-option.is-correct .quiz-opt-text { color: #86efac; }
    .quiz-option.is-wrong {
      background: #2a0a0a; border-color: #ef4444;
    }
    .quiz-option.is-wrong .quiz-opt-text { color: #fca5a5; }
    .quiz-feedback {
      margin-top: 10px; padding: 10px 14px;
      border-radius: 8px; font-size: 0.9rem;
      display: none; line-height: 1.5;
    }
    .quiz-feedback.show { display: block; }
    .quiz-feedback.fb-correct {
      background: #052e16; border: 1px solid #22c55e33; color: #86efac;
    }
    .quiz-feedback.fb-wrong {
      background: #2a0a0a; border: 1px solid #ef444433; color: #fca5a5;
    }
    .quiz-feedback.fb-skip {
      background: #1a1500; border: 1px solid #f59e0b33; color: #fcd34d;
    }
    .quiz-submit {
      display: block; width: 100%; padding: 14px;
      margin-top: 24px; background: #00d4ff; color: #060912;
      border: none; border-radius: 10px; font-size: 1rem;
      font-weight: 600; cursor: pointer; transition: all 0.2s;
      font-family: 'IBM Plex Sans', sans-serif;
    }
    .quiz-submit:hover { background: #38bdf8; transform: translateY(-1px); }
    .quiz-submit:disabled {
      background: #1e2d4a; color: #64748b; cursor: default;
      transform: none;
    }
    .quiz-score {
      display: none; text-align: center; margin-top: 20px;
      padding: 20px; border-radius: 12px; font-size: 1.1rem;
      font-weight: 600;
    }
    .quiz-score.show { display: block; }
    .quiz-score.perfect {
      background: #052e16; border: 1px solid #22c55e;
      color: #86efac;
    }
    .quiz-score.good {
      background: #0f1729; border: 1px solid #00d4ff;
      color: #00d4ff;
    }
    .quiz-score.needs-work {
      background: #1a1500; border: 1px solid #f59e0b;
      color: #fcd34d;
    }
    .quiz-retry {
      display: none; width: 100%; padding: 12px;
      margin-top: 12px; background: transparent;
      color: #00d4ff; border: 1px solid #1e2d4a;
      border-radius: 10px; font-size: 0.95rem;
      cursor: pointer; transition: all 0.2s;
      font-family: 'IBM Plex Sans', sans-serif;
    }
    .quiz-retry.show { display: block; }
    .quiz-retry:hover { background: #0f1729; border-color: #00d4ff; }
"""

QUIZ_JS = r"""
function checkQuiz() {
  var total = Object.keys(QUIZ_ANSWERS).length;
  var correct = 0;
  var answered = 0;

  for (var qNum in QUIZ_ANSWERS) {
    var ans = QUIZ_ANSWERS[qNum];
    var qDiv = document.querySelector('.quiz-question[data-q="' + qNum + '"]');
    var selected = document.querySelector('input[name="q' + qNum + '"]:checked');
    var fb = document.getElementById('fb-' + qNum);

    // Reset classes
    qDiv.classList.remove('correct', 'incorrect', 'unanswered');
    qDiv.querySelectorAll('.quiz-option').forEach(function(opt) {
      opt.classList.remove('is-correct', 'is-wrong');
    });

    if (!selected) {
      qDiv.classList.add('unanswered');
      fb.className = 'quiz-feedback show fb-skip';
      fb.textContent = '⚠ Seleziona una risposta';
      continue;
    }

    answered++;
    var userAnswer = selected.value;
    var correctLetter = ans.correct;

    // Highlight correct option
    var correctOpt = qDiv.querySelector('.quiz-option[data-letter="' + correctLetter + '"]');
    if (correctOpt) correctOpt.classList.add('is-correct');

    if (userAnswer === correctLetter) {
      correct++;
      qDiv.classList.add('correct');
      fb.className = 'quiz-feedback show fb-correct';
      fb.innerHTML = '✅ Corretto!' + (ans.explanation ? ' — ' + ans.explanation : '');
    } else {
      qDiv.classList.add('incorrect');
      // Highlight wrong selection
      var wrongOpt = selected.closest('.quiz-option');
      if (wrongOpt) wrongOpt.classList.add('is-wrong');
      fb.className = 'quiz-feedback show fb-wrong';
      fb.innerHTML = '❌ La risposta corretta è <strong>' + correctLetter + ')</strong>' +
        (ans.explanation ? ' — ' + ans.explanation : '');
    }

    // Disable inputs after check
    qDiv.querySelectorAll('input[type="radio"]').forEach(function(r) { r.disabled = true; });
  }

  // Show score
  var scoreDiv = document.getElementById('quiz-score');
  scoreDiv.className = 'quiz-score show';
  if (correct === total) {
    scoreDiv.className += ' perfect';
    scoreDiv.innerHTML = '🏆 Perfetto! ' + correct + '/' + total + ' risposte corrette!';
  } else if (correct >= total * 0.6) {
    scoreDiv.className += ' good';
    scoreDiv.innerHTML = '👍 ' + correct + '/' + total + ' risposte corrette. Buon lavoro!';
  } else {
    scoreDiv.className += ' needs-work';
    scoreDiv.innerHTML = '📚 ' + correct + '/' + total + ' risposte corrette. Rileggi il capitolo e riprova!';
  }

  // Disable submit, show retry
  document.querySelector('.quiz-submit').disabled = true;
  document.getElementById('quiz-retry').className = 'quiz-retry show';
}

function resetQuiz() {
  document.querySelectorAll('.quiz-question').forEach(function(q) {
    q.classList.remove('correct', 'incorrect', 'unanswered');
    q.querySelectorAll('.quiz-option').forEach(function(o) {
      o.classList.remove('is-correct', 'is-wrong');
    });
    q.querySelectorAll('input[type="radio"]').forEach(function(r) {
      r.disabled = false;
      r.checked = false;
    });
  });
  document.querySelectorAll('.quiz-feedback').forEach(function(f) {
    f.className = 'quiz-feedback';
  });
  document.getElementById('quiz-score').className = 'quiz-score';
  document.querySelector('.quiz-submit').disabled = false;
  document.getElementById('quiz-retry').className = 'quiz-retry';
}
"""

# ---------------------------------------------------------------------------
# HTML Templates
# ---------------------------------------------------------------------------

HTML_TEMPLATE = """\
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} — LLM per le Scuole Superiori</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    body {{
      background: #0a0e1a; color: #e2e8f0;
      font-family: 'IBM Plex Sans', -apple-system, sans-serif;
      line-height: 1.7; padding: 0;
    }}
    .top-bar {{
      position: sticky; top: 0; z-index: 100;
      background: #060912; border-bottom: 1px solid #1e2d4a;
      padding: 12px 24px; display: flex; align-items: center;
      gap: 16px; flex-wrap: wrap;
    }}
    .top-bar a {{
      color: #00d4ff; text-decoration: none; font-size: 14px;
      font-family: 'JetBrains Mono', monospace;
      padding: 6px 14px; border: 1px solid #1e2d4a;
      border-radius: 6px; transition: all 0.2s;
    }}
    .top-bar a:hover {{ background: #0f1729; border-color: #00d4ff; }}
    .container {{
      max-width: 800px; margin: 0 auto;
      padding: 40px 24px 80px;
    }}
    h1 {{
      color: #00d4ff; font-size: 2rem; font-weight: 700;
      margin-bottom: 8px; line-height: 1.3;
    }}
    h2 {{
      color: #ff6b35; font-size: 1.4rem; font-weight: 600;
      margin-top: 48px; margin-bottom: 16px;
      padding-bottom: 8px; border-bottom: 1px solid #1e2d4a;
    }}
    h3 {{
      color: #a855f7; font-size: 1.15rem; font-weight: 600;
      margin-top: 32px; margin-bottom: 12px;
    }}
    h4 {{
      color: #e2e8f0; font-size: 1rem; font-weight: 600;
      margin-top: 24px; margin-bottom: 8px;
    }}
    p {{ margin-bottom: 16px; }}
    a {{ color: #00d4ff; text-decoration: underline; }}
    a:hover {{ color: #38bdf8; }}
    strong {{ color: #f1f5f9; font-weight: 600; }}
    em {{ color: #cbd5e1; font-style: italic; }}
    ul, ol {{
      margin-bottom: 16px; padding-left: 24px;
    }}
    li {{ margin-bottom: 8px; }}
    blockquote {{
      border-left: 3px solid #a855f7;
      background: #0f1729; padding: 16px 20px;
      margin: 16px 0; border-radius: 0 8px 8px 0;
      color: #cbd5e1; font-style: italic;
    }}
    blockquote p {{ margin-bottom: 0; }}
    code {{
      background: #1e293b; color: #00d4ff;
      padding: 2px 6px; border-radius: 4px;
      font-family: 'JetBrains Mono', monospace; font-size: 0.9em;
    }}
    pre {{
      background: #0f1729; border: 1px solid #1e2d4a;
      border-radius: 8px; padding: 20px; overflow-x: auto;
      margin: 16px 0;
    }}
    pre code {{
      background: none; padding: 0; color: #e2e8f0;
      font-size: 0.85em; line-height: 1.6;
    }}
    table {{
      width: 100%; border-collapse: collapse;
      margin: 16px 0; font-size: 0.95em;
    }}
    th {{
      background: #0f1729; color: #00d4ff;
      padding: 10px 14px; text-align: left;
      border: 1px solid #1e2d4a;
      font-family: 'JetBrains Mono', monospace; font-size: 0.85em;
    }}
    td {{
      padding: 10px 14px; border: 1px solid #1e2d4a;
    }}
    tr:nth-child(even) {{ background: #0a0e1a; }}
    tr:nth-child(odd) {{ background: #0d1220; }}
    hr {{
      border: none; border-top: 1px solid #1e2d4a;
      margin: 40px 0;
    }}
    .session-badge {{
      display: inline-block; font-size: 12px;
      font-family: 'JetBrains Mono', monospace;
      color: #64748b; letter-spacing: 1px;
      text-transform: uppercase; margin-bottom: 8px;
    }}
{quiz_css}
    @media (max-width: 640px) {{
      .container {{ padding: 24px 16px 60px; }}
      h1 {{ font-size: 1.5rem; }}
      h2 {{ font-size: 1.2rem; }}
      pre {{ padding: 12px; font-size: 0.8em; }}
      table {{ font-size: 0.85em; }}
      th, td {{ padding: 8px 10px; }}
    }}
  </style>
</head>
<body>
  <div class="top-bar">
    <a href="../slides.html#{slide_name}">← Torna alle Slide</a>
    <a href="index.html">📚 Indice Documenti</a>
  </div>
  <div class="container">
    <div class="session-badge">{session}</div>
    {content}
  </div>
</body>
</html>
"""

INDEX_TEMPLATE = """\
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Documenti per lo Studio — LLM per le Scuole Superiori</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    body {{
      background: #0a0e1a; color: #e2e8f0;
      font-family: 'IBM Plex Sans', -apple-system, sans-serif;
      line-height: 1.7; padding: 0;
    }}
    .top-bar {{
      position: sticky; top: 0; z-index: 100;
      background: #060912; border-bottom: 1px solid #1e2d4a;
      padding: 12px 24px; display: flex; align-items: center; gap: 16px;
    }}
    .top-bar a {{
      color: #00d4ff; text-decoration: none; font-size: 14px;
      font-family: 'JetBrains Mono', monospace;
      padding: 6px 14px; border: 1px solid #1e2d4a;
      border-radius: 6px; transition: all 0.2s;
    }}
    .top-bar a:hover {{ background: #0f1729; border-color: #00d4ff; }}
    .container {{ max-width: 800px; margin: 0 auto; padding: 40px 24px 80px; }}
    h1 {{
      color: #00d4ff; font-size: 2rem; font-weight: 700;
      margin-bottom: 8px;
    }}
    .subtitle {{ color: #64748b; font-size: 1rem; margin-bottom: 40px; }}
    .session-title {{
      color: #ff6b35; font-size: 1.1rem; font-weight: 600;
      margin-top: 36px; margin-bottom: 12px;
      padding-bottom: 6px; border-bottom: 1px solid #1e2d4a;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.5px;
    }}
    .doc-list {{ list-style: none; padding: 0; }}
    .doc-list li {{
      margin-bottom: 4px;
    }}
    .doc-list a {{
      display: block; padding: 12px 16px;
      color: #e2e8f0; text-decoration: none;
      border-radius: 8px; transition: all 0.2s;
      border: 1px solid transparent;
    }}
    .doc-list a:hover {{
      background: #0f1729; border-color: #1e2d4a;
      color: #00d4ff;
    }}
    .doc-num {{
      color: #64748b; font-family: 'JetBrains Mono', monospace;
      font-size: 12px; margin-right: 10px;
    }}
    .extra-section {{ margin-top: 48px; }}
    @media (max-width: 640px) {{
      .container {{ padding: 24px 16px 60px; }}
      h1 {{ font-size: 1.5rem; }}
    }}
  </style>
</head>
<body>
  <div class="top-bar">
    <a href="../slides.html">← Slide Interattive</a>
    <a href="../index.html">🏠 Home</a>
  </div>
  <div class="container">
    <h1>📚 Documenti per lo Studio</h1>
    <p class="subtitle">Tutti i materiali di approfondimento del corso "LLM per le Scuole Superiori"</p>
    {sections}
  </div>
</body>
</html>
"""


# ---------------------------------------------------------------------------
# Build functions
# ---------------------------------------------------------------------------

def postprocess_faq_html(html):
    """Add <br> after bold FAQ questions so answer text starts on a new line."""
    return re.sub(r"</strong>\n", "</strong><br>\n", html)


def build_html(md_content, title, slide_name, session, quiz_answers=None):
    """Convert Markdown content to styled HTML page with optional interactive quiz."""
    before_quiz, quiz_md = split_md_at_quiz(md_content)

    md_converter = markdown.Markdown(
        extensions=["tables", "fenced_code", "smarty"],
        output_format="html5",
    )
    html_content = md_converter.convert(before_quiz)
    html_content = postprocess_faq_html(html_content)

    quiz_html = ""
    has_quiz = False
    if quiz_md and quiz_answers:
        questions = parse_quiz_from_md(quiz_md)
        if questions:
            quiz_html = generate_quiz_html(questions, quiz_answers)
            has_quiz = True

    if not has_quiz and quiz_md:
        # Fallback: render quiz as static HTML if no answers available
        md_converter.reset()
        quiz_html = md_converter.convert(quiz_md)

    # QUIZ_CSS uses real braces, so substitute it via .replace() not .format()
    quiz_css = QUIZ_CSS if has_quiz else ""
    page = HTML_TEMPLATE.format(
        title=title,
        slide_name=slide_name,
        session=session,
        content=html_content + "\n" + quiz_html,
        quiz_css="__QUIZ_CSS__",
    )
    return page.replace("__QUIZ_CSS__", quiz_css)


def build_index():
    """Build the index page with links organized by session."""
    sessions = {}
    slide_nums = {}
    num = 1
    for slide_name, title, session in SLIDES:
        if session not in sessions:
            sessions[session] = []
        if session == "Deep Dive":
            slide_nums[slide_name] = "DD"
        else:
            slide_nums[slide_name] = f"{num:02d}"
            num += 1
        sessions[session].append((slide_name, title))

    sections_html = ""
    session_icons = {
        "Sessione 1": "🧠",
        "Sessione 2": "🎨",
        "Sessione 3": "🛠️",
        "Sessione 4": "🚀",
        "Deep Dive": "🔬",
    }
    session_subtitles = {
        "Sessione 1": "Come Funziona l'IA",
        "Sessione 2": "L'IA Oltre il Testo",
        "Sessione 3": "Usare l'IA",
        "Sessione 4": "Il Futuro",
        "Deep Dive": "Approfondimenti Tecnici",
    }

    for session_name in ["Sessione 1", "Sessione 2", "Sessione 3", "Sessione 4", "Deep Dive"]:
        items = sessions.get(session_name, [])
        if not items:
            continue
        icon = session_icons.get(session_name, "")
        subtitle = session_subtitles.get(session_name, "")
        sections_html += f'    <div class="session-title">{icon} {session_name} — {subtitle}</div>\n'
        sections_html += '    <ul class="doc-list">\n'
        for slide_name, title in items:
            sn = slide_nums[slide_name]
            sections_html += f'      <li><a href="{slide_name}.html"><span class="doc-num">{sn}</span> {title}</a></li>\n'
        sections_html += "    </ul>\n"

    if EXTRA_DOCS:
        sections_html += '    <div class="session-title">🔗 Risorse</div>\n'
        sections_html += '    <ul class="doc-list">\n'
        for doc_name, title in EXTRA_DOCS:
            sections_html += f'      <li><a href="{doc_name}.html"><span class="doc-num">++</span> {title}</a></li>\n'
        sections_html += "    </ul>\n"

    return INDEX_TEMPLATE.format(sections=sections_html)


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Parse quiz answers
    print("Parsing quiz answers from quiz_risolti.md...")
    quiz_answers_list = parse_quiz_risolti(QUIZ_RISOLTI_PATH)
    answer_map = build_quiz_answer_map(quiz_answers_list)
    print(f"  Found answers for {len(answer_map)} sections\n")

    # Also export as JSON for potential reuse
    json_path = os.path.join(OUTPUT_DIR, "quiz_data.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(answer_map, f, ensure_ascii=False, indent=2)
    print(f"  Exported quiz_data.json\n")

    count = 0

    # Build slide documents
    for slide_name, title, session in SLIDES:
        md_path = os.path.join(SOURCE_DIR, f"{slide_name}.md")
        if not os.path.exists(md_path):
            print(f"  SKIP (not found): {md_path}")
            continue
        with open(md_path, "r", encoding="utf-8") as f:
            md_content = f.read()
        answers = answer_map.get(slide_name)
        html = build_html(md_content, title, slide_name, session, quiz_answers=answers)
        out_path = os.path.join(OUTPUT_DIR, f"{slide_name}.html")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(html)
        quiz_status = f" (quiz: {len(answers)}q)" if answers else ""
        count += 1
        print(f"  OK: {slide_name}.html{quiz_status}")

    # Build extra docs (quiz_risolti - no interactive quiz for the answer key itself)
    for doc_name, title in EXTRA_DOCS:
        md_path = os.path.join(SOURCE_DIR, f"{doc_name}.md")
        if not os.path.exists(md_path):
            print(f"  SKIP (not found): {md_path}")
            continue
        with open(md_path, "r", encoding="utf-8") as f:
            md_content = f.read()
        # No interactive quiz for quiz_risolti - it IS the answer key
        md_converter = markdown.Markdown(
            extensions=["tables", "fenced_code", "smarty"],
            output_format="html5",
        )
        html_content = md_converter.convert(md_content)
        html = HTML_TEMPLATE.format(
            title=title,
            slide_name=doc_name,
            session="Extra",
            content=html_content,
            quiz_css="__QUIZ_CSS__",
        ).replace("__QUIZ_CSS__", "")
        out_path = os.path.join(OUTPUT_DIR, f"{doc_name}.html")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(html)
        count += 1
        print(f"  OK: {doc_name}.html")

    # Build index
    index_html = build_index()
    index_path = os.path.join(OUTPUT_DIR, "index.html")
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(index_html)
    count += 1
    print(f"  OK: index.html")

    print(f"\nDone! Generated {count} HTML files in {OUTPUT_DIR}/")


if __name__ == "__main__":
    main()
