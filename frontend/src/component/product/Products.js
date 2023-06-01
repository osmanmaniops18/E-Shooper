import React , {useEffect, useState} from 'react';
import "./products.css";
import Loader from '../layout/Loader/Loader';
import {useSelector,useDispatch} from "react-redux";
import ProductCard from "../layout/home/ProductCard";
import { clearError, getProduct } from '../../actions/productAction';
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';

const categories=[
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones"
];


function Products() {
    const dispatch=useDispatch();
    const[currentPage,setcurrentPage]=useState(1)
    const [price,setPrice]=useState([0,25000])
    const[category,setCategory]=useState("");
    const [ratings,setRatings]=useState(0);
    const {products,loading,error,productsCount,resultperPage,filteredProductsCount}=useSelector((state)=>state.products);
    const { keyword } = useParams();
    const alert=useAlert();




    const setCurrentPageNo=(e)=>{
        setcurrentPage(e);
    };
    const priceHandler=(event,newPrice)=>{
                setPrice(newPrice);
    };
    
    useEffect(() => {
    
    dispatch(getProduct(keyword,currentPage,price,category,ratings));
    if(error){
        alert.error(error);
        dispatch(clearError());
    }
    
    }, [dispatch,keyword,currentPage,price,category,ratings,alert,error]);
    let count=filteredProductsCount;
    
  return (
    <>
        {loading ? <Loader/> : (
            <>
            <MetaData title="PRODUCTS -- E-SHOPPER" />
           <h2 className='productsHeading'>Products</h2>
           <div className='products'>
            {
                products && 
                products.map((product)=>(
                    <ProductCard key={product._id} product={product}/>
                ))
            }
           </div>
           <div className='filterBox'>
            <Typography>Price</Typography>
            <Slider value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby='range-slider'
            min={0}
            max={25000}
             />
              <Typography className='heading-category'>Categories</Typography>
              <ul className='categoryBox'>
                {categories.map((category)=>(
                    <li
                    className='category-link'
                    key={category}
                    onClick={()=>setCategory(category)}


                    >
                    {category}

                    </li>
                ))}
              </ul>
              <fieldset >
                <Typography component="legend">Rating Above</Typography>
                <Slider
              
                value={ratings}
                onChange={(e, newRating)=>{
                    setRatings(newRating)
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
                 />
              </fieldset>
             
           </div>
           {resultperPage < count && (<div className='paginationBox'>
            <Pagination
            activePage={currentPage}
                itemsCountPerPage={resultperPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
             />
           </div>)}
            </>
        )}
    </>
  )
}

export default Products;