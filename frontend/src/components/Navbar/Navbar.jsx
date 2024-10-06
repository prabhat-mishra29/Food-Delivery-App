import React, { useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from '../../Context/StoreContext';

export const Navbar = ({setShowLogin}) => {

    const [menu,setMenu]=useState("home");

    const {getTotal_cart_amount,token,setToken}=useStoreContext();

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token")
        setToken("");
        navigate("/")
    }

  return (
    <div className='navbar'>
        {/*
            Using this syntax, we can access all images stored in assets.js in the object format.
            <img src={assets.logo} alt="" />
        */}
        
        <Link to="/"><img src={assets.logo} alt="" className='logo'/></Link>

        <ul className='navbar-menu'>
            <Link to="/" onClick={ ()=>setMenu("home") } className={ menu==="home"?"active":"" }>home</Link>
            <a href='#menu' onClick={ ()=>setMenu("menu") } className={ menu==="menu"?"active":"" }>menu</a>
            <a href='#app-download' onClick={ ()=>setMenu("mobile app") } className={ menu==="mobile app"?"active":"" }>mobile app</a>
            <a href='#footer' onClick={ ()=>setMenu("contact us") } className={ menu==="contact us"?"active":"" }>contact us</a>
        </ul>

        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />

            <div className="navbar-search-icon">
                <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>

                {/* If '0' then no-dot mark , otherwise dot mark. */}
                <div className={getTotal_cart_amount()===0?"":"dot"}></div>
            </div>

            {/* token present or not? */}
            {
                !token?<button onClick={()=>setShowLogin(true)}>sign in</button>:<div className='navbar-profile'>
                    <img src={assets.profile_icon} alt="" />
                    <ul className="navbar-profile-dropdown">
                        <li onClick={()=>{navigate('/myorders')}}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                        <hr />
                        <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                    </ul>
                </div>
            }
            
        </div>
    </div>
  )
}