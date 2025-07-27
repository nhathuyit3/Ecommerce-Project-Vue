import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import './assets/main.css'

const app = createApp(App);
// Use Pinia to management state
app.use(createPinia);
// Use Vue Router to redirect
app.use(router);
// Use Vue I18n for multilinguage
app.use(i18n);

app.mount('#app');
