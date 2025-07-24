const inputRef = document.getElementById("numInput");
const submitRef = document.getElementById("submit");
const showRef = document.getElementById("show");
const THE_NUMBER = Math.floor(Math.random() * (5000 - 500 + 1)) + 500;

submitRef.addEventListener("click", fn);

function fn() {
  const val = inputRef.value;
  if (val) {
    if (parseInt(val) > THE_NUMBER) {
      showRef.innerHTML = "TOO HIGH!";
    } else if (parseInt(val) < THE_NUMBER) {
      showRef.innerHTML = "TOO LOW!";
    } else {
      showRef.innerHTML = "CORRECT";
    }
  } else {
  }
}
