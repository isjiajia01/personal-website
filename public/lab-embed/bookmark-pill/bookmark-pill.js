/* Bookmark pill: the flag folds into a box, a sheet drops in, it unfolds blue, the count rolls.
   Usage: bmToggle(button, on, count, animate). Markup: see index.html. */
function bmToggle(b, on, count, animate) {
  const num = b.querySelector('.bm-num b'), n = String(count);
  b.classList.toggle('on', on);
  if (num.textContent !== n) {
    if (animate) { num.dataset.old = num.textContent; num.textContent = n; num.classList.remove('roll'); void num.offsetWidth; num.classList.add('roll'); }
    else num.textContent = n;
  }
  if (animate) { b.classList.remove('bm-in', 'bm-out'); void b.offsetWidth; b.classList.add(on ? 'bm-in' : 'bm-out'); }
}
