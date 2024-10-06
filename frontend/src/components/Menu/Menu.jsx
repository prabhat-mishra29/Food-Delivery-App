import React from 'react'
import "./Menu.css"
import { menu_list } from '../../assets/assets'

function Menu( {category,setCategory} ) {
  return (
    <div className='menu' id='menu'>
        <h1>Explore our menu</h1>
        <p className='menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>

        <div className='menu-list'>
            {
                menu_list.map((item,index)=>{
                    // menu_list is an array of objects.
                    // item :- individual item object
                    // index :- index number of item
                    return(
                        <div onClick={ ()=>setCategory( prev=>prev===item.menu_name?"All":item.menu_name ) } key={index} className='menu-list-item'>
                            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                            {/* Add an 'active' class according to the category that is clicked by the user */}
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })
            }
        </div>

        <hr />

    </div>
  )
}

export default Menu