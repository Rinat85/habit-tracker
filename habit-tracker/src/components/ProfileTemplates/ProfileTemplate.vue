<script setup>
    import BaseButton from '../BaseButton/BaseButton.vue'
import NavBarOptions from '../NavBarItems/NavBarOptions.vue'
import ProfileOptions from './ProfileOptions.vue'

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
        'showTaskModal', 'changeUserName', 'showDelAccount', 'showExit'
    ])

    const showTaskModal = () => emit('showTaskModal')
    const changeUserName = () => emit('changeUserName')
    const showDelAccount = () => emit('showDelAccount')
    const showExit = () => emit('showExit')
</script>

<template>
    <div class="bg-indigo-200 min-h-screen">
        <div class="flex justify-between items-center gap-4">
           <router-link to="/tasks">
                <span class="px-8 py-5 text-white rounded-lg bg-gradient-to-b
                            from-indigo-400 to-indigo-600 shadow-xl shadow-indigo-500/40
                            active:scale-95 transition mx-5">
                    Вернуться
                </span>
           </router-link>
           <ProfileOptions @show-task-modal="showTaskModal" @show-exit="showExit" @show-del-account="showDelAccount" />
        </div>
        <section class="flex justify-center gap-32 py-18">
            <div class="flex flex-col gap-3 py-6 px-7 bg-white rounded-[10px] text-center shadow-xl">
                <span>Всего привычек</span>
                <span>{{ user?.allTasksCurrent }}</span>
            </div>
             <div class="flex flex-col gap-3 py-6 px-13 bg-white rounded-[10px] text-center shadow-xl">
                <span>В процессе</span>
                <span>{{ user?.inProgressTasksCurrent }}</span>
            </div>
             <div class="flex flex-col gap-3 py-6 px-5 bg-white rounded-[10px] text-center shadow-xl">
                <span>Всего выполненно</span>
                <span>{{ user?.completedTasksCurrent }}</span>
            </div>
        </section>
        <section class="flex justify-center py-13">
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
                    <div class="flex flex-col">
                       <BaseButton button-type="Применить" variant="confirmEditProfile" @click="changeUserName" />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>