<template>
  <qrcode  :value="rewards.id" :options="{ width: 200 }"></qrcode>
</template>

<script>
import axios from 'axios';
export default {
  data() { 
    return { 
      rewards: {},
      errors: []
    }
  },
  created() { 
    const token = localStorage.getItem('jwt')
    axios.get('http://localhost:4000/rewards/me', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(response => { 
      this.rewards = response.data
    })
    .catch(e => { 
      this.errors.push(e)
    })
  },
}
</script>