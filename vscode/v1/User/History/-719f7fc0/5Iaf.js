const inputRef = document.getElementById("numInput");
const submitRef = document.getElementById("submit");
const showRef = document.getElementById("show");
const counterRef = document.getElementById("count");
const THE_NUMBER = Math.floor(Math.random() * (5000 - 500 + 1)) + 500;
const history = [];

// for testing its in the console.
console.log(THE_NUMBER);

submitRef.addEventListener("click", fn);

function fn() {
  const val = inputRef.value;
  inputRef.value = "";
  if (val) {
    history.push(val);
    if (parseInt(val) > THE_NUMBER) {
      showRef.innerHTML = "TOO HIGH!";
    } else if (parseInt(val) < THE_NUMBER) {
      showRef.innerHTML = "TOO LOW!";
    } else {
      showRef.innerHTML = "CORRECT";
      submitRef.disabled = true;
    }
    counterRef.innerHTML = history.length + 1;
    if (history.length === 5 && showRef.innerHTML !== "CORRECT") {
      showRef.innerHTML = "Out of guesses!";
      submitRef.disabled = true;
      return;
    }
  } else {
    showRef.innerHTML = "ENTER NUMBER IN THE INPUT FIELD!!!";
  }
}
