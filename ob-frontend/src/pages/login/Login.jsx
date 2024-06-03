import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {toast} from 'react-toastify'
// import axios from 'axios'
import { loginApi } from '../../apis/Api';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email,setEmail]=useState('');
  const [pass,setPass]=useState('');
  // const handleSubmit=(e)=>{
  //   e.preventDefault();

  //   try{
  //     loginApi({
  //       email : email,
  //       password : pass
  //     }).then((res)=>{
  //       console.log(res.data);

  //       //dispatch to store
  //       dispatch(addUser(res.data.user))

  //       // localStorage.setItem("token",res.data.token)
  //       // localStorage.setItem("user",JSON.stringify(res.data.user))

  //       toast.success("Login Success");
  //       navigate ("/");
        
  //     }).catch((err)=>{
  //       console.log(err);
  //       toast.error("Login Failed");
  //     })
  //   } catch(error){
  //     toast.error("Login Failed");
  //   }}

  const handleSubmit=(e)=>{
    e.preventDefault();

    try{
      loginApi({
        email : email,
        password : pass
      }).then((res)=>{
        console.log(res.data);

        localStorage.setItem("token",res.data.token)
        localStorage.setItem("user",JSON.stringify(res.data.user))

        toast.success("Login Success");
        navigate ("/");
        
      }).catch((err)=>{
        console.log(err);
        toast.error("Login Failed");
      })
    } catch(error){
      toast.error("Login Failed");
    }}


  // axios.post("http://localhost:5000/api/user/login",{
                
  //               email: email,
  //               password: pass,
  //           }).then((res)=>{
  //               toast.success("Login success");
  //               navigate('/')
                
  //           }).catch((err) => {
  //               console.log(err);
  //               toast.error(err.response.data);
  //           })
  //         }

  return (
    <>
        <section className="vh-100 pt-5">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src='assets/images/draw2.png' className="img-fluid" alt="Sample"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-linkedin-in"></i>
            </button>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>


          <div className="form-group  mb-4">
          <input onChange={(e)=> setEmail(e.target.value)} htmlFor="text" id="name" name="name" className="form-control" placeholder="Enter a valid email address"/>
        </div>

        <div className="form-group  mb-4">
          <input onChange={(e)=> setPass(e.target.value)} htmlFor="text" id="name" name="name" className="form-control" placeholder="Password"/>
        </div>



          <div className="d-flex justify-content-between align-items-center">
       
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            <Link to ='/forgot_password'>
              Forgot Password
            </Link>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
     
            <button onClick={handleSubmit} type="button" className="btn btn-primary btn-lg">Login</button>
          
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?
             <Link to={"/Register"} className="link-danger"> Register</Link></p>
          </div>

        </form>
      </div>
    </div>
  </div>
 
</section>

        </>
  );
};

export default Login;