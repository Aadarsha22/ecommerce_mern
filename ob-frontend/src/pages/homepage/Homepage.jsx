import React, { useEffect } from "react";
import { useState } from "react";
import { getAllProductsApi, testApi } from "../../apis/Api";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllProductsApi()
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //instance of navigate hook
  const navigate = useNavigate();

  //navigate to search page when search button is clicked
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`)
  }

  return (
    <div className="container">
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
      <div
        id="carouselBasicExample"
        class="carousel slide carousel-fade"
        data-mdb-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp"
              class="d-block w-100"
              alt="Sunset Over the City"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </div>
          </div>

          <div class="carousel-item">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp"
              class="d-block w-100"
              alt="Canyon at Nigh"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>

          <div class="carousel-item">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp"
              class="d-block w-100"
              alt="Cliff Above a Stormy Sea"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </div>
          </div>
        </div>

        <button
          class="carousel-control-prev"
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div>
        <h1 className="mt-5 mb-4">Watch</h1>
        <div class="row row-cols-1 row-cols-md-4 g-4">
          {products.map((product) => {
            return (
              <Link to={`/product/details/${product._id}`} class="col">
                <div class="card">
                  <img
                    src={product.image}
                    class="card-img-top object-cover"
                    alt="Hollywood Sign on The Hill"
                    width={"100px"}
                    height={"220px"}
                  />
                  <div class="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 class="card-title text-black">{product.name}</h5>
                      <h5 class="card-title text-black">NPR.{product.price}</h5>
                    </div>
                    <hr />
                    <p className="text-black">{product.description}</p>
                    <button className="btn w-100 btn-outline-black">
                      View more
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
          
        </div>
      </div>
          
      <div>
        <h1 className="mt-5 mb-4">Watch</h1>
        <div class="row row-cols-1 row-cols-md-4 g-4">
          {products.map((product) => {
            return (
              <Link to={`/product/details/${product._id}`} class="col">
                <div class="card">
                  <img
                    src={product.image}
                    class="card-img-top object-cover"
                    alt="Hollywood Sign on The Hill"
                    width={"100px"}
                    height={"220px"}
                  />
                  <div class="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 class="card-title text-black">{product.name}</h5>
                      <h5 class="card-title text-black">NPR.{product.price}</h5>
                    </div>
                    <hr />
                    <p className="text-black">{product.description}</p>
                    <button className="btn w-100 btn-outline-black">
                      View more
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
          
        </div>
      </div>

    </div>
  );
};

export default Homepage;