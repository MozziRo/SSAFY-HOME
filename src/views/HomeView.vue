<template>
  <v-container fluid class="home-container">
    <!-- 드롭다운 검색 바 -->
    <div class="search-bar">
      <v-row dense align="center">
        <v-col cols="12" md="3">
          <v-select
            v-model="selectedCity"
            :items="cities"
            label="시/도"
            outlined
            dense
            placeholder="시/도 선택"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="selectedDistrict"
            :items="districts"
            label="구/군"
            outlined
            dense
            placeholder="구/군 선택"
            :disabled="!selectedCity"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="selectedNeighborhood"
            :items="neighborhoods"
            label="읍/면/동"
            outlined
            dense
            placeholder="읍/면/동 선택"
            :disabled="!selectedDistrict"
          ></v-select>
        </v-col>
        <!-- 검색 버튼 -->
        <v-col cols="12" md="3" class="text-center">
          <v-btn
            color="primary"
            block
            class="search-btn"
            height="56px"
            :disabled="!selectedNeighborhood"
            @click="handleSearch"
          >
            검색
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <!-- 검색 결과 목록 -->
    <!-- <div v-if="houseDeals.length > 0" class="result-container">
      <h2>검색 결과</h2>
      <ul>
        <li v-for="deal in paginatedDeals" :key="deal.aptSeq">
          {{ deal.aptNm }} ({{ deal.buildYear }}년 건축) - {{ deal.jibun }}
        </li>
      </ul> -->
      <!-- 페이지네이션 -->
      <!-- <v-pagination
        v-model="currentPage"
        :length="totalPages"
        @input="handlePageChange"
      ></v-pagination>
    </div> -->
    <!-- <p v-else-if="searchInitiated">검색 결과가 없습니다.</p> -->
  </v-container>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "@/axiosConfig";

export default {
  setup() {
    const cities = ref([]);
    const districts = ref([]);
    const neighborhoods = ref([]);
    const router = useRouter();
    const selectedCity = ref("");
    const selectedDistrict = ref("");
    const selectedNeighborhood = ref("");

    const houseDeals = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const searchInitiated = ref(false);

    // 총 페이지 수 계산
    const totalPages = computed(() =>
      Math.ceil(houseDeals.value.length / itemsPerPage)
    );

    // 현재 페이지 데이터 계산
    const paginatedDeals = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return houseDeals.value.slice(start, end);
    });

    // API 호출 함수들
    const fetchCities = async () => {
      try {
        const response = await axios.get("/api/locations/cities");
        cities.value = response.data;
      } catch (error) {
        console.error("시/도 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    const fetchDistricts = async () => {
      if (!selectedCity.value) return;
      try {
        const response = await axios.get("/api/locations/districts", {
          params: { city: selectedCity.value },
        });
        districts.value = response.data;
      } catch (error) {
        console.error("구/군 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    const fetchNeighborhoods = async () => {
      if (!selectedDistrict.value) return;
      try {
        const response = await axios.get("/api/locations/neighborhoods", {
          params: {
            city: selectedCity.value,
            district: selectedDistrict.value,
          },
        });
        neighborhoods.value = response.data;
      } catch (error) {
        console.error("읍/면/동 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    // 매물 검색
    const handleSearch = async () => {
      try {
        const response = await axios.get("/api/houseinfos/search", {
          params: {
            neighborhood: selectedNeighborhood.value,
          },
        });
        const deals = response.data;

        // 검색 결과 페이지로 이동하며 데이터 전달
        router.push({
          name: "SearchResult",
          query: { deals: JSON.stringify(deals) },
        });
      } catch (error) {
        console.error("매물 검색 중 오류 발생:", error);
      }
    };

    // Watcher로 데이터 로드
    watch(selectedCity, fetchDistricts);
    watch(selectedDistrict, fetchNeighborhoods);

    // 초기 시/도 데이터 로드
    fetchCities();

    return {
      cities,
      districts,
      neighborhoods,
      selectedCity,
      selectedDistrict,
      selectedNeighborhood,
      houseDeals,
      currentPage,
      totalPages,
      paginatedDeals,
      handleSearch,
      searchInitiated,
    };
  },
};
</script>

<style scoped>
.home-container {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("@/assets/nature-home.png");
  background-size: cover;
  background-position: center;
}

.search-bar {
  width: 90%;
  background: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 8px;
}

.result-container {
  margin-top: 20px;
}

.search-btn {
  font-weight: bold;
  color: white;
}
</style>
