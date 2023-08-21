// Import React and useState hook
import React, { useState } from "react";

// Define the props type for the Plot component
interface PlotProps {
    // the genre chosen by the user
    genre: string;
    //  the character chosen or created by the user
    character: string;
    // the plot chosen or created by the user
    plot: string;
    // The onPlotChange prop is a function that updates the plot prop based on the user's input
    onPlotChange: (newPlot: string) => void;
}

// Define the Plot component
const Plot: React.FC<PlotProps> = ({ genre, character, plot, onPlotChange }) => {
    // Define a local state for the custom plot input
    const [customPlot, setCustomPlot] = useState("");

    // Define a handler function for the custom plot input change
    const handleCustomPlotChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Set the custom plot state to the input value
        setCustomPlot(event.target.value);
    };

    // Define a handler function for the custom plot input submit
    const handleCustomPlotSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent the default form behavior
        event.preventDefault();
        // Call the onPlotChange prop function with the custom plot state as the argument
        onPlotChange(customPlot);
        // Clear the custom plot state
        setCustomPlot("");
    };

    // Define an array of predefined plots based on the genre and character props
    let plots: string[];
    switch (genre) {
        case "Fantasy":
            switch (character) {
                case "A brave knight":
                    plots = [
                        "A quest to slay a dragon and rescue a princess",
                        "A journey to find a legendary sword and defeat an evil lord",
                        "A tournament to prove his skills and win the king's favor",
                    ];
                    break;
                case "A cunning thief":
                    plots = [
                        "A heist to steal a priceless treasure from a guarded palace",
                        "A scheme to infiltrate a secret society and expose their crimes",
                        "A gamble to outwit a rival thief and claim his bounty",
                    ];
                    break;
                case "A wise wizard":
                    plots = [
                        "A research to uncover an ancient mystery and unlock a hidden power",
                        "A mentorship to train a young apprentice and protect him from danger",
                        "A conflict to defend his homeland and stop a dark magic invasion",
                    ];
                    break;
                case "":
                    plots = [];
                    break;
                default:
                    plots = ["An adventure to explore a magical world and face its challenges"];
                    break;
            }
            break;
        case "Science Fiction":
            switch (character) {
                case "A brilliant scientist":
                    plots = [
                        "An experiment to create a new invention and test its limits",
                        "A discovery to find a new planet and contact its inhabitants",
                        "A dilemma to solve a global crisis and prevent a disaster",
                    ];
                    break;
                case "A rogue hacker":
                    plots = [
                        "A hack to access a secret network and expose its secrets",
                        "A chase to escape from a powerful corporation and evade its agents",
                        "A rebellion to join a resistance group and fight against oppression",
                    ];
                    break;
                case "A brave astronaut":
                    plots = [
                        "A mission to explore a distant galaxy and encounter its wonders",
                        "A crash to survive on an alien world and find a way back home",
                        "A war to defend Earth and stop an extraterrestrial invasion",
                    ];
                    break;
                case "":
                    plots = [];
                    break;
                default:
                    plots = ["An adventure to experience a futuristic world and face its challenges"];
                    break;
            }
            break;
        case "":
            plots = [];
            break;
        default:
            plots = ["An interesting story based on your genre and character"];
            break;
    }

    // Return the JSX element for the Plot component
    return (
        <div className="plot">
            <h2>Choose or create a plot for your story</h2>
            <p>
                You can choose from the following options based on your genre and
                character or enter your own plot summary or prompt.
            </p>
            <div className="plot-options">
                {plots.map((p) => (
                    <button
                        key={p}
                        className={`plot-option ${p === plot ? "active" : ""}`}
                        onClick={() => onPlotChange(p)}
                    >
                        {p}
                    </button>
                ))}
            </div>
            <form className="plot-form" onSubmit={handleCustomPlotSubmit}>
                <input
                    type="text"
                    className="plot-input"
                    value={customPlot}
                    onChange={handleCustomPlotChange}
                    placeholder="Enter your own plot"
                />
                <button type="submit" className="plot-submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

// Export the Plot component
export default Plot;
