export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/account',
    routes: [
      {
        path: '/account/center',
        name: 'center',
        icon: 'smile',
        component: './Account/Center/index',
      },
      {
        path: '/account/settings',
        name: 'settings',
        icon: 'smile',
        component: './Account/Settings/index',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/animal',
        name: 'animal',
        icon: 'smile',
        component: './Categories/Animal',
      },
      {
        component: './404',
      },
      {
        path: '/admin/plant',
        name: 'plant',
        icon: 'smile',
        component: './Categories/Plant',
      },
      {
        path: '/admin/category',
        name: 'picture',
        icon: 'smile',
        component: './Categories/Category',
      },
    ],
  },
  {
    path: '/mart',
    name: 'mart',
    icon: 'shopping',
    component: './Mart/index',
  },
  {
    path: '/functions',
    name: 'function',
    icon: 'alert',
    component: './Function/index',
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
