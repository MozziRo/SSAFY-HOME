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
            @change="handleCityChange"
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
            @change="handleDistrictChange()"
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
    <div v-if="houseDeals.length > 0" class="result-container">
      <h2>검색 결과</h2>
      <ul>
        <li v-for="deal in paginatedDeals" :key="deal.id">
          {{ deal.aptSeq }} - {{ deal.dealAmount }}만원
        </li>
      </ul>
      <!-- 페이지네이션 -->
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        @input="handlePageChange"
      ></v-pagination>
    </div>
    <p v-else-if="searchInitiated">검색 결과가 없습니다.</p>
  </v-container>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import axios from "@/axiosConfig"; // Axios 인스턴스 사용

export default {
  setup() {
    const router = useRouter();
    const userStore = useUserStore();

    // 데이터 및 상태 변수 정의
    const cities = ref(["서울", "대구"]);
    const districts = ref([]);
    const neighborhoods = ref([]);

    const selectedCity = ref("");
    const selectedDistrict = ref("");
    const selectedNeighborhood = ref("");

    const houseDeals = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const searchInitiated = ref(false); // 검색 시작 여부

    // 로딩 상태
    const loading = ref(false);

    // 총 페이지 수 계산
    const totalPages = computed(() =>
      Math.ceil(houseDeals.value.length / itemsPerPage)
    );

    // 현재 페이지에 대한 매물 목록 계산
    const paginatedDeals = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return houseDeals.value.slice(start, end);
    });

    // 시/도 목록 로드
    const fetchCities = async () => {
      console.log("fetch cities");
      loading.value = true;
      try {
        const response = await axios.get("/api/locations/cities");
        cities.value = response.data;
      } catch (error) {
        console.error("시/도 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        loading.value = false;
      }
    };

    // 구/군 목록 로드
    // districts API 호출
    const fetchDistricts = async () => {
      if (!selectedCity.value) return;
      try {
        console.log(
          "API 요청: /api/locations/districts, city:",
          selectedCity.value
        ); // 요청 URL 및 파라미터 로그
        const response = await axios.get("/api/locations/districts", {
          params: { city: selectedCity.value },
        });
        console.log("API 응답 데이터:", response.data); // 응답 데이터 확인
        districts.value = response.data; // 데이터 업데이트
      } catch (error) {
        console.error("구/군 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    // 동 목록 로드
    const fetchNeighborhoods = async () => {
      if (!selectedDistrict.value) return;
      loading.value = true;
      try {
        const response = await axios.get("/api/locations/neighborhoods", {
          params: {
            city: selectedCity.value,
            district: selectedDistrict.value,
          },
        });
        neighborhoods.value = response.data;
        selectedNeighborhood.value = "";
      } catch (error) {
        console.error("동 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        loading.value = false;
      }
    };

    // 검색 실행
    const handleSearch = async () => {
      if (!userStore.isAuthenticated) {
        alert("로그인이 필요합니다.");
        router.push("/login");
        return;
      }

      searchInitiated.value = true; // 검색이 시작됨
      loading.value = true;

      try {
        const params = {
          city: selectedCity.value,
          district: selectedDistrict.value,
          neighborhood: selectedNeighborhood.value,
        };

        const response = await axios.get("/api/housedeals/search", { params });
        houseDeals.value = response.data;
        currentPage.value = 1; // 검색 후 페이지 초기화
      } catch (error) {
        console.error("매물 검색 중 오류 발생:", error);
        alert("검색 중 오류가 발생했습니다.");
      } finally {
        loading.value = false;
      }
    };

    // 페이지 변경 처리
    const handlePageChange = (page) => {
      currentPage.value = page;
    };

    // 시/도 선택 변경 처리
    const handleCityChange = async () => {
      console.log("선택된 시/도:", selectedCity.value); // 선택된 값 출력
      await fetchDistricts(); // 구/군 목록 로드
      console.log("구/군 목록:", districts.value); // 구/군 데이터 확인
      selectedDistrict.value = "";
      selectedNeighborhood.value = "";
    };

    // 구/군 선택 변경 처리
    const handleDistrictChange = async () => {
      await fetchNeighborhoods();
      console.log(districts.value);
      selectedNeighborhood.value = "";
    };

    // 초기 시/도 목록 로드
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
      handlePageChange,
      handleCityChange,
      handleDistrictChange,
      loading,
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
  overflow: hidden;
  position: relative;
  background-image: url("@/assets/nature-home.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.search-bar {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 90%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 8px;
  font-size: larger;
  font-weight: bold;
}

.result-container {
  margin-top: 20px;
}

.search-btn {
  width: 100%;
  font-weight: bold;
  color: white;
}

.search-btn[disabled] {
  background-color: #d3d3d3;
  cursor: not-allowed;
}
</style>
