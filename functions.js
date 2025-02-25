import { Botik } from "./classes.js";

const typeToName = {
    0: 'empty',
    1: 'healthy',
    2: 'sick',
    3: 'immunized',
    4: 'dead',
    5: 'denis',
    6: 'megabotik',
    empty: 0,
    healthy: 1,
    sick: 2,
    immunized: 3,
    dead: 4,
    denis: 5,
    megabotik: 6
}


// Field variables
const fieldSize = 10;
const boitikiCount = fieldSize * fieldSize / 4;
const maxSickCount = 1;
let field = [];
// ----

// Chances
const chanceToMove = 0.6;
const chanceToGetSick = 0.5;
const chanceToGetImmunized = 0.1;
const chanceToGetHealthy = 0.05;
const chanceToDie = 0.01;
const chanceToDisappear = 0.1;
const chanceToDieInTheEnd = 0.03;
const chanceToDenisAppear = 0.01;
// ----

// Global variables
const DEBUG = false;
const SPEED = 500;
const spawnSpeed = 250;

let aliveCount = 0;
let sickCount = 0;
let deadCount = 0;
let immunizedCount = 0;

let movesCount = 1;
let loopMovesCount = 0;
// ----


function getTrueOrFalse(chance) {
    return Math.random() <= chance;
}


export function generateField () {
    const fieldDiv = document.getElementById('field');
    fieldDiv.innerHTML = '';

    for (let i = 0; i < field.length; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < field.length; j++) {
            field[i][j] = new Botik(typeToName.empty, 0);
            
            const div = document.createElement('div');
            div.classList.add('empty');
            div.id = `cell-${i}-${j}`;
            row.appendChild(div);
        }

        fieldDiv.appendChild(row);
    }
}

export function spawnBoitiki(callback) {
    generateField();

    if (getTrueOrFalse(chanceToDenisAppear)) {
        field[fieldSize - 1][fieldSize - 1] = new Botik(typeToName.denis, 0);
        document.getElementById(`cell-${fieldSize - 1}-${fieldSize - 1}`).classList.remove('empty');
        document.getElementById(`cell-${fieldSize - 1}-${fieldSize - 1}`).classList.add('denis');
        document.getElementById(`cell-${fieldSize - 1}-${fieldSize - 1}`).setAttribute('title', 'Чумной Денис');
    }

    let i = 0;
    let interval = setInterval(() => {
        let x = Math.floor(Math.random() * field.length);
        let y = Math.floor(Math.random() * field.length);
        let botikDiv = document.getElementById(`cell-${x}-${y}`);

        if (field[x][y].type === typeToName.empty && field[x][y] !== typeToName.denis) {
            if (getTrueOrFalse(0.7) && sickCount < maxSickCount) {
                field[x][y] = new Botik(typeToName.sick, 0);
                botikDiv.classList.remove('empty');
                botikDiv.classList.add('sick');
                aliveCount++;
                sickCount++;
            } else {
                field[x][y] = new Botik(typeToName.healthy, 0);
                botikDiv.classList.remove('empty');
                botikDiv.classList.add('healthy');
                aliveCount++;
            }
        }

        if (i++ === boitikiCount) {
            clearInterval(interval);
            if (callback) callback();
        }
    }, spawnSpeed);
};


/**
 * Returns an array of neighboring cells for the given cell at position [i, j].
 *
 * @param {number} i - The row index of the cell.
 * @param {number} j - The column index of the cell.
 * @param {boolean} returnSick - If true, includes sick cells in the neighbors array.
 * @return {Array} An array of neighboring cells in the form of [i, j] pairs.
 */
function checkNeighbors(i, j, returnSick) {
    let neighbors = [];

    if (i > 0) {                                     // Если y не на верхней границе
        if (j > 0) {
            if (field[i - 1][j - 1].type === typeToName.healthy) {               // Проверка вверху-влево (i - 1, j - 1)
                neighbors.push([i - 1, j - 1]);
            }
            else if (returnSick && field[i - 1][j - 1].type === typeToName.sick) {
                neighbors.push([i - 1, j - 1]);
            }
        }

        if (field[i - 1][j].type === typeToName.healthy) {                    // Проверка вверху (i - 1, j)
            neighbors.push([i - 1, j]);
        }
        else if (returnSick && field[i - 1][j].type === typeToName.sick) {
            neighbors.push([i - 1, j]);
        }

        if (j < fieldSize - 1) {  
            if (field[i - 1][j + 1].type === typeToName.healthy) {               // Проверка вверху-вправо (i - 1, j + 1)
                neighbors.push([i - 1, j + 1]);
            }
            else if (returnSick && field[i - 1][j + 1].type === typeToName.sick) {
                neighbors.push([i - 1, j + 1]);
            }
        }
    }
    if (j > 0) {
        if (field[i][j - 1].type === typeToName.healthy) {                    // Проверка слева (i, j - 1)
            neighbors.push([i, j - 1]);
        }
        else if (returnSick && field[i][j - 1].type === typeToName.sick) {
            neighbors.push([i, j - 1]);
        }
    }
    if (j < fieldSize - 1) {
        if (field[i][j + 1].type === typeToName.healthy) {                     // Проверка справа (i, j + 1)
            neighbors.push([i, j + 1]);
        }
        else if (returnSick && field[i][j + 1].type === typeToName.sick) {
            neighbors.push([i, j + 1]);
        }
    }
    if (i < fieldSize - 1) {                          // Если y не на нижней границе
        if (j > 0) { 
            if (field[i + 1][j - 1].type === typeToName.healthy) {                // Проверка внизу-влево (i + 1, j - 1)
                neighbors.push([i + 1, j - 1]);
            }
            else if (returnSick && field[i + 1][j - 1].type === typeToName.sick) {
                neighbors.push([i + 1, j - 1]);
            }
        }

        if (j < fieldSize - 1) {
            if (field[i + 1][j + 1].type === typeToName.healthy) {                // Проверка внизу-вправо (i + 1, j + 1)
                neighbors.push([i + 1, j + 1]);
            }
            else if (returnSick && field[i + 1][j + 1].type === typeToName.sick) {
                neighbors.push([i + 1, j + 1]);
            }
        }

        if (field[i + 1][j].type === typeToName.healthy) {                     // Проверка внизу (i + 1, j)
            neighbors.push([i + 1, j]);
        }
        else if (returnSick && field[i + 1][j].type === typeToName.sick) {
            neighbors.push([i + 1, j]);
        }
    }

    return neighbors;
}


function moveBotik(i, j) {
    if (field[i][j].type === typeToName.empty || field[i][j].type === typeToName.dead || field[i][j].type === typeToName.denis) {
        return;
    }

    let ways = ["up", "down", "left", "right"];

    if (i === 0) {
        ways.splice(ways.indexOf("up"), 1);
    } else if (i === fieldSize - 1) {
        ways.splice(ways.indexOf("down"), 1);
    }

    if (j === 0) {
        ways.splice(ways.indexOf("left"), 1);
    } else if (j === fieldSize - 1) {
        ways.splice(ways.indexOf("right"), 1);
    }

    movesCount++;
    if (getTrueOrFalse(chanceToMove) && field[i][j].lastMove < movesCount || field[i][j].type === typeToName.megabotik) {
        let way = ways[Math.floor(Math.random() * ways.length)];
        let botik = field[i][j];
        let botikDiv = document.getElementById(`cell-${i}-${j}`);

        const move = (otherI, otherJ) => {
            let otherBotik = field[otherI][otherJ];

            if (otherBotik.lastMove >= movesCount || otherBotik.type === typeToName.dead || otherBotik.type === typeToName.denis) {
                return;
            }

            let otherBotikDiv = document.getElementById(`cell-${otherI}-${otherJ}`);

            field[i][j] = otherBotik;
            field[otherI][otherJ] = botik;

            field[otherI][otherJ].move(movesCount);
            field[i][j].move(movesCount);
            loopMovesCount++;

            otherBotikDiv.classList.remove(typeToName[otherBotik.type]);
            otherBotikDiv.classList.add(typeToName[botik.type]);

            botikDiv.classList.remove(typeToName[botik.type]);
            botikDiv.classList.add(typeToName[otherBotik.type]);

        }

        if (way === "up") {
            move(i - 1, j);
        } else if (way === "down") {
            move(i + 1, j);
        } else if (way === "left") {
            move(i, j - 1);
        } else if (way === "right") {
            move(i, j + 1);
        }
    }
}


export function startGameLoop(interval, startTime) {
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
            if (field[i][j].type === typeToName.sick) {
                if (getTrueOrFalse(chanceToGetImmunized)) {
                    field[i][j].type = typeToName.immunized;
                    let div = document.getElementById(`cell-${i}-${j}`);
                    div.classList.remove('sick');
                    div.classList.add('immunized');
                    sickCount--;
                    immunizedCount++;
                }
                else if (getTrueOrFalse(chanceToDie)) {
                    field[i][j].type = typeToName.dead;
                    
                    let div = document.getElementById(`cell-${i}-${j}`);
                    div.classList.remove('sick');
                    div.classList.add('dead');
                    aliveCount--;
                    sickCount--;
                    deadCount++;
                } else {
                    let neighbors = checkNeighbors(i, j);

                    if (neighbors.length !== 0) {
                        if (getTrueOrFalse(chanceToGetSick)) {
                            let coords = neighbors[Math.floor(Math.random() * neighbors.length)];
                            
                            if (field[coords[0]][coords[1]].type === typeToName.healthy) {

                                let div2 = document.getElementById(`cell-${coords[0]}-${coords[1]}`);
                                div2.classList.remove('healthy');
                                div2.classList.add('sick');
                                field[coords[0]][coords[1]].type = typeToName.sick;
                                sickCount++;
                            }
                        }
                    }
                }

                

            }
            else if (field[i][j].type === typeToName.dead) {
                if (getTrueOrFalse(chanceToDisappear)) {
                    field[i][j].type = typeToName.empty;

                    let div = document.getElementById(`cell-${i}-${j}`);
                    div.classList.remove('dead');
                    div.classList.add('empty');
                    deadCount--;
                }
            }
            else if (field[i][j].type === typeToName.healthy) {
                if (sickCount === 0) {
                    if (getTrueOrFalse(chanceToDieInTheEnd)) {
                        field[i][j].type = typeToName.dead;

                        let div = document.getElementById(`cell-${i}-${j}`);
                        div.classList.remove('healthy');
                        div.classList.add('dead');
                        deadCount++;
                        aliveCount--;
                    }
                }
            }
            else if (field[i][j].type === typeToName.immunized) {
                if (getTrueOrFalse(chanceToGetHealthy)) {
                    field[i][j].type = typeToName.healthy;

                    let div = document.getElementById(`cell-${i}-${j}`);
                    div.classList.remove('immunized');
                    div.classList.add('healthy');
                    immunizedCount--;
                }
            }
            else if (field[i][j].type === typeToName.denis) {
                let neighbors = checkNeighbors(i, j, true);

                for (let k = 0; k < neighbors.length; k++) {
                    if (field[neighbors[k][0]][neighbors[k][1]].type !== typeToName.megabotik) {
                        let div = document.getElementById(`cell-${neighbors[k][0]}-${neighbors[k][1]}`);

                        div.classList.remove(typeToName[field[neighbors[k][0]][neighbors[k][1]].type]);
                        div.classList.add('megabotik');

                        field[neighbors[k][0]][neighbors[k][1]].type = typeToName.megabotik;
                    }
                }
                if (neighbors.length !== 0) {
                    field[i][j].type = typeToName.empty;

                    let div = document.getElementById(`cell-${i}-${j}`);
                    div.classList.remove('denis');
                    div.classList.add('empty');
                }
            }
            else if (field[i][j].type === typeToName.megabotik) {
                const neighbors = checkNeighbors(i, j, true);

                for (let k = 0; k < neighbors.length; k++) {
                    let div = document.getElementById(`cell-${neighbors[k][0]}-${neighbors[k][1]}`);

                    div.classList.remove(typeToName[field[neighbors[k][0]][neighbors[k][1]].type]);
                    div.classList.add('megabotik');

                    field[neighbors[k][0]][neighbors[k][1]].type = typeToName.megabotik;
                }
            }

            moveBotik(i, j);
        }
    }

    console.log(`Moves: ${loopMovesCount}, Botiki: ${aliveCount}`)
    movesCount++;
    loopMovesCount = 0;

    if (sickCount === 0 && deadCount === 0 && aliveCount === 0 && immunizedCount === 0) {
        
        if (DEBUG) {
            console.log(`Game over. Time: ${Math.floor((Date.now() - startTime) / 1000)} sec`);
        }
        clearInterval(interval);

        setTimeout(() => {
            startGame();
        }, 2000)
    }
}


export function startGame() {
    field = Array(fieldSize).fill().map(()=>Array(fieldSize).fill(0));
    aliveCount = 0;
    sickCount = 0;
    deadCount = 0;
    immunizedCount = 0;

    if (DEBUG) {
        console.log('Start game');

        console.log(`Chance to move: ${chanceToMove * 100}%`);
        console.log(`Chance to get sick: ${chanceToGetSick * 100}%`);
        console.log(`Chance to die: ${chanceToDie * 100}%`);
        console.log(`Chance to disappear: ${chanceToDisappear * 100}%`);
        console.log(`Chance to get healthy: ${chanceToGetHealthy * 100}%`);
        console.log(`Chance to get immunized: ${chanceToGetImmunized * 100}%`);
        console.log(`Chance to die in the end: ${chanceToDieInTheEnd * 100}%`);
    }

    spawnBoitiki(() => {
        if (DEBUG) {
            console.log(`Alive count: ${aliveCount}`);
            console.log(`Sick count: ${sickCount}`);
        }
    
        let startTime = Date.now();
    
        let interval = setInterval(() => {
            startGameLoop(interval, startTime);
        } , SPEED);
    });
}