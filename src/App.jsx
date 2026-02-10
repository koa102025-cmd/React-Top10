import React, { useState, useMemo, useEffect } from "react";
import {
	DndContext,
	closestCenter,
	DragOverlay,
	defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
	SortableContext,
	rectSortingStrategy,
	arrayMove,
} from "@dnd-kit/sortable";

import { SortableItem } from "./components/SortableItem.jsx";
import Character from "./components/Character";
import Header from "./components/Header.jsx";

import dataCharacters from "./javascript/dataCharacters.js";
import { ThemeProvider, useTheme } from "./javascript/ThemeContext.jsx";

export default function App() {
	const [genderFilter, setGenderFilter] = useState("female");
	const [characters, setCharacters] = useState(() => {
		const savedCharacters = localStorage.getItem("top10_characters");
		return savedCharacters ? JSON.parse(savedCharacters) : dataCharacters;
	});
	const [activeId, setActiveId] = useState(null);

	useEffect(() => {
		localStorage.setItem("top10_characters", JSON.stringify(characters));
	}, [characters]);

	return (
		<ThemeProvider>
			<AppContent
				genderFilter={genderFilter}
				setGenderFilter={setGenderFilter}
				characters={characters}
				setCharacters={setCharacters}
				activeId={activeId}
				setActiveId={setActiveId}
			/>
		</ThemeProvider>
	);
}

function AppContent({
	genderFilter,
	setGenderFilter,
	characters,
	setCharacters,
	activeId,
	setActiveId,
}) {
	const { theme } = useTheme();

	const isAnyDragging = activeId !== null;

	const handleDragStart = (event) => setActiveId(event.active.id);

	const handleDragEnd = (event) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			setCharacters((items) => {
				const oldIndex = items.findIndex((i) => i.id === active.id);
				const newIndex = items.findIndex((i) => i.id === over.id);
				return arrayMove(items, oldIndex, newIndex);
			});
		}
		setActiveId(null);
	};

	const toggleGender = () => {
		setGenderFilter((prev) => (prev === "female" ? "male" : "female"));
	};

	const filteredCharacters = useMemo(
		() => characters.filter((char) => char.gender === genderFilter),
		[characters, genderFilter],
	);

	const activeCharacter = useMemo(
		() => characters.find((c) => c.id === activeId),
		[characters, activeId],
	);

	return (
		<div className={`app-container ${theme}`}>
			<Header genderFilter={genderFilter} toggleGender={toggleGender} />
			<main>
				<DndContext
					collisionDetection={closestCenter}
					onDragStart={handleDragStart} // Теперь функции доступны
					onDragEnd={handleDragEnd}>
					<div className="list">
						<SortableContext
							items={filteredCharacters}
							strategy={rectSortingStrategy}>
							{filteredCharacters.map((char, index) => (
								<SortableItem key={char.id} id={char.id}>
									<Character
										{...char}
										rank={index + 1}
										isDraggingOriginal={activeId === char.id}
										isAnyDragging={isAnyDragging}
									/>
								</SortableItem>
							))}
						</SortableContext>
					</div>

					<DragOverlay
						dropAnimation={{
							sideEffects: defaultDropAnimationSideEffects({
								styles: { active: { opacity: "0.4" } },
							}),
						}}>
						{activeCharacter ? (
							<Character
								{...activeCharacter}
								rank={
									filteredCharacters.findIndex((c) => c.id === activeId) + 1
								}
								isOverlay
								isAnyDragging={true}
							/>
						) : null}
					</DragOverlay>
				</DndContext>
			</main>
		</div>
	);
}
