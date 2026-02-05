import React, { useState, useMemo } from "react";
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

import { SortableItem } from "./javascript/SortableItem.jsx";
import Character from "./components/Character";
import dataCharacters from "./javascript/dataCharacters.js";
import { ThemeContext } from "./javascript/ThemeContext.js";

import { Sun, Moon, Venus, Mars } from "lucide-react";

export default function App() {
	const [theme, setTheme] = useState("dark");
	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};
	const [genderFilter, setGenderFilter] = useState("female");
	const [characters, setCharacters] = useState(dataCharacters);
	const [activeId, setActiveId] = useState(null);

	const toggleGender = () => {
		setGenderFilter((prev) => (prev === "female" ? "male" : "female"));
	};

	const handleDragStart = (event) => setActiveId(event.active.id);

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			setCharacters((items) => {
				const oldIndex = items.findIndex((i) => i.id === active.id);
				const newIndex = items.findIndex((i) => i.id === over.id);

				if (oldIndex !== -1 && newIndex !== -1) {
					return arrayMove(items, oldIndex, newIndex);
				}
				return items;
			});
		}
		setActiveId(null);
	};

	const filteredCharacters = useMemo(
		() => characters.filter((char) => char.gender === genderFilter),
		[characters, genderFilter],
	);

	const activeCharacter = useMemo(
		() => characters.find((c) => c.id === activeId),
		[characters, activeId],
	);

	const isAnyDragging = activeId !== null;

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
					<DndContext
						collisionDetection={closestCenter}
						onDragStart={handleDragStart}
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
		</ThemeContext.Provider>
	);
}
