// src/components/MemberList.vue
<template>
  <div>
    <h1>회원 목록</h1>
    <ul v-if="members.length">
      <li v-for="member in members" :key="member.id">
        {{ member.username }} ({{ member.email }})
      </li>
    </ul>
    <p v-else>회원 데이터가 없습니다.</p>
  </div>
</template>

<script>
import axios from '@/axiosConfig'; // Axios 인스턴스 사용

export default {
  data() {
    return {
      members: [], // 회원 목록
    };
  },
  mounted() {
    this.fetchMembers(); // 컴포넌트가 마운트될 때 회원 데이터를 가져옴
  },
  methods: {
    async fetchMembers() {
      try {
        const response = await axios.get('/api/members'); // Spring Boot의 /api/members 엔드포인트 호출
        this.members = response.data; // 서버 응답 데이터를 members에 저장
      } catch (error) {
        console.error('회원 데이터를 가져오는 중 오류 발생:', error);
      }
    },
  },
};
</script>
