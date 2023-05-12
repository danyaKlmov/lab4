<template>
  <q-page class="flex flex-center flex-grow" padding>
    <div class="tasks_container">
      <TaskCard v-for="task in tasksStore.tasks" :task="task" :key="task.id"/>
    </div>
  </q-page>
</template>

<script setup>
import TaskCard from 'src/components/TaskCard.vue'
import { useTasksStore } from 'src/stores/tasks-store'
const tasksStore = useTasksStore()
tasksStore.GET_TASKS()
</script>

<style>
.tasks_container {
  min-width: 360px;
  display: grid;
  grid-gap: 16px;
}
.task {
  min-width: 375px;
}
.task--description {
  width: 100%;
  display: flex;
  align-items: center;
}
</style>
