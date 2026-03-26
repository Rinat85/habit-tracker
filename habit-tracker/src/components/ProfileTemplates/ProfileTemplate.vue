<script setup>
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const newUserName = defineModel('newUserName')

    const props = defineProps({
        user: {
            type: Object
        },
        newUserNameError: {
            type: Boolean
        },
        errorNewUserNameMessage: {
            type: String
        }
    })

    const emit = defineEmits([
        'showTaskModal', 'changeUserName'
    ])

    const showTaskModal = () => emit('showTaskModal')
    const changeUserName = () => emit('changeUserName')

</script>

<template>
    <div class="bg-indigo-200 min-h-screen">
        <div class="flex justify-between items-center gap-4 p-5">
            <router-link to="/tasks">
                <span class="px-8 py-5 text-white rounded-lg bg-gradient-to-b
                                from-indigo-400 to-indigo-600 shadow-xl shadow-indigo-500/40
                                active:scale-95 transition">
                    Вернуться
                </span>
            </router-link>
            <button @click="showTaskModal" class="px-8 py-4 text-white rounded-lg bg-gradient-to-b
                            from-indigo-400 to-indigo-600 shadow-xl shadow-indigo-500/40
                            active:scale-95 transition">
                Добавить привычку
            </button>
        </div>
        <section class="flex justify-center gap-40 py-20">
            <div class="flex flex-col gap-3 p-6 bg-white rounded-[4px] text-center shadow-xl">
                <span>Всего привычек</span>
                <span></span>
            </div>
             <div class="flex flex-col gap-3 py-6 px-12 bg-white rounded-[4px] text-center shadow-xl">
                <span>В процессе</span>
                <span></span>
            </div>
             <div class="flex flex-col gap-3 py-6 px-10 bg-white rounded-[4px] text-center shadow-xl">
                <span>Выполненно</span>
                <span></span>
            </div>
        </section>
        <section class="flex justify-center py-15">
            <div class="w-[850px]">
                <div class="flex flex-col gap-6">
                    <span class="text-2xl">Текущее имя пользователя:</span>
                    <span class="text-xl px-2">{{ user?.userName }}</span>
                    <div class="flex flex-col gap-3">
                        <input type="text" v-model="newUserName" placeholder="Имя пользователя" 
                            class="bg-white shadow-xl w-full placeholder:text-sm outline-none rounded-[4px] p-5 mt-6">
                        <span v-if="newUserNameError" class="text-sm text-red-500">
                            {{ errorNewUserNameMessage }}
                        </span>
                    </div>
                </div>
                <div class="flex justify-end mt-12">
                    <button @click="changeUserName" class="px-10 py-5 text-white rounded-lg bg-gradient-to-b 
                            from-indigo-400 to-indigo-600 shadow-xl shadow-indigo-500/40
                            active:scale-95 transition">
                        Применить
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>