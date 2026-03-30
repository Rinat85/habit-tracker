<script setup>
    import { ref, onMounted, watch } from 'vue'
    import { useRouter } from 'vue-router'

    import Wrapper from '../Slots/Wrapper.vue';
    import ProfileTemplate from '../ProfileTemplates/ProfileTemplate.vue';
    import TaskModal from '../Modals/TaskModal.vue';
    import ExitModal from '../Modals/ExitModal.vue';
    import BaseDeleteModal from '../Modals/BaseDeleteModal.vue';

    const userId = localStorage.getItem('userId')

    const user = ref(null)
    const urlUser = ref(`http://localhost:3000/users/${userId}`)

    const userTasks = ref([])
    const urlUserTasks = ref(`http://localhost:3000/tasks?userId=${userId}`)

    const router = useRouter()

    const newUserName = ref('')

    const errorNewUserNameMessage = ref('')

    const newUserNameError = ref(false)

    const habit = ref('')
    const time = ref('')
    const category = ref('')
    const progress = ref('Не выполнено')
    const frequency = ref('')

    const errorHabitMessage = ref('')
    const errorTimeMessage = ref('')
    const errorCategoryMessage = ref('')
    const errorFrequencyMessage = ref('')

    const habitError = ref(false)
    const timeError = ref(false) 
    const categoryError = ref(false)
    const frequencyError = ref(false)

    const taskModalVisible = ref(false)
    const exitModalVisible = ref(false)
    const baseModalVisible = ref(false)

    const message = ref('')

    const getUser = async () => {
        try{
            const res = await fetch(urlUser.value, {
                method: 'GET'
            })
    
            if(!res.ok){
                throw new Error(`Ошибка HTTP: ${res.status}`);
            }
    
            user.value = await res.json()
        }catch(error){
            console.log('Не удалось получить данные', error)
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
    
            userTasks.value = await res.json()
        }catch(error){
            console.log('Не удалось получить данные', error)
        }
    }

    const changeUserName = async () => {
        newUserNameError.value = !newUserName.value

        errorNewUserNameMessage.value = newUserNameError.value ? 'Имя пользователя обязательно' : ''
        if(newUserNameError.value){
            return
        }else{
            try{
                const res = await fetch(urlUser.value, {
                    method: 'PATCH',
                    headers: {
                            "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userName: newUserName.value,
                        dateChangedUserName: new Date()
                    })
                })
        
                if(!res.ok){
                    throw new Error(`Ошибка HTTP: ${res.status}`);
                }
        
                user.value = await res.json()
            }catch(error){
                console.log('Ошибка при изменении имя пользователя', error)
            }finally{
                newUserName.value = ''

                errorNewUserNameMessage.value = ''

                newUserNameError.value = false
            }
        }
    }

    const showTaskModal = () => {
        taskModalVisible.value = true
    }

    const createTask = async () => {
        habitError.value = !habit.value
        timeError.value = !time.value
        categoryError.value = !category.value
        frequencyError.value = !frequency.value

        errorHabitMessage.value = habitError.value ? 'Поле привычки обязателно' : ''
        errorTimeMessage.value = timeError.value ? 'Поле времени обязателно' : ''
        errorCategoryMessage.value = categoryError.value ? 'Поле категории обязателно' : ''
        errorFrequencyMessage.value = frequencyError.value ? 'Поле частоты выполнения обязательно' : ''


        if(habitError.value || timeError.value || categoryError.value){
            return
        }else{
            try{
                const res = await fetch(urlUserTasks.value, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        habit: habit.value,
                        time: time.value,
                        category: category.value,
                        frequency: frequency.value,
                        progress: progress.value,
                        dateCreatedTask: new Date(),
                        userId: userId
                    })
                })

                if(!res.ok){
                    throw new Error(`Ошибка HTTP: ${res.status}`);
                }

                const newUserTask = await res.json()
                userTasks.value.push(newUserTask)

                await updateCurrent()

                hideTaskModal()
            }catch(error){
                console.log('Не удалось добваить привычку', error)
            }
        }
    }

    const updateCurrent = async () => {
        const newAllCurrent = user.value.allTasksCurrent + 1
        try{
            const res = await fetch(urlUser.value, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    allTasksCurrent: newAllCurrent
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

    const hideTaskModal = () => {
        habit.value = '' 
        time.value = ''
        category.value = ''
        frequency.value = ''

        errorHabitMessage.value = ''
        errorTimeMessage.value = ''
        errorCategoryMessage.value = ''
        errorFrequencyMessage.value = ''

        habitError.value = false
        timeError.value = false
        categoryError.value = false
        frequencyError.value = false

        taskModalVisible.value = false
    }

    const showExitModal = () => {
        exitModalVisible.value = true
        message.value = 'Хотите выйти из аккаунта'
    }

    const exitAccount = () => {
      localStorage.removeItem('currentProfile')

      exitModalVisible.value = false
      message.value = ''
      router.push('/')
    }

    const hideExitModal = () => {
      exitModalVisible.value = false
      message.value = ''
    }

    const showDelAccountModal = () => {
        baseModalVisible.value = true
        message.value = 'Хотите удалить аккаунт'
    }

    const deleteAccount = async () => {
        try{
            const res = await fetch(urlUser.value, {
                method: 'DELETE',
            })

            if(!res.ok){
                throw new Error(`Ошибка HTTP: ${res.status}`);
            }

            router.push('/')

            await getUser()

            hideDelAccountModal()
        }catch(error){
            console.log('Не удалось добавить изи изменить данные аккаунта')
        }
    }

    const hideDelAccountModal = () => {
        baseModalVisible.value = false
        message.value = ''
    }

watch(newUserName, (newValue) => {
    if(newValue){
        newUserNameError.value = false
    }
})

watch(habit, (newValue) => {
    if(newValue){
        habitError.value = false
    }
})

watch(time, (newValue) => {
    if(newValue){
        timeError.value = false
    }
})

watch(category, (newValue) => {
    if(newValue){
        categoryError.value = false
    }
})

watch(frequency, (newValue) => {
    if(newValue){
        frequencyError.value = false
    }
})

onMounted(async () => {
    await getUser();
    await getUserTasks()
})
</script>

<template>
    <Wrapper>
        <ProfileTemplate :user="user" @change-user-name="changeUserName" @show-task-modal="showTaskModal"
                v-model:new-user-name="newUserName" :new-user-name-error="newUserNameError" 
                :error-new-user-name-message="errorNewUserNameMessage" 
                @show-del-account="showDelAccountModal" @show-exit="showExitModal"/>

        <TaskModal v-show="taskModalVisible" @hide="hideTaskModal" @create-task="createTask" 
                    v-model:habit="habit" v-model:time="time" v-model:category="category" v-model:frequency="frequency"
                    :habit-error="habitError" :time-error="timeError" :category-error="categoryError" 
                    :frequency-error="frequencyError" :error-habit-message="errorHabitMessage" 
                    :error-time-message="errorTimeMessage" :error-category-message="errorCategoryMessage" 
                    :error-frequency-message="errorFrequencyMessage" />

        <ExitModal v-show="exitModalVisible" :message="message" @confirm="exitAccount" @cancel="hideExitModal"/>
        <BaseDeleteModal v-show="baseModalVisible" :message="message" @confirm="deleteAccount" @cancel="hideDelAccountModal"/>
    </Wrapper>
</template>