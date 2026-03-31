<script setup>
    import { ref } from 'vue'
import BaseButton from '../BaseButton/BaseButton.vue'

    const userName = defineModel('userName')
    const eMail = defineModel('eMail')
    const password = defineModel('password')

    const props = defineProps({
        userNameError: {
            type: Boolean
        },
        eMailError: {
            type: Boolean
        },
        passwordError: {
            type: Boolean
        },
        errorUserNameMessage: {
            type: String 
        },
        errorEMailMessage: {
            type: String 
        },
        errorPasswordMessage: {
            type: String
        },
    })

    const emit = defineEmits([
        'createUser'
    ])
    const createUser = () => emit('createUser')

    const showPassword = ref(false) 

    const togglePassword = () => {
        showPassword.value = !showPassword.value
    }

    const toLower = () => {
        userName.value = userName.value.toLowerCase()
    }
</script>

<template>
    <div class="flex justify-center items-center min-h-screen">
        <div class="flex flex-col gap-8">
            <h1 class="text-3xl">Регистрация</h1>
            <div class="flex flex-col gap-6 w-[600px]">
                <div class="flex flex-col gap-3">
                    <input type="text" v-model="userName" @input="toLower" placeholder="Имя" class="bg-gray-300 outline-none 
                            rounded-[4px] p-4">
                    <span v-if="userNameError" class="text-sm text-red-500">{{ errorUserNameMessage }} dsdfsf</span>
                </div>
                <div class="flex flex-col gap-3">
                    <input type="text" v-model="eMail" placeholder="E-mail" class="bg-gray-300 outline-none 
                            rounded-[4px] p-4">
                    <span v-if="eMailError" class="text-sm text-red-500">{{ errorEMailMessage }}</span>
                </div>
                <div class="flex flex-col gap-3">
                    <div class="relative">
                        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Пароль" 
                                    class="bg-gray-300 outline-none rounded-[4px] p-4 w-full">
                        <img @click="togglePassword" :src="showPassword ? 
                            '/src/assets/icons/opened.png' : '/src/assets/icons/closed.png'" 
                            class="w-[30px] h-[30px] absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer">
                    </div>
                    <span v-if="passwordError" class="text-sm text-red-500">{{ errorPasswordMessage }}</span>
                </div>
            </div>
            <div class="flex justify-center">
                <BaseButton button-type="Зарегестрироваться" variant="rigistration" @click="createUser" />
            </div>
        </div>
    </div>
</template>