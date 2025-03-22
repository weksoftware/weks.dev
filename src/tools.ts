function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFoodEmoji(): string {
    const emojis = ["🥨", "🥐", "🍕", "🥖", "🥯", "🍿", "🧀", "🥗", "🌮", "🧆", "🍨", "🍜", "🦪", "🍗", "🍳", "🌯", "🥫", "🍣", "🍯", "🍫", "🍊", "🍉", "🌶️", "🍄"];

    return emojis[getRandomNumber(0, emojis.length - 1)];
}

export function getRandomDrinkEmoji() {
    const emojis = ["🍵", "☕", "🧉", "🧋", "🍺", "🧃", "🥛", "🫖", "🍹", "🍶"]

    return emojis[getRandomNumber(0, emojis.length - 1)];
}