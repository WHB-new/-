<template>
  <div class="container" :style="homeStore.isCollapse ? 'margin-left:35px' : 'margin-left:0;'">
    <div class="header">
      <div class="name">
        {{ name }}
      </div>
      <!-- <div class="tool">
        工具区域
      </div> -->
      <!-- 头像区域 -->
      <div class="avatar" @click="toggleDropdown">
        <!-- <img src="./figure.png" alt="头像" class="avatar-img" /> -->
         <div class="icon">
          <svg t="1750566336287" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3669" width="16" height="16"><path d="M4.14791851 511.46598098c0 280.3599819 226.95808058 507.31806247 507.31806247 507.31806248s507.31806247-226.95808058 507.31806248-507.31806248-226.95808058-507.31806247-507.31806248-507.31806247-507.31806247 227.49209959-507.31806247 507.31806247" fill="#CCCCCC" p-id="3670"></path><path d="M444.71360435 580.35443368c-147.38924763 64.61630059-191.1788067 98.79351743-208.80143414 114.28006881-26.70095066 24.03085559-41.65348303 123.89241105-57.67405342 199.1890919 0 0 129.23260118 124.96044907 332.69384519 124.96044907s332.69384517-123.89241105 332.69384517-123.89241105c-16.02057039-75.29668085-30.43908375-177.29431236-57.1400344-200.79114894-17.62262743-15.48655138-59.81012947-49.12974921-207.1993771-113.21203077l-134.5727913-0.53401902z" fill="#FFD16D" p-id="3671"></path><path d="M582.49050974 451.65585152v162.875799c-39.51740697 48.06171118-103.59968854 46.45965414-143.11709552 0V451.65585152c0.53401902-88.11313717 143.11709552-88.11313717 143.11709552 0z" fill="#FFDECC" p-id="3672"></path><path d="M582.49050974 451.65585152v108.93987868c-27.23496967 19.75870349-52.8678823 30.97310276-71.55854776 30.97310276-18.15664645 0-44.32357809-11.21439928-71.55854776-30.97310276V451.65585152c0.53401902-88.11313717 143.11709552-88.11313717 143.11709552 0z" fill="#F7C5AA" p-id="3673"></path><path d="M432.96518606 578.75237664l-50.73180625 27.23496967 73.69462381 101.99763151 55.53797736-52.8678823-78.50079492-76.36471888z" fill="#FFFFFF" p-id="3674"></path><path d="M589.96677592 578.75237664l50.73180624 27.23496967-73.69462381 101.99763151-55.53797737-52.8678823 78.50079494-76.36471888z" fill="#FFFFFF" p-id="3675"></path><path d="M304.80062291 974.99448438l20.82674151 8.54430421C325.0933454 932.80698234 325.0933454 795.03007696 325.0933454 795.03007696l-20.29272249 179.96440742z m416.53483023-1.06803803l-24.5648746 10.14636126c0.53401902-50.73180625 0.53401902-188.50871164 0.53401902-188.50871164l24.03085558 178.36235038z" fill="#B98D39" p-id="3676"></path><path d="M511.46598098 170.76185061c-239.77453689 0-153.79747578 289.43830512-137.77690538 312.9351417 17.08860842 25.63291263 99.32753645 92.91930828 137.77690538 92.91930828 38.98338796 0 120.68829697-67.28639565 137.77690539-92.91930828 16.02057039-22.96281756 101.99763151-312.93514169-137.77690539-312.9351417z" fill="#FFDECC" p-id="3677"></path><path d="M327.22942146 360.87261928c12.81645632-4.27215211 28.83702671 10.14636125 35.77927388 32.04114079 6.94224717 21.89477954 2.67009507 42.72152105-9.61234224 46.99367316-12.81645632 4.27215211-28.83702671-10.14636125-35.77927388-32.04114079-7.47626619-21.89477954-2.67009507-42.72152105 9.61234224-46.99367316z m367.93910004 0c-12.81645632-4.27215211-28.83702671 10.14636125-35.77927387 32.04114079-6.94224717 21.89477954-2.67009507 42.72152105 9.61234223 46.99367316 12.81645632 4.27215211 28.83702671-10.14636125 35.77927387-32.04114079 7.47626619-21.89477954 2.67009507-42.72152105-9.61234223-46.99367316z" fill="#FFDECC" p-id="3678"></path><path d="M401.99208329 267.41929198c-13.88449434 75.83069987-48.5957302 68.8884527-45.92563512 158.06962789-11.21439928-69.4224717-27.76898869-161.80776098 19.22468447-222.68592848 37.91534993-48.5957302 162.875799-83.30696605 243.51266998-25.09889361 89.18117519 19.22468447 61.41218651 201.32516795 49.66376823 235.50238479-8.54430421-55.53797737-27.23496967-79.03481394-50.73180625-144.71915255-32.04114079 23.49683658-174.6242173 28.30300769-215.74368131-1.06803804z" fill="#CC7B53" p-id="3679"></path></svg>
         </div>
        <div v-if="showDropdown" class="dropdown">
          <button @click="logout">退出登录</button>
        </div>
      </div>
    </div>
  </div>
  <el-dialog  v-model="isShow"  :before-close="dialogBeforeClose"
  align-center
  width="500"
  :show-close="false">
     <!-- <span >
      <span><svg t="1750565873327" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2648" width="16" height="16"><path d="M1001.661867 796.544c48.896 84.906667 7.68 157.013333-87.552 157.013333H110.781867c-97.834667 0-139.050667-69.504-90.112-157.013333l401.664-666.88c48.896-87.552 128.725333-87.552 177.664 0l401.664 666.88zM479.165867 296.533333v341.333334a32 32 0 1 0 64 0v-341.333334a32 32 0 1 0-64 0z m0 469.333334v42.666666a32 32 0 1 0 64 0v-42.666666a32 32 0 1 0-64 0z" fill="#FAAD14" p-id="2649"></path></svg></span>
      确认要退出登录吗？</span> -->
      <div style="display:flex;align-items:center;">
    <div style="display:flex;align-items:center;justify-content: center;margin-right:10px;">
      <svg t="1750565873327" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2648" width="16" height="16"><path d="M1001.661867 796.544c48.896 84.906667 7.68 157.013333-87.552 157.013333H110.781867c-97.834667 0-139.050667-69.504-90.112-157.013333l401.664-666.88c48.896-87.552 128.725333-87.552 177.664 0l401.664 666.88zM479.165867 296.533333v341.333334a32 32 0 1 0 64 0v-341.333334a32 32 0 1 0-64 0z m0 469.333334v42.666666a32 32 0 1 0 64 0v-42.666666a32 32 0 1 0-64 0z" fill="#FAAD14" p-id="2649"></path></svg>
    </div>
    <div style="font-size: 16px;">确定要退出当前账号登录吗？</div>
      </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isShow=false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { useHomeStore } from '@/store/home';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const isShow = ref(false)
const homeStore = useHomeStore();
const props = defineProps({
  name: String,
});
const handleConfirm=()=>{
  sessionStorage.removeItem('defaultKnowledgeId')
  sessionStorage.removeItem('Authorization')
  sessionStorage.removeItem('userId')
  sessionStorage.removeItem('username')
  sessionStorage.removeItem('refreshToken')
  isShow.value = false
  router.push('/login')
}
// 控制下拉框显示
const showDropdown = ref(false);
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// 路由跳转
const router = useRouter();
const logout = () => {
isShow.value = true
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 24px 0 20px;
  height: 64px;
  .header {
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
    }
    .tool {
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      // overflow:hidden;
      position: relative;
      cursor: pointer;
      .icon {
        width: 100%;
        height: 100%;
        // width: 40px;
        // height: 40px;
        // border-radius: 50%;
      }
      .dropdown {
        position: absolute;
        top: 50px;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        padding: 10px;
        width: 100px;
        height: auto;
        justify-content: center;
        display: flex;
        button {
          background: none;
          border: none;
          cursor: pointer;
          color: #333;
          font-size: 14px;
        }
        button:hover {
          color: rgba(80, 98, 124, 0.788);
        }
      }
    }
  }
}
</style>