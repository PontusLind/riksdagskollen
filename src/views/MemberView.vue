<template>

<div>
    <Member v-if="hasId" :member="member" />
    <Members v-else  @member="navigateToMember"/>
  </div>
  </template>

  <script setup>
      import Members from '../components/Members.vue';
      import Member from '../components/Member.vue';
      import { ref, computed } from 'vue';
      import { useRoute } from 'vue-router';

    const route = useRoute();

    let hasId = computed(() => !!route.params.id);
    let member = ref([]);

    const navigateToMember = (m) => {
        member.value = m;
    };

  </script>
