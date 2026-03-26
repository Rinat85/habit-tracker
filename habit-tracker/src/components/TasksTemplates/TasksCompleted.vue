<script setup>
    const props = defineProps({
        completedTask: {
            type: Object
        }
    })
</script>

<template>
        <li class="h-[210px] w-[400px] bg-white p-6 rounded-xl shadow-xl flex flex-col">
            <div class="flex justify-between">
                <h1 class="text-2xl">{{ completedTask.category }}</h1>
                <p class="text-gray-500 text-md">{{ new Date(completedTask.dateCreatedTask).toLocaleDateString
                                    ("ru-RU", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })
                                }}
                </p>
            </div>
            <div class="flex justify-between items-center py-4">
                <div class="flex flex-col gap-2">
                    <h2 class="text-xl">{{ completedTask.habit }}</h2>
                    <p class="text-gray-500 text-md px-2">{{ completedTask.time }}</p>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="italic text-sm">{{ completedTask.progress }}</p>
                <TaskOptions @delete-task="deleteTask(task.id)"/>
            </div>
        </li>
</template>