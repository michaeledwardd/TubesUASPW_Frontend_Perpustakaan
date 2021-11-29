<template>
  <v-main class="list">
    <h3 class="text-h3 font-weight-medium mb-5">Daftar Pengembalian</h3>
    
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>

      </v-card-title>
      <v-data-table :headers="headers" :items="Pengembalians" :search="search">

          <template v-slot:[`item.actions`]="{item}">
                <v-btn icon small class="mr-2" @click="editHandler(item)">
                  <v-icon color="red">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon small @click="deleteHandler(item.id)">
                     <v-icon color="green">mdi-delete</v-icon>
                </v-btn>
            </template>

        <!-- <template v-slot:[`item.actions`]="{ item }">
          <v-btn small class="mr-2" @click="editHandler(item)"> edit </v-btn>
          <v-btn small @click="deleteHandler(item.id)"> delete </v-btn>
        </template> -->
      </v-data-table>
    </v-card>
    
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{formTitle}} pengembalian</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field v-model="form.namaPeminjam" label="Nama Peminjam" required></v-text-field>
            <v-text-field v-model="form.statusPengembalian" label="Status Pengembalian" required></v-text-field>
            <v-text-field v-model="form.nomorIdentitas" label="Nomor identitas" required></v-text-field>
            <v-text-field v-model="form.judulBuku" label="Judul Buku" required></v-text-field>            
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">warning!</span>
        </v-card-title>
        <v-card-text> Anda yakin ingin menghapus pengembalian ini? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogConfirm = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="deleteData"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

       <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }} </v-snackbar>

  </v-main>
</template>


<script>
export default {
  name: "List",
  data() {
    return {
      inputType: 'Tambah',
      load: false,
      snackbar: false,
      error_message: '',
      color: '',
      search: null,
      dialog: false,
      dialogConfirm: false,
      headers: [
        { text: "Nama Peminjam", align: "start", sortable: true, value: "namaPeminjam"},
        { text: "Status Pengembalian", value: 'statusPengembalian'},
        { text: "Nomor identitas", value: 'nomorIdentitas'},
        { text: "Judul pengembalian", value: 'judulBuku'},
        { text: "Action", value:'actions'},
      ],
      pengembalian: new FormData,
      Pengembalians: [],
      form:{
        namaPeminjam: null,
        statusPengembalian: null,
        nomorIdentitas: null,
        judulBuku: null,
      },
      deleteId: '',
      editId: ''
    };
  },

  methods: {
    setForm(){
      if(this.inputType !== 'Tambah'){
        this.update();
      }
      else{
        this.save();
      }
    },

    readData(){
      var url = this.$api + '/pengembalian';
      this.$http.get(url, {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.Pengembalians = response.data.data;
      })
    },

    save(){
      this.pengembalian.append('namaPeminjam',this.form.namaPeminjam);
      this.pengembalian.append('statusPengembalian',this.form.statusPengembalian);
      this.pengembalian.append('nomorIdentitas',this.form.nomorIdentitas);
      this.pengembalian.append('judulBuku', this.form.judulBuku);

      var url= this.$api + '/pengembalian/'
      this.load = true;
      this.$http.post(url, this.pengembalian, {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        }
      }).then(response => {
        this.error_message = response.data.message;
        this.color = "green";
        this.snackbar = true;
        this.load = true;
        this.close();
        this.readData();
        this.resetForm();
      }).catch(error => {
        this.error_message = error.response.data.message;
        this.color = "red";
        this.snackbar = true;
        this.load = false;
      });
    },

    update(){
      let newData = {
        namaPeminjam : this.form.namaPeminjam,
        statusPengembalian : this.form.statusPengembalian,
        nomorIdentitas : this.form.nomorIdentitas,
        judulBuku: this.form.judulBuku
      };
      var url = this.$api + '/pengembalian/' + this.editId;
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

    deleteData() {
      //mengahapus data
      var url = this.$api + '/pengembalian/' + this.deleteId;
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

    editHandler(item){
      this.inputType = 'Ubah';
      this.editId = item.id;
      this.form.namaPeminjam = item.namaPeminjam;
      this.form.statusPengembalian = item.statusPengembalian;
      this.form.nomorIdentitas = item.nomorIdentitas;
      this.form.judulBuku = item.judulBuku;
      this.dialog = true;
    },

    deleteHandler(id) {
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    close() {
      this.dialog = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      this.readData();
    },
    cancel() {
      this.resetForm();
      this.readData();
      this.dialog = false;
      this.dialogConfirm = false;
      this.inputType = "Tambah";
    },
    resetForm() {
      this.form = {
        namaPeminjam: null,
        statusPengembalian: null,
        nomorIdentitas: null,
        judulBuku: null,
      };
    },
  },
  computed: {
    formTitle() {
      return this.inputType;
    },
  },
  mounted() {
    this.readData();
  },
};
</script>