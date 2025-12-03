import CenterDetail from "../Components/Owner/CenterDetail";
import Centers from "../Components/Owner/Centers";
import Dashboard from "../Components/Owner/Dashboard";

export const OwnerRoutes = [
    {
        name: 'Owner dashboard',
        path: 'dashboard',
        component: <Dashboard />
    },
    {
        name: 'Owner Centers',
        path: 'center',
        component: <Centers />
    },
    {
        name: 'Owner center',
        path: 'center/:id',
        component: <CenterDetail />
    }
]