import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProductApi } from "../../apis/Api";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const ProductDetails = () => {
  const [product, setProduct] = useState("");

  // get id from params
  const { id } = useParams();
  useEffect(() => {
    getSingleProductApi(id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  //add or removing quantity
  const [cartValue, setCartValue] = useState(1);

  const handleAddQuantity = () =>{
    setCartValue(cartValue+1);
  }

  const handleRemoveQuantity = () => {
    if (cartValue > 1){
        setCartValue(cartValue - 1);
    }
  }
  //---------------------------------------------
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: cartValue
    }
    dispatch(addToCart(cartItem));
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="d-flex">
          <img
            className="object-cover rounded-3"
            height={"500px"}
            width={"600px"}
            src={product.image}
            alt=""
          />
          <div className="ms-3 mt-4">
            <span className="fs-3 fw-bold">{product.name}</span>

            <p className="fs-4">Price: NPR.{product.price}</p>
            <p className="fs-4">Category : {product.category}</p>
            <p className="fs-4">Description : {product.description}</p>

            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-outline-black" onClick={handleRemoveQuantity}>
                -
              </button>
             <input type="text" value={cartValue} />
              <button type="button" class="btn btn-outline-black" onClick={handleAddQuantity}>
                +
              </button>
            </div>
            <br />
            <br />

            <button className="btn btn-primary" onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
