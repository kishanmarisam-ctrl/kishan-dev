// Typewriter
const typedEl = document.querySelector("#typed-heading");
const text = "Hi, I'm Kishan.";
let i = 0;
function type() {
  if (i <= text.length) {
    typedEl.textContent = text.slice(0, i);
    i++;
    setTimeout(type, 70);
  }
}
type();

// Rotator (grid-based; just toggle the 'active' class)
const rotator = document.querySelector(".rotator");
if (rotator) {
  const words = rotator.querySelectorAll(".word");
  let i = 0;
  words.forEach(w => w.classList.remove("active"));
  words[0].classList.add("active");

  setInterval(() => {
    words[i].classList.remove("active");
    i = (i + 1) % words.length;
    words[i].classList.add("active");
  }, 1800);
}

