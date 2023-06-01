import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk  from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { newProductReducer, newReviewReducer, productDelReducer, productDetailsReducer, productReducer, productReviewsReducer, reviewReducer } from "./reducers/productReducers";
import { profileReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";


const reducers=combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    product:productDelReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    productReviews:productReviewsReducer,
    reviews:reviewReducer,
});

let intialState={
    cart: {
        cartItems: localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [],
          shippingInfo: localStorage.getItem("shippingInfo")
          ? JSON.parse(localStorage.getItem("shippingInfo"))
          : {},
        },
};

const middleware=[thunk];

const store=createStore(reducers,intialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;