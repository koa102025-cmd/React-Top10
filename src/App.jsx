import { useState } from "react";
import Character from "./components/Character";
import dataCharacters from "./javascript/dataCharacters";
import { ThemeContext } from "./javascript/ThemeContext";

import { Sun, Moon } from "lucide-react";

export default function App() {
	const [theme, setTheme] = useState("dark");
	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	const characterElements = dataCharacters.map((char) => {
		return (
			<Character
				key={char.id}
				{...char}
				img={`/characters/${char.img}`}
				video={`/edits/${char.video}`}
			/>
		);
	});

	return (
		<ThemeContext.Provider value={theme}>
			<div className={`app-container ${theme}`}>
				<header className="app-header">
					<h1 className="header-text">My Top 10 Characters</h1>
					<button className="theme-toggle" onClick={toggleTheme}>
						{theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
					</button>
				</header>
				<main>
					<div className="list">{characterElements}</div>
				</main>
			</div>
		</ThemeContext.Provider>
	);
}
