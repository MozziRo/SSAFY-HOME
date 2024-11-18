<template>
  <v-container fluid class="home-container">
    <!-- 배경 이미지 영역 -->
    <div class="image-container">
      <img src="@/assets/nature-home.png" alt="자연 친화적인 집" class="background-image" />
      <!-- 드롭다운 검색 바 -->
      <div class="search-bar">
        <v-row dense>
          <v-col cols="12" md="3">
            <v-select
              v-model="selectedCity"
              :items="cities"
              label="시"
              outlined
              dense
              placeholder="시 선택"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="selectedDistrict"
              :items="districts"
              label="군/구"
              outlined
              dense
              placeholder="군/구 선택"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="selectedNeighborhood"
              :items="neighborhoods"
              label="동"
              outlined
              dense
              placeholder="동 선택"
            ></v-select>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-container>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    // 시, 군/구, 동 데이터를 예시로 추가합니다. 실제 데이터는 필요에 따라 변경하세요.
    const cities = ref(['서울특별시', '부산광역시', '대구광역시']);
    const districts = ref(['강남구', '서초구', '송파구']);
    const neighborhoods = ref(['삼성동', '대치동', '잠실동']);

    const selectedCity = ref('');
    const selectedDistrict = ref('');
    const selectedNeighborhood = ref('');

    return {
      cities,
      districts,
      neighborhoods,
      selectedCity,
      selectedDistrict,
      selectedNeighborhood,
    };
  },
};
</script>

<style scoped>
.home-container {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* 화면 높이를 가득 채움 */
}

.image-container {
  position: relative;
  width: 100%;
  height: 80vh; /* 높이 설정 */
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지를 가로로 꽉 채우고 비율 유지 */
}

.search-bar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 800px; /* 검색 바의 최대 너비 */
  background: rgba(255, 255, 255, 0.8); /* 약간의 투명한 배경 */
  padding: 10px;
  border-radius: 8px;
}
</style>
