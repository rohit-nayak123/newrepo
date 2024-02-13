document.getElementById("form")!.addEventListener("submit", (e) => {
  e.preventDefault();
  let val = (<HTMLInputElement>document.getElementById("test_area"))!.value;
  console.log(val);
});

console.log("it is from src/notes/notes.ts");
