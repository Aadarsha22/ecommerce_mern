import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProductApi, updateProductApi } from "../../../apis/Api";
import { toast } from "react-toastify";

const AdminProductEdit = () => {
  //get id from params
  const { id } = useParams();

  //get Single product
  const [product, setProduct] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");

  // for image preview
  const [previewImage, setPreviewImage] = useState("");

  // for image setting and preview
  const handleImageUpload = (e) => {
    setProductImage(e.target.files[0]);

    // // Read the image file using FileReader
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    getSingleProductApi(id)
      .then((res) => {
        setProduct(res.data);
        setProductName(res.data.name);
        setProductPrice(res.data.price);
        setProductDescription(res.data.description);
        setProductImage(res.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productDescription", productDescription);
    formData.append("productImage", productImage);

    //calling the api
    updateProductApi(id, formData)
      .then((res) => {
        toast.success("Product Updated!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Product update Failed");
      });
  };

  return (
    <div className="container mt-2">
      <h3 className="text-danger">Updating for {product.name}</h3>
      <form className="w-50">
        <div class="mb-3">
          <label for="formFile" class="form-label">
            Product Name
          </label>
          <input
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            class="form-control"
            id="formFile"
            placeholder="Enter Product Name"
            value={productName}
          />

          <label for="formFile" class="form-label mt-2">
            Product Price
          </label>
          <input
            onChange={(e) => setProductPrice(e.target.value)}
            type="text"
            class="form-control"
            id="formFile"
            placeholder="Enter Product Price"
            value={productPrice}
          />
          <label for="formFile" class="form-label mt-2">
            Product Category
          </label>
          <input
            onChange={(e) => setProductCategory(e.target.value)}
            type="text"
            class="form-control"
            id="formFile"
            placeholder="Enter Product Category"
            value={productCategory}
          />
          <label for="formFile" class="form-label mt-2">
            Product Description
          </label>
          <textarea
            onChange={(e) => setProductDescription(e.target.value)}
            class="form-control"
            id="textAreaExample"
            rows="4"
            value={productDescription}
          ></textarea>

          <label for="formFile" class="form-label mt-2">
            Product Image
          </label>
          <input
            onChange={handleImageUpload}
            type="file"
            class="form-control"
            id="formFile"
            placeholder="Enter Product Image"
          />
          {/* <p>Old product image</p>
          <img
            src={productImage}
            alt=""
            width={"250px"}
            height={"200px"}
            className="object-cover"
          />
          <p>New Product Image</p> */}
          {/* {previewImage && (
            <img
              src={previewImage}
              alt=""
              className="mt-2 object-cover rounded-3 object-cover"
              height={"200px"}
              width={"250px"}
            />
          )} */
          previewImage ?(
            <img src={previewImage} alt="product" className="img-fluid mt-2"/>
            ):( <img src={productImage} alt="" className="mt-2 object-cover rounded-3"height={"200px"}
            width={"250px"}/> )
          }
        </div>

        <button
          type="button"
          class="btn btn-primary w-100"
          onClick={handleUpdate}
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default AdminProductEdit;
