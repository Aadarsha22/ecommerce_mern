import React from 'react'

const UserProfile = () => {
    // get user from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
  return (
    <>
    
     <div class="card profile text-center py-3 style={{width: 18rem}}">
        <img class="card-img-top" src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=" alt=""/>
        <div class="card-body">
          <p class="card-text">Welcome, {user.fname}</p>
          <hr/>
          <p class="my-0 font-weight-bold">Name: {user.fname} {user.lname}</p>
          <p class=" font-weight-bold">Email: {user.email}</p>
          <button type="button">
            Edit Profile <i class="fas fa-user-edit"></i>
            </button>

            
        </div>
      </div>
      
      </>
  )
}

export default UserProfile