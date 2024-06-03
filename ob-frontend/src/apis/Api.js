import axios from 'axios';

const Api =axios.create({
    baseURL : "http://localhost:5000",
    withCredentials: true,
    headers:{
        'Content-Type':'multipart/form-data',
    },
});
console.log(`Bearer ${localStorage.getItem('token')}`);

const config = {
    headers:{
        'authorization':`Bearer ${localStorage.getItem('token')}`,
    }
}

//creating Route
export const testApi = () => Api.get('/');

//register route
export const registerApi = (data)=> Api.post("/api/user/register",data);

//login route
export const loginApi =(data)=> Api.post("/api/user/login",data);

//product route
export const addproductApi =(data)=> Api.post("/api/product/add",data,config);

//get all products route
export const getAllProductsApi = () => Api.get('/api/product/get_products');

// get single product route
export const getSingleProductApi = (id) => Api.get(`/api/product/get_product/${id}`);

//update product route
export const updateProductApi = (id,data) => Api.put(`/api/product/update_product/${id}`,data,config)

//delete product route
export const deleteProductApi = (id) => Api.delete(`/api/product/delete_product/${id}`,config)

//create order
export const createOrderApi = (data) => Api.post("/api/order/create",data,config);


//get orders by user
export const getOrdersByUserApi = () => Api.get("/api/order/get_single",config);

//get orders by user
export const getAllOrdersApi = () => Api.get("/api/order/get_all",config);

//update order status
export const updateOrderStatusApi = (id, data) => Api.put(`/api/order/change_status/${id}`, data, config);

//search products
export const searchProductsApi = (query) => Api.get(`/api/product/search_product/${query}`);

//forgot password
export const forgotPasswordApi = (data) => Api.post(`/api/user/forgot_password`, data);