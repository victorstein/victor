import Dashboard from 'views/Dashboard.jsx'
import ImageEditor from 'views/pages/ImageEditor.jsx'

import Test1 from './views/Test_1'
import Login from './views/login'
import Templates from './views/Templates'

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'tim-icons icon-chart-pie-36',
    component: Dashboard,
    role: [],
    layout: '/admin',
    fullContent: true
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
    role: [],
    layout: '/admin'
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
    path: '/test3',
    name: 'Test3',
    icon: 'tim-icons icon-controller',
    component: Test1,
    role: [],
    layout: '/admin'
  },
  {
    path: '/templates',
    name: 'Templates',
    icon: 'tim-icons icon-palette',
    component: Templates,
    layout: '/admin',
    role: []
  }
]

export default routes
