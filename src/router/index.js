import Vue from 'vue'
import VueRouter from 'vue-router'

// 路径
import main from '@/views/mains.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: main }
]

const router = new VueRouter({
  routes
})

export default router
