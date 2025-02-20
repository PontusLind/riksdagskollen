<template>
  <div v-if="!mounted">
    <Loading />
  </div>
  <div v-else>
    <h1>Members</h1>
    <input type="text" v-model="search" placeholder="Search for a member" />
    <ul v-if="membersList.length">
      <li :key="member.intressent_id" @click="onClick(member.intressent_id)" v-for="member in membersList.slice(0, 15)">{{ member.sorteringsnamn }}</li>
    </ul>
    <p v-else>No members found</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import Loading from './Loading.vue';
import router from '../router';

let members = ref([]);
let membersList = ref([]);
let search = ref('');
let mounted = ref(false);
const url = 'https://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc';
const emit = defineEmits(['member']);

onMounted(async () => {
  try {
    const response = await axios.get(url);
    members.value = response.data.personlista.person;
    membersList.value = members.value;
  } catch (error) {
    console.log(error);
  }
  mounted.value = true;
});

watch(search, (value) => {
  if (value) {
    membersList.value = members.value.filter((member) => {
      return value.split(' ').every((word) => {
        return matchName(member, word);
      });
    });
  } else {
    membersList.value = members.value;
  }
});

function matchName(member, word) {
  return member.sorteringsnamn.toLowerCase().includes(word.toLowerCase());
}

function onClick(id) {
  router.push(`/member/${id}`);
  const member = members.value.find(member => member.intressent_id === id);
  if (member) {
        emit('member', member);
      }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

li:hover {
  background-color: #f9f9f952;
}

input {
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
}
</style>
