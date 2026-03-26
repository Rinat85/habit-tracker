<script setup>
    import TaskOptions from './TaskOptions.vue';

    const props = defineProps({
        userTask: {
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
                <h1 class="text-lg italic">{{ userTask.category }}</h1>
                <p class="text-gray-500">{{ new Date(userTask.dateCreatedTask).toLocaleDateString
                                    ("ru-RU", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })
                                }}
                </p>
            </div>
            <div class="flex justify-between items-center py-2">
                <div class="flex flex-col gap-1">
                    <h2 class="text-lg">{{ userTask.habit }}</h2>
                    <p class="text-gray-500 text-md px-2">{{ userTask.frequency }}</p>
                    <p class="text-gray-500 text-md px-2">{{ userTask.time }}</p>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="italic text-sm">{{ userTask.progress }}</p>
                <TaskOptions @delete-task="deleteTask(userTask.id)" @add-in-complete="addInComplete(userTask.id)"
                            @add-in-progress="addInProgress(userTask.id)" />
            </div>
        </li>
</template>