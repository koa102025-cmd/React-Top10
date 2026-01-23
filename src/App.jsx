import Character from "./components/Character";
import dataCharacters from "./javascript/dataCharacters";

export default function App() {
	const characterElements = dataCharacters.map((char) => {
		return (
			<Character
				key={char.id}
				name={char.name}
				game={char.game}
				gender={char.gender}
				img={`/characters/${char.img}`}
			/>
		);
	});

	return (
		<div className="app-container">
			<h1>My Top 10 Characters</h1>
			<div className="list">{characterElements}</div>
		</div>
	);
}
