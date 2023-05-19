import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { removeCart } from '../redux/cartslice';
import { Link } from 'react-router-dom';


const Cart = () => {

    const data = useSelector((state) => state.cart.item);
    const [cartQuantity, setCartQuantity] = useState([1]);
    const dispatch = useDispatch()


// Basic_count it not fully functionality 

    const handleQuantity = (type) => {

        if (type==="dec") {
            cartQuantity > 1 && setCartQuantity(cartQuantity - 1);
        } else {
            setCartQuantity(cartQuantity + 1)
        }

    }

  //Remove_Function  

    const handleRemove = (cartData) => {
        dispatch(removeCart(cartData))

    }


//Cart_render_Function

    const renderData = () => {
        return (
            <div className="container">
                <div className='d-flex mt-4 gap-3'>
                    <Link to="/">
                        <button className='btn btn-outline-primary' style={{ width: "5rem", color: "white" }} >HOME</button>
                    </Link>
                    <br />
                    <h4 className="carthead m-2">CART</h4>
                </div>
                <br />
                <div className="cartConatiner">
                    {
                        data.map((cartData) => {
                            return (
                                <div className="splitCart">
                                    <div className="CartDetails" key={cartData.id}>

                                        <img className="cartImage p-2" src={cartData.image} alt={cartData.name} />

                                        <h5 className="card-title mt-4">{cartData.name}</h5>
                                        <p className='cartsymbol mt-4'>({cartData.symbol})</p>
                                        <p className="card-text mt-4">{cartData.current_price}</p>

                                        <div className="conatiner d-flex">
                                            <button type='button' className='btn btn-info ms-3' onClick={() => handleQuantity("dec")}>-</button>
                                            <br />
                                            <span className='ms-3'>{cartQuantity}</span>
                                            <br />
                                            <button type='button' className='btn btn-info ms-3' onClick={() => handleQuantity("inc")}>+</button>
                                            <button type='button' className='btn btn-danger ms-3' style={{ width: "5rem" }} onClick={() => handleRemove(cartData)}>Remove</button>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                    <hr />
                    <div className='cartbuy mt-4 '>
                        <button type='button' className='btn btn-primary ms-3' style={{ width: "10rem" }}>Buy</button>
                    </div>
                </div>


            </div>
        )
    }

  // This is  empty cart Funtion 
    return (
        <div className='container'>
            {
                data.length ? renderData() : (
                    <>
                        <div className='emptyCart'>
                            <Link to="/">
                                <button className='btn btn-outline-primary' style={{ width: "5rem", color: "white" }} >HOME</button>
                            </Link>
                            <br/>
                            <h2>CART_EMPTY.....</h2>
                        </div>

                    </>
                )
            }

        </div>
    )
}

export default Cart