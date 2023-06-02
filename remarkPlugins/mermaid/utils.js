/**
 * Generates a random word.
 * @returns {string} The random word generated.
 */
export const randomWord = () => {
    /**
     * Generates a random integer between min and max (inclusive).
     * @param {number} min - The minimum value.
     * @param {number} max - The maximum value.
     * @returns {number} The random integer generated.
     */
    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
  
    const wordLength = getRandomInt(1, 10);
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let randomWord = '';
  
    for (let i = 0; i < wordLength; i++) {
      const randomIndex = getRandomInt(0, characters.length - 1);
      randomWord += characters.charAt(randomIndex);
    }
  
    return randomWord;
  };
  
  