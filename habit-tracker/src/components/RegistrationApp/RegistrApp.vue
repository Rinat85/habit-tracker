<script setup>
    import { ref, watch } from 'vue'
    import { useRouter } from 'vue-router'
    import bcrypt from 'bcryptjs'

    import RegistrTemplate from '../RegistrationTemplates/RegistrTemplate.vue';
    import Wrapper from '../Slots/Wrapper.vue';

    const router = useRouter()
    
    const userName = ref('')
    const eMail = ref('')
    const password = ref('')

    const errorUserNameMessage = ref('')
    const errorEMailMessage = ref('')
    const errorPasswordMessage = ref('')

    const userNameError = ref(false)
    const eMailError = ref(false)
    const passwordError = ref(false)

    const allTasksCurrent = ref(0)
    const inProgressTasksCurrent = ref(0)
    const completedTasksCurrent = ref(0)

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const createUser = async () => {
        userNameError.value = !userName.value 
        eMailError.value = !isValidEmail(eMail.value)
        passwordError.value = !password.value

        errorUserNameMessage.value = userNameError.value ? 'Имя пользователя обязательно' : ''
        errorEMailMessage.value = eMailError.value ? 'E-Mail обязателен' : ''
        errorPasswordMessage.value = passwordError.value ? 'Пароль обязателен' : ''

        if(userNameError.value || eMailError.value || passwordError.value){
            return
        }else{
            try{
                const hashedPassword = await bcrypt.hash(password.value, 10)

                const res = await fetch('http://localhost:3000/users', {
                    method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userName: userName.value,
                            eMail: eMail.value,
                            password: hashedPassword,
                            allTasksCurrent: allTasksCurrent.value,
                            inProgressTasksCurrent: inProgressTasksCurrent.value,
                            completedTasksCurrent: completedTasksCurrent.value,
                            dateCreation: new Date()
                    })
                })
                
                if(!res.ok){
                    throw new Error(`Ошибка HTTP: ${res.status}`);
                }
    
                const newUser = await res.json()
                localStorage.setItem('userId', newUser.id)

                router.push('/profile')
            }catch(error){
                console.log('Не удалось добавить нового пользователя')
            }finally{
                errorUserNameMessage.value = ''
                errorEMailMessage.value = ''
                errorPasswordMessage.value = ''

                userNameError.value = false
                eMailError.value = false
                passwordError.value = false
            }
        }
    }

watch(userName, (newValue) => {
  if(newValue){
    userNameError.value = false
  }
})
watch(eMail, (newValue) => {
  if(newValue){
    eMailError.value = false
  }
})
watch(password, (newValue) => {
  if(newValue){
    passwordError.value = false
  }
})
</script>

<template>
    <Wrapper>
        <RegistrTemplate v-model:user-name="userName" v-model:e-mail="eMail" v-model:password="password"
                        :user-name-error="userNameError" :e-mail-error="eMailError" :password-error="passwordError"
                        :error-user-name-message="errorUserNameMessage" :error-e-mail-message="errorEMailMessage"
                        :error-password-message="errorPasswordMessage" @create-user="createUser"/>
    </Wrapper>
</template>