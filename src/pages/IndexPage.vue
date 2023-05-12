<template>
  <q-page class="flex flex-center flex-grow" padding>
    <div class="tasks_container">
      <q-toolbar class="text-primary">
        <q-toolbar-title>
          Задачи
        </q-toolbar-title>
        <q-btn flat icon="add" @click="adding=true; upsertingTodo=true;"></q-btn>
        <q-btn flat icon="delete_sweep" @click="removeAll" color="negative"></q-btn>
      </q-toolbar>
      <TaskCard v-for="task in tasksStore.tasks" :task="task" :key="task.id" @click="editTodo(task)"/>
      <q-card flat bordered v-if="!tasksStore.tasks.length">
        <q-card-section>
          Нет задач
        </q-card-section>
      </q-card>
    </div>
  </q-page>
  <q-dialog
    v-model="upsertingTodo"
    >
      <q-card style="width: 375px; max-width: 80vw;">
        <q-card-section>
          <q-form @submit.prevent="" class="q-gutter-md" rounded>
            <h6 class="text-center">{{ adding ? 'Добавление' : 'Редактирование' + ' задачи'}}</h6>
            <q-input outlined v-model="taskBuffer.title" label="Название" />
            <q-input
              v-model="taskBuffer.description"
              outlined
              autogrow
              label="Описание"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="between" class="bg-white text-teal">
          <q-btn type="submit" class="task_dialog--add" color="primary" @click="upsertTodo">
              {{ adding ? 'Добавить' : 'Сохранить' }}
          </q-btn>
        </q-card-actions>
      </q-card>
  </q-dialog>
</template>

<script setup>
import TaskCard from 'src/components/TaskCard.vue'
import { useTasksStore } from 'src/stores/tasks-store'
import { ref, watch } from 'vue'
const tasksStore = useTasksStore()
const upsertingTodo = ref(false)
const adding = ref(false)
const taskBuffer = ref({})
const clearDialog = () => {
  upsertingTodo.value = false
  adding.value = false
  taskBuffer.value = {}
}
const upsertTodo = async () => {
  if (adding.value) {
    await tasksStore.ADD_TASK(taskBuffer.value)
  } else {
    await tasksStore.UPDATE_TASK(taskBuffer.value)
  }
  clearDialog()
}
const removeAll = () => {
  tasksStore.DELETE_ALL()
}
const editTodo = (task) => {
  taskBuffer.value = task
  upsertingTodo.value = true
}
tasksStore.GET_TASKS()
watch(upsertingTodo, (to) => {
  if (to === false) {
    clearDialog()
  }
})
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
.task_dialog--add {
  width: 100%;
}
</style>
