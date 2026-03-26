<script setup>
    import { ref, onMounted } from 'vue'

    import NavBar from '../NavBarItems/NavBar.vue';
    import Wrapper from '../Slots/Wrapper.vue';
    import DeleteTaskModal from '../Modals/DeleteTaskModal.vue';
    import TasksInProgress from '../TasksTemplates/TasksInProgress.vue';

    const userId = localStorage.getItem('userId')
    const userTaskId = ref(null)

    const message = ref('')

    const userTasks = ref([])
    const inProgressUserTasks = ref([])
    const urlUserTasks = ref(`http://localhost:3000/tasks?userId=${userId}`)
    const urlTasks = ref(`http://localhost:3000/tasks`)

    const deleteTaskModalVisible = ref(false)

    
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
            console.log('Не удалось получить данные', error)
        }
    }

    const getInProgressUserTasks = async () => {
        inProgressUserTasks.value = userTasks.value
        .filter(t => t.progress === 'В процессе')
        .sort((a, b) => new Date(b.dateCreatedTask) - new Date(a.dateCreatedTask))
    }

    const addInComplete = async (id) => {
        userTaskId.value = id
        const progress = 'Выполнено'

        try{
            const res = await fetch(`${urlTasks.value}/${userTaskId.value}`, {
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

            const updatedTask = await res.json()
    
            const index = userTasks.value.findIndex(t => t.id === userTaskId.value)
            if(index !== 1){
                userTasks.value[index] = updatedTask
            }
            
            await getInProgressUserTasks()

            userTaskId.value = null
        }catch(error){
            console.log('Не удалоь обновить данные', error)
        }
    }


    const showDeleteTaskModal = (id) => {
        userTaskId.value = id
        message.value = 'Хотите удалить выполняемую привычку?'
        deleteTaskModalVisible.value = true
    }

    const deleteTask = async () => {
        try{
            const res = await fetch(`${urlTasks.value}/${userTaskId.value}`, {
                method: 'DELETE'
            })

            if(!res.ok){
                throw new Error(`Ошибка HTTP: ${res.status}`);
            }

            userTasks.value = userTasks.value.filter(t => t.id !== userTaskId.value)
            inProgressUserTasks.value = inProgressUserTasks.value.filter(t => t.id !== userTaskId.value)

            deleteTaskModalVisible.value = false
        }catch(error){
            console.log('Не удалось обновить данные', error)
        }
    }

    const hideDeleteTaskModal = () => {
        userTaskId.value = null
        message.value = ''
        deleteTaskModalVisible.value = false
    }

onMounted(async () => {
    await getUserTasks();
    await getInProgressUserTasks()
})
</script>

<template>
    <Wrapper>
        <NavBar />
            <div class="flex justify-center pt-15">
                <ul class="grid grid-cols-4 gap-15 overflow-y-auto h-[580px] no-scrollbar pt-15">
                    <TasksInProgress v-for="inProgressUserTask in inProgressUserTasks" :key="inProgressUserTask.id" 
                        :in-progress-user-task="inProgressUserTask" @delete-task="showDeleteTaskModal" 
                        @add-in-complete="addInComplete" />
                </ul>
            </div>
            <DeleteTaskModal v-show="deleteTaskModalVisible" :message="message" 
                        @cancel="hideDeleteTaskModal" @confirm="deleteTask" />
    </Wrapper>
</template>