import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';
import LoginWithGoogleBtn from '../SocialLogin/LoginWithGoogleBtn';
import axios from 'axios';
import { upLoadImage } from '../../../utils';
import { Eye, EyeOff } from 'lucide-react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Register = () => {
  const [showPass, setShowPass] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, UpdateUserProfile } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const axiosSecure = useAxiosSecure();

  const handleRegistration = async (data) => {
    const { name, photo, email, password } = data
    const imageFile = photo[0]

    try {
      const imageURL = await upLoadImage(imageFile)
      await registerUser(email, password)
      await UpdateUserProfile(name, imageURL)

      const userInfo = {
        email: email,
        displayName: name,
        photoURL: imageURL,

      }

      // Create User In DataBase
      const res = await axiosSecure.post('/users', userInfo);

      if (res.data.exists) {
        toast.error("User Already Exist! Please try with a new email.");
        return;
      }

      if (res.data.insertedId) {
        toast.success('Register successfully Done');
        navigate(location?.state || '/');
      }
    } catch (error) {
      toast.error("User Already Exist! Please try with a new email.")
    }

  }
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Create An Account</h3>
      <p className="text-center">Register With Reportify!</p>
      <form onSubmit={handleSubmit(handleRegistration)} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" className="input" {...register('name', { required: true })} placeholder="Your Name" />
          {errors.name?.type === 'required' && <p className="text-red-500">Name Is required</p>}

          <label className="label">Photo</label>
          <input type="file" className="file-input" {...register('photo')} placeholder="Your Photo" />


          <label className="label">Email</label>
          <input type="email" className="input" {...register('email', {
            required: true,
            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'please Enter Valid Email Address' }
          })}
            placeholder="Email" />
          {errors.email?.type === 'required' && <p className="text-red-500">Email Is required</p>}


          <div className='relative'>
            <label className="label">Password</label>
            <input type={showPass ? "text" : "password"} className="input" {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/ })} placeholder="Password" />
            <span onClick={() => setShowPass(!showPass)} className='absolute cursor-pointer z-50 right-6 top-7'>{showPass ? <Eye /> : <EyeOff />}</span>
            {
              errors.password?.type === 'required' && <p className="text-red-500 mt-2">Password Is required</p>
            }
            {
              errors.password?.type === 'minLength' && <p className="text-red-500 mt-2">Password Must be 6 character longer</p>
            }
            {
              errors.password?.type === 'pattern' && <p className="text-red-500 mt-2">Password must include: uppercase, lowercase, number, and special character.</p>
            }
          </div>



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