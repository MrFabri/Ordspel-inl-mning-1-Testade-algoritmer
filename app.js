/**
 * ------ ORDSPEL ------
 * Spelet väljer ett ord med fem bokstäver.
 * Spelaren ska gissa ordet, om ordet är korrekt har spelaren vunnit.
 * Om det är fel ord ger spelet feedback som indikerar huruvida några bokstäver i det gissade ordet finns med i det hemliga ordet, och huruvida spelaren placerat dem på rätt plats.  
 * Spelaren gissar sedan på nytt.
**/

import words from './utils/words.js';
import compare from './utils/feedback.js'

const form = document.querySelector('#form');

// ******* Form Input Promise ******** \\
async function getInput(char = 5) {
    return new Promise((resolve, reject) => {
        if (!form) {
            reject("Form doesn't exist!")
        }

        form.addEventListener("submit", (e) => {
            const input = e.target[0].value;
            e.preventDefault();

            if (!input) {
                reject({
                    name: "empty",
                    description: "Value doesn't exit!"
                });
            } else if (input.length !== char) {
                reject({
                    name: "invalid",
                    description: "Doesn't meet the character requirements"
                });
            }
            resolve(input);
        });
    });
}

// *** Gets a random word for the game *** \\
let correctWord;
let guessWord;

const index = Math.floor(Math.random() * words.length);
correctWord = words[index];

console.log(correctWord)

// ************* Initialization ************** \\
async function init() {
    try {
        guessWord = await getInput();

        if (correctWord === guessWord) {
            win();
        } else {
            const feedback = compare(correctWord, guessWord);
            console.log(feedback)
            render(feedback)
        }
    } catch (error) {
        switch (error.name) {
            case "empty":
                alert('Skriv ett ord');
                break;
            case "invalid":
                alert('Skriv ett ord med 5 fem bokstäver');
                break;
            default:
                alert('Error, try again!')
                console.log(error)
        }
        init();
    }
}
init();

// ******** Win scenario ********* \\
function win() {
    let template = `
    <div class="alert alert-success mg-3" role="alert">
        <div class="mb-2 fs-2">Bra gjort!</div>
        <div class="mb-5">Du gissade ordet "${guessWord}" och vann!</div>
        <button type="button" class="btn btn-outline-success" onClick="window.location.reload()">Spela igen!</button>
    </div>
    `;

    form.insertAdjacentHTML("beforebegin", template);
    form.remove();
    const uis = document.querySelectorAll('.container');
    for (let i = 0; i < uis.length; i++) {
        uis[i].remove()
    }
}

// ********* Renders feedback to the UI ********** \\
function render(feedback) {
    const label = form.getElementsByTagName('label')[0];
    const input = form.getElementsByTagName('input')[0];
    input.value = '';
    label.innerHTML = 'Försök igen!'
    init();

    let charTemplate = '';
    feedback.forEach(item => {
        const letter = item.letter.toUpperCase();
        if (item.result === 'correct') {
            charTemplate += `<div class="col bg-success rounded text-light">${letter}</div>`;
        } else if (item.result === 'misplaced') {
            charTemplate += `<div class="col bg-warning rounded text-light">${letter}</div>`;
        } else {
            charTemplate += `<div class="col bg-danger rounded text-light">${letter}</div>`;
        }
    });

    let template = `
        <div class="container grid text-center mb-5">
        <div class="row gap-3">
        ${charTemplate}
        </div>
        </div>
    `;
    form.insertAdjacentHTML("beforebegin", template);
}