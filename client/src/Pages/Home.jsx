import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Components
import Delivery from '../Components/Delivery';
import Dining from '../Components/Dining';
import NightLife from '../Components/NightLife';
import Nutrition from '../Components/Nutrition';
import { useDispatch } from "react-redux";

// redux actions
import { getRestaurant } from '../Redux/Reducer/restaurant/restaurant.action';

const Master = () => {
    const { type } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRestaurant());
    }, []);

    return (
        <div className='my-5'>
            {type === "delivery" && <Delivery />}
            {type === "dining" && <Dining />}
            {type === "night" && <NightLife />}
            {type === "nutrition" && <Nutrition />}
        </div>
    )
}

export default Master;