<template>
  <v-app>
    <Navbar v-if="showHeaderFooter" />
    <v-main class="main-content">
      <router-view />
    </v-main>
    <AppFooter v-if="showHeaderFooter" />
  </v-app>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/common/Navbar.vue';
import AppFooter from './components/common/AppFooter.vue';

export default {
  components: { Navbar, AppFooter },
  setup() {
    const route = useRoute();
    const excludedRoutes = ['/login'];
    const showHeaderFooter = computed(() => !excludedRoutes.includes(route.path));
    return { showHeaderFooter };
  },
};
</script>

<style scoped>
.main-content {
  background: #f5f5f5;
  padding: 20px;
  min-height: 80vh;
  color: #333;
  font-family: 'Noto Sans KR', sans-serif;
}
</style>
