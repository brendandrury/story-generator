// Import React and useState hook
import React, { useState, useEffect } from "react";

// Define an enum for the genre values
enum Genre {
    Fantasy = "Fantasy",
    ScienceFiction = "Science Fiction",
    Romance = "Romance",
    Horror = "Horror",
    Mystery = "Mystery",
}

// Define the props type for the Character component
interface CharacterProps {
    // The genre prop is a string that represents the genre chosen by the user
    genre: Genre;
    // The character prop is a string that represents the character chosen or created by the user
    character: string;
    // The onCharacterChange prop is a function that updates the character prop based on the user's input
    onCharacterChange: (newCharacter: string) => void;
}

// Define the Character component
const Character: React.FC<CharacterProps> = ({
    genre,
    character,
    onCharacterChange,
}) => {
    // Define a local state for the custom character input
    const [customCharacter, setCustomCharacter] = useState("");

    // Define a handler function for the custom character input change
    const handleCustomCharacterChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        // Set the custom character state to the input value
        setCustomCharacter(event.target.value);
    };

    // Define a handler function for the custom character input submit
    const handleCustomCharacterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent the default form behavior
        event.preventDefault();
        // Call the onCharacterChange prop function with the custom character state as the argument
        onCharacterChange(customCharacter);
        // Clear the custom character state
        setCustomCharacter("");
    };

    // Define an array of predefined characters based on the genre prop
    const characters: Record<Genre, string[]> = {
        [Genre.Fantasy]: ["A brave knight",
            "A cunning thief",
            "A wise wizard",
            "A beautiful princess",
            "A fierce dragon",
            "A loyal dwarf",
            "A mysterious elf",
            "A wicked witch",
            "A noble king",
            "A humble farmer",
        ],
        [Genre.ScienceFiction]: [
            "A brilliant scientist",
            "A rogue hacker",
            "A brave astronaut",
            "A ruthless alien",
            "A friendly robot",
            "A rebellious cyborg",
            "A cunning spy",
            "A powerful mutant",
            "A visionary leader",
            "A curious explorer",
        ],
        [Genre.Romance]: [
            "A handsome prince",
            "A charming lady",
            "A shy librarian",
            "A dashing pirate",
            "A fiery redhead",
            "A brooding vampire",
            "A cheerful baker",
            "A rugged cowboy",
            "A witty journalist",
            "A loyal friend",
        ],
        [Genre.Horror]: [
            "A naive teenager",
            "A creepy clown",
            "A paranoid survivor",
            "A bloodthirsty zombie",
            "A vengeful ghost",
            "A psychotic killer",
            "A haunted doll",
            "A cursed werewolf",
            "A sinister cultist",
            "A terrified victim",
        ],
        [Genre.Mystery]: [
            "A clever detective",
            "A cunning criminal",
            "A loyal sidekick",
            "A mysterious stranger",
            "A wealthy heiress",
            "A shady lawyer",
            "A nosy reporter",
            "A eccentric inventor",
            "A suspicious butler",
            "A clueless witness",
        ],
    };

    // Use useEffect to update the character prop whenever the genre prop changes
    useEffect(() => {
        // If the genre prop is valid, choose a random character from the corresponding array
        if (characters[genre]) {
            const randomCharacter =
                characters[genre][Math.floor(Math.random() * characters[genre].length)];
            // Call the onCharacterChange prop function with the random character as the argument
            onCharacterChange(randomCharacter);
        }
    }, [genre]); // Add genre as a dependency to run useEffect only when genre changes

    // Return the JSX element for the Character component
    return (
        <div className="character">
            <h2>Choose or create a character for your story</h2>
            <p>
                You can choose from the following options based on your genre or enter
                your own character name or description.
            </p>
            <div className="character-options">
                {characters.map((c) => (
                    <button
                        key={c}
                        className={`character-option ${c === character ? "active" : ""}`}
                        onClick={() => onCharacterChange(c)}
                    >
                        {c}
                    </button>
                ))}
            </div>
            <form className="character-form" onSubmit={handleCustomCharacterSubmit}>
                <input
                    type="text"
                    className="character-input"
                    value={customCharacter}
                    onChange={handleCustomCharacterChange}
                    placeholder="Enter your own character"
                />
                <button type="submit" className="character-submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

// Export the Character component
export default Character;
