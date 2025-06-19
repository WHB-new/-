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
    component:()=>import('@/views/Main.vue'),
    children:[
      {path:'/knowledges',
        name:'knowledges',
        component:()=>import('@/views/Knowledges/index.vue')
      },
      {
        path:'/file',
        name:'file',
        component:()=>import('@/views/File/index.vue')
      },
      {
        path:'/cotent',
        name:'content',
        component:()=>import('@/views/File/Content/index.vue')
      }
    ]
   },
   {
    path: '/test-login',
    name: 'test-login',
    component: () => import('@/components/Login.vue')
  },
  {
    path: '/test-register',
    name: 'test-register',
    component: () => import('@/components/Register.vue')
  }

    
  ]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
