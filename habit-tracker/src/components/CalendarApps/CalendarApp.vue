<script setup>
    import { ref, watch, onMounted } from 'vue'
    
    import Calendar from '../CalendarTemplates/Calendar.vue';
    import NavBarOptions from '../NavBarItems/NavBarOptions.vue';
    import Wrapper from '../Slots/Wrapper.vue';
</script>

<template>
    <Wrapper>
        <NavBarOptions />
        <Calendar />
    </Wrapper>
</template>