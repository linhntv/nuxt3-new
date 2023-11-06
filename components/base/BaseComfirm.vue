<template>
  <va-modal v-model="showModalDelete" hide-default-actions>
    <h3 class="title-modal">Comfirm</h3>
    <p class="description-modal">
      Are you sure you want to delete? If deleted, the data cannot be recovered.
    </p>
    <div class="button-modal">
      <va-button @click="handleCloseModal()"> Cancel </va-button>
      <va-button color="danger" @click="deleteUserStore()"> Delete </va-button>
    </div>
  </va-modal>
</template>

<script setup></script>

<style lang="scss" scoped></style>
