import { createApp } from 'vue'
import App from './App.vue'
//导入路由
import router from './router'
//导入全局css格式化
import 'normalize.css/normalize.css'
//导入pinia仓库
import pinia from './store'

// 导入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(pinia)
// 使用 Element Plus
app.use(ElementPlus)
app.mount('#app')
