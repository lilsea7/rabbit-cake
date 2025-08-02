import React, { use, useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import { food_list } from '../../assets/assets'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)

    return (
        <div className='food-display' id ='food-display'>
            <h2>Các loại bánh được yêu thích</h2>
            <div className="food-display-list">
                {food_list.map((item,index)=>{
                    {console.log(category,item.category);}
                    if (category==="All" || category===item.category){
                       return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} quantity={item.quantity}/> 
                    }
                })}
            </div>
        </div>
    )

}


export default FoodDisplay
