import React from 'react'
import useRole from '../../../Hooks/useRole';
import AdminDashboardHome from './AdminDashboardHome';
import StaffDashboardHome from './StaffDashboardHome';
import CitizenDashBoardHome from './CitizenDashBoardHome';
import { Loader } from 'lucide-react';

const DashboardHome = () => {
    const { role, roleLoading } = useRole();
    if (roleLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader className="animate-spin" size={40} />
            </div>
        );
    }

    if (role === 'admin') {
        return <AdminDashboardHome></AdminDashboardHome>
    } else if (role === 'staff') {
        return <StaffDashboardHome></StaffDashboardHome>
    } else {
        return <CitizenDashBoardHome></CitizenDashBoardHome>
    }
}
export default DashboardHome;