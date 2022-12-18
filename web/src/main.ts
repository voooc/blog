import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import TDesign from 'tdesign-vue-next';

const app = createApp(App)
app.use(TDesign)
app.mount('#app')