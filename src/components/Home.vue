<template>
  
    <v-carousel
      height="100vh"
      dark
      cycle
      show-arrows-on-hover
      draggable="true"
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="(carousel, carindex) in carouselsData"
        :key="carindex"
        :src="carousel.src"
        class="gradient-fill"
      >
        <v-container fill-height>
          <div style="max-width: 900px">
            
            <div class="text-md-h2 mb-3 text-sm-h3 text-h5 font-weight-black white--text">
              {{ carousel.heading.toUpperCase() }}
            </div>
            
            <p class="mb-5 white--text">{{ carousel.subHeading }}</p>
            
            <v-btn @click="login" :x-large="$vuetify.breakpoint.smAndUp" class="my-3 primary"
              >Login</v-btn
            >
            <span class="mx-2 my-4"></span>
            <v-btn @click="register" :x-large="$vuetify.breakpoint.smAndUp" class="my-3 orange white--text"
              >Register</v-btn
            >
            
            <v-spacer></v-spacer>
            <div class="white--text"
              >Contact & Our Location</div
            >
            
            
            <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.0981783199277!2d110.41394041534116!3d-7.77941417934165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59f1fb2f2b45%3A0x20986e2fe9c79cdd!2sUniversitas%20Atma%20Jaya%20Yogyakarta%20-%20Kampus%203%20Gedung%20Bonaventura%20Babarsari!5e0!3m2!1sen!2sid!4v1638427863019!5m2!1sen!2sid"
          width="100%"
          height="500"
          frameborder="0"
          style="border: 0; display: block"
          allowfullscreen="true"
          aria-hidden="false"
          tabindex="0"
        ></iframe>
        
            
          </div>
        </v-container>
      </v-carousel-item>
      
    </v-carousel>
    
 
</template>


<script>
export default {
  data() {
    return {
      carouselsData: [
        {
          src: 'https://asset.kompas.com/crops/Yn331T3ABD2Twkqhp_sO-K0m6Go=/429x39:5529x3439/750x500/data/photo/2021/05/10/609931bb5334c.jpg',
          heading: ' Perpustakaan Kita ',
          subHeading:
            'Infographic hypotheses influencer user experience Long madel ture gen-z paradigm shift client partner network product seilans solve management influencer analytics leverage virality. incubator seed round massmarket. buyer agile development growth hacking business-to-consumer ecosystem ',
        },
        {
          src: 'https://akcdn.detik.net.id/visual/2021/06/24/seoul-book-repository_169.jpeg?w=650',
          heading: ' Perpustakaan Kita',
          subHeading:
            'Litora a interdum primis. Lectus facilisi sit cum arcu aliquam velit imperdiet sapien suspendisse at vel facilisis. Facilisis metus, curae; nibh mi orci et. Fringilla sociis magna rutrum bibendum arcu.',
        },
        {
          src: 'https://www.gramedia.com/blog/content/images/2018/11/perpustakaan.jpg',
          heading: ' Perpustakaan Kita ',
          subHeading:
            'Tellus cum turpis natoque id justo interdum tincidunt faucibus aptent congue pellentesque. Proin luctus orci netus! Scelerisque parturient cursus donec parturient et, luctus aptent habitant aliquet felis. Sapien placerat ultricies.',
        },
        {
          src: 'https://statik.tempo.co/data/2021/02/08/id_999015/999015_720.jpg',
          heading: ' Perpustakaan Kita ',
          subHeading:
            'Dapibus cras, ligula suspendisse potenti himenaeos mus volutpat pulvinar est facilisi. Vehicula malesuada parturient euismod litora mollis penatibus. Penatibus cum nullam facilisi enim nisi ac suspendisse. Ullamcorper ad amet netus.',
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
    },
    contact(){
      this.$router.push({
        name: "Contact",
      })
    }
  }
  }

</script>

<style>
.gradient-fill .v-responsive__content {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    to right,
    rgba(3, 12, 41, 0.75),
    rgba(5, 11, 31, 0.65)
  );
}
.carousel-item img {
        height:100vh!important ;
    }


</style>
