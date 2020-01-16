import Dashboard from "views/Dashboard.jsx";
import Test1 from './views/Test_1'

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/test1",
    name: "Test1",
    icon: "tim-icons icon-chart-pie-36",
    component: Test1,
    layout: "/admin"
  },
  {
    path: "/test2",
    name: "Test2",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/test3",
    name: "Test3",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  }
]

export default routes;
