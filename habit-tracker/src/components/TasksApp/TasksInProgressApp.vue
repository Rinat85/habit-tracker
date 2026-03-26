<script setup>
    import NavBar from '../NavBarItems/NavBar.vue';
    import Wrapper from '../Slots/Wrapper.vue';
    import TasksInProgress from '@/components/TasksTemplates/TasksInProgress.vue';


</script>

<template>
    <Wrapper>
        <NavBar />
        <div class="min-h-screen bg-gray-200 py-12">
            <ul class="flex flex-col items-center gap-6">
                <TasksInProgress />
            </ul>
        </div>
    </Wrapper>
</template>