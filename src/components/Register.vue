<template>
  <main>
    <v-container fluid fill-height class="posisinya">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm6 elevation-6>
          <v-toolbar class="yellow darken-3">
            <v-toolbar-title >
              <h1>Register form</h1>
            </v-toolbar-title>
          </v-toolbar>

          <v-card>
            <v-card-text class="pt-4">
              <div>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    label="Name"
                    v-model="name"
                    :rules="nameRules"
                    required
                  ></v-text-field>  
                  <v-text-field
                    label="Nomor Identitas"
                    v-model="nomorIdentitas"
                    :rules="nomorIdentitasRules"
                    required
                  ></v-text-field>  
                  <v-text-field
                    label="Username"
                    v-model="username"
                    :rules="usernameRules"
                    required
                  ></v-text-field>  
                  <v-text-field
                    label="E-mail"
                    v-model="email"
                    :rules="emailRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    v-model="password"
                    type="password"
                    min="8"
                    :rules="passwordRules"
                    counter
                    required
                  >
                  </v-text-field>
                  <v-layout justify-end>
                    <v-btn
                      class="mr-2"
                      @click="submit"
                      :class="{
                        'green darken-1 white--text': valid, disabled: !valid
                      }"
                      >Go
                    </v-btn>
                    <v-btn @click="clear" class="red darken-3 white--text"
                      >Clear
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="login" class="blue darken-3 white--text"
                      >Login
                    </v-btn>
                  </v-layout>
                </v-form>
              </div>
            </v-card-text>
          </v-card>
          <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
            {{ error_message }}
          </v-snackbar>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

 <style>
@import url("https://fonts.googleapis.com/css?family=Jolly%20Lodger");
.grey--text {
  font-family: "Jolly Lodger";
}
.posisinya {
  position: absolute;
  top: 20px;
  left: 0px;
  right: 0px;
}
</style>

 <script>
export default {
  name: "Register",
  data() {
    return {
      load: false,
      snackbar: false,
      error_message: '',
      color: '',
      valid: false,
      name: '',
      nameRules: [(v) => !!v || "Nama tidak boleh kosong :("],
      nomorIdentitas: '',
      nomorIdentitasRules: [(v) => !!v || "Nomor identitas tidak boleh kosong :("],
      username: '',
      usernameRules: [(v) => !!v || "Username tidak boleh kosong :("],
      password: '',
      passwordRules: [(v) => !!v || "Password tidak boleh kosong :("],
      email: "",
      emailRules: [(v) => !!v || "E-mail tidak boleh kosong :("],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        //cek validasi data yang dikirim
        this.load = true;
        this.$http
          .post(this.$api + '/register', {
            name:this.name,
            nomorIdentitas:this.nomorIdentitas,
            username:this.username,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            // localStorage.setItem('id', response.data.user.id); //menyimpan id user yang sedang login
            // localStorage.setItem('token', response.data.access_token);
            //menyimpan auth token
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.clear();
            this.$router.push({
              name: "Dashboard",
            });
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            // localStorage.removeItem('token');
            this.load = false;
          })
      }
    },
    login(){
      this.$router.push({
          name: "Login",
      });
    },
    clear() {
      this.$refs.form.reset(); //Clear form login
    },
  },
};
</script> 

<style scoped>
.posisinya{
  text-align: center;
}
</style>