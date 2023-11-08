<template>
  <HeaderPages />
  <div class="management-title">
    <h1>Management page</h1>
  </div>

  <div class="management-form">
    <va-input
      v-model="filtername"
      background="#fff"
      placeholder="Name...."
      @input="filterUsername"
    />
    <va-button preset="Plain-opacity" icon="add" @click="handleShowModalAdd"> Add User </va-button>
  </div>
  
  <TableUser
    :columns="columns"
    :items="items.data"
    :isLoading="managementData?.isLoading"
    @handleDelete="handleShowModalDelete"
    @handleEdit="handleShowModalEdit"
  />

  <BaseModal v-if="isShowModalAdd" @handleClick="addUser"  @handleCancelModal="handleCloseModal"/>

  <BaseModal
    v-if="isShowModalEdit"
    :itemEdit="itemEdit.data"
    title="Edit user"
    @handleClick="editUser"
    @handleCancelModal="handleCloseModal"
  />

  <BaseComfirm v-if="isShowModalDelete" @deleteUser="deleteUser" />
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
const isShowModalAdd = ref(false)
const isShowModalEdit = ref(false)
const isShowModalDelete = ref(false)
const itemEdit = reactive({ data: {} })
const itemDelete = reactive({ data: {} })
const managementData = management()

onMounted(async () => {
  await managementData.getUser()
  items.data = managementData?.userData?.data.map((user, index) => ({
    ...user,
    id: index
  }))
})

const handleShowModalAdd = () => {
  isShowModalAdd.value = true
}

const handleShowModalEdit = (rowIndex) => {
  isShowModalEdit.value = true
  itemEdit.data = items.data[rowIndex]
}

const handleShowModalDelete = (rowIndex) => {
  isShowModalDelete.value = true
  itemDelete.data = {
    ...items.data[rowIndex],
    id: rowIndex
  }
}

const handleCloseModal = () => {
  isShowModalEdit.value = false
  isShowModalAdd.value = false
  isShowModalDelete.value = false
}

const addUser = (item) => {
  if (item.name && item.category && item.slug) {
    managementData.addUser(item)
    items.data = managementData?.userData?.data
  } else {
    alert('Vui lòng nhập...')
  }
  handleCloseModal()
}

const editUser = (item) => {
  managementData.editUser(item)
  items.data = managementData?.userData?.data
  handleCloseModal()
}

const deleteUser = () => {
  managementData.deleteUser(itemDelete)
  items.data = managementData?.userData?.data
  handleCloseModal()
}

const filterUsername = () => {
  managementData.filterUser(filtername.value)
  items.data = managementData?.userData?.data
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/management.scss';
</style>
