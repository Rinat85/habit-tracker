<script setup>
    import { ref, onMounted } from 'vue'

    import NavBar from '../NavBarItems/NavBar.vue';
    import Wrapper from '../Slots/Wrapper.vue';
    import TasksTemplate from '../TasksTemplates/TasksTemplate.vue';
    import DeleteTaskModal from '../Modals/DeleteTaskModal.vue';

    const userId = localStorage.getItem('userId')
    const taskId = ref(null)

    const tasks = ref([])
    const urlTasks = ref(`http://localhost:3000/tasks`)

    const userTasks = ref([])
    const urlUserTasks = ref(`http://localhost:3000/tasks?userId=${userId}`)

    const deleteTaskModalVisible = ref(false)
    const message = ref('')

    const getUserTasks = async () => {
        try{
            const res = await fetch(urlUserTasks.value, {
                method: 'GET'
            })
    
            if(!res.ok){
                throw new Error(`Ошибка HTTP: ${res.status}`);
            }
    
            const data = await res.json()
            userTasks.value = data
        }catch(error){
            console.log('Не удалось найти данные', error)
        }
    }

    const getTasks = async () => {
        try{
            const res = await fetch(urlTasks.value, {
                method: 'GET'
            })
    
            if(!res.ok){
                throw new Error(`Ошибка HTTP: ${res.status}`);
            }
    
            const data = await res.json()
            tasks.value = data
        }catch(error){
            console.log('Не удалось найти данные', error)
        }
    }

    const showDeleteTaskModal = (id) => {
        taskId.value = id
        message.value = 'Хотите удалить привычку?'
        deleteTaskModalVisible.value = true
    }

    const deleteTask = async () => {
        try{
            const res = await fetch(`${urlTasks.value}/${taskId.value}`, {
                method: 'DELETE'
            })

            if(!res.ok){
                throw new Error(`Ошибка HTTP: ${res.status}`);
            }

            tasks.value = tasks.value.filter(t => t.id !== taskId.value)
            userTasks.value = userTasks.value.filter(t => t.id !== taskId.value)

            deleteTaskModalVisible.value = false
        }catch(error){
            console.log('Не удалось обновить данные', error)
        }
    }

    const hideDeleteTaskModal = () => {
        taskId.value = null
        message.value = ''
        deleteTaskModalVisible.value = false
    }

    const addInComplete = async (id) => {
        taskId.value = id
        const progress = 'Выполненно'

        try{
            const res = await fetch(`${urlTasks.value}/${taskId.value}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    progress: progress,
                })
            })
    
            if(!res.ok){
                throw new Error(`Ошибка HTTP: ${res.status}`);
            }
    
            const newProgress = await res.json()
            userTasks.value = newProgress

            taskId.value = null
        }catch(error){
            console.log('Не удалоь обновить данные', error)
        }
    }

    const addInProgress = async (id) => {
        taskId.value = id
        const progress = 'В процессе'

        try{
            const res = await fetch(`${urlTasks.value}/${taskId.value}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    progress: progress,
                })
            })
    
            if(!res.ok){
                throw new Error(`Ошибка HTTP: ${res.status}`);
            }
    
            const newProgress = await res.json()
            userTasks.value = newProgress

            taskId.value = null
        }catch(error){
            console.log('Не удалоь обновить данные', error)
        }
    }
    
onMounted(async () => {
    await getUserTasks();
    await getTasks()
})
</script>

<template>
    <Wrapper>
        <NavBar />
            <div class="flex justify-center pt-10">
                <ul class="grid grid-cols-3 gap-x-20 gap-y-10 overflow-y-auto h-[575px] no-scrollbar pt-20">
                    <TasksTemplate v-for="task in tasks" :key="task.id" :task="task" 
                        @delete-task="showDeleteTaskModal" @add-in-complete="addInComplete" 
                        @add-in-progress="addInProgress"/>
                </ul>
            </div>
        <DeleteTaskModal v-show="deleteTaskModalVisible" :message="message" 
                        @cancel="hideDeleteTaskModal" @confirm="deleteTask" />
    </Wrapper>
</template>