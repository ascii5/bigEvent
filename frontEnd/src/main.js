import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import App from './App.vue'
import 'element-plus/dist/index.css'
import router from '@/router'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import locale from 'element-plus/dist/locale/zh-cn'

const pinia = createPinia()
const persist = createPersistedState()

const app = createApp(App);

pinia.use(persist)
app.use(pinia)

app.use(ElementPlus,{locale});
app.use(router);
app.mount('#app');
