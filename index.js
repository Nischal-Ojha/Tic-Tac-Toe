let btns = document.querySelectorAll(".buttons");
let restart = document.querySelector(".newGame");
let stat = document.createElement('p');
let turnX = true;
let count = 1;

// Conditions for a party to win.
const winConditons = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

function won() {
    for (let position of winConditons) {

        // Checking the values in each positions for possible win.
        first = btns[position[0]].innerText;
        second = btns[position[1]].innerText;
        third = btns[position[2]].innerText;
        if (first != '' && second != '' && third != '') {
            if (first === second && second === third) {
                return first;
            }
        }
    }
};


function stopGame() {

    // Disabling all the cells.
    for (let btn of btns) {
        btn.disabled = true;
    }
    restart.innerText = "New Game";
};

restart.onclick = () => {

    // Enabling all the cells and reseting the count and turn.
    for (let btn of btns) {
        btn.innerText = '';
        btn.disabled = false;
        turnX = true;
        count = 1;
        stat.remove();
        restart.innerText = 'Restart';
    }
};

btns.forEach((cell) => {
    cell.addEventListener("click", () => {

        // Fill the cells with X or O.
        if (turnX) { turnX = false; cell.innerText = "X"; }
        else { turnX = true; cell.innerText = "O"; }

        // Disable the cell clicked.
        cell.disabled = true;
        let turn = 'O';

        // Finding the turn 
        if (turnX) turn = 'X';
        document.querySelector('div').after(stat); stat.innerText = `It's ${turn}'s turn .`
        stat.style.color = 'white';
        stat.style.margin = '1.5em';

        // Checking for a win.
        let a = won();
        if (a) { stat.innerText = `${a} is the winner.`; stopGame(); };

        // Check for a draw.
        if (count === 9) {
            stat.innerText = `It's a draw.`;
            stopGame();
        }
        count++;
    });
}); 