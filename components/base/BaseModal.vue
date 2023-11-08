<template>
  <va-modal v-model="showModalValue" :title="title" @ok="handleclick" okText="Submit" @cancel="handleCancelModal">
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
  </va-modal>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Add user'
  },

  itemEdit: {
    type: Object,
    default: () => {}
  }
})
const emits = defineEmits(['handleClick','handleCancelModal'])
const item = reactive({ data: props.itemEdit ? props.itemEdit : {} })
const showModalValue = ref(true)

const handleclick = () => {
  emits('handleClick', item.data)
}
const handleCancelModal = () => {
  emits('handleCancelModal')
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/base/base-modal.scss";
</style>
