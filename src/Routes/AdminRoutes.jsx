import AdminProfile from "../Components/Admin/AdminProfile";
import AllPayment from "../Components/Admin/AllPayment";
import Client from "../Components/Admin/Client";
import Cost from "../Components/Admin/Cost";
import CostCategory from "../Components/Admin/CostCategory";
import Dashboard from "../Components/Admin/Dashboard";
import Debtor from "../Components/Admin/Debtor";
import Group from "../Components/Admin/Group";
import GroupDetail from "../Components/Admin/GroupDetail";
import PaymentMethod from "../Components/Admin/PaymentMethod";
import Room from "../Components/Admin/Room";
import Salary from "../Components/Admin/Salary";
import SocialMedia from "../Components/Admin/SocialMedia";
import Student from "../Components/Admin/Student";
import StudentDetail from "../Components/Admin/StudentDetail";
import Subject from "../Components/Admin/Subject";
import Teacher from "../Components/Admin/Teacher";
import TeacherDetail from "../Components/Admin/TeacherDetail";

export const AdminRoutes = [
    {
        name: 'Admin dashboard',
        path: 'dashboard',
        component: <Dashboard />
    },
    {
        name: 'Teacher',
        path: 'teacher',
        component: <Teacher />
    },
    {
        name: 'Room',
        path: 'room',
        component: <Room />
    },
    {
        name: 'Student',
        path: 'student',
        component: <Student />
    },
    {
        name: 'Group',
        path: 'group',
        component: <Group />
    },
    {
        name: 'Subject',
        path: 'subject',
        component: <Subject />
    },
    {
        name: 'PaymentMethod',
        path: 'payment-method',
        component: <PaymentMethod />
    },
    {
        name: 'SocialMedia',
        path: 'social-media',
        component: <SocialMedia />
    },
    {
        name: 'CostCategory',
        path: 'cost-category',
        component: <CostCategory />
    },
    {
        name: 'Cost',
        path: 'cost',
        component: <Cost />
    },
    {
        name: 'Group detail',
        path: 'group/:id',
        component: <GroupDetail />
    },
    {
        name: 'Salary',
        path: 'salary',
        component: <Salary />
    },
    {
        name: 'Student Profile',
        path: 'student/:id',
        component: <StudentDetail />
    },
    {
        name: 'Debtor',
        path: 'debtor',
        component: <Debtor />
    },
    {
        name: 'teacher detail',
        path: 'teacher/:id',
        component: <TeacherDetail />
    },
    {
        name: 'All payment',
        path: 'payment',
        component: <AllPayment />
    },
    {
        name: 'Admin Prodile',
        path: 'profile',
        component: <AdminProfile />
    },
    {
        name: 'Admin clients',
        path: 'client',
        component: <Client />
    },
]