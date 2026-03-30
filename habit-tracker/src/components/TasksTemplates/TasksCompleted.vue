<script setup>
    import TaskOptions from './TaskOptions.vue';

    const props = defineProps({
        completedUserTask : {
            type: Object
        }
    })

    const emit = defineEmits([
      'deleteTask', 'addInComplete', 'addInProgress'
    ])
    const deleteTask = (id) => emit('deleteTask', id)
    const addInComplete = (id) => emit('addInComplete', id)
    const addInProgress = (id) => emit('addInProgress', id)
</script>

<template>
        <li class="h-[210px] w-[300px] bg-white p-6 rounded-xl shadow-xl flex flex-col">
            <div class="flex justify-between">
                <h1 class="text-lg italic">{{ completedUserTask.category }}</h1>
                <p class="text-gray-500">{{ new Date(completedUserTask.dateCreatedTask).toLocaleDateString
                                    ("ru-RU", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })
                                }}
                </p>
            </div>
            <div class="flex justify-between items-center py-2">
                <div class="flex flex-col gap-1">
                    <h2 class="text-lg">{{ completedUserTask.habit }}</h2>
                    <p class="text-gray-500 text-md px-2">{{ completedUserTask.frequency }}</p>
                    <p class="text-gray-500 text-md px-2">{{ completedUserTask.time }}</p>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="italic text-sm px-2 py-1.5 rounded"
                    :class="{
                        'bg-green-500 text-white': completedUserTask.progress === 'Выполнено',
                        'bg-purple-500 text-white': completedUserTask.progress === 'В процессе',
                        'bg-rose-500 text-white': completedUserTask.progress === 'Не выполнено'
                    }">{{ completedUserTask.progress }}</p>
                <TaskOptions @delete-task="deleteTask(completedUserTask.id)" @add-in-complete="addInComplete(completedUserTask.id)"
                            @add-in-progress="addInProgress(completedUserTask.id)" />
            </div>
        </li>
</template>