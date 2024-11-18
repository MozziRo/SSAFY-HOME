<template>
  <v-card class="pa-4">
    <v-form @submit.prevent="handleSubmit">
      <v-row>
        <v-col cols="12" md="3">
          <v-select
            v-model="selectedCity"
            :items="cities"
            label="시/도"
            @update:model-value="loadDistricts"
            required
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="selectedDistrict"
            :items="districts"
            label="시/군/구"
            :disabled="!selectedCity"
            @update:model-value="loadNeighborhoods"
            required
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="selectedNeighborhood"
            :items="neighborhoods"
            label="동"
            :disabled="!selectedDistrict"
          />
        </v-col>

        <v-col cols="12" md="3" class="d-flex align-center">
          <v-btn
            color="primary"
            block
            type="submit"
            :disabled="!selectedCity || !selectedDistrict"
          >
            검색하기
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SearchArea',

  emits: ['search'],

  setup(props, { emit }) {
    const selectedCity = ref('')
    const selectedDistrict = ref('')
    const selectedNeighborhood = ref('')

    const cities = ref([
      '서울특별시', '부산광역시', '대구광역시', '인천광역시',
      '광주광역시', '대전광역시', '울산광역시', '세종특별자치시'
    ])
    const districts = ref([])
    const neighborhoods = ref([])

    const loadDistricts = async () => {
      selectedDistrict.value = ''
      selectedNeighborhood.value = ''
      // API 호출하여 해당 시의 구/군 목록을 가져옴
      // 예시 데이터
      districts.value = ['강남구', '서초구', '송파구']
    }

    const loadNeighborhoods = async () => {
      selectedNeighborhood.value = ''
      // API 호출하여 해당 구의 동 목록을 가져옴
      // 예시 데이터
      neighborhoods.value = ['삼성동', '역삼동', '청담동']
    }

    const handleSubmit = () => {
      emit('search', {
        city: selectedCity.value,
        district: selectedDistrict.value,
        neighborhood: selectedNeighborhood.value
      })
    }

    return {
      selectedCity,
      selectedDistrict,
      selectedNeighborhood,
      cities,
      districts,
      neighborhoods,
      loadDistricts,
      loadNeighborhoods,
      handleSubmit
    }
  }
}
</script>
