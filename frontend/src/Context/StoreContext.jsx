import axios from 'axios';
import {createContext,useContext ,useEffect, useState} from 'react'

// At 1st we use "food_delivery" from "assests.js" file.
//  import { food_list } from '../assets/assets';

//Create context object:---
export const StoreContext=createContext(null);

//Context provider
const StoreContextProvider = (props)=>{

    const url="http://localhost:4000"

    const [token,setToken] = useState("");

    const [cardItems,setCardItems]=useState([]);

    const addToCart = async (itemId)=>{
        if(!cardItems[itemId]){
            setCardItems( (prev)=>( {...prev,[itemId]:1} ) )
        }
        else{
            setCardItems( (prev)=>( {...prev,[itemId]:prev[itemId]+1} ) )
        }

        //from backend:-
        if(token){
            await axios.post( url+"/api/cart/add",{itemId},{headers:{token}} );
        }
    }

    const removeToCart= async(itemId)=>{
        setCardItems( (prev)=>( {...prev,[itemId]:prev[itemId]-1} ) )

        //from backend:-
        if(token){
            await axios.post( url+"/api/cart/remove",{itemId},{headers:{token}} );
        }
    }

    // useEffect( ()=>{
    //     console.log(cardItems);
    // },[cardItems] )

    const getTotal_cart_amount = ()=>{
        let totalamount=0;
        for(const item in cardItems){
            if(cardItems[item]>0){
                // "cardItems" is an array of key and value pairs where the key stores the item index and the value stores its quantity.
                let itemInfo=food_list.find( (product)=>product._id === item )

                totalamount+=itemInfo.price*cardItems[item]
            }
        }

        return totalamount;
    }


    const [food_list,setFoodList]=useState([]);

    const fetchFoodList = async() => {
        const response = await axios.get(`${url}/api/food/list`);
        setFoodList(response.data.data)
    }


    //fetch cart-list from backend:-
    const loadCardData = async(token)=>{
        const response = await axios.get(url+"/api/cart/get",{headers:{token}})

        //console.log("response : ",response);

        setCardItems(response.data.cartData);
    }


    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();

            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCardData(localStorage.getItem("token"));
            }
        }
        
        loadData();
    },[])


    const contextValue={
        food_list,
        cardItems,
        addToCart,
        removeToCart,
        getTotal_cart_amount,
        url,
        token,
        setToken
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;

//Ek function call karte hi directly context ko use karr sakte hai.
export function useStoreContext(){
    return useContext(StoreContext);
}