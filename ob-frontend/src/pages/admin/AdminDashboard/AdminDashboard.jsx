import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  addproductApi,
  deleteProductApi,
  getAllProductsApi,
} from "../../../apis/Api";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  //for response data
  const [products, setProducts] = useState([]);

  const handleImageUpload = (e) => {
    // const file = e.target.files[0];
    // const reader = new FileReader();
    // reader.onload = () => {
    //   setProductImage(reader.result);
    // };
    // if (file) {
    //   reader.readAsDataURL(file);
    // }
    setProductImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productDescription", productDescription);
    formData.append("productImage", productImage);

    //Calling the Api
    addproductApi(formData)
      .then((res) => {
        toast.success("Product added Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Product add Failed!");
      });
  };

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

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete this product"
    );
    if (confirmDelete) {
      deleteProductApi(id)
        .then((res) => {
          toast.success("Product deleted successfully");
          window.location.reload(true);
        })
        .catch((err) => {
          toast.error("Product deletion Failed");
        });
    }
  };

  return (
    <>
      <div className="container"> 
      <div className="row my-4">
                <div className="col-md-3">
                    <div className='card p-3 bg-danger bg-gradient text-white'>
                        <h4>Total Orders</h4>
                        <hr />
                        <h5>4</h5>
                        <p></p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className='card p-3 bg-info bg-gradient text-white'>
                        <h4>Orders Pending</h4>
                        <hr />
                        <h5>4</h5>
                        <p></p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className='card p-3 bg-warning bg-gradient text-white'>
                        <h4>Orders In Process</h4>
                        <hr />
                        <h5>4</h5>
                        <p></p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className='card p-3 bg-success bg-gradient text-white'>
                        <h4>Orders Delivered</h4>
                        <hr />
                        <h5>4</h5>
                        <p></p>
                    </div>
                </div>
            </div>
        <div className="d-flex justify-content-between">
          <h3>Admin Dashboard</h3>

          <button
            type="button"
            class="btn btn-danger"
            data-mdb-toggle="modal"
            data-mdb-target="#exampleModal"
          >
            Add Product
          </button>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Add Product
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-mdb-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form action="">
                    <div className="mb-3">
                      <label htmlFor="">Product Name</label>
                      <input
                        onChange={(e) => setProductName(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Enter Product Name"
                      />

                      <label className="mt-2" htmlFor="">
                        Product Price
                      </label>
                      <input
                        onChange={(e) => setProductPrice(e.target.value)}
                        type="text"
                        className="form-control "
                        placeholder="Enter Product Price"
                      />

                      <label className="mt-2" htmlFor="">
                        Product Category
                      </label>
                      <input
                        onChange={(e) => setProductCategory(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Enter Product Category"
                      />

                      <label className="mt-2" htmlFor="">
                        Product Description
                      </label>
                      <textarea
                        onChange={(e) => setProductDescription(e.target.value)}
                        name=""
                        id=""
                        cols="4"
                        rows="4"
                        className="form-control"
                      ></textarea>

                      <input
                        onChange={handleImageUpload}
                        type="file"
                        className="form-control mt-3"
                        placeholder="Input Image"
                      />
                      {
                        previewImage && (
                          <img
                            src={previewImage}
                            className="object-cover rounded-3 mt-2"
                            height={"300px"}
                            width={"100%"}
                            alt=""
                          />
                        )
                        // previewImage && <img src={setpreviewImage} className="object-cover rounded-3 mt-2" height={'300px'} width={'100%'} alt=""/>
                      }
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-mdb-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="table mt-3">
          <thead class="table-info">
            <tr>
              <th scope="col">Product Image</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Price</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* first row */}
            {products.map((product) => {
              return (
                <tr>
                  <td>
                    <img src={product.image} className="" alt="" height={50} />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <Link
                        to={`/admin/product/edit/${product._id}`}
                        type="button"
                        class="btn btn-success"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
      
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;