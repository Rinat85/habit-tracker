<script setup>
    import { ref, onMounted } from 'vue'

    import NavBar from '../NavBarItems/NavBar.vue';
    import Wrapper from '../Slots/Wrapper.vue';
    import TasksTemplate from '../TasksTemplates/TasksTemplate.vue';
    import BaseDeleteModal from '../Modals/BaseDeleteModal.vue';

    const userId = localStorage.getItem('userId')
    const userTaskId = ref(null)

    const user = ref(null)
    const urlUser = ref(`http://localhost:3000/users/${userId}`)

    const userTasks = ref([])
    const urlUserTasks = ref(`http://localhost:3000/tasks?userId=${userId}`)
    const urlTasks = ref(`http://localhost:3000/tasks`)

    const deleteTaskModalVisible = ref(false)
    const message = ref('')

    const sortByNewTasks = async () => {
        const res = await fetch(urlUserTasks.value)
        const data = await res.json()
        userTasks.value = data.sort((a, b) => new Date(b.dateCreatedTask) - new Date(a.dateCreatedTask))
    }

    const sortByOldTasks = async () => {
        const res = await fetch(urlUserTasks.value)
        const data = await res.json()
        userTasks.value = data.sort((a, b) => new Date(a.dateCreatedTask) - new Date(b.dateCreatedTask))
    }

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
            console.log('Не удалось найти данные', error)
        }
    }

    const getUser = async () => {
        try{
            const res = await fetch(urlUser.value, {
                method: 'GET'
            })
    
            if(!res.ok){
                throw new Error(`Ошибка HTTP: ${res.status}`);
            }
    
            const data = await res.json()
            user.value = data
        }catch(error){
            console.log('Не удалось найти данные', error)
        }
    }

    const showDeleteTaskModal = (id) => {
        userTaskId.value = id
        message.value = 'Хотите удалить привычку?'
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
            
            const allCurrent = user.value.allTasksCurrent || 0
            const inProgressCurrent = user.value.inProgressTasksCurrent || 0
            const completedCurrent = user.value.completedTasksCurrent || 0

            try{
                const res = await fetch(urlUser.value, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        allTasksCurrent: allCurrent - 1
                    })
                })
        
                if(!res.ok){
                        throw new Error(`Ошибка HTTP: ${res.status}`);
                }
                
                await getUser()
            }catch(error){
                console.log('Ошибка обновления current', error)
            }

            if(user.value.inProgressTasksCurrent > 0){
                try{
                    const res = await fetch(urlUser.value, {
                        method: 'PATCH',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            inProgressTasksCurrent: inProgressCurrent - 1
                        })
                    })
            
                    if(!res.ok){
                            throw new Error(`Ошибка HTTP: ${res.status}`);
                    }
                    
                    await getUser()
                }catch(error){
                    console.log('Ошибка обновления current', error)
                }
            }

            if(user.value.completedTasksCurrent > 0){
                try{
                    const res = await fetch(urlUser.value, {
                        method: 'PATCH',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            completedTasksCurrent: completedCurrent - 1
                        })
                    })
            
                    if(!res.ok){
                            throw new Error(`Ошибка HTTP: ${res.status}`);
                    }
                    
                    await getUser()
                }catch(error){
                    console.log('Ошибка обновления current', error)
                }
            }

           hideDeleteTaskModal()
        }catch(error){
            console.log('Не удалось обновить данные', error)
        }
    }

    const hideDeleteTaskModal = () => {
        userTaskId.value = null
        message.value = ''
        deleteTaskModalVisible.value = false
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

            await getUserTasks()


            const newCompletedCurrent = user.value.completedTasksCurrent + 1

            await fetch(urlUser.value, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    completedTasksCurrent: newCompletedCurrent
                })
            })

            await getUser()

            userTaskId.value = null
        }catch(error){
            console.log('Не удалоь обновить данные', error)
        }
    }

    const addInProgress = async (id) => {
        userTaskId.value = id
        const progress = 'В процессе'
        
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

            await getUserTasks()


            const newInProgressCurrent = user.value.inProgressTasksCurrent + 1

            await fetch(urlUser.value, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inProgressTasksCurrent: newInProgressCurrent
                })
            })

            await getUser()

            userTaskId.value = null
        }catch(error){
            console.log('Не удалоь обновить данные', error)
        }
    }

onMounted(async () => {
    await getUserTasks();
    await getUser()
})
</script>

<template>
    <Wrapper>
        <NavBar @sort-by-new="sortByNewTasks" @sort-by-old="sortByOldTasks" />
            <div class="flex justify-center pt-15">
                <ul class="grid grid-cols-4 gap-15 overflow-y-auto h-[580px] no-scrollbar pt-15">
                    <TasksTemplate v-for="userTask in userTasks" :key="userTask.id" :userTask="userTask" 
                        @delete-task="showDeleteTaskModal" @add-in-complete="addInComplete" 
                        @add-in-progress="addInProgress" />
                </ul>
            </div>
        <BaseDeleteModal v-show="deleteTaskModalVisible" :message="message" 
                        @cancel="hideDeleteTaskModal" @confirm="deleteTask" />
    </Wrapper>
</template>