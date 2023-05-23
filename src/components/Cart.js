import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { decrement, addCart, removeCart } from '../redux/cartslice';
import { Link } from 'react-router-dom';


const Cart = () => {

    const data = useSelector((state) => state.cart.item);
    const dispatch = useDispatch()

   
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
                                            <button type='button' className='btn btn-info ms-3'onClick={() => dispatch(decrement(cartData))} >-</button>
                                            <br />
                                            <span className='ms-3'>{cartData.quantity}</span>
                                            <br />
                                            <button type='button' className='btn btn-info ms-3' onClick={() => dispatch(addCart(cartData))}>+</button>
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