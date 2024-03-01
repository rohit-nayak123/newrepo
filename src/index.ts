// const ul = document.getElementById("ul");
// const li = document.createElement("li");
// console.log(li, ul);

// let allvalues = localStorage.getItem("allvalues") as string;
// let toDos: Set<string> = new Set(JSON.parse(allvalues) || []);

// Listen for changes to local storage
// window.addEventListener("storage", function (event) {
//   if (event.key === "allvalues") {
//     // Update your local copy of the data
//     toDos = new Set(JSON.parse(event.newValue || "") || []);
//   }
// });

let toDos: Set<string> = new Set();

document.getElementById("form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  let val = (<HTMLInputElement>document.getElementById("input")).value;

  if (val.trim().length !== 0 && val !== " ") {
    toDos.add(val);
    filterToDos(val);
  }
  (document.querySelector("input") as HTMLInputElement).value = "";
});

// const filterToDos = (val: string) => {
//   console.log("it is from filtertodos");

//   if (toDos.has(val)) {
//     let arrToDos: string[] = [...toDos];
//     console.log(toDos);

//     if (localStorage.length === 0) {
//       localStorage.setItem(String(num), arrToDos[num]);
//       const li = document.createElement("li");
//       console.log(toDos);

//       li.innerHTML = localStorage.getItem(`${num}`) as string;
//       document.getElementById("ul")!.appendChild(li);
//       // ul?.appendChild(li);

//       num++;
//     } else if (localStorage.length !== 0) {
//       Object.keys(localStorage).map((key) => {
//         if (localStorage.getItem(key) !== val && arrToDos[num] !== undefined) {
//           localStorage.setItem(String(num), arrToDos[num]);
//           const li = document.createElement("li");

//           li.innerHTML = localStorage.getItem(`${num}`) as string;
//           document.getElementById("ul")!.appendChild(li);

//           num++;
//           let string = JSON.stringify([...toDos]);
//           localStorage.setItem("allvalues", string);
//         }
//       });
//     }
//   }
// };

function filterToDos(val: string) {
  let allvalues = localStorage.getItem("allvalues") as string;

  if (allvalues === null) {
    let string = JSON.stringify([...toDos]); // allvalues is set here
    localStorage.setItem("allvalues", string);

    const li = document.createElement("li");
    li.className = "list-group-item";
    li.dataset.myAttribute = val as string;

    // li.className = String(num)
    // li.innerHTML = val as string;
    li.innerHTML = `<button data-my-attribute="${val}" ><span class="material-symbols-outlined" data-my-attribute="${val}">
    done_all
    </span></button><div><p id="${val}">${val}</p></div><button data-my-attribute="${val}" ><span class="material-symbols-outlined" data-my-attribute="${val}">
    delete_forever
    </span></button>`;
    document.getElementById("ul")?.appendChild(li);
    // num++
  } else {
    let allvalues = localStorage.getItem("allvalues") as string;

    let arr = JSON.parse(allvalues) as Array<string>;
    let newSet: Set<string> = new Set([...arr]);
    if (!newSet.has(val)) {
      newSet.add(val);
      const li = document.createElement("li");
      li.dataset.myAttribute = val as string;

      li.className = "list-group-item";
      li.innerHTML = `<button data-my-attribute="${val}" ><span class="material-symbols-outlined" data-my-attribute="${val}">
      done_all
      </span></button><div><p id="${val}">${val}</p></div><button data-my-attribute="${val}" ><span class="material-symbols-outlined" data-my-attribute="${val}">
      delete_forever
      </span></button>`;
      document.getElementById("ul")?.appendChild(li);

      let string = JSON.stringify([...newSet]);
      localStorage.setItem("allvalues", string);
    }
  }
}

function displayToDos() {
  if (localStorage.length !== 0) {
    let arr = localStorage.getItem("allvalues") as string;

    JSON.parse(arr).forEach((key: any) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.dataset.myAttribute = key as string;
      // li.className = String(num)
      li.innerHTML = `<button data-my-attribute="${key}" ><span class="material-symbols-outlined"data-my-attribute="${key}">
      done_all
      </span></button><div><p id="${key}">${key}</p></div><button data-my-attribute="${key}" ><span class="material-symbols-outlined" data-my-attribute="${key}">
      delete_forever
      </span></button>`;
      document.getElementById("ul")?.appendChild(li);
      // num++
    });

    let doneArr = localStorage.getItem("done") as string;

    let doneTasks = JSON.parse(doneArr) as Array<string>;

    doneTasks.forEach((key: any) => {
      // console.log(key);

      // let pendingArr = JSON.parse(arr);
      // console.log(pendingArr);

      let p = document.querySelector<HTMLParagraphElement>(`p[id="${key}"]`);
      if (p !== null) {
        p.innerHTML = `<del>${key}</del>`;
      }
    });

    // JSON.parse(arr).forEach((key: any) => {
    //   const li = document.createElement("li");
    //   li.className = "list-group-item";
    //   li.dataset.myAttribute = key as string;
    //   // li.className = String(num)
    //   li.innerHTML = `<button data-my-attribute="${key}" ><span class="material-symbols-outlined"data-my-attribute="${key}">
    //   done_all
    //   </span></button><div><p id="${key}">${key}</p></div><button data-my-attribute="${key}" ><span class="material-symbols-outlined" data-my-attribute="${key}">
    //   delete_forever
    //   </span></button>`;
    //   document.getElementById("ul")!.appendChild(li);
    //   // num++
    // });
  }
}

displayToDos();

function removeToDos() {
  document.addEventListener("click", function (event) {
    let done = localStorage.getItem("done") as string;

    if (done === null) {
      // done is set here
      let string = JSON.stringify([]);
      localStorage.setItem("done", string);
    }

    // console.log((event.target as HTMLElement).innerText);
    // console.log(event.target as HTMLElement);

    if ((event.target as HTMLElement).innerText === "done_all") {
      let p = document.getElementById(
        `${(event.target as HTMLElement).dataset.myAttribute}`
      );

      let innerText = p?.innerText as string;
      // console.log(p, innerText);

      if (p) {
        p.innerHTML = `<del>${innerText}</del>`;

        let alldone = JSON.parse(done) as Array<string>;
        let newSet: Set<string> = new Set([...alldone]);
        newSet.add(innerText);
        let string = JSON.stringify([...newSet]);
        localStorage.setItem("done", string);
      }
    }
    if ((event.target as HTMLElement).innerText === "delete_forever") {
      // console.log(event.target);

      let li = document.querySelector(
        `li[data-my-attribute="${
          (event.target as HTMLElement).dataset.myAttribute
        }"]`
      );

      let allvalues = localStorage.getItem("allvalues") as string;
      let arr = JSON.parse(allvalues) as Array<string>;

      let newSet: Set<string> = new Set([...arr]);

      newSet.delete(
        (event.target as HTMLElement).dataset.myAttribute as string
      );

      let string = JSON.stringify([...newSet]);
      localStorage.setItem("allvalues", string);
      let done = JSON.parse(localStorage.getItem("done") as string);

      let doneSet: Set<string> = new Set([...done]);
      if (
        doneSet.has((event.target as HTMLElement).dataset.myAttribute as string)
      ) {
        // console.log(
        //   (event.target as HTMLElement).dataset.myAttribute as string
        // );

        doneSet.delete(
          (event.target as HTMLElement).dataset.myAttribute as string
        );
        doneSet.delete("[");
        doneSet.delete("]");
        doneSet.delete(",");
        doneSet.delete("\\");
        doneSet.delete(`\"`);

        let donestring = JSON.stringify([...doneSet]);
        localStorage.setItem("done", donestring);
      }

      li?.remove();
      const newvalues = localStorage.getItem("allvalues");
      if (newvalues !== null) {
        // console.log(JSON.parse(allvalues)?.length);
      }
    }
  });
}

removeToDos();
