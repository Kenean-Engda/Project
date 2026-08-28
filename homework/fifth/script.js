function logNextSiblingText(listItem) {
  const nextItem = listItem.nextElementSibling;
  const output = document.getElementById("output");
  
  if (nextItem) {
    console.log(nextItem.textContent);
    output.textContent = nextItem.textContent;
  } else {
    console.log("No more items");
    output.textContent = "No more items";
  }
}