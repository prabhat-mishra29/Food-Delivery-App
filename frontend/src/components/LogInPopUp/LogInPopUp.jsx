import React, { useEffect, useState } from 'react'
import "./LogInPopUp.css"
import { assets } from '../../assets/assets'
import { useStoreContext } from '../../Context/StoreContext.jsx';
import axios from 'axios'

function LogInPopUp({setShowLogin}) {

    const[currentState,setCurrentsState]=useState("Sign up")

    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData( data => ({...data,[name]:value}) )
    }

    // useEffect(()=>{
    //     console.log(data);
    // },[data]);

    //fetch url from store:-
    const {url,token,setToken} = useStoreContext();

    const onLogin = async (event)=>{
        event.preventDefault();
        let new_url=url;

        if(currentState==="Login"){
            new_url += "/api/user/login"
        }
        else{
            new_url += "/api/user/register"
        }

        const response = await axios.post(new_url,data);

        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }
        else{
            alert(response.data.message);
        }
    }



  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>

            <div className="login-popup-input">
                {
                    currentState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
                }

                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />

                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Your password' required />
            </div>

            <button>{currentState==="Sign up"?"Create account":"Login"}</button>

            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, i agree to the terms of use and privacy policy.</p>
            </div>

            {
                currentState==="Login"?<p>Create a new account? <span onClick={()=>setCurrentsState("Sign up")}>Click here</span></p>
                                      :<p>Already have an account? <span onClick={()=>setCurrentsState("Login")}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LogInPopUp