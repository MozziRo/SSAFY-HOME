// src/stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false, // 로그인 여부
  }),
  actions: {
    login() {
      this.isAuthenticated = true; // 로그인 처리
    },
    logout() {
      this.isAuthenticated = false; // 로그아웃 처리
    },
  },
});
