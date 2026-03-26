<script setup>
    import { ref, onMounted, watch } from 'vue'

    import Wrapper from '../Slots/Wrapper.vue';
    import ProfileTemplate from '../ProfileTemplates/ProfileTemplate.vue';
    import TaskModal from '../Modals/TaskModal.vue';

    const userId = localStorage.getItem('userId')

    const user = ref(null)
    const urlUser = ref(`http://localhost:3000/users/${userId}`)

    const tasks = ref([])
    const urlTasks = ref(`http://localhost:3000/tasks`)

    const newUserName = ref('')

    const errorNewUserNameMessage = ref('')

    const newUserNameError = ref(false)

    const habit = ref('')
    const time = ref('')
    const category = ref('')
    const progress = ref('')

    const errorHabitMessage = ref('')
    const errorTimeMessage = ref('')
    const errorCategoryMessage = ref('')

    const habitError = ref(false)
    const timeError = ref(false) 
    const categoryError = ref(false)

    const taskModalVisible = ref(false)

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

        errorHabitMessage.value = habitError.value ? 'Поле привычки обязателно' : ''
        errorTimeMessage.value = timeError.value ? 'Поле времени обязателно' : ''
        errorCategoryMessage.value = categoryError.value ? 'Поле категории обязателно' : ''

        if(habitError.value || timeError.value || categoryError.value){
            return
        }else{
            try{
                const res = await fetch(urlTasks.value, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        habit: habit.value,
                        time: time.value,
                        category: category.value,
                        progress: progress.value,
                        dateCreatedTask: new Date(),
                        userId: Number(userId)
                })
            })

            if(!res.ok){
                throw new Error(`Ошибка HTTP: ${res.status}`);
            }

            const newTask = await res.json()
            tasks.value.push(newTask)

            taskModalVisible.value = false
            }catch(error){
                console.log('Не удалось добваить привычку', error)
            }finally{
                errorHabitMessage.value = ''
                errorTimeMessage.value = ''
                errorCategoryMessage.value = ''

                habitError.value = false
                timeError.value = false
                categoryError.value = false
            }
        }
    }

    const hideTaskModal = () => {
        taskModalVisible.value = false
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


onMounted(async () => {
    await getUser();
})
</script>

<template>
    <Wrapper>
        <ProfileTemplate :user="user" @change-user-name="changeUserName" @show-task-modal="showTaskModal" 
                v-model:new-user-name="newUserName" :new-user-name-error="newUserNameError" 
                :error-new-user-name-message="errorNewUserNameMessage"/>

        <TaskModal v-show="taskModalVisible" @hide="hideTaskModal" @create-task="createTask" 
                    v-model:habit="habit" v-model:time="time" v-model:category="category"
                    :habit-error="habitError" :time-error="timeError" :category-error="categoryError"
                    :error-habit-message="errorHabitMessage" :error-time-message="errorTimeMessage" 
                    :error-category-message="errorCategoryMessage" />
    </Wrapper>
</template>