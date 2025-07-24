const inputRef = document.getElementById("numInput");
const submitRef = document.getElementById("submit");
const THE_NUMBER = Math.floor(Math.random() * (5000 - 500 + 1)) + 500;

submitRef.addEventListener("click", fn);

function fn() {
  const val = inputRef.value;
  if (val) {
  } else {
    console.log("empty");
  }
}
