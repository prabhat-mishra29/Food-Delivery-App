import React, { useEffect } from 'react'
import "./Verify.css"
import {useNavigate, useSearchParams} from 'react-router-dom'
import { useStoreContext } from '../../Context/StoreContext';
import axios from 'axios';

function Verify() {

    const [searchParams,setSearchParams] = useSearchParams();
    
    console.log(searchParams);

    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const {url} = useStoreContext();

    const navigate = useNavigate();

    const verifyPayment = async() => {
       const response = await axios.post(url+"/api/order/verify",{success,orderId})

       if(response.data.success){
            navigate("/myorders");
       }
       else{
            navigate("/")
       }
    }

    useEffect(()=>{
        verifyPayment();
    },[])

  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verify