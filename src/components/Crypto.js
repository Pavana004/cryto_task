import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addCart } from '../redux/cartslice';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux"




const Crypto = () => {


    const [crytData, setCrytData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const Cartcount = useSelector((state) => state.cart.quantity);


 //Api_call

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
            console.log(res.data);
            setCrytData(res.data);
            setFilterData(res.data);
            setLoading(false);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);


 //Search_Option
    
    const handleFilter = (value) => {

        const fil = filterData.filter((index) => index.name.toLowerCase().includes(value));
        setCrytData(fil);
    }


    return (
        <>
            <div className='container'>
                <br />
                <div className='searchbox'>
                    <Link to="/cart">
                        <AiOutlineShoppingCart size={60} className='carticon' />
                        <h3 className="btn btn-danger"style={{width:"2rem",height:"2rem"}}>{Cartcount}</h3>
                    </Link>
                    <input type='text' className='form-control ' placeholder='Search...' onChange={(e) => handleFilter(e.target.value)} />
                </div>
                <br />
                <br />
                {loading ? (<p style={{color:"white"}}>Loading..........</p>) : (<div className='parents'>
                    {
                        crytData.map((coinsDetails) => {
                            return (
                                <div>
                                    <div className="card" key={coinsDetails.id} >
                                        <img src={coinsDetails.image} className="card-img-top mt-2" alt={coinsDetails.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{coinsDetails.name}<span>({coinsDetails.symbol})</span></h5>
                                            <p className="card-text">Current_Price : ${coinsDetails.current_price}</p>
                                            <p className="card-text" style={{ color: coinsDetails.price_change_percentage_24h < 0 ? "red" : "green" }} >Price_Change : {coinsDetails.price_change_percentage_24h}</p>
                                            <p className="card-text">Market_Cap : {coinsDetails.market_cap}</p>
                                            <button type='button' className="btn btn-primary"style={{width:"7rem"}} onClick={() => dispatch(addCart(coinsDetails))}>Add</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>)}

            </div>
        </>
    )
}

export default Crypto