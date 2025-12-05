import Dashboard from "../Components/Teacher/Dashboard";
import GroupDetail from "../Components/Teacher/GroupDetail";



export const TeacherRoutes = [
    {
        name: 'Teacher dashob',
        path: 'dashboard',
        component: <Dashboard />
    },
    {
        name: 'Teacher Group',
        path: 'group/:id',
        component: <GroupDetail />
    },
]