import React, { useContext } from 'react';
import './fooddisply.css';
import { StoreContext } from '../../context/StoreContext'; // Change to StoreContext
import FoodItem from '../Food Item/FoodItem';

const FoodDisplay = ({ category }) => {
  // Use the capitalized name here as well
  const { food_list } = useContext(StoreContext); 

  return (
    <div className="food-display" id='food-display'>
      <h2>Top Dishes on the menu</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem 
                key={index} 
                id={item._id} 
                name={item.name} 
                description={item.description} 
                price={item.price} 
                image={item.image}
              />
            )
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;