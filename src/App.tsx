// Import React and useEffect hook
import React, { useEffect } from "react";

// Import React Router and useHistory hook
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router";

// Import the components for the different pages
import Genre from "./components/Genre";
import Character from "./components/Character";
import Plot from "./components/Plot";
import Story from "./components/Story";

// Define the props type for the App component
interface AppProps { }

// Define the App component
const App: React.FC<AppProps> = () => {
    // Define a state for the genre chosen by the user
    const [genre, setGenre] = React.useState("");

    // Define a state for the character chosen or created by the user
    const [character, setCharacter] = React.useState("");

    // Define a state for the plot chosen or created by the user
    const [plot, setPlot] = React.useState("");

    // Get the history object from React Router
    const history = useHistory();

    // Define an effect that runs when the genre state changes
    useEffect(() => {
        // If the genre state is not empty, push the character page to the history stack
        if (genre) {
            history.push("/character");
        }
    }, [genre]);

    // Define an effect that runs when the character state changes
    useEffect(() => {
        // If the character state is not empty, push the plot page to the history stack
        if (character) {
            history.push("/plot");
        }
    }, [character]);

    // Define an effect that runs when the plot state changes
    useEffect(() => {
        // If the plot state is not empty, push the story page to the history stack
        if (plot) {
            history.push("/story");
        }
    }, [plot]);

    // Return the JSX element for the App component
    return (
        <Router>
            <div className="app">
                <h1>Story Generator</h1>
                <p>
                    Welcome to the story generator, a web application that can create captivating and creative stories based on your input. You can choose or create a genre, a character, and a plot for your story, and then read and interact with your story. You can also save, share, or restart your story at any time. Have fun and enjoy your story!
                </p>
                <Switch>
                    <Route exact path="/">
                        <Genre genre={genre} onGenreChange={setGenre} />
                    </Route>
                    <Route path="/character">
                        <Character genre={genre} character={character} onCharacterChange={setCharacter} />
                    </Route>
                    <Route path="/plot">
                        <Plot genre={genre} character={character} plot={plot} onPlotChange={setPlot} />
                    </Route>
                    <Route path="/story">
                        <Story genre={genre} character={character} plot={plot} maxTokens={maxTokens}
                            temperature={temperature} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

// Export the App component
export default App;
