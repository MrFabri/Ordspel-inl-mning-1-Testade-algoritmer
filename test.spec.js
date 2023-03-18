/**
 * --- TESTER ---
 * 
 * Använder enhetstest för att det är bara en funktion som ska testas
 * Testar att "incorrect" "correct" "misplaced" placeras korrekt
 * Testar att funktionen funkar med både lowercase and uppercase
 * Längden på gissningen och det korrekta ordet måste vara lika långa
 * Skickar bara en input
 * 
**/

import { describe, expect, test } from "@jest/globals";
import feedback from './utils/feedback.js';

describe("feedback", () => {
    test('Allows uppercase and lowercase', () => {
        const result = feedback("banaN", "BaNan");
        const letters = result.map(obj => obj.letter)

        expect(letters.join("")).toBe("banan");
    });

    test('Check if the results "incorrect, misplaced, correct" are in the right place', () => {
        const result = feedback("cykla", "hallå");
        const expected = [
            { letter: 'h', result: 'incorrect' },
            { letter: 'a', result: 'misplaced' },
            { letter: 'l', result: 'incorrect' },
            { letter: 'l', result: 'correct' },
            { letter: 'å', result: 'incorrect' }
        ];

        expect(result).toEqual(expected);
    });

    test('Inputs must have the same lenght', () => {
        const result = feedback("sddddd", "ss");

        expect(result).toBe("Both input must have the same length!");
    });

    test('Both inputs must be filled', () => {
        const result = feedback("sdddd");
        expect(result).toBe("Fill both inputs!");
    });
});
// const letters = result.map(obj => obj.letter)
