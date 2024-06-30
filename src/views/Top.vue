<template>
  <div class="home">
    top
   <span>{{ username }}</span>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Top',
  data() {
    return {
      username: null
    }
  },
  components: {
  }
}
</script>