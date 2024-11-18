<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container class="signup-container">
    <v-card class="signup-card" max-width="400">
      <v-card-title class="signup-title">회원가입</v-card-title>
      <v-card-text>
        <v-text-field label="아이디" v-model="username" outlined></v-text-field>
        <v-text-field label="이메일" v-model="email" outlined></v-text-field>
        <v-text-field label="비밀번호" v-model="password" outlined type="password"></v-text-field>
        <v-text-field label="비밀번호 확인" v-model="confirmPassword" outlined type="password"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="green darken-2" block class="signup-btn" @click="handleSignup">회원가입</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    const handleSignup = () => {
      if (password.value !== confirmPassword.value) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      // 여기에 회원가입 로직 추가 (예: 서버 API 호출)
      alert('회원가입 성공!');
      router.push('/login'); // 회원가입 후 로그인 페이지로 이동
    };

    return { username, email, password, confirmPassword, handleSignup };
  },
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #e8f5e9, #c8e6c9);
}

.signup-card {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.signup-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #388e3c;
}

.signup-btn {
  font-weight: bold;
  color: #fff;
}
</style>
