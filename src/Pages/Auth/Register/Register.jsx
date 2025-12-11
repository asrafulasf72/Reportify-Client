import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';
import LoginWithGoogleBtn from '../SocialLogin/LoginWithGoogleBtn';

 const Register = () => {
  const {register,handleSubmit, formState:{errors}}=useForm();
  const {registerUser}=useAuth()
  const location=useLocation()
  const navigate=useNavigate()

  const handleRegistration=(data)=>{
    registerUser(data.email, data.password)
    .then((res)=>{
      console.log(res);
      toast.success("Sign Up Succesfully Done")
       navigate(location?.state || '/')
    }).catch((error)=>{
       toast.error("Sorry This Email you Alredy Used")
    })
         
  }
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Create An Account</h3>
        <p className="text-center">Register With Reportify!</p>
      <form onSubmit={handleSubmit(handleRegistration)} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" className="input" {...register('name', {required: true})} placeholder="Your Name" />
          {errors.name?. type==='required' && <p className="text-red-500">Name Is required</p>}

          <label className="label">Photo</label>
          <input type="file" className="file-input" {...register('photo')} placeholder="Your Photo" />
    

          <label className="label">Email</label>
          <input type="email" className="input" {...register('email', {required: true,
             pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message:'please Enter Valid Email Address'}})} 
             placeholder="Email" />
          {errors.email?. type==='required' && <p className="text-red-500">Email Is required</p>}


          <label className="label">Password</label>
          <input type="password" className="input" {...register('password', {required: true, minLength: 6, pattern:/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/})} placeholder="Password" />
           {
            errors.password?.type==='required' && <p className="text-red-500">Password Is required</p>
           }
           {
            errors.password?.type==='minLength' && <p className="text-red-500">Password Must be 6 character longer</p>
           }
           {
            errors.password?.type==='pattern' && <p className="text-red-500">Password must include: uppercase, lowercase, number, and special character.</p>
           }



          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>Already have an account? <Link state={location.state} to='/login' className="text-blue-400">Login</Link></p>
      </form>
      <LoginWithGoogleBtn />
    </div>
  );
}
export default Register;