let count = 0;
const display = document.getElementById("countDisplay");

function updateCount(change) {
  if (count + change >= 0) {
    count += change;
    display.textContent = count;

    if (count % 2 === 0) {
      display.style.color = "red";
    }
    else {
      display.style.color = "black";
    }
  }
}