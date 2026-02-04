import { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../javascript/ThemeContext";

export default function Character(props) {
	const theme = useContext(ThemeContext);
	const [isHovered, setIsHovered] = useState(false);
	const timeoutRef = useRef(null);
	const videoRef = useRef(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const handleMouseEnter = () => {
		timeoutRef.current = setTimeout(() => {
			setIsHovered(true);
			if (videoRef.current) {
				videoRef.current.muted = false;
				videoRef.current.play().catch(() => {});
			}
		}, 300);
	};

	const handleMouseLeave = () => {
		clearTimeout(timeoutRef.current);
		setIsHovered(false);
		if (videoRef.current) {
			videoRef.current.pause();
			videoRef.current.currentTime = 0;
		}
	};

	return (
		<div
			className={`character-card ${theme === "dark" ? "dark-mode" : ""}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<div className="media-container">
				<img
					src={props.img}
					alt={props.name}
					className={`character-media character-img ${isHovered ? "hidden" : ""}`}
				/>
				<video
					ref={videoRef}
					src={props.video}
					loop
					playsInline
					className={`character-media character-video ${isHovered ? "visible" : ""}`}
				/>
			</div>

			<h2>{props.name}</h2>
			<p>Game: {props.game}</p>
		</div>
	);
}
