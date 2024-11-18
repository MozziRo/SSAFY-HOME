<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app-bar app color="green darken-3" dark dense>
    <v-app-bar-nav-icon />
    <v-toolbar-title>초록내실</v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- 로그인 상태에 따라 다른 버튼 표시 -->
    <template v-if="userStore.isAuthenticated">
      <v-btn text class="nav-btn" @click="navigateTo('/profile')">내정보</v-btn>
      <v-btn text class="nav-btn" @click="navigateTo('/my-area')">내지역</v-btn>
      <v-btn text class="nav-btn" @click="handleLogout">로그아웃</v-btn>
    </template>
    <template v-else>
      <v-btn text class="nav-btn" @click="navigateTo('/signup')">회원가입</v-btn>
      <v-btn text class="nav-btn" @click="navigateTo('/login')">로그인</v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { useUserStore } from '@/stores/userStore'; // Pinia store import
import { useRouter } from 'vue-router';

export default {
  setup() {
    const userStore = useUserStore(); // Pinia store 사용
    const router = useRouter(); // Vue Router 사용

    // 페이지 이동 함수
    const navigateTo = (path) => {
      router.push(path);
    };

    // 로그아웃 처리
    const handleLogout = () => {
      userStore.logout(); // 로그아웃 시 Pinia 상태 변경
      router.push('/'); // 로그아웃 후 홈으로 이동
    };

    return { userStore, navigateTo, handleLogout };
  },
};
</script>

<style scoped>
.nav-btn {
  color: #fff;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-btn:hover {
  color: #cddc39;
}
</style>
