<template>
  <v-row>
    <v-col v-for="property in properties" :key="property.id" cols="12" md="4">
      <v-card>
        <v-img
          :src="property.imageUrl"
          height="200px"
          cover
        />

        <v-card-title>{{ property.title }}</v-card-title>

        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12">
              <div class="text-h6 text-primary mb-2">
                {{ formatPrice(property.price) }}
              </div>
            </v-col>
            <v-col cols="12">
              <div class="text-body-1">
                {{ property.address }}
              </div>
            </v-col>
            <v-col cols="12">
              <div class="text-body-2 text-grey">
                {{ property.size }}평 | {{ property.type }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="primary"
            variant="text"
            @click="showDetail(property.id)"
          >
            자세히 보기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'PropertyList',

  props: {
    properties: {
      type: Array,
      required: true
    }
  },

  setup() {
    const router = useRouter()

    const formatPrice = (price) => {
      return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW'
      }).format(price)
    }

    const showDetail = (propertyId) => {
      router.push(`/property/${propertyId}`)
    }

    return {
      formatPrice,
      showDetail
    }
  }
}
</script>
