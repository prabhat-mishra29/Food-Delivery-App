import axios from "axios";
import { useStoreContext } from "../../Context/StoreContext";
import "./Myorders.css"
import React, { useEffect, useState } from 'react'
import { assets } from "../../assets/assets";

function Myorders() {

    const [data,setData] = useState([]);
    const {url,token} = useStoreContext();

    const fetchOrders = async () => {
        const response = await axios.get(url+"/api/order/user-orders",{headers:{token}})

        setData(response.data.data);

        //console.log("orders = ",response.data.data)
    }

    useEffect( ()=>{
        if(token){
            fetchOrders();
        }
    },[token] )

  return (
    <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return(
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />

                        <p>{order.items.map( (item,index)=>{
                            if(index === order.items.length-1){
                                // Last element so end main ',' nahi rahega.
                                return item.name+" x "+item.quantity;
                            }
                            else{
                                return item.name+" x "+item.quantity+" , ";
                            }
                        } )}</p>

                        <p>${order.amount}</p>
                        <p>Items : {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Myorders;