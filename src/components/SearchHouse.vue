
<template>
  <div>
    <h1>매물 검색</h1>
    <select v-model="selectedRegion" @change="fetchHousesByRegion">
      <option disabled value="">시/군/구 선택</option>
      <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
    </select>
    <ul v-if="houseDeals.length">
      <li v-for="deal in houseDeals" :key="deal.id">
        {{ deal.aptSeq }} - {{ deal.dealAmount }}만원
      </li>
    </ul>
    <p v-else>해당 지역의 매물 정보가 없습니다.</p>
  </div>
</template>

<script>
import axios from '@/axiosConfig';

export default {
  data() {
    return {
      regions: ['서울특별시 종로구', '부산광역시 해운대구'], // 예시 데이터
      selectedRegion: '',
      houseDeals: [],
    };
  },
  methods: {
    async fetchHousesByRegion() {
      if (!this.selectedRegion) return;
      try {
        const response = await axios.get(`/api/housedeals?region=${encodeURIComponent(this.selectedRegion)}`);
        this.houseDeals = response.data;
      } catch (error) {
        console.error('매물 데이터를 가져오는 중 오류 발생:', error);
      }
    },
  },
};
</script>
