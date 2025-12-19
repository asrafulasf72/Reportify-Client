import React from 'react'
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Loader from '../Component/Loader';

 const AdminRoute = ({children}) => {
    const { loading}=useAuth();
    const {role, roleLoading}=useRole()

    if(loading || roleLoading){
        return <Loader/>
    }

    if(role !== 'staff'){
        return<Loader/>
    }
  return children
}
export default AdminRoute;