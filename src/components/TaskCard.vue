<template>
    <q-card class="task q-pl-md q-py-sm" bordered flat>
        <q-card-section horizontal>
            <div class="task--description">{{ task.title }}</div>
            <q-card-actions horizontal class="justify-around flex task--actions">
                <q-checkbox v-model="isDone"></q-checkbox>
                <q-btn flat icon="delete" color="negative" @click.stop="deleteTask"></q-btn>
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
const isDone = computed({
  get () {
    return props.task.isDone
  },
  set (val) {
    tasksStore.UPDATE_TASK({ ...props.task, isDone: val })
    emit('setTaskCompleted', val)
  }
})
const deleteTask = () => {
  tasksStore.DELETE_TASK(props.task)
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
