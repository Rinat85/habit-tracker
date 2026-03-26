<script setup>
    import { ref, onMounted } from 'vue'

    import NavBar from '../NavBarItems/NavBar.vue';
    import Wrapper from '../Slots/Wrapper.vue';
    import TasksCompleted from '@/components/TasksTemplates/TasksCompleted.vue';
    import DeleteTaskModal from '../Modals/DeleteTaskModal.vue';

    const userId = localStorage.getItem('userId')
    const userTaskId = ref(null)

    const message = ref('')

    const userTasks = ref([])
    const completedUserTasks = ref([])
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

    const getCompletedUserTasks = async () => {
        completedUserTasks.value = userTasks.value
        .filter(t => t.progress === 'Выполнено')
        .sort((a, b) => new Date(b.dateCreatedTask) - new Date(a.dateCreatedTask))
    }

    const showDeleteTaskModal = (id) => {
        userTaskId.value = id
        message.value = 'Хотите удалить выполенную привычку?'
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
            completedUserTasks.value = completedUserTasks.value.filter(t => t.id !== userTaskId.value)
            
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
    await getCompletedUserTasks()
})
</script>

<template>
    <Wrapper>
        <NavBar />
            <div class="flex justify-center pt-15">
                <ul class="grid grid-cols-4 gap-15 overflow-y-auto h-[580px] no-scrollbar pt-15">
                    <TasksCompleted v-for="completedUserTask in completedUserTasks" :key="completedUserTask.id" 
                        :completed-user-task="completedUserTask" @delete-task="showDeleteTaskModal" />
                </ul>
            </div>
            <DeleteTaskModal v-show="deleteTaskModalVisible" :message="message" 
                        @cancel="hideDeleteTaskModal" @confirm="deleteTask" />
    </Wrapper>
</template>