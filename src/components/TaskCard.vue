<template>
    <q-card class="task q-pl-md q-py-sm" bordered flat>
        <q-card-section horizontal>
            <div class="task--description">{{ task.title }}</div>
            <q-card-actions horizontal class="justify-around flex task--actions">
                <q-checkbox v-model="completed"></q-checkbox>
                <q-btn flat icon="delete" color="negative" @click="deleteTask"></q-btn>
            </q-card-actions>
        </q-card-section>
    </q-card>
</template>

<script setup>
import { computed } from 'vue'
import { useTasksStore } from 'src/stores/tasks-store'
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['setTaskCompleted'])
const tasksStore = useTasksStore()
const completed = computed({
  get () {
    return props.task.completed
  },
  set (val) {
    tasksStore.UPDATE_TASK({ ...props.task, completed: val })
    emit('setTaskCompleted', val)
  }
})
const deleteTask = () => {
  tasksStore.DELETE_TASK({ id: props.task.id })
}
</script>

<style>
.task {
  width: 375px;
}
.task--actions {
    display: grid;
    grid-auto-flow: column;
}
</style>
