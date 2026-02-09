import React from "react";
import { Sun, Moon, Venus, Mars } from "lucide-react";
import { useTheme } from "../javascript/ThemeContext.jsx";

export default function Header({ genderFilter, toggleGender }) {
	const { theme, toggleTheme } = useTheme();
	return (
		<header className="app-header">
			<h1 className="header-text">
				My Top 10 Finest {genderFilter === "female" ? "Women" : "Men"}
			</h1>

			<button className="theme-toggle" onClick={toggleTheme}>
				{theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
			</button>

			<button className="gender-toggle" onClick={toggleGender}>
				{genderFilter === "female" ? (
					<Venus size={20} color="#ff82c1" />
				) : (
					<Mars size={20} color="#afd7ff" />
				)}
			</button>
		</header>
	);
}
