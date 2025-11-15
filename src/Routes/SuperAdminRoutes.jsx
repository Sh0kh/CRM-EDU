import Dashboard from "../Components/SuperAdmin/Dashboard/Index";
import Owner from "../Components/SuperAdmin/Owner";
import OwnerDetail from "../Components/SuperAdmin/OwnerDetail";


export const SuperAdminRoutes = [
    {
        name: 'Super admin dashboard',
        path: '/superadmin/dashboard',
        component: <Dashboard />
    },
    {
        name: 'Super admin owner',
        path: '/superadmin/owner',
        component: <Owner />
    },
    {
        name: 'Super admin Owner detail',
        path: '/superadmin/owner/:id',
        component: <OwnerDetail />
    },
]