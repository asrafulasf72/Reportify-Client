import React from 'react'
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import { Loader } from 'lucide-react';

 const AdminRoute = ({children}) => {
    const { loading}=useAuth();
    const {role, roleLoading}=useRole()

    if(loading || roleLoading){
         return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader className="animate-spin" size={40} />
      </div>
    );
    }

    if(role !== 'staff'){
         return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader className="animate-spin" size={40} />
      </div>
    );
    }
  return children
}
export default AdminRoute;