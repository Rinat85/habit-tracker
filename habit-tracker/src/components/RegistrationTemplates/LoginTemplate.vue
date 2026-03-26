<script setup>
    import { ref } from 'vue'

    const userName = defineModel('userName')
    const password = defineModel('password')

    const props = defineProps({
        userNameError: {
            type: Boolean
        },
        passwordError: {
            type: Boolean
        },
        errorUserNameMessage: {
            type: String 
        },
        errorPasswordMessage: {
            type: String
        },
    })

    const emit = defineEmits([
        'login'
    ])
    const login = () => emit('login')

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
            <h1 class="text-3xl">Вход</h1>
            <div class="flex flex-col gap-6 w-[600px]">
                <div class="flex flex-col gap-3">
                    <input type="text" v-model="userName" @input="toLower" placeholder="Имя" class="bg-gray-300 outline-none 
                            rounded-[4px] p-4">
                    <span v-if="userNameError" class="text-sm text-red-500">{{ errorUserNameMessage }}</span>
                </div>
                <div class="flex flex-col gap-3"> 
                    <input type="text" v-model="password" placeholder="Пароль" class="bg-gray-300 outline-none 
                            rounded-[4px] p-4">
                    <span v-if="passwordError" class="text-sm text-red-500">{{ errorPasswordMessage }}</span>
                </div>
            </div>
            <div class="flex justify-center">
                <button @click="login" class="px-20 py-6 text-white rounded-lg bg-gradient-to-b
                        from-indigo-400 to-indigo-600 shadow-xl shadow-indigo-500/40
                        active:scale-95 transition">
                    Войти
                </button>
            </div>
        </div>
    </div>
</template>