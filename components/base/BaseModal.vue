<template>
  <va-modal v-model="showModalValue" title="edit" @ok="handleclick" okText="Submit">
    <div>
      <div class="input-modal">
        <va-input v-model="item.data.name" placeholder="Name..." label="Name:" preset="bordered" />
        <va-input
          v-model="item.data.category"
          placeholder="category..."
          label="category:"
          preset="bordered"
        />
        <va-input v-model="item.data.slug" placeholder="Slug..." label="Slug:" preset="bordered" />
      </div>
    </div>
  </va-modal>
</template>

<script setup>
const props = defineProps({})
const emits = defineEmits(['handle-click'])
const item = reactive({ data: {} })
const showModalValue = ref(true)
const handleclick = () => {
  emits('handle-click', item.data)
}
</script>

<style lang="scss" scoped>
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
