import Character from "./components/Character";
import dataCharacters from "./javascript/dataCharacters";

export default function App() {
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
		<div className="app-container">
			<h1>My Top 10 Characters</h1>
			<div className="list">{characterElements}</div>
		</div>
	);
}
