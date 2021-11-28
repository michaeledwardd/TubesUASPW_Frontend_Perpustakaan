<template>
  <v-main class="list">
    <h3 class="text-h3 font-weight-medium mb-5">Profile</h3>

    <v-card>
      <v-card-text>
        <img
        :src="imagePreview"
        width="200"
        v-show="showPreview"
        />
        <br />
        <input
          type="file"
          name="picture"
          class="form-control-file"
          id="picture"
          @change="onFileChange"
        />
        <br />
        <br />
        <v-text-field label="Nama" v-model="user.name" required></v-text-field>
        <v-text-field
          label="E-mail"
          v-model="user.email"
          required
        ></v-text-field>
        <v-checkbox
          v-model="showPassField"
          :label="`Change Password`"
        ></v-checkbox>
        <div v-if="showPassField == true">
          <v-text-field
            label="Old Password"
            v-model="oldPass"
            required
          ></v-text-field>
          <v-text-field
            label="New Password"
            v-model="newPass"
            required
          ></v-text-field>
          <v-text-field
            label="Confirm New Password"
            v-model="confPass"
            required
          ></v-text-field>
        </div>
        <v-btn @click="update"> Save </v-btn>
      </v-card-text>
    </v-card>

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
      showPassField: false,
      cekHash: false,
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      url: "",
      search: null,
      dialog: false,
      dialogConfirm: false,
      imagePreview: null,
      showPreview: false,
      formUser: new FormData(),
      user: {
        email: "",
        name: "",
        picture: "",
      },
      oldPass: "",
      newPass: "",
      confPass: "",
      editId: localStorage.getItem("id"),
    };
  },
  methods: {
    //read data product
    readData() {
      this.url = this.$api + "/user";
      this.$http
        .get(this.url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.user.name = response.data.name;
          this.user.email = response.data.email;

          if(response.data.picture!=null) {
            this.showPreview =true;
            console.log("read data",   response.data.picture);
            this.imagePreview =  response.data.picture;
          }

        });
    },

    update() {
      if (this.showPassField == true) {
        //jika ganti password
        this.url = this.$api + "/user/hashCheck/" + this.editId;
        let newData = {
          password: this.oldPass,
        };
        this.$http
          .put(this.url, newData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.cekHash = true;
            if (this.cekHash == false) {
              console.log("Old Password salah");
            } else if (this.newPass != this.confPass || this.newPass == "") {
              this.error_message = response.data.message;
              this.error_message =
                "New Password dan Confirm New Password harus sama!";
              this.color = "red";
              this.snackbar = true;
            } else {
             
              let formData = new FormData();
              formData.append("picture", this.user.picture);
              formData.append("email", this.user.email);
              formData.append("password", this.newPass);
              formData.append("name", this.user.name);

              this.url = this.$api + "/user/updatePass/" + this.editId;
              this.load = true;
              this.$http
                .post(this.url, formData, {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                })
                .then((response) => {
                  console.log(response);
                  this.error_message = response.data.message;
                  this.color = "green";
                  this.snackbar = true;
                  this.load = false;
                  this.readData(); //mengambil data
                  this.showPassField = false;
                  this.oldPass = "",
                  this.newPass = "",
                  this.confPass = "";
                })
                .catch((error) => {
                  this.error_message = error.response.data.message;
                  this.color = "red";
                  this.snackbar = true;
                  this.load = false;
                });
            }
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
            this.cekHash = false;
          });
      } else {
        //jika tidak ganti password
    
        let formData = new FormData();
      
        formData.append("email", this.user.email);
        formData.append("name", this.user.name);
        formData.append("picture", this.user.picture);

        this.url = this.$api + "/user/" + this.editId;
        this.load = true;
        this.$http
          .post(this.url, formData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.readData(); //mengambil data
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          });
      }
    },
    onFileChange(event) {
      /*
    Set the local file variable to what the user has selected.
    */
      this.user.picture = event.target.files[0];
      console.log(this.user.picture);

      let reader = new FileReader();

      /*
    Add an event listener to the reader that when the file
    has been loaded, we flag the show preview as true and set the
    image to be what was read from the reader.
    */
      reader.addEventListener(
        "load",
        function () {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );

      /*
    Check to see if the file is not empty.
    */
      if (this.user.picture) {
        /*
            Ensure the file is an image file.
        */
        if (/\.(jpe?g|png|gif)$/i.test(this.user.picture.name)) {
          console.log("loader", this.user.picture);
          /*
            Fire the readAsDataURL method which will read the file in and
            upon completion fire a 'load' event which we will listen to and
            display the image in the preview.
            */
          reader.readAsDataURL(this.user.picture);
        }
      }

    },
  },
  mounted() {
    this.readData();
  },
};
</script> 

