import React from 'react'
import "./Cart.css"
import { useStoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const{food_list,cardItems,removeToCart,getTotal_cart_amount,url}=useStoreContext();

  const navigate=useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item,index)=>{
            if(cardItems[item._id]>0){
              return(
                <>
                  <div className='cart-items-title cart-items-item'>

                    {/* <img src={item.image} alt="" /> */}

                    <img src={url+"/images/"+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cardItems[item._id]}</p>
                    <p>${item.price*cardItems[item._id]}</p>
                    <p onClick={()=>removeToCart(item._id)} className='cross'>X</p>
                  </div>
                  <hr />
                </>
              )
            }
          })
        }
      </div>

      <div className='cart-bottom'>

        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotal_cart_amount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotal_cart_amount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>${getTotal_cart_amount()===0?0:getTotal_cart_amount()+2}</b>
            </div>
          </div>

          <button onClick={()=>navigate('/place_order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className='cart-promo-code'>
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promo-code-input'>
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart