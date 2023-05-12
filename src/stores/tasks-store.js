import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),
  actions: {
    async GET_TASKS () {
      try {
        const { data } = await api.get('/todos')
        this.tasks = data
      } catch (err) {
        console.log(err)
        return err
      }
    },
    async UPDATE_TASK (payload) {
      try {
        const taskIndex = this.tasks.findIndex((task) => task.id === payload.id)
        this.tasks[taskIndex] = payload
      } catch (err) {
        console.log(err)
        return err
      }
    },
    async DELETE_TASK (payload) {
      try {
        const taskIndex = this.tasks.findIndex((task) => task.id === payload.id)
        this.tasks.splice(taskIndex, 1)
      } catch (err) {
        console.log(err)
        return err
      }
    }
  }
})
