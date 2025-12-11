import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';
import LoginWithGoogleBtn from '../SocialLogin/LoginWithGoogleBtn';

const LogIn = () => {
      const {register,handleSubmit, formState:{errors}}=useForm();
      const { signInUser}=useAuth();
      const location=useLocation()
      const navigate=useNavigate()
      const handleLogin=(data)=>{
          signInUser(data.email, data.password)
           .then((res)=>{
            console.log(res)
            toast.success("Your LogedIn Successfully")
             navigate(location?.state || '/')
           }).catch((error)=>{
            toast.error(error)
           })
      }
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center">Welcome Back</h3>
            <p className="text-center">Please Login Here!</p>
            <form onSubmit={handleSubmit(handleLogin)}  className="card-body">
                <fieldset className="fieldset">

                    {/* Email Field */}
                    <label className="label">Email</label>
                    <input type="email" className="input" {...register('email', { required: true })} placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Email Is Required</p>
                    }

                    {/* Password Field */}
                    <label className="label">Password</label>
                    <input type="password" className="input" {...register('password')} placeholder="Password" />
                    <div>
                        <a className="link link-hover">Forgot password?</a>
                    </div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
                <p>Are you New to Reporify?<Link state={location.state} className="text-blue-400" to='/register'>Register</Link></p>
            </form>
            <LoginWithGoogleBtn />
        </div>
    );
}
export default LogIn;