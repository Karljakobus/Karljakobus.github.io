const fragen = [
  {
    text: "Soll es mehr Fahrradwege geben?",
    antworten: {
      "Kandidat A": "Ja, für mehr umweltfreundliche Mobilität.",
      "Kandidat B": "Nein, das Geld soll in Straßenreparaturen fließen.",
      "Kandidat C": "Teils, teils – aber nicht auf Kosten von Parkplätzen."
    }
  },
  {
    text: "Soll die Grundsteuer gesenkt werden?",
    antworten: {
      "Kandidat A": "Ja, damit Bürger entlastet werden.",
      "Kandidat B": "Nein, sonst fehlt Geld für Schulen.",
      "Kandidat C": "Nur für Familien mit Kindern."
    }
  },
  {
    text: "Soll das Nachtleben stärker gefördert werden?",
    antworten: {
      "Kandidat A": "Ja, das belebt die Innenstadt.",
      "Kandidat B": "Nein, das stört die Anwohner.",
      "Kandidat C": "Ja, aber nur in ausgewiesenen Zonen."
    }
  }
];

const punkte = {
  "Kandidat A": 0,
  "Kandidat B": 0,
  "Kandidat C": 0
};

let aktuelleFrage = 0;
let ausgewaehlt = null;

const fragebereich = document.getElementById("fragebereich");
const weiterBtn = document.getElementById("weiterBtn");
const ergebnisDiv = document.getElementById("ergebnis");

function zeigeFrage() {
  weiterBtn.disabled = true;
  ausgewaehlt = null;
  fragebereich.innerHTML = "";

  if (aktuelleFrage >= fragen.length) {
    zeigeErgebnis();
    return;
  }

  const frage = fragen[aktuelleFrage];
  const frageText = document.createElement("h2");
  frageText.textContent = frage.text;
  fragebereich.appendChild(frageText);

  Object.entries(frage.antworten).forEach(([kandidat, antwort]) => {
    const div = document.createElement("div");
    div.classList.add("answer");
    div.textContent = `${kandidat}: ${antwort}`;
    div.addEventListener("click", () => {
      document.querySelectorAll(".answer").forEach(el => el.classList.remove("selected"));
      div.classList.add("selected");
      ausgewaehlt = kandidat;
      weiterBtn.disabled = false;
    });
    fragebereich.appendChild(div);
  });

  const keine = document.createElement("div");
  keine.classList.add("answer");
  keine.textContent = "Keine Antwort gefällt mir";
  keine.addEventListener("click", () => {
    document.querySelectorAll(".answer").forEach(el => el.classList.remove("selected"));
    keine.classList.add("selected");
    ausgewaehlt = null;
    weiterBtn.disabled = false;
  });
  fragebereich.appendChild(keine);
}

weiterBtn.addEventListener("click", () => {
  if (ausgewaehlt) {
    punkte[ausgewaehlt]++;
  }
  aktuelleFrage++;
  zeigeFrage();
});

function zeigeErgebnis() {
  fragebereich.style.display = "none";
  weiterBtn.style.display = "none";
  ergebnisDiv.style.display = "block";

  let ergebnisHTML = "<h2>Ergebnis</h2><ul>";
  const sortiert = Object.entries(punkte).sort((a, b) => b[1] - a[1]);
  sortiert.forEach(([kandidat, score]) => {
    ergebnisHTML += `<li>${kandidat}: ${score} Übereinstimmungen</li>`;
  });
  ergebnisHTML += "</ul>";
  ergebnisDiv.innerHTML = ergebnisHTML;
}

zeigeFrage();
