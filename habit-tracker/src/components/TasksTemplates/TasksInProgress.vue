<script setup>

</script>

<template>
        <li class="h-[210px] w-[400px] bg-white p-6 rounded-xl shadow-xl flex flex-col">
            <div class="flex justify-between">
                <h1 class="text-2xl">{{ task.category }}</h1>
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
                    <h2 class="text-xl">{{ task.habit }}</h2>
                    <p class="text-gray-500 text-md px-2">{{ task.time }}</p>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="italic text-sm">{{ task.progress }}</p>
                <TaskOptions @delete-task="deleteTask(task.id)"/>
            </div>
        </li>
</template>