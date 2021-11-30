<template>
<v-form>
  <v-btn @click="login" color="blue" class="badge rounded-pill btn btn-sm btn-warning me-2">Login</v-btn>
  <v-btn @click="register" color="yellow" class="badge rounded-pill btn btn-sm btn-warning me-2">register</v-btn>
  <v-spacer> </v-spacer>
  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
  
</v-form>
  
  
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://asset.kompas.com/crops/Yn331T3ABD2Twkqhp_sO-K0m6Go=/429x39:5529x3439/750x500/data/photo/2021/05/10/609931bb5334c.jpg',
          },
          {
            src: 'https://akcdn.detik.net.id/visual/2021/06/24/seoul-book-repository_169.jpeg?w=650',
          },
          {
            src: 'https://www.gramedia.com/blog/content/images/2018/11/perpustakaan.jpg',
          },
          {
            src: 'https://statik.tempo.co/data/2021/02/08/id_999015/999015_720.jpg',
          },
        ],
      }
    },
    methods: {
    register(){
      this.$router.push({
          name: "Register",
      });
    },
    login(){
      this.$router.push({
          name: "Login",
      });
    }
  }
  }

  
</script>