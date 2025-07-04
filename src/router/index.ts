import { useNProgress } from '@vueuse/integrations/useNProgress'
import { createRouter, createWebHistory } from 'vue-router'

import { v4Routes } from '../apps/v4/routes'

const DEFAULT_PAGE_TITLE = 'Shadcn for Vue - shadcn/vue'
const { start: startLoading, done: doneLoading } = useNProgress()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, _from, savedPosition) {
    if (to && to.hash) {
      return {
        el: to.hash,
        top: 64,
        behavior: 'smooth',
      }
    }
    else if (savedPosition) {
      return savedPosition
    }
    else {
      return { x: 0, y: 0 }
    }
  },

  routes: [
    // V4 routes
    ...v4Routes,

    {
      path: '/',
      redirect: '/v4',
    },

    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/PageNotFound.vue'),
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const pageTitle = to.meta.pageTitle

  document.title = pageTitle ? pageTitle as string : DEFAULT_PAGE_TITLE
  startLoading()
  next()
})

router.afterEach(() => {
  doneLoading()
})

export default router
