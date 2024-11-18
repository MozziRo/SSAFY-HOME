import { createApp } from 'vue';
import App from './App.vue';
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import router from './router';
import { createPinia } from 'pinia'; // Pinia import

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi", // 기본 아이콘 세트 설정
  },
}); // Vuetify 인스턴스 생성

const pinia = createPinia(); // Pinia 인스턴스 생성

const app = createApp(App);
app.use(router);
app.use(vuetify); // Vuetify 사용
app.use(pinia); // Pinia 사용
app.mount('#app');
