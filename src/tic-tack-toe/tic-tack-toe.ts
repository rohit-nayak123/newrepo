let span: NodeListOf<HTMLSpanElement> = document.querySelectorAll("span[id]");
console.table(span)
const combination = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

let targetBox = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);

let randomValuefun = () => {
    return Math.floor(Math.random() * 10);
};

let randomValue: number;

function newRandomNumber() {
    randomValue = randomValuefun();
    // if (randomValue === 9 || !targetBox.has(randomValue)) {
    //   randomValue = randomValuefun();
    // }
    while (!targetBox.has(randomValue) || randomValue === 9) {
        randomValue = randomValuefun();
    }
}

newRandomNumber();

let newMove = () => {
    for (const spanElement of span) {
        if (
            spanElement.id === String(randomValue) &&
            targetBox.has(Number(randomValue))
        ) {
            spanElement.textContent = "x";
            targetBox.delete(Number(randomValue));
        }
    }
};
newMove();

function doneGame() {
    console.dir(combination);
}

console.table(targetBox);

span.forEach((ele) => {
    if (targetBox.has(Number(ele.id))) {
        ele.addEventListener("click", (e) => {
            (e.target as HTMLSpanElement).textContent = "0";

            console.log(targetBox.has(Number(e.target as HTMLSpanElement)))  /// false

            if (!targetBox.has(Number(e.target as HTMLSpanElement))) {
                console.log('heee')
                setTimeout(() => {
                    newRandomNumber();
                    newMove();
                    // doneGame();
                    console.table(targetBox);
                }, 1000);
            } else {

            }
            targetBox.delete(Number((e.target as HTMLSpanElement).id));
            randomValue = randomValuefun();
        });
    }
});
