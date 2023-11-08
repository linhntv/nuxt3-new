<template>
  <div class="table">
    <va-data-table
      :items="items"
      :columns="columns"
      :height="'100%'"
      :loading="isLoading"
      :style="{
        '--va-data-table-max-height': '500px',
        '--va-data-table-thead-background': 'var(--va-background-element)',
        '--va-data-table-tfoot-background': 'var(--va-background-element)',
        '--va-data-table-thead-color': '#2C82E0'
      }"
      class="table-content"
      sticky-header
      striped
    >
      <template #cell(actions)="{ rowIndex }">
        <div class="table-content-button">
          <va-button
            preset="Plain-opacity"
            :icon="'edit'"
            class="button-edit"
            @click="handleEdit(rowIndex)"
          >
            Edit user
          </va-button>

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
      <va-chip>{{ items.length }}</va-chip>
    </va-alert>
  </div>
</template>

<script setup>
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  items: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['handleDelete', 'handleEdit'])

const handleDeleteUser = (rowIndex) => {
  emits('handleDelete', rowIndex)
}

const handleEdit = (rowIndex) => {
  emits('handleEdit', rowIndex)
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/table-user.scss"
</style>
