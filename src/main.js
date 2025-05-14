import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

app.use(Toastify)

app.mount('#app')
