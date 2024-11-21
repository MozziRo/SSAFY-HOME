import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import SearchResults from '@/views/SearchResults.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/search-result', name: "SearchResult",
    component: SearchResults,
    props: (route) => ({ deals: JSON.parse(route.query.deals || "[]")}),
   }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
