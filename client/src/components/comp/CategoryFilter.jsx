// src/components/comp/CategoryFilter.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import custom from '../../assets/categories/custom.png';
import tech from '../../assets/categories/tech.png';
import marvel from '../../assets/categories/marval.png';
import movies from '../../assets/categories/movies.png';
import motivation from '../../assets/categories/motivation.png';
import nature from '../../assets/categories/nature.png';
import sports from '../../assets/categories/sport.png';
import games from '../../assets/categories/game.png';
import anime from '../../assets/categories/anime.png';
import music from '../../assets/categories/music.png';

const categories = [
    { name: 'All', img: custom },
    { name: 'Technology', img: tech },
    { name: 'Marvel', img: marvel },
    { name: 'Movies', img: movies },
    { name: 'Motivation', img: motivation },
    { name: 'Nature', img: nature },
    { name: 'Sports', img: sports },
    { name: 'Games', img: games },
    { name: 'Anime', img: anime },
    { name: 'Music', img: music },
    { name: 'Celebrities', img: tech }, // Update as needed
    { name: 'Custom', img: custom },
];

const CategoryFilter = ({ onSelectCategory }) => {
    return (
        <div className="flex justify-center space-x-4 mb-4">
            {categories.map((category) => (
                <div
                    key={category.name}
                    className="cursor-pointer text-gray-900"
                    onClick={() => onSelectCategory(category.name)}
                >
                    <img
                        src={category.img}
                        alt={category.name}
                        className="w-20 h-20 rounded-full"
                    />
                    <p className="text-center text-gray-900 font-bold">{category.name}</p>
                </div>
            ))}
        </div>
    );
};

export default CategoryFilter;