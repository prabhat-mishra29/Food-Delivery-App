import React, { useState } from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { useStoreContext } from '../../Context/StoreContext';

function FoodItem( {id,name,price,description,image} ) {

  //const [itemCount,setItemCount]=useState(0);

  const{cardItems,addToCart,removeToCart,url}=useStoreContext();

  return (
    <div className='food-item'>

        <div className="food-item-img-container">

            {/* <img className="food-item-image" src={image} alt="" /> */}

            <img className="food-item-image" src={url+"/images/"+image} alt="" />

            {/* {
              !itemCount?<img className='add' onClick={ ()=>setItemCount(prev=>prev+1) } src={assets.add_icon_white}/> 
                        : <div className='food-item-counter'>
                            <img src={assets.remove_icon_red} onClick={()=>setItemCount(prev=>prev-1) } alt="" />
                            <p>{itemCount}</p>
                            <img src={assets.add_icon_green}  onClick={()=>setItemCount(prev=>prev+1) } lt="" />
                          </div>
            } */}
            
            {
              !cardItems[id]?<img className='add' onClick={ ()=>addToCart(id) } src={assets.add_icon_white}/> 
                        : <div className='food-item-counter'>
                            <img src={assets.remove_icon_red} onClick={()=>removeToCart(id) } alt="" />
                            <p>{cardItems[id]}</p>
                            <img src={assets.add_icon_green}  onClick={()=>addToCart(id) } lt="" />
                          </div>
            }

        </div>

        <div className='food-item-info'>
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-description">{description}</p>
            <p className='food-item-price'>${price}</p>
        </div>

    </div>
  )
}

export default FoodItem