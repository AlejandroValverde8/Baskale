<template>
  <div class="slider">
    <vue-image-slider
      :images="imageArray"
      :intervalVal="3000"
      :height="'100%'"
      :width="'100%'"
    />
  </div>
</template>

<script>
import VueImageSlider from "vue-image-slider";

export default {
  name: "Home",
  components: {
    VueImageSlider,
  },
  data() {
    return {
      imageArray: [
        "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/09/15/15685617363067.jpg",
        "https://images.daznservices.com/di/library/NBA_Global_CMS_image_storage/4/63/air-jordan_5hyq8xhq1ef11aheqhhcgkg6x.jpg?t=-269221887&quality=80",
        "https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/59a476db2ee40fda37000001.jpg",
      ],
    };
  },
};
</script>
