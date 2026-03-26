<script setup>
    import TaskOptions from './TaskOptions.vue';

    const props = defineProps({
        task: {
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
        <li class="h-[210px] w-[400px] bg-white p-6 rounded-xl shadow-xl flex flex-col">
            <div class="flex justify-between">
                <h1 class="text-xl italic">{{ task.category }}</h1>
                <p class="text-gray-500 text-md">{{ new Date(task.dateCreatedTask).toLocaleDateString
                                    ("ru-RU", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })
                                }}
                </p>
            </div>
            <div class="flex justify-between items-center py-4">
                <div class="flex flex-col gap-2">
                    <h2 class="text-lg">{{ task.habit }}</h2>
                    <p class="text-gray-500 text-md px-2">{{ task.time }}</p>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="italic text-sm">{{ task.progress }}</p>
                <TaskOptions @delete-task="deleteTask(task.id)" @add-complete="addInComplete(task.id)"
                            @add-in-progress="addInProgress(task.id)"/>
            </div>
        </li>
</template>