<template>
  <v-main class="list">
    <h3 class="text-h3 font-weight-medium mb-5">Profile</h3>

    <v-card>
      <v-card-text>
        <v-text-field label="Nama" v-model="user.name" required>{{user.name}}</v-text-field>
        <v-text-field label="E-mail" v-model="user.email" required></v-text-field>
        <v-text-field label="Nomor Identitas" v-model="user.nomorIdentitas" required></v-text-field>
        <v-text-field label="Username" v-model="user.username" required></v-text-field>
        <v-text-field type = "password" label="Password" v-model="user.password" required></v-text-field>
        <v-btn color = "green" @click="update"> Save </v-btn>
        <!-- <v-btn @click="hapusAkun(user.id)"> Delete </v-btn> -->
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">warning!</span>
        </v-card-title>
        <v-card-text> Anda yakin ingin menghapus pengguna ini? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogConfirm = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="deleteData"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
      {{ error_message }}
    </v-snackbar>
  </v-main>
</template>
<script>
export default {
  name: "List",
  data() {
    return {
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      search: null,
      dialog: false,
      dialogConfirm: false,
      showPreview: false,
      formUser: new FormData(),
      
      user : [],
      editId: localStorage.getItem("id"),
      deleteId: localStorage.getItem("id"),
    };
  },
  methods: {
    //read data product
    readData() {
      
      this.$http.get(this.$api + '/user/'+localStorage.getItem('id'),{
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
      }).then(response => {
        this.user = response.data.data;
      }).catch(error => {
        console.log(error)
      })  
    },

    update() {
      let newData = {
        name : this.user.name,
        email : this.user.email,
        nomorIdentitas: this.user.nomorIdentitas,
        username: this.user.username,
        password : this.user.password
      };
      var url = this.$api + '/user/' + this.editId;
      this.load = true;
      this.$http.put(url, newData, {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.error_message = response.data.message;
        this.color = 'green';
        this.snackbar = true;
        this.load = false;
        this.close();
        this.readData();
        this.resetForm();
        this.inputType = 'Tambah';
      }).catch(error => {
        this.error_message = error.response.data.message;
        this.color = 'red';
        this.snackbar = true;
        this.load = false;
      });          
    },
    hapusAkun(id){
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    deleteData() {
      //mengahapus data
      var url = this.$api + '/user/' + this.deleteId;
      //data dihapus berdasarkan id
      this.$http.delete(url, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.close();
          this.readData(); //mengambil data
          this.resetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
  },
  mounted() {
    this.readData();
  },
};
</script> 