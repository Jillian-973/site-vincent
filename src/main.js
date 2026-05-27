import { createApp } from 'vue'
import App from './App.vue'
import './styles/style.css'
import header from './components/header.vue'

createApp(App).mount('#app')
createApp(header).mount('#header')
