import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { useParams } from "react-router-dom";
import { searchProductsApi } from "../../apis/Api";

const Search = () => {
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query);
  useEffect(() => {
    searchProductsApi(query)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  const handleSearch = (e) => {
    e.preventDefault();
    searchProductsApi(searchQuery)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <>
      <div className="container mt-3">
        <div className="d-flex justify-content-between">
          <h4>Search Product</h4>
          
          <form action="">
        <input
          type="text"
          className="form-control my-3"
          placeholder="Enter Product Name By Name"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" hidden  onClick={handleSearch}>
          Search
        </button>
      </form>
        </div>
        <p>
          Result for - <strong>{searchQuery}</strong>{" "}
        </p>

        <div className="row row-cols-1 row-cols-md-4 g-4 row">
        {
            products.length > 0 ? products.map(product => (
                <Card product={product}/>
            )): (<div className="text-center">
                <h4>No Products Found</h4>
            </div>
            )}
        </div>
      </div>
    </>
  );
};

export default Search;