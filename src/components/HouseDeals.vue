// src/components/HouseDeals.vue
<template>
  <div>
    <h1>부동산 매물 목록</h1>
    <ul v-if="houseDeals.length">
      <li v-for="deal in houseDeals" :key="deal.id">
        {{ deal.aptSeq }} - {{ deal.dealAmount }}만원
      </li>
    </ul>
    <p v-else>매물 데이터가 없습니다.</p>
  </div>
</template>

<script>
import axios from '@/axiosConfig'; // Axios 인스턴스 사용

export default {
  data() {
    return {
      houseDeals: [], // 부동산 매물 목록
    };
  },
  mounted() {
    this.fetchHouseDeals(); // 컴포넌트가 마운트될 때 매물 데이터를 가져옴
  },
  methods: {
    async fetchHouseDeals() {
      try {
        const response = await axios.get('/api/housedeals'); // Spring Boot의 /api/housedeals 엔드포인트 호출
        this.houseDeals = response.data; // 서버 응답 데이터를 houseDeals에 저장
      } catch (error) {
        console.error('매물 데이터를 가져오는 중 오류 발생:', error);
      }
    },
  },
};
</script>
