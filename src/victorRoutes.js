import Dashboard from 'views/Dashboard.jsx'
import ImageEditor from 'views/pages/ImageEditor.jsx'

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
    path: "/imageEditor",
    name: "Image Editor",
    icon: "tim-icons icon-image-02",
    component: ImageEditor,
    layout: "/admin"
  },
  {
    path: "/test1",
    name: "Test1",
    icon: "tim-icons icon-app",
    component: Test1,
    layout: "/admin"
  },
  {
    path: "/test2",
    name: "Auth Test",
    icon: "tim-icons icon-app",
    component: Test1,
    layout: "/auth"
  },
  {
    path: "/test3",
    name: "Test3",
    icon: "tim-icons icon-controller",
    component: Test1,
    layout: "/admin"
  }
]

export default routes;
