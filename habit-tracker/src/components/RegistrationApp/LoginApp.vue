<script setup>
    import { onMounted, ref, watch } from 'vue'
    import { useRouter } from 'vue-router';
    import bcrypt from 'bcryptjs'

    import LoginTemplate from '../RegistrationTemplates/LoginTemplate.vue';
    import Wrapper from '../Slots/Wrapper.vue';

    const users = ref([])
    const urlUsers = ref('http://localhost:3000/users')

    const router = useRouter()

    const userName = ref('')
    const password = ref('')

    const errorUserNameMessage = ref('')
    const errorPasswordMessage = ref('')

    const userNameError = ref(false)
    const passwordError = ref(false)

    const getUsers = async () => {
        const res = await fetch(urlUsers.value, {
            method: 'GET'
        })

        if(!res.ok){
                throw new Error(`Ошибка HTTP: ${res.status}`);
        }

        users.value = await res.json()
    }

    const Login = async () => {
        userNameError.value = !userName.value 
        passwordError.value = !password.value

        errorUserNameMessage.value = userNameError.value ? 'Имя пользователя обязательно' : ''
        errorPasswordMessage.value = passwordError.value ? 'Пароль обязателен' : ''

        if(userNameError.value || passwordError.value){
            return
        }else{
            try{
                const user = users.value.find(u => u.userName === userName.value)
                if(!user){
                    userNameError.value = true
                    errorUserNameMessage.value = 'Неверное Имя пользователя'
                    return
                }

                const passwordMatch = await bcrypt.compare(password.value, user.password)
                if(!passwordMatch){
                    passwordError.value = true
                    errorPasswordMessage.value = 'Неверный пароль'
                    return
                }   

                localStorage.setItem('currentUser', JSON.stringify(user))
                localStorage.setItem('userId', user.id)

                router.push('/profile')
            }catch(error){
                console.log('Ошибка при проверке имени пользователя и пароля', error)
            }
        }
    }

watch(userName, (newValue) => {
  if(newValue){
    userNameError.value = false
  }
})

watch(password, (newValue) => {
  if(newValue){
    passwordError.value = false
  }
})


onMounted(async () => {
    await getUsers();
})
</script>

<template>
    <Wrapper>
        <LoginTemplate v-model:user-name="userName" v-model:password="password"
                    :user-name-error="userNameError" :password-error="passwordError"
                    :error-user-name-message="errorUserNameMessage" :error-password-message="errorPasswordMessage"
                    @login="Login"/>
    </Wrapper>
</template>