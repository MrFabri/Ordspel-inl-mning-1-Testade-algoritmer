export default (correctWord, guessWord) => {
    if (!correctWord || !guessWord) return 'Fill both inputs!';
    if (correctWord.length !== guessWord.length) return 'Both input must have the same length!';

    correctWord = correctWord.toLowerCase();
    guessWord = guessWord.toLowerCase();

    let feedback = [];
    const incorrectLetterIndexes = [];
    const correctLetters = [];

    for (let i = 0; i < guessWord.length; i++) {
        // Gives incorrect to all the letters
        feedback.push({
            letter: guessWord[i],
            result: "incorrect"
        });

        let correctWordLetter = correctWord[i];
        let guessWordLetter = guessWord[i];

        correctLetters.includes(correctWordLetter) ? correctLetters[correctWordLetter]++ : correctLetters[correctWordLetter] = 1;

        if (guessWordLetter === correctWordLetter) {
            // Adds correct
            feedback[i].result = 'correct';
            correctLetters[correctWordLetter]--;
        } else {
            // Adds the index of the "incorrect letter"
            incorrectLetterIndexes.push(i);
        }
    }

    // Handles missplaced letters
    for (const index of incorrectLetterIndexes) {
        let guessLetter = guessWord[index];

        if (guessLetter in correctLetters && correctLetters[guessLetter] > 0) {
            feedback[index].result = 'misplaced';
            correctLetters[guessLetter]--;
        }
    }

    return (feedback);
}