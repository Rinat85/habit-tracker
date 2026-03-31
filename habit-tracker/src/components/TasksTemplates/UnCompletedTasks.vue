<script setup>
    import TaskOptions from './TaskOptions.vue';

    const props = defineProps({
        unCompletedUserTask: {
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
        <li class="h-[210px] w-[300px] bg-white px-6 py-4 rounded-xl shadow-xl flex flex-col">
            <div class="flex justify-between">
                <h1 class="text-lg italic">{{ unCompletedUserTask.category }}</h1>
                <p class="text-gray-500">{{ new Date(unCompletedUserTask.dateCreatedTask).toLocaleDateString
                                    ("ru-RU", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })
                                }}
                </p>
            </div>
            <div class="flex justify-between items-center py-2">
                <div class="flex flex-col gap-1">
                    <h2 class="text-lg">{{ unCompletedUserTask.habit }}</h2>
                    <p class="text-gray-500 text-md px-2">{{ unCompletedUserTask.frequency }}</p>
                    <p class="text-gray-500 text-md px-2">{{ unCompletedUserTask.time }}</p>
                </div>
            </div>
            <div class="flex justify-between items-center mt-4">
                <p class="italic text-sm px-2 py-1.5 rounded"
                    :class="{
                        'bg-green-500 text-white': unCompletedUserTask.progress === 'Выполнено',
                        'bg-purple-500 text-white': unCompletedUserTask.progress === 'В процессе',
                        'bg-rose-500 text-white': unCompletedUserTask.progress === 'Не выполнено'
                    }">{{ unCompletedUserTask.progress }}</p>
                <TaskOptions @delete-task="deleteTask(unCompletedUserTask.id)" 
                            @add-in-complete="addInComplete(unCompletedUserTask.id)"
                            @add-in-progress="addInProgress(unCompletedUserTask.id)" />
            </div>
        </li>
</template>