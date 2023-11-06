<template>
  <Header />
  <!-- title -->
  <div class="title-page">
    <h1>Management page</h1>
  </div>
  <ClientOnly>
    <div class="form-add">
      <!--input filter-->
      <div>
        <va-input
          v-model="filtername"
          :background="'#fff'"
          placeholder="Name...."
          @input="filterUsername"
        />

        <!-- button add -->
      </div>
      <div>
        <va-button preset="Plain-opacity" :icon="'add'" @click="handleShowModal"> Add User</va-button>
      </div>
    </div>
    <!-- ----------------------table---------------------- -->
    <Table
      :columns="columns"
      :items="items.data"
      :isLoading="managementData?.isLoading"
      @handle-delete="hanleDelete"
      @handle-edit="hanleEdit"
    />
    <BaseModal @handle-click="addUser" v-if="isShowModal"/>
  </ClientOnly>
</template>

<script setup>
import { management } from '@/store/management'

const columns = reactive([
  { key: 'name', sortable: true, label: 'name' },
  { key: 'category', sortable: true, label: 'category' },
  { key: 'slug', sortable: true, label: 'slug' },
  { key: 'actions', width: 140 }
])
const items = reactive({ data: [] })
const filtername = ref('')
const isShowModal = ref(false)
const managementData = management()

onMounted(async () => {
  await managementData.getUser()
  items.data = managementData?.userData?.data.map((user, index) => ({
    ...user,
    id: index
  }))
})

//fuction delete
const hanleDelete = (rowIndex) => {
  const item = {
    ...items.data[rowIndex],
    id: rowIndex
  }
  managementData.deleteUser(item)
  items.data = managementData?.userData?.data
}
//fuction edit
const hanleEdit = (rowIndex) => {
  console.log("🚀 ~ file: Management.vue:69 ~ hanleEdit ~ rowIndex:", rowIndex)
  handleShowModal()
}
// fuction filter
const filterUsername = () => {
  console.log(filtername.value)
  managementData.filterUser(filtername.value)
  items.data = managementData?.userData?.data
}
//fuction show modal add
const handleShowModal = () => {
  isShowModal.value = true
}
//fuction add user
const addUser = (item) => {
if(item.name && item.category && item.slug){
  managementData.addUser(item)
  items.data = managementData?.userData?.data
  
}else{
  alert("Vui lòng nhập")
}
isShowModal.value = false
}
</script>

<style lang="scss" scoped>
.title-page {
  margin: 40px auto;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
}

.form-add {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border: 1px solid #ccc;
  background-color: rgb(125, 174, 238);
}
.form-table {
  padding: 0 8px;
}
.table {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.from-number-item {
  width: 200px;
  float: left;
  background-color: rgb(125, 174, 238) !important;
}

.button-modal {
  margin-top: 18px;
  display: flex;
  gap: 8px;
  justify-content: end;
}
.description-modal {
  margin-top: 18px;
}
</style>
