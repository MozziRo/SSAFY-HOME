<template>
  <v-container>
    <h2>검색 결과 지도</h2>
    <!-- 지도 -->
    <div id="map" class="map-container"></div>

    <!-- 검색 결과 목록 -->
    <div v-if="deals.length > 0" class="result-container">
      <ul>
        <li v-for="deal in deals" :key="deal.aptSeq">
          <strong>{{ deal.aptNm }}</strong> - {{ deal.jibun }} ({{ deal.buildYear }}년 건축)
        </li>
      </ul>
    </div>
    <p v-else>검색 결과가 없습니다.</p>
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  props: {
    deals: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const map = ref(null);

    // 카카오 맵 API 스크립트 로드
    const loadKakaoMap = () =>
      new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps) {
          resolve(window.kakao);
          return;
        }

        const script = document.createElement("script");
        script.src =
          "https://dapi.kakao.com/v2/maps/sdk.js?appkey=6457dd3e343d3313e89546785ffad970&libraries=services";
        script.async = true;

        script.onload = () => {
          if (window.kakao && window.kakao.maps) {
            resolve(window.kakao);
          } else {
            reject(new Error("카카오 맵 객체 초기화 실패"));
          }
        };

        script.onerror = () => reject(new Error("카카오 맵 API 스크립트 로드 실패"));

        document.head.appendChild(script);
      });

    // 지도 초기화
    const initializeMap = (kakao) => {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.978), // 서울 기본 좌표
        level: 5,
      };

      map.value = new kakao.maps.Map(container, options);

      // 마커 추가
      props.deals.forEach((deal) => {
        if (deal.latitude && deal.longitude) {
          const markerPosition = new kakao.maps.LatLng(
            deal.latitude,
            deal.longitude
          );

          const marker = new kakao.maps.Marker({
            position: markerPosition,
            map: map.value,
          });

          // 마커 클릭 이벤트
          const infoWindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${deal.aptNm}</div>`,
          });

          kakao.maps.event.addListener(marker, "click", () => {
            infoWindow.open(map.value, marker);
          });
        }
      });
    };

    // 컴포넌트 마운트 시 API 로드 및 지도 초기화
    onMounted(async () => {
      try {
        const kakao = await loadKakaoMap();
        initializeMap(kakao);
      } catch (error) {
        console.error("카카오 맵 API 로드 중 오류 발생:", error);
      }
    });

    return {
      map,
    };
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 500px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.result-container {
  margin-top: 20px;
}

.result-container ul {
  list-style: none;
  padding: 0;
}

.result-container li {
  margin: 10px 0;
}
</style>
