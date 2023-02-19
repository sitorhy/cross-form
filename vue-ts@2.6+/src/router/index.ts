import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
          {
              path: 'element-ui',
              component: () => import('../components/element-ui/Example.vue'),
              redirect: '/element-ui/basic-usage',
              children: [
                  {
                      path: 'basic-usage',
                      component: () => import('../components/element-ui/Basic-Usage.vue'),
                      meta: {
                          name: '基本使用'
                      }
                  }
              ]
          }
      ]
  }
  ]
})

export default router
