import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path:'/',
    name:'/',
    redirect: '/file',
  },
  {
    path:'/home',
    name:'home',
    component:() => import('@/views/Main.vue'),
    children: [
      {
        path: '/knowledges',
        name: 'knowledges',
        component: () => import('@/views/Knowledges/index.vue')
      },
      {
        path: '/file',
        name: 'file',
        component: () => import('@/views/File/index.vue')
      },
      {
        path:'/cotent',
        name:'content',
        component:()=>import('@/views/File/content/index.vue')
      },
      {
        path: '/edit/:id?',
        name: 'edit',
        component: () => import('@/views/Edit.vue'),
        props: true
      }
    ]
  },
   {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register/register.vue')
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
//当没有token同时去的不是登录注册页面，跳转到登录页面
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('Authorization')
  if (!token && to.path !== '/login' && to.path !== '/register') {
    next('/login')
  } else {
    next()
  }
})
export default router