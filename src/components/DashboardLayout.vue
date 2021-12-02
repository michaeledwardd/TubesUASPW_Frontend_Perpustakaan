<template>
  <div class="dashboard">
    <v-navigation-drawer v-model="drawer" class="fullheight" width="256" app>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> PerpustakaanKita </v-list-item-title>
          <v-list-item-subtitle class="subtitle"> ReadBookisFun! </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      
      <v-divider></v-divider>
      <v-list dense nav v-if="loggedIn && loggedinAdmin" >
        <v-list-item 
          v-for="item in items"
          :key="item.title"
          link
          tag="router-link"
          :to="item.to"
        >
        <v-list-item-content>
            <v-icon >{{item.icon}}</v-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav v-if="loggedIn && !loggedinAdmin" >
        <v-list-item 
          v-for="item in user"
          :key="item.title"
          link
          tag="router-link"
          :to="item.to"
        >
        <v-list-item-content>
            <v-icon >{{item.icon}}</v-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>


    </v-navigation-drawer>
    <v-app-bar app fixed height="75px">
      <v-app-bar-nav-icon color = "green" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <VSpacer />
      <v-toolbar-items>
        <v-btn text router color = "blue" @click = "btnProfile"><v-icon>mdi-account</v-icon></v-btn>
        <v-btn text router color = "red" @click = "btnLogout"><v-icon>mdi-power</v-icon></v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <div class="fullheigh pa-5">
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
export default {
  name: "Dashboard",
  data() {
    return {
      drawer: true,
       items: [
        { title: "Dashboard", to: "/dashboard", icon: "mdi-view-dashboard"},
        { title: "Daftar Pengguna", to: "/user",icon: "mdi-account-group"},
        { title: "Buku", to:"/buku",icon:"mdi-book" },
        { title: "Denda", to:"/denda",icon:"mdi-currency-usd"},
        { title: "Peminjaman", to:"/peminjaman",icon:"mdi-clock-time-nine"},
        { title: "Pengembalian", to:"/pengembalian",icon:"mdi-hand-heart"},
      ],
      user: [
        { title: "Dashboard", to: "/dashboard", icon:"mdi-home"},
        { title: "List Buku", to:"/bukuuser", icon:"mdi-book"},
        { title: "Denda Pemustaka", to:"/dendauser", icon:"mdi-currency-usd"},
        { title: "Peminjaman", to:"/peminjaman", icon:"mdi-clock-time-nine"},
        { title: "Pengembalian", to:"/pengembalian", icon:"mdi-hand-heart"},
      ]
    };
  },
  methods: {
    btnProfile() {
      this.$router.push('/profile');
    },
    btnLogout() {
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      location.reload();
    },
  },
  computed: {
    loggedIn(){
      return localStorage.getItem("token") != null;
    },
    loggedinAdmin(){
      return localStorage.getItem("id") == "4";
    }
  }
};
</script>
<style scoped>
.fullheight {
  min-height: 100vh !important;
}
.router{
  text-decoration: none;
  color: black;
}

</style>