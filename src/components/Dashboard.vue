<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <v-card class="mx-auto" max-width="344">
          <v-img
            src="https://literasinusantara.com/wp-content/uploads/2019/03/Mimpi-TBM-Kolong-2-720x720.jpg"
            height="200px"
          ></v-img>

          <v-card-title> Mengejar Mimpi di Tengah Pandemi </v-card-title>

          <v-card-subtitle> Karya: Michael Edward </v-card-subtitle>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                Buku ini menceritakan perjuangan seorang mahasiswa yang berjuang
                untuk mempertahankan prestasinya di tengah situasi pandemi covid
                19
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
        <v-card class="mx-auto" max-width="344">
          <v-img
            src="https://literasinusantara.com/wp-content/uploads/2019/03/Mimpi-TBM-Kolong-2-720x720.jpg"
            height="200px"
          ></v-img>

          <v-card-title> Mengejar Mimpi di Tengah Pandemi </v-card-title>

          <v-card-subtitle> Karya: Michael Edward </v-card-subtitle>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                Buku ini menceritakan perjuangan seorang mahasiswa yang berjuang
                untuk mempertahankan prestasinya di tengah situasi pandemi covid
                19
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>

      </div>
    </div>
  </div>
</template>



<script>
export default {
  data: () => ({
    show: false,
  }),
};
</script>