import React from 'react'
import { useStoreContext } from '../../Context/StoreContext'
import "./FoodDisplay.css"
import FoodItem from '../FoodItem/FoodItem';

function FoodDisplay({category}) {

    const {food_list}=useStoreContext();

  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
          {
            //contextValue is an array of objects of foodlist
            //item :- each object
            //index :- each object index 
            food_list.map((item,index)=>{

              if(category==="All" || category===item.category){
                return (
                  <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                )
              }

            })
          }
        </div>
    </div>
  )
}

export default FoodDisplay