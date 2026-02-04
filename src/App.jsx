import { useState } from "react";
import Character from "./components/Character";
import dataCharacters from "./javascript/dataCharacters";
import { ThemeContext } from "./javascript/ThemeContext";

import { Sun, Moon, Venus, Mars } from "lucide-react";

export default function App() {
	const [theme, setTheme] = useState("dark");
	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	const [genderFilter, setGenderFilter] = useState("female");
	const toggleGender = () => {
		setGenderFilter((prev) => (prev === "female" ? "male" : "female"));
	};

	const characterElements = dataCharacters
		.filter((char) => char.gender === genderFilter)
		.map((char) => {
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
					<h1 className="header-text">
						My Top 10 Finest {genderFilter === "female" ? "Women" : "Men"}
					</h1>

					<button className="theme-toggle" onClick={toggleTheme}>
						{theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
					</button>

					<button className="gender-toggle" onClick={toggleGender}>
						{genderFilter === "female" ? (
							<Venus size={20} color="#ffa1d0" />
						) : (
							<Mars size={20} color="#afd7ff" />
						)}
					</button>
				</header>
				<main>
					<div className="list">{characterElements}</div>
				</main>
			</div>
		</ThemeContext.Provider>
	);
}
