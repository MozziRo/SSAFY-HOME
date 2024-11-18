<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container class="login-container">
    <v-card class="login-card" max-width="400">
      <v-card-title class="login-title">로그인</v-card-title>
      <v-card-text>
        <v-text-field label="아이디" v-model="username" outlined></v-text-field>
        <v-text-field label="비밀번호" v-model="password" outlined type="password"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="green darken-2" block class="login-btn" @click="handleLogin">로그인</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router'; // Vue Router import
import { ref } from 'vue'; // ref 사용

export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    // ref()를 사용해 상태 관리
    const username = ref('');
    const password = ref('');

    const handleLogin = () => {
      if (username.value && password.value) {
        // 간단한 로그인 처리 (예시)
        userStore.login(); // Pinia store의 login 메서드 호출
        alert('로그인 성공!');
        router.push('/'); // 메인 페이지로 이동
      } else {
        alert('아이디와 비밀번호를 입력해주세요.');
      }
    };

    return { username, password, handleLogin };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background: linear-gradient(to bottom right, #e8f5e9, #c8e6c9);
}

.login-card {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.login-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #388e3c;
}

.login-btn {
  font-weight: bold;
  color: #fff;
}
</style>
