<script setup>
    import { ref, onMounted, computed } from 'vue'
    
    import NavBarOptions from '../NavBarItems/NavBarOptions.vue';
    import Wrapper from '../Slots/Wrapper.vue';
    import Calendar from '../CalendarTemplates/Calendar.vue';
    import TasksInDayModal from '../Modals/TasksInDayModal.vue';

    const userId = localStorage.getItem('userId')

    const userTasks = ref([])
    const urlUserTasks = ref(`http://localhost:3000/tasks?userId=${userId}`)

    const currentDate = ref(new Date())
    const monthNames = [
        'Январь','Февраль','Март','Апрель','Май','Июнь',
        'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь' 
    ]
    
    const selectedDay = ref(null)
    const tasksModalVisible = ref(false)

    const getUserTasks = async () => {
        try{
            const res = await fetch(urlUserTasks.value, {
                method: 'GET'
            })

            if(!res.ok){
                throw new Error(`Ошибка HTTP: ${res.status}`);
            }
    
            const data = await res.json()
            userTasks.value = data.sort((a, b) => new Date(b.dateCreatedTask) - new Date(a.dateCreatedTask))
        }catch(error){
            console.log('Не удалось получать данные')
        }
    }

    const currentMonth = computed(() => currentDate.value.getMonth())
    const currentYear = computed(() => currentDate.value.getFullYear())

    const currentMonthName = computed(() => monthNames[currentMonth.value])

    const lastMonth = () => {
        currentDate.value = new Date(
            currentYear.value,
            currentMonth.value - 1,
            1
        )
    }
    const nextMonth = () => {
        currentDate.value = new Date(
            currentYear.value,
            currentMonth.value + 1,
            1
        )
    }

    const showTasksModal = (day) => {
        if (!day) return         
        selectedDay.value = day
        tasksModalVisible.value = true
    }

    const isSameDay = (date, day) => {
        const d = new Date(date)
        return (
            d.getDate() === day &&
            d.getMonth() === currentMonth.value &&
            d.getFullYear() === currentYear.value
        )
    }

    const tasksOfSelectedDay = computed(() => {
        if (!selectedDay.value) return []
        return userTasks.value.filter(t => isSameDay(t.dateCreatedTask, selectedDay.value))
    })

    const hideTasksModal = () => {
        selectedDay.value = null
        tasksModalVisible.value = false
    }

onMounted(async () => {
    await getUserTasks()
})
</script>

<template>
    <Wrapper>
        <NavBarOptions />
        <Calendar :user-tasks="userTasks" :current-date="currentDate" :month-name="currentMonthName" 
                    @last="lastMonth" @next="nextMonth" @show-tasks="showTasksModal"/>
        <TasksInDayModal v-show="tasksModalVisible" :current-date="currentDate" :selected-day="selectedDay" 
                    :tasks-of-selected-day="tasksOfSelectedDay" @hide-tasks="hideTasksModal"/>
    </Wrapper>
</template>