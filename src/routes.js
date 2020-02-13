import Dashboard from 'views/Dashboard.jsx'
import ImageEditor from 'views/pages/ImageEditor.jsx'

import Test1 from './views/Test_1'
import Login from './views/Login'
import LandingCreator from './views/landingCreator'
import Projets from './views/Projets'

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'tim-icons icon-chart-pie-36',
    component: LandingCreator,
    //component: Dashboard,
    role: [],
    layout: '/admin',
    fullContent: true
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'tim-icons icon-single-02',
    component: Login,
    role: [],
    layout: '/auth'
  },
  {
    path: '/imageEditor',
    name: 'Image Editor',
    icon: 'tim-icons icon-image-02',
    component: ImageEditor,
    role: ['Admin', 'User'],
    layout: '/admin'
  },
  {
    path: '/test1',
    name: 'Test1',
    icon: 'tim-icons icon-app',
    component: Test1,
    role: ['User', 'Admin'],
    layout: '/admin'
  },
  {
    path: '/landing',
    name: 'Landing',
    icon: 'tim-icons icon-controller',
    component: Dashboard,
    //component: LandingCreator,
    role: [],
    fullContent: true,
    layout: '/admin'
  },
  {
    path: '/Projets',
    name: 'Projets',
    icon: 'tim-icons icon-palette',
    component: Projets,
    layout: '/admin',
    role: []
  }
]

export default routes
