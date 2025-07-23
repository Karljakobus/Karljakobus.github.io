const parteien = {
  'Partei A': [1, -1, 1],
  'Partei B': [-1, 1, -1]
};

document.getElementById('quizForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const antworten = [
    parseInt(document.querySelector('input[name="q1"]:checked')?.value || 0),
    parseInt(document.querySelector('input[name="q2"]:checked')?.value || 0),
    parseInt(document.querySelector('input[name="q3"]:checked')?.value || 0),
  ];

  let result = '<h2>Ergebnis:</h2><ul>';
  for (let [name, parteiAntworten] of Object.entries(parteien)) {
    let score = 0;
    for (let i = 0; i < antworten.length; i++) {
      score += Math.abs(antworten[i] - parteiAntworten[i]) * -1;
    }
    result += `<li>${name}: ${score} Punkte</li>`;
  }
  result += '</ul>';

  document.getElementById('result').innerHTML = result;
});
