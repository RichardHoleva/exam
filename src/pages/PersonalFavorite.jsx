import React, { useState, useEffect } from 'react';
import '../favorite.css';

export default function PersonalFavorites() {
  const [dishes, setDishes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [editDish, setEditDish] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    steps: '',
    imageUrl: ''
  });

  const saveToLocalStorage = (data) => {
    try {
      localStorage.setItem('personalDishes', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const savedDishes = localStorage.getItem('personalDishes');
      return savedDishes ? JSON.parse(savedDishes) : [];
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return [];
    }
  };

  useEffect(() => {
    const savedDishes = loadFromLocalStorage();
    setDishes(savedDishes);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (dish) => {
    setEditDish(dish);
    setFormData({
      title: dish.title,
      ingredients: dish.ingredients,
      steps: dish.steps,
      imageUrl: dish.imageUrl
    });
    setShowPopup(true);
  };

  const handleDelete = (id) => {
    const updatedDishes = dishes.filter(dish => dish.id !== id);
    setDishes(updatedDishes);
    saveToLocalStorage(updatedDishes);
    setShowDetails(null); // Close the details popup after deletion
  };

  // Close both popups when canceling edit
  const handleCancel = () => {
    setShowPopup(false);
    setEditDish(null);
    setFormData({
      title: '',
      ingredients: '',
      steps: '',
      imageUrl: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDish = {
      id: editDish ? editDish.id : Date.now(),
      ...formData,
      imageUrl: formData.imageUrl || 'https://placehold.co/600x400?text=No+Image'
    };

    let updatedDishes;
    if (editDish) {
      updatedDishes = dishes.map(dish => dish.id === editDish.id ? newDish : dish);
      setEditDish(null); // Reset edit state
    } else {
      updatedDishes = [...dishes, newDish];
    }

    setDishes(updatedDishes);
    saveToLocalStorage(updatedDishes);
    setShowPopup(false);
    setFormData({ title: '', ingredients: '', steps: '', imageUrl: '' });
    setShowDetails(null); // Close details popup if it was open
  };

  const handleCardClick = (dish) => {
    setShowDetails(dish);
  };

  const handleCloseDetails = () => {
    setShowDetails(null);
  };

  return (
    <div className="page">
      {dishes.length === 0 ? (
        <div className="no-dishes">
          <h1>You haven't cooked anything yet, so get started!</h1>
          <button className="create-btn" onClick={() => setShowPopup(true)}>Cook!</button>
        </div>
      ) : (
        <div className="dishes-container">
          <div className="dishes-grid">
            {dishes.map(dish => (
              <div key={dish.id} className="dish-card">
                <img 
                  src={dish.imageUrl} 
                  alt={dish.title} 
                  className="dish-image"
                  onClick={() => handleCardClick(dish)}
                />
                <h2 className="dish-title">{dish.title}</h2>
                <div className="dish-actions">
                  <button className="edit-btn" onClick={() => handleEdit(dish)}>Update</button>
                  <button className="delete-btn" onClick={() => handleDelete(dish.id)}>Delete</button>
                </div>
              </div>
            ))}
            <div className="add-recipe-card" onClick={() => setShowPopup(true)}>
              <div className="add-recipe-content">
                <span className="plus-icon">+</span>
                <p>Add New Recipe</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Popup */}
      {showDetails && (
        <div className="popup" onClick={handleCloseDetails}>
          <div className="popup-content details-view" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseDetails}>&times;</button>
            <img src={showDetails.imageUrl} alt={showDetails.title} className="popup-image" />
            <h2 className="popup-title">{showDetails.title}</h2>
            <div className="popup-details">
              <h3>Ingredients:</h3>
              <div className="ingredients-list">
                {showDetails.ingredients.split('\n').map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </div>
              <h3>Steps:</h3>
              <ol className="instructions-list">
                {showDetails.steps.split('\n').map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              <div className="dish-actions">
                <button 
                  className="edit-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(showDetails);
                  }}
                >
                  Update
                </button>
                <button 
                  className="delete-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(showDetails.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{editDish ? 'Update Recipe' : 'Create New Recipe'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Recipe Title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="ingredients"
                placeholder="Ingredients (one per line)"
                value={formData.ingredients}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="steps"
                placeholder="Cooking Steps (one per line)"
                value={formData.steps}
                onChange={handleInputChange}
                required
              />
              <input
                type="url"
                name="imageUrl"
                placeholder="Image URL (optional)"
                value={formData.imageUrl}
                onChange={handleInputChange}
              />
              <div className="popup-buttons">
                <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="submit-btn">{editDish ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}