<script setup>
    import { computed } from 'vue'
import BaseButton from '../BaseButton/BaseButton.vue'
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
                <BaseButton button-type="Закрыть" variant="closeTasksInDay" @click="hideTasks"/>
            </div>
        </div>
    </div>
</template>