// Scroll to section helper
    function scrollToSection(id){
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth'});
    }
// FAQ accordion toggle
    document.querySelectorAll('.acc-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const open = item.classList.contains('acc-open');
        document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('acc-open'));
        if(!open) item.classList.add('acc-open');
      });
    });

   function toggleSolution(button) {
    const solution = button.previousElementSibling;
    if (solution.classList.contains('hidden')) {
      solution.classList.remove('hidden');
      button.textContent = 'Read Less';
    } else {
      solution.classList.add('hidden');
      button.textContent = 'Read More';
    }
  }

// site-search.js
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");

  // synonym map for alternatives
  const keywordMap = {
    "water": "water quality",
    "clean water": "water quality",
    "pollution": "water quality",
    "disease": "disease outbreaks",
    "virus": "disease outbreaks",
    "fish health": "disease outbreaks",
    "climate": "climate change",
    "temperature": "climate change",
    "weather": "weather-safety",
    "training": "training-skill-development",
    "skills": "training-skill-development",
    "money": "financial-support",
    "loans": "financial-support",
    "funding": "financial-support",
    "insurance": "insurance",
    "market": "market-access",
    "illegal": "illegal-fishing-practices",
    "health": "health-issues",
    "technology": "technology",
    "innovation": "technology"
  };

  // Handle search click
  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (!query) return;
      window.location.href = "problems.html?search=" + encodeURIComponent(query);
    });
  }

  // If redirected to problems.html
  const params = new URLSearchParams(window.location.search);
  if (window.location.pathname.includes("problems.html") && params.has("search")) {
    const query = params.get("search").toLowerCase().trim();
    if (query) {
      setTimeout(() => {
        searchInProblems(query);
      }, 300);
    }
  }

  function searchInProblems(query) {
    const cards = document.querySelectorAll(".problem-card");

    // remove old highlights
    cards.forEach(c => c.classList.remove("highlight"));

    // map synonyms
    if (keywordMap[query]) query = keywordMap[query];

    let bestMatch = null;
    let bestScore = Infinity;

    cards.forEach(card => {
      const title = card.querySelector("h3")?.innerText.toLowerCase() || "";

      if (title.includes(query)) {
        bestMatch = card;
        bestScore = 0;
      } else {
        const dist = levenshtein(query, title);
        if (dist < bestScore && dist <= 3) { // fuzzy matching
          bestScore = dist;
          bestMatch = card;
        }
      }
    });

    if (bestMatch) {
      bestMatch.scrollIntoView({ behavior: "smooth", block: "center" });
      bestMatch.classList.add("highlight");
    } else {
      alert("No results found!");
    }
  }

  // Levenshtein Distance for typos
  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (a[i - 1] === b[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(
            dp[i - 1][j], 
            dp[i][j - 1], 
            dp[i - 1][j - 1]
          );
        }
      }
    }
    return dp[m][n];
  }
});

let counter = 1;
setInterval(() => {
  document.getElementById("radio" + counter).checked = true;
  counter++;
  if (counter > 7) {
    counter = 1;
  }
}, 3000);

