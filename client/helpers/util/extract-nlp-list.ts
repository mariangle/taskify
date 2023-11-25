import { ListEntry } from "@/types";

const nlp = require('compromise');
const plg = require('compromise-dates');
const nlpEx = nlp.plugin(plg);

export const extractNlpList = async (input: string): Promise<ListEntry> => {
    let doc = nlpEx(input.trim());

    const emojisArray = doc.emojis().out('array');
    const words = doc.text().split(' ');

    let emoji: string | undefined;
    let name: string = '';

    // Use the last emoji from the entire array
    if (emojisArray.length > 0) {
        emoji = emojisArray[emojisArray.length - 1].toLowerCase();
    }

    // Check if there are words (excluding emojis) and set the last one
    const nonEmojiWords = words.filter((word: string) => !emojisArray.includes(word));
    if (nonEmojiWords.length > 0) {
        name = nonEmojiWords[nonEmojiWords.length - 1].trim();
    }

    const listEntry: ListEntry = { 
        name: name, 
        emoji
    };

    return listEntry;
};
