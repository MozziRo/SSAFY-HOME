import { defineStore } from 'pinia'

export const usePropertyStore = defineStore('property', {
  state: () => ({
    properties: [],
    loading: false,
    error: null
  }),

  actions: {
    async searchProperties(searchParams) {
      this.loading = true
      this.error = null

      try {
        // 실제 API 호출 시에는 아래와 같이 searchParams를 사용하여 요청
        // const response = await axios.get('/api/properties', { params: searchParams })

        // 예시 데이터 - searchParams를 활용한 필터링
        const mockData = [
          {
            id: 1,
            title: '역삼동 신축 아파트',
            price: 850000000,
            address: '서울시 강남구 역삼동 123-45',
            size: 32,
            type: '아파트',
            imageUrl: '/api/placeholder/400/200',
            location: {
              city: '서울시',
              district: '강남구',
              neighborhood: '역삼동'
            }
          },
          {
            id: 2,
            title: '삼성동 역세권 오피스텔',
            price: 450000000,
            address: '서울시 강남구 삼성동 67-89',
            size: 24,
            type: '오피스텔',
            imageUrl: '/api/placeholder/400/200',
            location: {
              city: '서울시',
              district: '강남구',
              neighborhood: '삼성동'
            }
          },
          {
            id: 3,
            title: '청담동 고급 주택',
            price: 1850000000,
            address: '서울시 강남구 청담동 34-56',
            size: 55,
            type: '단독주택',
            imageUrl: '/api/placeholder/400/200',
            location: {
              city: '서울시',
              district: '강남구',
              neighborhood: '청담동'
            }
          }
        ]

        // searchParams를 사용한 필터링 로직 구현
        const filteredProperties = mockData.filter(property => {
          const matchCity = !searchParams.city ||
            property.location.city.includes(searchParams.city)
          const matchDistrict = !searchParams.district ||
            property.location.district.includes(searchParams.district)
          const matchNeighborhood = !searchParams.neighborhood ||
            property.location.neighborhood.includes(searchParams.neighborhood)

          return matchCity && matchDistrict && matchNeighborhood
        })

        this.properties = filteredProperties
        return filteredProperties

      } catch (error) {
        console.error('Failed to fetch properties:', error)
        this.error = '매물 검색 중 오류가 발생했습니다.'
        return []
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null,
    getError: (state) => state.error
  }
})
