// Import React and useState hook
import React, { useState } from "react";

// Define the props type for the Genre component
interface GenreProps {
    // The genre prop is a string that represents the genre chosen by the user
    genre: string;
    // The onGenreChange prop is a function that updates the genre prop based on the user's input
    onGenreChange: (newGenre: string) => void;
}

// Define the Genre component
const Genre: React.FC<GenreProps> = ({ genre, onGenreChange }) => {
    // Define a local state for the custom genre input
    const [customGenre, setCustomGenre] = useState("");

    // Define a handler function for the custom genre input change
    const handleCustomGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Set the custom genre state to the input value
        setCustomGenre(event.target.value);
    };

    // Define a handler function for the custom genre input submit
    const handleCustomGenreSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent the default form behavior
        event.preventDefault();
        // Call the onGenreChange prop function with the custom genre state as the argument
        onGenreChange(customGenre);
        // Clear the custom genre state
        setCustomGenre("");
    };

    // Define an array of predefined genres
    const genres = [
        "Fantasy",
        "Science Fiction",
        "Romance",
        "Horror",
        "Mystery",
        "Thriller",
        "Comedy",
        "Drama",
        "Historical",
        "Adventure",
    ];

    // Return the JSX element for the Genre component
    return (
        <div className="genre">
            <h2>Choose a genre for your story</h2>
            <p>You can choose from the following options or enter your own genre.</p>
            <div className="genre-options">
                {genres.map((g) => (
                    <button
                        key={g}
                        className={`genre-option ${g === genre ? "active" : ""}`}
                        onClick={() => onGenreChange(g)}
                    >
                        {g}
                    </button>
                ))}
            </div>
            <form className="genre-form" onSubmit={handleCustomGenreSubmit}>
                <input
                    type="text"
                    className="genre-input"
                    value={customGenre}
                    onChange={handleCustomGenreChange}
                    placeholder="Enter your own genre"
                />
                <button type="submit" className="genre-submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

// Export the Genre component
export default Genre;
