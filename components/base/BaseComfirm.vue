<template>
  <va-modal
    v-model="showModalDelete"
    title="Delete"
    message="Are you sure you want to delete? If deleted, the data cannot be recovered."
    okText="Delete"
    @click="deleteUser"
  >
  </va-modal>
</template>

<script setup>
const emits = defineEmits(['deleteUser'])
const showModalDelete = ref(true)

const deleteUser = () => {
  emits('deleteUser')
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/base/base-comfirm.scss";
</style>
