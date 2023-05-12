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
    async ADD_TASK (todo) {
      try {
        await api.post('/todos', todo)
        await this.GET_TASKS()
      } catch (err) {
        console.log(err)
        return err
      }
    },
    async UPDATE_TASK (todo) {
      try {
        await api.put(`/todos/${todo._id}`, todo)
        await this.GET_TASKS()
      } catch (err) {
        console.log(err)
        return err
      }
    },
    async DELETE_TASK (todo) {
      try {
        await api.delete(`/todos/${todo._id}`)
        await this.GET_TASKS()
      } catch (err) {
        console.log(err)
        return err
      }
    },
    async DELETE_ALL (todo) {
      try {
        await api.delete('/todos')
        await this.GET_TASKS()
      } catch (err) {
        console.log(err)
        return err
      }
    }
  }
})
