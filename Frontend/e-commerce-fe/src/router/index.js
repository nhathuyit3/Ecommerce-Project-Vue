import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import UserProfileView from '../views/UserProfileView.vue';
import AdminDashboardView from '../views/admin/AdminDashboardView.vue';
import SellerDashboardView from '../views/seller/SellerDashboardView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: AuthView,
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: AuthView,
      meta: { requiresGuest: true },
    },
    {
      path: '/products/:slug',
      name: 'product-detail',
      component: ProductDetailView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfileView,
      meta: { requiresGuest: true },
    },
    // Admin Routes
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboardView,
      meta: { requiresGuest: true },
    },
    // Seller Routes
    {
      path: '/seller/dashboard',
      name: 'seller-dashboard',
      component: SellerDashboardView,
      meta: { requiresGuest: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

// Navigation Guard to check authentication and role
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  // Make sure that authentication status have been update before checking
  await authStore.checkAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // If route require auth but user do not login, redirect to login page
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    // If route request is client (do not login) but user have been login, redirect to main page 
    next({ name: 'home' });
  } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    // If route request role is admin but user isn't admin
    next({ name: 'home' }); // or another reject accept page 403
  } else if (to.meta.requiresSeller && !authStore.isSeller) {
    // If route request role is seller but user isn't seller
    next({ name: 'home' }); // or another reject accept page 403
  } else {
    next(); // Allow accept route
  }
});

export default router;