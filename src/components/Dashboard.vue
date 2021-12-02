<template>
<v-container fluid>
      <h3 class="text-h3 font-weight-medium mb-5">Dashboard</h3>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
  export default {
    data: () => ({
      cards: [
        { title: 'Resep Ayam Bakar Asik', src: 'https://images.unsplash.com/photo-1615557960916-5f4791effe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80', flex: 6 },
        { title: 'Dont Make Me Think', src: 'https://m.media-amazon.com/images/P/0321965515.01._SCLZZZZZZZ_SX500_.jpg', flex: 6 },
        { title: 'The Elements Of User Experience', src: 'https://images-na.ssl-images-amazon.com/images/I/41X3heCn4zL._SX389_BO1,204,203,200_.jpg', flex: 6 },
        { title: 'Kiat Kiat Memikat "Cuan"', src: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9uZXl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60', flex: 6 },
        { title: '1001 Resep Makanan Ala Nusantara', src: 'https://cdns.klimg.com/diadona.id/resources/news/2020/01/02/985/664xauto-12-resep-lengkap-masakan-nusantara-beserta-gambar-dan-cara-membuatnya-2001026.jpg', flex: 6 },
        { title: 'Tips and Trick Mendapatkan Hati si "Dia"', src: 'https://images.unsplash.com/photo-1580465446361-8aae5321522b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', flex: 6 },
      ],
    }),
  }
</script>