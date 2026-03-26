<script setup>
    import { ref, onMounted } from 'vue'

    import NavBar from '../NavBarItems/NavBar.vue';
    import Wrapper from '../Slots/Wrapper.vue';
    import TasksCompleted from '@/components/TasksTemplates/TasksCompleted.vue';

    const userId = localStorage.getItem('userId')

    const progress = 'Выполненно'

    const tasks = ref([])
    const completedTasks = ref([])
    const urlUsersTasks = ref(`http://localhost:3000/tasks?userId=${userId}`)

    const getUserTasks = async () => {
        try{
            const res = await fetch(urlUsersTasks.value, {
                method: 'GET'
            })

            if(!res.ok){
                throw new Error(`Ошибка HTTP: ${res.status}`);
            }

            const data = await res.json()
            tasks.value = data
        }catch(error){
            console.log('Не удалось получить данные', error)
        }
    }

    const getCompletedUserTasks = async () => {
        const completedTask = tasks.value.find(t => t.progress === progress)

        if(!completedTask){
            console.log('Прогресса нет')
            return
        }else{
            try{
                const res = await fetch(urlUsersTasks.value, {
                    method: 'GET'
                })

                if(!res.ok){
                    throw new Error(`Ошибка HTTP: ${res.status}`);
                }

                const data = await res.json()
                completedTasks.value = data
            }catch(error){
                console.log('Не удалось получить данные', error)
            }
        }
    }

onMounted(async () => {
    await getUserTasks();
    await getCompletedUserTasks();
})
</script>

<template>
    <Wrapper>
        <NavBar />
            <div class="flex justify-center pt-10">
                <ul class="grid grid-cols-3 gap-x-20 gap-y-10 overflow-y-auto h-[575px] no-scrollbar pt-20">
                    <TasksCompleted v-for="completedTask in completedTasks" :key="completedTask.id" 
                        :completed-task="completedTask"/>
                </ul>
            </div>
    </Wrapper>
</template>