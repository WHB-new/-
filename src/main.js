import { createApp } from 'vue'
import App from './App.vue'
//导入路由
import router from './router'
//导入全局css格式化
import 'normalize.css/normalize.css'
//导入pinia仓库
import pinia from './store'
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
