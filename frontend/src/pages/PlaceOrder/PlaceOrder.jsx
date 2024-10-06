import React, { useEffect, useState } from 'react'
import "./PlaceOrder.css"
import { useStoreContext } from '../../Context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PlaceOrder() {

  const {getTotal_cart_amount,token,food_list,cardItems,url}=useStoreContext();

  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    zipcode:"",
    state:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data=>({...data,[name]:value}))
  }

  // useEffect(()=>{
  //   console.log("data : ",data);
  // },[data]);

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems=[];

    //food_list = all list of foods
    food_list.map((item)=>{
      if(cardItems[item._id]>0){
        let item_info=item;

        //set quantity in array:-
        item_info["quantity"] = cardItems[item._id]

        orderItems.push(item_info);
      }
    })

    // console.log("orderItems are : ",orderItems);

    let orderData = {
      address : data,
      items:orderItems,
      amount:getTotal_cart_amount()+2,
      // + 2 :- delivery charges
    }

    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});

    if(response.data.success){
      const {session_url}=response.data;

      //send the user on session url:-
      window.location.replace(session_url);
    }
    else{
      alert(response.data.message);
    }
  }

  //after logout we won't able to see placeorder page.
  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotal_cart_amount()===0){
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className="placeorder">

      <div className="placeorder-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} type="text" value={data.firstName} placeholder='First Name'/>
          <input required name='lastName' onChange={onChangeHandler} type="text" value={data.lastName} placeholder='Last Name'/>
        </div>

        <input required name='email' onChange={onChangeHandler} type="email" value={data.email} placeholder='Email address'/>
        <input required name='street' onChange={onChangeHandler} type="text" value={data.street} placeholder='Street'/>

        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} type="text" value={data.city} placeholder='City'/>
          <input required name='state' onChange={onChangeHandler} type="text" value={data.state} placeholder='State'/>
        </div>

        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} type="text" value={data.zipcode} placeholder='Zip code'/>
          <input required name='country' onChange={onChangeHandler} type="text" value={data.country} placeholder='Country'/>
        </div>

        <input required name='phone' onChange={onChangeHandler} type="text" value={data.phone} placeholder='Phone'/>
      </div>

      <div className="placeorder-right">
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

          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder