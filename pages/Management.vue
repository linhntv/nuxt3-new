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
          @input="filterUsername()"
        />

        <!-- button add -->
      </div>
      <div>
        <va-button
          preset="Plain-opacity"
          :icon="'add'"
          class="margin-right"
          @click="showModalAdd = true"
        >
          Add User</va-button
        >
        <va-modal v-model="showModalAdd" hide-default-actions>
          <div class="flex flex-col items-start gap-2">
            <h3 class="title-modal">Add user</h3>
            <div class="input-modal">
              <va-input
                v-model="item.data.name"
                placeholder="Name..."
                label="Name:"
                preset="bordered"
              />
              <va-input
                v-model="item.data.category"
                placeholder="category..."
                label="category:"
                preset="bordered"
              />
              <va-input
                v-model="item.data.slug"
                placeholder="Slug..."
                label="Slug:"
                preset="bordered"
              />
            </div>
          </div>

          <div class="flex justify-end mt-2 gap-2 button-modal">
            <va-button @click="handleCloseModal()"> Cancel </va-button>
            <va-button @click="addUserStore()"> Save </va-button>
          </div>
        </va-modal>
      </div>
    </div>
    <!-- ----------------------table---------------------- -->
    <div class="form-table">
      <va-data-table
        :items="items.data"
        :columns="columns"
        :height="'100%'"
        :loading="!!managementData?.isLoading"
        :style="{
          '--va-data-table-max-height': '500px',
          '--va-data-table-thead-background': 'var(--va-background-element)',
          '--va-data-table-tfoot-background': 'var(--va-background-element)',
          '--va-data-table-thead-color': '#2C82E0'
        }"
        class="table"
        sticky-header
        striped
      >
        <template #cell(actions)="{ rowIndex }">
          <div class="flex-button">
            <!-- form edit -->
            <div>
              <va-button
                preset="Plain-opacity"
                :icon="'edit'"
                class="margin-right"
                @click="handleEdit(rowIndex)"
              >
                Edit user</va-button
              >
            </div>
            <va-button
              preset="Plain-opacity"
              icon="delete"
              color="danger"
              @click="handleDeleteUser(rowIndex)"
            >
              Delete
            </va-button>
          </div>
        </template>
      </va-data-table>
      <va-alert color="info">
        Number items:
        <va-chip>{{ items.data.length }}</va-chip>
      </va-alert>
      <!-- modal edit -->
      <va-modal v-model="showModalEdit" hide-default-actions>
        <div>
          <h3 class="title-modal">Edit</h3>
          <div class="input-modal">
            <va-input
              v-model="item.data.name"
              placeholder="Name..."
              label="Name:"
              preset="bordered"
            />
            <va-input
              v-model="item.data.category"
              placeholder="category..."
              label="category:"
              preset="bordered"
            />
            <va-input
              v-model="item.data.slug"
              placeholder="Slug..."
              label="Slug:"
              preset="bordered"
            />
          </div>
        </div>

        <div class="flex justify-end mt-2 gap-2 button-modal">
          <va-button @click="handleCloseModal()"> Cancel </va-button>
          <va-button @click="editUserStore()"> Save </va-button>
        </div>
      </va-modal>

      <!-- modal delete-->
      <va-modal v-model="showModalDelete" hide-default-actions>
        <h3 class="title-modal">Delete modal</h3>
        <p class="description-modal">
          Are you sure you want to delete? If deleted, the data cannot be recovered.
        </p>
        <div class="flex justify-end mt-2 gap-2 button-modal">
          <va-button @click="handleCloseModal()"> Cancel </va-button>
          <va-button color="danger" @click="deleteUserStore()"> Delete </va-button>
        </div>
      </va-modal>
    </div>
  </ClientOnly>
</template>

<script setup>
import { management } from '@/store/management'
import { onMounted, reactive } from 'vue'
const columns = reactive([
  { key: 'name', sortable: true, label: 'name' },
  { key: 'category', sortable: true, label: 'category' },
  { key: 'slug', sortable: true, label: 'slug' },
  { key: 'actions', width: 140 }
])
const items = reactive({ data: [] })
const showModalAdd = ref(false)
const showModalEdit = ref(false)
const showModalDelete = ref(false)
const filtername = ref('')
const item = reactive({
  data: {
    name: '',
    category: '',
    slug: ''
  }
})
const managementData = management()

onMounted(async () => {
  await managementData.getUser()
  items.data = managementData?.userData?.data.map((user, index) => ({
    ...user,
    id: index
  }))
})
///fuction add user
const addUser = () => {
  if (item.data.name && item.data.category && item.data.slug) {
    items.data.push(item.data)
  } else {
    alert('Vui lòng nhập đầy đủ')
  }
  handleCloseModal()
}
const addUserStore = () => {
  if (item.data.name && item.data.category && item.data.slug) {
    managementData.addUser(item.data)
    items.data = managementData.userData.data
  } else {
    alert('Vui lòng nhập đầy đủ')
  }

  handleCloseModal()
}
///function delete User
const deleteUser = (rowIndex) => {
  items.data.splice(rowIndex, 1)
}
const handleDeleteUser = (rowIndex) => {
  showModalDelete.value = true
  item.data = { ...items.data[rowIndex], id: rowIndex }
}
const deleteUserStore = () => {
  managementData.deleteUser(item.data)
  items.data = managementData.userData.data
  handleCloseModal()
}
/// function show modal edit user
const handleEdit = (rowIndex) => {
  showModalEdit.value = true
  item.data = items.data[rowIndex]
}
///function edit user
const editUser = () => {
  const currentIndex = item.data.id
  items.data[currentIndex] = item.data
  handleCloseModal()
}
const editUserStore = () => {
  managementData.editUser(item.data)
  items.data = managementData.userData.data
  handleCloseModal()
}
//function hiden modal
const handleCloseModal = () => {
  showModalAdd.value = false
  showModalEdit.value = false
  showModalDelete.value = false
  item.data = { name: '', category: '', slug: '' }
}
//fuction filter item
const filterUsername = () => {
  managementData.filterUser(filtername.value)
  items.data = managementData.userData.data
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
.margin-right {
  margin-right: 8px;
}
.flex-button {
  display: flex;
  gap: 8px;
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
.title-modal {
  font-size: 18px;
  font-weight: 700;
  color: rgb(66, 66, 224);
}
.input-modal {
  display: block;
  width: 400px !important;
  .va-input-wrapper--bordered {
    width: 100%;
    margin-top: 8px;
  }
}
</style>
