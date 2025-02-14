import React, { useState, useEffect } from 'react';
import '../dishdelights.css';
import grill from '../assets/grill.jpg';
import pasta from '../assets/pasta.jpg';
import salad from '../assets/salad.jpg';
import soup from '../assets/soup.jpg';

export default function DishDelights() {
  const [showDetails, setShowDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('All');
  const [dishes, setDishes] = useState([
    {
      title: 'Grilled Chicken Salad',
      image: grill,
      category: 'Salad',
      ingredients: [
        '2 cups mixed greens',
        '1 grilled chicken breast, sliced',
        '1/2 cup cherry tomatoes, halved',
        '2 tbsp balsamic vinaigrette',
      ],
      instructions: [
        'Prepare the mixed greens and place them in a large bowl.',
        'Add the sliced grilled chicken breast on top of the greens.',
        'Scatter the cherry tomatoes over the salad.',
        'Drizzle with balsamic vinaigrette and toss to combine.',
        'Serve immediately and enjoy!',
      ],
      details: {
        preparationTime: '10 minutes',
        cookingTime: '15 minutes',
        totalTime: '25 minutes',
        servings: '2',
      },
      nutrition: {
        calories: '250',
        protein: '20g',
        carbohydrates: '15g',
        fat: '10g',
      },
    },
    {
      title: 'Pasta Primavera',
      image: pasta,
      category: 'Pasta',
      ingredients: [
        '200g pasta',
        '1 cup mixed vegetables',
        '2 tbsp olive oil',
        '1/4 cup grated Parmesan cheese',
      ],
      instructions: [
        'Cook the pasta according to package instructions.',
        'Sauté the mixed vegetables in olive oil until tender.',
        'Combine the cooked pasta and vegetables.',
        'Sprinkle with grated Parmesan cheese and toss to combine.',
        'Serve immediately and enjoy!',
      ],
      details: {
        preparationTime: '10 minutes',
        cookingTime: '15 minutes',
        totalTime: '25 minutes',
        servings: '2',
      },
      nutrition: {
        calories: '300',
        protein: '12g',
        carbohydrates: '45g',
        fat: '10g',
      },
    },
    {
      title: 'Caesar Salad',
      image: salad,
      category: 'Salad',
      ingredients: [
        '2 cups romaine lettuce',
        '1/2 cup croutons',
        '1/4 cup grated Parmesan cheese',
        '2 tbsp Caesar dressing',
      ],
      instructions: [
        'Chop the romaine lettuce and place it in a large bowl.',
        'Add the croutons and grated Parmesan cheese.',
        'Drizzle with Caesar dressing and toss to combine.',
        'Serve immediately and enjoy!',
      ],
      details: {
        preparationTime: '5 minutes',
        cookingTime: '0 minutes',
        totalTime: '5 minutes',
        servings: '2',
      },
      nutrition: {
        calories: '200',
        protein: '8g',
        carbohydrates: '15g',
        fat: '12g',
      },
    },
    {
      title: 'Tomato Soup',
      image: soup,
      category: 'Soup',
      ingredients: [
        '4 cups tomatoes, chopped',
        '1 onion, chopped',
        '2 cloves garlic, minced',
        '2 cups vegetable broth',
      ],
      instructions: [
        'Sauté the onion and garlic until fragrant.',
        'Add the chopped tomatoes and vegetable broth.',
        'Simmer for 20 minutes.',
        'Blend the soup until smooth.',
        'Serve hot and enjoy!',
      ],
      details: {
        preparationTime: '10 minutes',
        cookingTime: '20 minutes',
        totalTime: '30 minutes',
        servings: '4',
      },
      nutrition: {
        calories: '150',
        protein: '4g',
        carbohydrates: '25g',
        fat: '5g',
      },
    },
  ]);

  const handleCardClick = (dish) => {
    setShowDetails(dish);
  };

  const handleCloseClick = () => {
    setShowDetails(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains('popup')) {
      setShowDetails(null);
    }
  };

  useEffect(() => {
    if (showDetails) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showDetails]);

  const filteredDishes = dishes.filter((dish) => {
    return (
      dish.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterOption === 'All' || dish.category === filterOption)
    );
  });

  return (
    <div className="dish-delights">
      <div className="search-filter-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for a dish..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select className="filter-dropdown" value={filterOption} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Salad">Salad</option>
          <option value="Pasta">Pasta</option>
          <option value="Soup">Soup</option>
        </select>
      </div>
      <div className="cards-container">
        {filteredDishes.map((dish, index) => (
          <div key={index} className="card" onClick={() => handleCardClick(dish)}>
            <img src={dish.image} alt={dish.title} className="card-image" />
            <h2 className="card-title">{dish.title}</h2>
          </div>
        ))}
      </div>
      {showDetails && (
        <div className="popup" onClick={handleCloseClick}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseClick}>&times;</span>
            <img src={showDetails.image} alt={showDetails.title} className="popup-image" />
            <h2 className="popup-title">{showDetails.title}</h2>
            <div className="popup-details">
              <h3>Ingredients:</h3>
              <ul className="ingredients-list">
                {showDetails.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h3>Instructions:</h3>
              <ol className="instructions-list">
                {showDetails.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
              <h3>Details:</h3>
              <ul className="details-list">
                <li>Preparation Time: {showDetails.details.preparationTime}</li>
                <li>Cooking Time: {showDetails.details.cookingTime}</li>
                <li>Total Time: {showDetails.details.totalTime}</li>
                <li>Servings: {showDetails.details.servings}</li>
              </ul>
              <h3>Nutritional Information:</h3>
              <ul className="nutrition-list">
                <li>Calories: {showDetails.nutrition.calories}</li>
                <li>Protein: {showDetails.nutrition.protein}</li>
                <li>Carbohydrates: {showDetails.nutrition.carbohydrates}</li>
                <li>Fat: {showDetails.nutrition.fat}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}