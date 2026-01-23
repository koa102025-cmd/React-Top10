export default function Character(props) {
	return (
		<div className="character-card">
			<img src={props.img} alt={props.name} />
			<h2>{props.name}</h2>
			<p>Game: {props.game}</p>
		</div>
	);
}
