<script setup>
    import { ref, onMounted, watch } from 'vue'
    import { useDebounceFn } from "@vueuse/core"

    import NavBar from '../NavBarItems/NavBar.vue';
    import Wrapper from '../Slots/Wrapper.vue';
    import CompletedTasks from '@/components/TasksTemplates/CompletedTasks.vue';
    import BaseDeleteModal from '../Modals/BaseDeleteModal.vue';

    const userId = localStorage.getItem('userId')
    const userTaskId = ref(null)

    const message = ref('')

    const user = ref(null)
    const urlUser = ref(`http://localhost:3000/users/${userId}`)

    const userTasks = ref([])
    const completedUserTasks = ref([])
    const urlUserTasks = ref(`http://localhost:3000/tasks?userId=${userId}`)
    const urlTasks = ref(`http://localhost:3000/tasks`)

    const searchInput = ref('')

    const deleteTaskModalVisible = ref(false)

    const sortByNewTasks = async () => {
        const res = await fetch(urlUserTasks.value)
        const data = await res.json()
        completedUserTasks.value = data.sort((a, b) => new Date(b.dateCreatedTask) - new Date(a.dateCreatedTask))
    }

    const sortByOldTasks = async () => {
        const res = await fetch(urlUserTasks.value)
        const data = await res.json()
        completedUserTasks.value = data.sort((a, b) => new Date(a.dateCreatedTask) - new Date(b.dateCreatedTask))
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
            completedUserTasks.value = completedUserTasks.value.filter(t => t.id !== userTaskId.value)

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

    const searchTasks = async () => {
        const query = searchInput.value

        try{
            if(!query){
                getUserTasks()
                return
            }
            
            const res = await fetch(`${urlUserTasks.value}&habit=${query}`, {
                method: 'GET'
            })

            if(!res.ok){
                throw new Error(`Ошибка HTTP: ${res.status}`);
            }

            const data = await res.json()
            completedUserTasks.value = data.sort((a, b) => new Date(b.dateCreatedTask) - new Date(a.dateCreatedTask))
        }catch(error){
            console.log('Не удалось найти данные', error)
        }
    }

    const debouncedSearch = useDebounceFn(() => {
        searchTasks()
    }, 500)

watch(searchInput, (newValue) => {
    if(newValue){
        debouncedSearch()
    }else{
        getCompletedUserTasks()
    }
})

onMounted(async () => {
    await getUserTasks();
    await getCompletedUserTasks();
    await getUser()
})
</script>

<template>
    <Wrapper>
        <NavBar v-model:search-input="searchInput" @sort-by-new="sortByNewTasks" @sort-by-old="sortByOldTasks" />
            <div class="flex justify-center pt-15">
                <ul class="grid grid-cols-4 gap-15 overflow-y-auto h-[580px] no-scrollbar pt-15">
                    <CompletedTasks v-for="completedUserTask in completedUserTasks" :key="completedUserTask.id" 
                        :completed-user-task="completedUserTask" @delete-task="showDeleteTaskModal" />
                </ul>
            </div>
            <BaseDeleteModal v-show="deleteTaskModalVisible" :message="message" 
                        @cancel="hideDeleteTaskModal" @confirm="deleteTask" />
    </Wrapper>
</template>