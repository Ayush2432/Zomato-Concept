import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Components
import CheckoutNavbar from '../Components/Navbar/CheckoutNavbar';

// redux actions
import { getCart } from "../Redux/Reducer/Cart/Cart.action";

const Checkout = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCart());
    }, [])

    return (
        <>
            <CheckoutNavbar />
            <div className="container mx-auto px-4 lg:px-40">
                {props.children}
            </div>
        </>
    )
}

export default Checkout;