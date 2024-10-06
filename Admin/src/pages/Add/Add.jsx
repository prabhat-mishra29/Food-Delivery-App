import { assets } from "../../assets/assets"
import "./Add.css"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify";

function Add({url}) {
  const [image,setImage]=useState(false);
  const [data,setData]=useState({
    name:"",
    description:"",
    category:"Salad", //default category
    price:""
  });

  const onChangeHandeler = (event) => {
    const name=event.target.name;
    const value=event.target.value;
    setData( (data)=>({...data,[name]:value}) )
  }

  // console.log(image);

  // useEffect(()=>{
  //   console.log(data);
  // },[data])

  const onSubmitHandeler= async (event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("category",data.category);
    formData.append("price",Number(data.price));
    formData.append("image",image);

    //api call:-
    const response = await axios.post(`${url}/api/food/add`,formData);
    //console.log("data is added!",response);

    if(response.data.success){
      //reset field value
      setData({
        name:"",
        description:"",
        category:"Salad", //default category
        price:""
      })
      setImage(false)
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className="add">
      <form onSubmit={onSubmitHandeler} className="flex-col">

        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={ image?URL.createObjectURL(image):assets.upload_area } alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandeler} value={data.name} type="text" name="name" placeholder="Type here" />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandeler} value={data.description} name="description" rows="6" placeholder="write content here" required></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandeler} value={data.category} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandeler} value={data.price} type="Number" name="price" placeholder="$20" />
          </div>
        </div>

        <button type="submit" className="add-btn">Add</button>
      </form>
    </div>
  )
}

export default Add