<script setup>
    import { computed } from 'vue'
    import arrow from '@/assets/icons/arrow.png'

    const props = defineProps({
        userTasks: {
            type: Array
        },
        currentDate: {
            type: Date,
            default: () => new Date()
        },
        monthName: {
            type: String
        }
    }) 

    const emit = defineEmits([
        'last', 'next', 'show-tasks'
    ])
    const last = () => emit('last')
    const next = () => emit('next')
    const showTasks = (day) => emit('show-tasks', day)

    const currentMonth = computed(() => props.currentDate.getMonth())
    const currentYear = computed(() => props.currentDate.getFullYear())

    const isSameDay = (date, day) => {
        const d = new Date(date)
        return (
            d.getDate() === day &&
            d.getMonth() === currentMonth.value &&
            d.getFullYear() === currentYear.value
        )
    }

    const daysInMonth = computed(() => 
        new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
    )

    const firstDayOfMonth = computed(() => {
        const day = new Date(currentYear.value, currentMonth.value, 1).getDay()
        return day === 0 ? 6 : day - 1
    })

    const calendarDays = computed(() => {
        const daysArray = Array.from({ length: daysInMonth.value }, (_, i) => i + 1)
        const emptyCeils = Array.from({length: firstDayOfMonth.value }, () => null)
        return [...emptyCeils, ...daysArray]
    })

    const hasCompletedStatus = (day) => 
        props.userTasks.some(t => 
            isSameDay(t.dateCreatedTask, day) &&
            t.progress === 'Выполнено'
        )
    const hasInProgressStatus = (day) => 
        props.userTasks.some(t => 
            isSameDay(t.dateCreatedTask, day) &&
            t.progress === 'В процессе'
        )
    const hasUnCompletedStatus = (day) => 
        props.userTasks.some(t => 
            isSameDay(t.dateCreatedTask, day) &&
            t.progress === 'Не выполнено'
        )
</script>

<template>
    <div class="flex justify-center items-center py-10">
        <div class="w-[600px] h-[600px] bg-white rounded-2xl shadow-xl px-6 py-10">
            <div class="flex justify-between items-center pt-10 mb-16">
                <button @click="last" class="p-2 rounded-lg">
                    <img :src="arrow" class="w-[25px] rotate-180">
                </button>
                <h2 class="text-lg font-semibold">{{ props.monthName }} {{ currentYear }}</h2>
                <button @click="next" class="p-2 rounded-lg">
                    <img :src="arrow" class="w-[25px]">
                </button>
            </div>
            <div class="grid grid-cols-7 text-center text-gray-500 text-sm mb-3">
                <div>Пн</div>
                <div>Вт</div>
                <div>Ср</div>
                <div>Чт</div>
                <div>Пт</div>
                <div>Сб</div>
                <div>Вс</div>
            </div>
            <div class="grid grid-cols-7 gap-2 text-center">
                <div @click="showTasks(day)" v-for="(day, index) in calendarDays" :key="index" class="p-2 rounded-lg cursor-pointer transition">
                    <span>{{ day }}</span>
                    <div class="flex gap-1 mt-1 justify-center">
                        <span v-if="hasCompletedStatus(day)" class="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span v-if="hasInProgressStatus(day)" class="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span v-if="hasUnCompletedStatus(day)" class="w-2 h-2 bg-rose-500 rounded-full"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>