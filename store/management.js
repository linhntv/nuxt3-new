import { defineStore } from 'pinia'
import { useApi } from '@/helpers/useFetch'
export const management = defineStore('personalData', {
  state: () => ({
    userData: null,
    loading: false
  }),
  getters: {
    isLoading: (state) => {
      return state.loading
    }
  },

  actions: {
    async getUser() {
      try {
        this.loading = true
        this.userData = await useApi.requestForm.get('/beers')
      } catch (error) {
        return error
      } finally {
        this.loading = false
      }
    },
    addUser(item) {
      this.userData.data.push(item)
    },
    deleteUser(item) {
      const currentId = item.id
      this.userData.data.splice(currentId, 1)
    },
    editUser(item) {
      const currentId = item.id
      this.userData.data[currentId] = item
    },
    filterUser(name) {
      this.userData.data = this.userData.data.filter((item) => {
        if (item.name?.includes(name)) {
          return item
        } else if (item.name?.includes('')) {
          this.getUser()
        }
      })
    }
  }
})
