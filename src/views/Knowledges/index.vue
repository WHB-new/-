<template>
  <div style="height: 100vh;display: flex;flex-direction: column;">
    <Nav name="知识库"></Nav>
    <div class="center">
      <!-- 文档创建 -->
      <div class="add">
        <div class="img">
        <svg t="1749739212870" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8439" width="24" height="24"><path d="M631.436 983.674l-533.843 0c-29.658 0-53.831-25.392-53.831-56.269l0-613.468 265.497-278.16 391.918 0c33.183-3.724 57.483 21.733 53.831 52.68l0.342 317.43-0.417 0 0 48.143-73.941 0 0-344.449-355.754 0 0 222.229-207.333 0 0 577.918 513.531 0 0 73.946zM991.997 679.239l-169.691 0 0-169.688-134.545 0 0 169.622-169.884 0 0 134.545 169.683 0 0 169.884 134.611 0 0-169.688 169.828 0 0-134.677z" fill="#1296db" p-id="8440"></path></svg>
        </div>
     <div class="right" @click="handleAddFile">
      <div class="title">新建</div>
          <div class="intro">新建文档开始协作</div>
     </div>
    
      </div>
      <!-- 知识库 -->
      <div class="add">
    <div class="img">
      <svg t="1749739212870" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8439" width="24" height="24"><path d="M631.436 983.674l-533.843 0c-29.658 0-53.831-25.392-53.831-56.269l0-613.468 265.497-278.16 391.918 0c33.183-3.724 57.483 21.733 53.831 52.68l0.342 317.43-0.417 0 0 48.143-73.941 0 0-344.449-355.754 0 0 222.229-207.333 0 0 577.918 513.531 0 0 73.946zM991.997 679.239l-169.691 0 0-169.688-134.545 0 0 169.622-169.884 0 0 134.545 169.683 0 0 169.884 134.611 0 0-169.688 169.828 0 0-134.677z" fill="#1296db" p-id="8440"></path></svg>
    </div>
    <div class="right"  @click="handleAdd">
      <div class="title">新建知识库</div>
      <div class="intro">创建你的知识库吧</div>
        </div>
      </div>
    </div>
    <div class="footer">
    <div class="title">
      <div class="left">
        <div class="txt">全部知识库</div>
      </div>
      <div class="right">
        <div class="search-box">
          <svg t="1751034040197" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3228" width="16" height="16"><path d="M415.59889935 818.40673751c-103.69194019 0-207.38388041-39.48836529-286.31642412-118.42090898-157.86508737-157.87981634-157.86508737-414.78248979 0-572.66230613 157.85035841-157.85035841 414.76776082-157.90927428 572.64757719 0 157.86508737 157.87981634 157.86508737 414.78248979 0 572.66230613-78.93254368 78.93254368-182.63921287 118.42090898-286.33115307 118.42090898z m0-725.22496474c-82.09927197 0-164.21327292 31.25487175-226.70828746 93.74988629-125.00475803 125.00475803-125.00475803 328.44127481 0 453.44603281 125.01948701 124.9753001 328.41181686 125.03421596 453.43130386 0 125.00475803-125.00475803 125.00475803-328.44127481 0-453.44603281-62.5097435-62.49501453-144.60901547-93.74988627-226.7230164-93.74988629z" fill="#2c2c2c" p-id="3229"></path><path d="M973.48804978 1013.69813456c-10.78160515 0-21.57793927-4.10938229-29.79670383-12.34287584L658.31757585 715.95203069c-16.46698708-16.46698708-16.46698708-43.14114955 0-59.60813666s43.14114955-16.46698708 59.60813665 0l285.37377009 285.38849908c16.46698708 16.46698708 16.46698708 43.14114955 0 59.60813663a42.07329932 42.07329932 0 0 1-29.81143281 12.35760482z" fill="#2c2c2c" p-id="3230"></path></svg>
          <input type="text" placeholder="搜索知识库..." v-model="searchQuery" style="padding-left:8px;">
        </div>
      </div>
    </div>
    <div class="list" v-show="filteredKnowledge.length != 0">
      <div 
        v-for="item in filteredKnowledge" 
        :key="item.id" 
        class="li"
        @click="goToEdit(item.id)"
      >
        <div class="card-header" :style="{ background: item.color }"></div>
        <div class="card-content">
          <div class="card-title">{{ item.title }}</div>
          <div class="card-desc">{{ item.description || '无描述' }}</div>
          <div class="card-meta">
            <span>{{ item.directory.length }} 个文档</span>
            <span>更新于 {{ item.updated }}</span>
          </div>
        </div>
        <div class="delete-btn" @click.stop="confirmDelete(item.id)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#8F959E"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="no-list" v-show="filteredKnowledge.length == 0">
      <div>
        <svg t="1751034671591" class="icon" viewBox="0 0 1774 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4468" width="256" height="256"><path d="M1454.749013 803.06176a210.957653 210.957653 0 0 0-210.98496 210.998613H1665.706667a211.012267 211.012267 0 0 0-210.957654-210.998613z" fill="#FFC033" p-id="4469"></path><path d="M374.565547 750.523733A262.18496 262.18496 0 0 0 112.380587 1012.69504h126.716586a135.318187 135.318187 0 0 1 270.650027 0h126.85312A262.18496 262.18496 0 0 0 374.565547 750.523733z" fill="#2B6AF7" p-id="4470"></path><path d="M1135.957333 376.449707H372.927147V1011.712H1135.957333V376.449707z" fill="#DFE0E3" p-id="4471"></path><path d="M218.5216 583.406933l156.153173-203.380053h760.4224L972.581547 583.406933h-754.0736z" fill="#FFFFFF" p-id="4472"></path><path d="M1127.66976 383.604053l-156.79488 196.1984H225.77152l150.65088-196.1984h751.24736z m14.854827-7.154346H372.9408L211.27168 586.9568H974.301867l168.236373-210.49344z" fill="#DFE0E3" p-id="4473"></path><path d="M1135.957333 1011.698347h319.488V376.449707H1135.957333v635.24864z" fill="#C4C7CC" p-id="4474"></path><path d="M1315.4304 586.970453h319.488l-179.48672-210.520746h-319.488l179.48672 210.5344z" fill="#DFE0E3" p-id="4475"></path><path d="M838.260053 710.833493h11.250347a20.329813 20.329813 0 0 1 20.329813 20.31616v271.510187h-51.909973V731.136a20.329813 20.329813 0 0 1 20.329813-20.329813z" fill="#8E959F" p-id="4476"></path><path d="M888.599893 754.455893h39.1168a70.669653 70.669653 0 0 1 70.519467 70.656V1011.712H817.834667V825.111893a70.656 70.656 0 0 1 70.765226-70.656z" fill="#C4C7CC" p-id="4477"></path><path d="M868.870827 13.748907a234.74176 234.74176 0 0 0-119.780694 31.402666 99.77856 99.77856 0 0 0 0 171.144534 244.24448 244.24448 0 0 0 239.616 0 99.792213 99.792213 0 0 0 0-171.144534 234.960213 234.960213 0 0 0-119.835306-31.402666z" fill="#DFE0E3" p-id="4478"></path><path d="M914.172587 210.056533l-44.864854 90.917547-44.919466-90.9312" fill="#DFE0E3" p-id="4479"></path><path d="M801.860267 137.475413a15.03232 15.03232 0 1 0-6.92224-29.272746 15.03232 15.03232 0 0 0 6.908586 29.272746zM868.88448 137.78944a15.045973 15.045973 0 1 0 0-30.078293 15.045973 15.045973 0 0 0 0 30.078293zM939.349333 137.78944a15.045973 15.045973 0 1 0 0-30.078293 15.045973 15.045973 0 0 0 0 30.078293z" fill="#C4C7CC" p-id="4480"></path><path d="M1327.650133 18.432s53.589333 104.311467-62.01344 157.85984c-115.602773 53.548373-87.422293-64.83968-28.194133-70.478507 59.22816-5.65248 107.60192 56.44288 22.541653 129.67936-50.722133 43.717973-81.783467 45.110613-81.783466 45.110614M594.193067 160.64512a114.783573 114.783573 0 0 0 63.911253 82.65728M506.565973 104.40704a142.363307 142.363307 0 0 0 41.3696 124.1088" p-id="4481"></path><path d="M0 1010.346667c0-7.53664 5.297493-13.653333 11.83744-13.653334h1751.258453c6.539947 0 11.83744 6.116693 11.83744 13.653334s-5.297493 13.653333-11.83744 13.653333H11.83744C5.297493 1024 0 1017.883307 0 1010.346667z" fill="#002275" p-id="4482"></path></svg>
      </div>
       <div>没搜索到相关内容</div>
    </div>
  </div>
    
    <!-- 删除确认模态框 -->
    <div v-if="showDeleteModal" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          删除确认
        </div>
        <div class="modal-body">
          <p>确定要删除知识库 <strong>{{ repoToDelete?.title }}</strong> 吗？</p>
          <p>此操作不可恢复，所有内容将被永久删除。</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-cancel" @click="showDeleteModal = false">取消</button>
          <button class="btn btn-confirm" @click="handleDelete">确认删除</button>
        </div>
      </div>
    </div>
  </div>
  <el-dialog title="" v-model="dialogVisible" width="480px" :show-close="false">
       <template #header>
          <div class="header">
        <div class="icon">
         <svg t="1750248090100" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2783" width="16" height="16"><path d="M716.608 1010.112L218.88 512.384 717.376 13.888l45.248 45.248-453.248 453.248 452.48 452.48z" p-id="2784"></path></svg>
        </div>
        <div class="txt">完善知识库信息</div>
      </div>
        </template>
    <template #default>
      <el-form ref="formRef" :model="form" label-width="80px" :rules="rules" >
          <el-form-item label="名称" label-position="Left" label-width="auto" prop="name">
            <el-input v-model="form.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="简介" label-position="Left" label-width="auto" style="margin-left:12px;" prop="intro">
            <el-input v-model="form.intro" placeholder="请输入简介"></el-input>
          </el-form-item>
          <!-- <el-form-item label="权限" label-position="Left" label-width="auto" prop="permission">
             后续功能添加
          </el-form-item> -->
      </el-form>
    </template>
    <template #footer>
       <el-button type="default" @click="cancelAdd">取消</el-button>
       <!-- 创建按钮做动态的，要看是否表单验证通过 -->
      <el-button type="primary" @click="confirmAdd(formRef)">创建</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed,onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import Nav from '@/components/Nav.vue';
import {addKnowledge} from '@/api/knowledge'
import { ElMessage } from 'element-plus';
import { addFile} from '@/api/file';
import {useHomeStore} from '@/store/home'
const homeStore = useHomeStore()
//知识库新增弹窗
const dialogVisible = ref(false)
//知识库表单信息
const form = ref({
  name:'',
  intro:'',
})
//表单组件
const formRef = ref(null)
//表单验证
const rules = ref({
name:[{required:true,message:'请输入名称',trigger:'blur'}],
//后续权限的选择也要做验证
})
const ownerId = ref(null)
onMounted(()=>{
  ownerId.value = sessionStorage.getItem('defaultKnowledgeId')
})
const handleAddFile = ()=>{
  const baseId=sessionStorage.getItem('defaultKnowledgeId')
    addFile({
      baseId,
       ownerId: sessionStorage.getItem('userId'),
    }).then(res=>{
      homeStore.getFileList()
      router.push({name:'content',params:{insertedId:res.data.insertedId}})
      
    }).catch(err=>{
      console.log(err)
    })
    
}
//点击新增知识库
const handleAdd=()=>{
  dialogVisible.value = true
}
//点击取消
const cancelAdd = ()=>{
dialogVisible.value = false
//清除表单
 formRef.value.resetFields()
}
//点击确定
const confirmAdd = async () => {
  try {
    await formRef.value.validate();
    const response = await addKnowledge({
    ownerId: ownerId.value,
    baseName: form.value.name,
    baseDesc: form.value.intro 
    });
    
    console.log('创建响应:', response);
 
    if (response.data.code === 201) {
      const newKnowledgeId = response.data.data;
      ElMessage.success('知识库创建成功');
      console.log('创建成功，新知识库ID:', newKnowledgeId);

      dialogVisible.value = false;
      formRef.value.resetFields();

      router.push({ 
        name: 'edit', 
        params: { id: newKnowledgeId }
      })
    } 
  } catch(error) {
    
  }
}


const router = useRouter();
const knowledgeStore = useKnowledgeStore();

const searchQuery = ref('');
const showDeleteModal = ref(false);
const repoToDelete = ref(null);

onMounted(async () => {
  if (!ownerId.value) {
    await temphandle();
  }
  await knowledgeStore.fetchKnowledgeList(ownerId.value);
});

// 过滤后的知识库
const filteredKnowledge = computed(() => {
  if (!searchQuery.value) return knowledgeStore.knowledgeList;
  
  const query = searchQuery.value.toLowerCase();
  // || (repo.description && repo.description.toLowerCase().includes(query))
  return knowledgeStore.knowledgeList.filter(repo => 
    (repo.title && repo.title.toLowerCase().includes(query)) 
  );
});

// 创建文档
const handleCreate = (type) => {
  console.log('创建文档');
};

// 确认删除
const confirmDelete = (id) => {
  repoToDelete.value = knowledgeStore.knowledgeList.find(k => k.id === id);
  showDeleteModal.value = true;
};

// 执行删除
const handleDelete = async () => {
  try {
    const res = await knowledgeStore.deleteRepo(repoToDelete.value.id);
    if (res) {
      ElMessage.success('删除成功');
    } else {
      
    }
  } catch (error) {
   
  } finally {
    showDeleteModal.value = false; 
  }
};

// 跳转到编辑页面
const goToEdit = (id) => {
  router.push({ name: 'edit', params: { id } });
};
</script>

<style lang="scss" scoped>
.el-dialog{
  .header{
    display:flex;
    align-items:center;
    .icon{
      width: 16px;
      height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .txt{
      font-size: 16px;
      margin-left:4px;
    }
  }
}
.knowledgeInfo{
  width: 100%;
}
.center{
  height: 64px;
margin:8px 0;
padding: 0 24px 0 24px;
margin-bottom:12px;
  display: flex;
.add{
  margin-right:20px;
  border:1px solid #c5c0c0;
    height: 64px;
    width: 233px;
    border-radius: 8px;
  padding:0 8px 0 16px;
    display: flex;
    align-items: center;
  &:hover{
      cursor: pointer;
      background-color: #edeeee;
    }
  .img{
    margin-right:12px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  .right{
    .title{
        height: 22px;
        line-height: 22px;
        font-size: 14px;
        font-weight: 500;
        overflow: hidden;
      color:#1f2329;
      }
    .intro{
        height: 18px;
        line-height: 18px;
        font-size: 12px;
        text-overflow: ellipsis;
        overflow: hidden;
      color:#646A73
      }
    }
  
  }
}
.footer{
  margin-top:20px;
    flex:1;
    display:flex;
    flex-direction: column;
    padding:0 24px;
    .title{
    box-sizing: border-box;
    height: 44px;
      padding:1px 0 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
      .left{
        .txt{
        height: 21px;
        color:#1f2329;
        font-size: 16px;
        font-weight: 600;
      }
    }
    
    .right {
      .search-box {
        display: flex;
        align-items: center;
        background: white;
        border-radius: 6px;
        padding: 6px 12px;
        border: 1px solid #dcdee2;
        width: 240px;
        
        input {
          border: none;
          outline: none;
          padding: 4px;
          font-size: 14px;
          width: 100%;
        }
      }
    }
  }
    .list{
flex:1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-gap: 24px;
    overflow-y:scroll;
    &::-webkit-scrollbar{
      display:none;
    }
    .li {
      position: relative;
      height: 220px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid #eaeaea;
      overflow: hidden;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.12);
        border-color: #c5d9ff;
        
        .delete-btn {
          opacity: 1;
        }
      }
      
      .card-header {
        height: 40px;
      }
      
      .card-content {
        padding: 16px;
      }
      
      .card-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #1f2329;
      }
      
      .card-desc {
        flex: 1;
        font-size: 13px;
        color: #646A73;
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        height: 60px;
        margin-bottom: 12px;
      }
      
      .card-meta {
        font-size: 12px;
        color: #8F959E;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #f0f2f5;
        padding-top: 12px;
      }
      
      .delete-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 28px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.8);
        opacity: 0.8;
        transition: all 0.3s ease;
        z-index: 10;
        
        &:hover {
          background: #ffeded;
          transform: scale(1.1);
          opacity: 1;
          
          svg path {
            fill: #ed4014;
          }
        }
      }
    }
  }
  .no-list{
  flex:1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

/* 模态框样式 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 8px;
  width: 420px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.modal-header {
  padding: 16px 24px;
  background: #2d8cf0;
  color: white;
  font-size: 16px;
  font-weight: 600;
}

.modal-body {
  padding: 24px;
  font-size: 14px;
  color: #515a6e;
  line-height: 1.6;
  
  p {
    margin-bottom: 8px;
  }
  
  strong {
    color: #1f2329;
  }
}

.modal-footer {
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #eaeaea;
}

.btn {
  padding: 8px 18px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.btn-cancel {
  background: #f0f2f5;
  color: #515a6e;
  
  &:hover {
    background: #e4e6e9;
  }
}

.btn-confirm {
  background: #ed4014;
  color: white;
  
  &:hover {
    background: #e13c33;
  }
}
</style>