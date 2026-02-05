import React, {
	useState,
	useEffect,
	useRef,
	useContext,
	useCallback,
} from "react";
import { ThemeContext } from "../javascript/ThemeContext";

export default function Character({
	name,
	game,
	img,
	video,
	rank,
	volume = 0.4,
	isDraggingOriginal,
	isOverlay,
	isAnyDragging,
}) {
	const theme = useContext(ThemeContext);
	const [isHovered, setIsHovered] = useState(false);

	const timeoutRef = useRef(null);
	const videoRef = useRef(null);
	const isAnyDraggingRef = useRef(isAnyDragging);

	const isVideoActive = isHovered && !isAnyDragging;

	const stopVideoPlayer = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		if (videoRef.current) {
			videoRef.current.pause();
			videoRef.current.currentTime = 0;
		}
	}, []);

	useEffect(() => {
		isAnyDraggingRef.current = isAnyDragging;

		if (isAnyDragging) {
			stopVideoPlayer();
		}
	}, [isAnyDragging, stopVideoPlayer]);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	const handleMouseEnter = () => {
		if (isAnyDragging || !video) return;

		timeoutRef.current = setTimeout(() => {
			if (!isAnyDragging) {
				setIsHovered(true);
				if (videoRef.current) {
					videoRef.current.muted = false;
					videoRef.current.volume = volume;
					videoRef.current.play().catch(() => {});
				}
			}
		}, 300);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		stopVideoPlayer();
	};

	const containerClasses = [
		"character-card",
		theme === "dark" ? "dark-mode" : "",
		isDraggingOriginal ? "hidden-origin" : "",
		isOverlay ? "is-overlay" : "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div
			className={containerClasses}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<div className="rank-badge">{rank}</div>

			<div className="media-container">
				<img
					src={`/characters/${img}`}
					alt={name}
					className={`character-media character-img ${
						isVideoActive && video ? "hidden" : ""
					}`}
				/>
				{video && (
					<video
						ref={videoRef}
						src={`/edits/${video}`}
						loop
						playsInline
						className={`character-media character-video ${
							isVideoActive ? "visible" : ""
						}`}
					/>
				)}
			</div>

			<div className="character-info">
				<h2>{name}</h2>
				<p>Game: {game}</p>
			</div>
		</div>
	);
}
