const patterns = {
  1: { mc: true },
  2: { tl: true, br: true },
  3: { tl: true, mc: true, br: true },
  4: { tl: true, tr: true, bl: true, br: true },
  5: { tl: true, tr: true, mc: true, bl: true, br: true },
  6: { tl: true, tr: true, ml: true, mr: true, bl: true, br: true },
};

const dotKeys = ['tl','tr','ml','mc','mr','bl','br'];

function renderDice(prefix, value) {
  const p = patterns[value];
  dotKeys.forEach(k => {
    const el = document.getElementById(`${prefix}-${k}`);
    el.classList.toggle('visible', !!p[k]);
  });
}

let yourScore = 0, cpuScore = 0, rolling = false;

const rollBtn    = document.getElementById('rollBtn');
const resetBtn   = document.getElementById('resetBtn');
const resultText = document.getElementById('resultText');
const history    = document.getElementById('history');

// Clear dice on load
document.getElementById('yourDice').querySelectorAll('.dot').forEach(d => d.classList.remove('visible'));
document.getElementById('cpuDice').querySelectorAll('.dot').forEach(d => d.classList.remove('visible'));
resultText.textContent = 'Press Roll to begin!';
resultText.classList.add('show');

rollBtn.addEventListener('click', () => {
  if (rolling) return;
  rolling = true;
  rollBtn.disabled = true;

  resultText.classList.remove('show', 'win', 'lose', 'tie');

  const yd = document.getElementById('yourDice');
  const cd = document.getElementById('cpuDice');
  yd.classList.add('rolling');
  cd.classList.add('rolling');

  // Animate flickering
  let ticks = 0;
  const interval = setInterval(() => {
    renderDice('y', Math.ceil(Math.random() * 6));
    renderDice('c', Math.ceil(Math.random() * 6));
    ticks++;
    if (ticks >= 12) {
      clearInterval(interval);
      finalise();
    }
  }, 60);
});

function finalise() {
  const yRoll = Math.ceil(Math.random() * 6);
  const cRoll = Math.ceil(Math.random() * 6);

  renderDice('y', yRoll);
  renderDice('c', cRoll);
  document.getElementById('yourValue').textContent = yRoll;
  document.getElementById('cpuValue').textContent  = cRoll;
  document.getElementById('yourDice').classList.remove('rolling');
  document.getElementById('cpuDice').classList.remove('rolling');

  let outcome, cls;
  if (yRoll > cRoll) {
    yourScore++;
    outcome = '🏆 You Win!';
    cls = 'win';
  } else if (cRoll > yRoll) {
    cpuScore++;
    outcome = '💀 CPU Wins';
    cls = 'lose';
  } else {
    outcome = "🤝 It's a Tie";
    cls = 'tie';
  }

  document.getElementById('yourScore').textContent = yourScore;
  document.getElementById('cpuScore').textContent  = cpuScore;

  setTimeout(() => {
    resultText.textContent = outcome;
    resultText.classList.add('show', cls);
  }, 150);

  const dot = document.createElement('div');
  dot.className = `history-dot ${cls}`;
  history.appendChild(dot);

  rolling = false;
  rollBtn.disabled = false;
}

resetBtn.addEventListener('click', () => {
  yourScore = 0; cpuScore = 0;
  document.getElementById('yourScore').textContent = 0;
  document.getElementById('cpuScore').textContent  = 0;
  document.getElementById('yourValue').textContent = '–';
  document.getElementById('cpuValue').textContent  = '–';
  document.getElementById('yourDice').querySelectorAll('.dot').forEach(d => d.classList.remove('visible'));
  document.getElementById('cpuDice').querySelectorAll('.dot').forEach(d => d.classList.remove('visible'));
  resultText.classList.remove('show','win','lose','tie');
  setTimeout(() => {
    resultText.textContent = 'Press Roll to begin!';
    resultText.classList.add('show');
  }, 100);
  history.innerHTML = '';
  rolling = false;
  rollBtn.disabled = false;
});