import React from 'react'
import useRole from '../../../Hooks/useRole';
import Loader from '../../../Component/Loader';
import AdminDashboardHome from './AdminDashboardHome';
import StaffDashboardHome from './StaffDashboardHome';
import CitizenDashBoardHome from './CitizenDashBoardHome';

 const DashboardHome = () => {
    const {role, roleLoading}=useRole();
    if(roleLoading){
        return <Loader/>
    }
    
    if(role === 'admin'){
        return <AdminDashboardHome></AdminDashboardHome>
    }else if(role === 'staff'){
        return <StaffDashboardHome></StaffDashboardHome>
    }else{
        return <CitizenDashBoardHome></CitizenDashBoardHome>
    }
}
export default DashboardHome;