<script setup>
    import { computed } from 'vue'
    const props = defineProps({
        currentDate: {
            type: Date
        },
        selectedDay: {
            type: Number
        },
        tasksOfSelectedDay: {
            type: Object
        },
        monthName: {
            type: String
        }
    })

    const emit = defineEmits([
        'hide-tasks'
    ])
    const hideTasks = () => emit('hide-tasks')

    const currentMonth = computed(() => props.currentDate.getMonth())
    const currentYear = computed(() => props.currentDate.getYear())
</script>

<template>
    <div class="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
                                flex items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-[600px] max-h-[400px]">
            <h3 class="text-lg italic mb-4">Задачи за {{ selectedDay }}.{{ currentMonth + 1 }}.{{ currentYear }}</h3>
            <ul v-if="tasksOfSelectedDay.length > 0">
                <li v-for="task in tasksOfSelectedDay" :key="task.id" class="mb-2 overflow-y-auto no-scrollbar">
                    <span>{{ task.habit }}</span> - 
                    <span :class="{
                            'text-green-500': task.progress === 'Выполнено',
                            'text-purple-500': task.progress === 'В процессе',
                            'text-rose-500': task.progress === 'Не выполнено'
                    }">
                        {{ task.progress }}
                    </span>
                </li>
            </ul>
            <span v-else class="italic text-gray-500">Пустой день</span>
            <div class="flex">
                <button @click="hideTasks" class="mt-5 bg-gradient-to-b from-indigo-400 to-indigo-600 shadow-xl 
                                text-white shadow-indigo-500/40 active:scale-95 transition py-4 px-6 
                                text-sm rounded-[6px]">
                    Закрыть
                </button>
            </div>
        </div>
    </div>
</template>