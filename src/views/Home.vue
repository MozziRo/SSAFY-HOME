<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container class="home-container">
    <h1 class="home-title">초록내실에 오신 것을 환영합니다!</h1>
    <p class="home-subtitle">여기에서 부동산과 환경 정보를 함께 확인하세요.</p>
    <v-btn color="green darken-2" class="home-btn" @click="navigateToSearch">
      매물 검색하기
    </v-btn>
  </v-container>
</template>

<script>
export default {
  methods: {
    navigateToSearch() {
      this.$router.push('/search');
    },
  },
};
</script>

<style scoped>
.home-container {
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  border-radius: 12px;
  background: #e8f5e9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.home-title {
  font-size: 32px;
  font-weight: 700;
  color: #388e3c;
}

.home-subtitle {
  font-size: 18px;
  color: #666;
  margin: 10px 0 20px;
}

.home-btn {
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
}
</style>
