<template>
  <div v-if="member">
    <h2>{{ member.tilltalsnamn }} {{ member.efternamn }}</h2>
    <img :src="member.bild_url_192" alt="Member Image" />
    <div>
      <button @click="handleClick('cheer')">Cheer</button>
      <button @click="handleClick('buue')">Buue</button>
    </div>
    <p>Born: {{ member.fodd_ar }}</p>
    <p>Party: {{ member.parti }}</p>
    <p>Status: {{ member.status }}</p>
    <table v-if="memberVotes">
      <thead>
        <tr>
          <th>Ja</th>
          <th>Nej</th>
          <th>Avstår</th>
          <th>Frånvarande</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ memberVotes.Ja }}</td>
          <td>{{ memberVotes.Nej }}</td>
          <td>{{ memberVotes.Avstår }}</td>
          <td>{{ memberVotes.Frånvarande }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const playSound = inject("playSound");

const props = defineProps({
  member: {
    type: Object,
    default: null
  }
});

const route = useRoute();
let member = ref(props.member);
let memberVotes = ref({});

onMounted(async () => {
  const memberId = route.params.id;
  if (memberId) {
    if (0 === member.value.length) {
      try {
        const response = await axios.get(`https://data.riksdagen.se/personlista/?iid=${memberId}&utformat=json`);
        member.value = response.data.personlista.person;
      } catch (error) {
        console.error('Failed to fetch member data:', error);
      }
    }

    if (member.value) {
      try {
        const response = await axios.get(`https://data.riksdagen.se/voteringlista/?rm=2024%2F25&rm=2023%2F24&rm=2022%2F23&rm=2021%2F22&bet=&punkt=&valkrets=&rost=&iid=${memberId}&sz=500&utformat=json&gruppering=iid`);
        memberVotes.value = response.data.voteringlista.votering;
      } catch (error) {
        console.error('Failed to fetch member vote data:', error);
      }
    }
  }
});

function handleClick(action) {
  if (playSound) {
    playSound(action);
  }
}

</script>

<style scoped>
table {
  width: 100%;
  table-layout: fixed;
}

table th, table td {
  width: 25%;
  text-align: center;
}
</style>
