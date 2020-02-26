import Dashboard from 'views/Dashboard.jsx'
import ImageEditor from 'views/pages/ImageEditor.jsx'

import Test1 from './views/Test_1'
import Login from './views/Login'
import LandingCreator from './views/landingCreator'
import Projets from './views/Projets'
import CreateUser from './views/admin/createUser'
import DetailUser from './views/admin/DetailedUser'

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'tim-icons icon-chart-pie-36',
    component: Dashboard,
    //component: Dashboard,
    role: [],
    layout: '/admin',
    fullContent: false,
    visible: true
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'tim-icons icon-single-02',
    component: Login,
    role: [],
    layout: '/auth',
    visible: false
  },
  {
    path: '/imageEditor',
    name: 'Image Editor',
    icon: 'tim-icons icon-image-02',
    component: ImageEditor,
    role: ['Admin', 'User'],
    layout: '/admin',
    visible: true
  },
  {
    path: '/test1',
    name: 'Test1',
    icon: 'tim-icons icon-app',
    component: Test1,
    role: ['User', 'Admin'],
    layout: '/admin',
    visible: true
  },
  {
    path: '/landing',
    name: 'Landing',
    icon: 'tim-icons icon-controller',
    component: LandingCreator,
    role: [],
    fullContent: true,
    layout: '/admin',
    visible: true
  },
  {
    path: '/projets',
    name: 'Projets',
    icon: 'tim-icons icon-palette',
    component: Projets,
    layout: '/admin',
    role: [],
    visible: true
  },
  {
    path: '/user/createUser',
    name: 'Create User',
    icon: 'tim-icons icon-single-02',
    component: CreateUser,
    layout: '/admin',
    role: ['Admin'],
    visible: false
  },
  {
    path: '/user/detailUser',
    name: 'Detail User',
    icon: 'tim-icons icon-single-02',
    component: DetailUser,
    layout: '/admin',
    role: ['Admin'],
    fullContent: true,
    visible: false
  }
]

export default routes
