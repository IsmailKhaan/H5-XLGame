<template>
  <view>
    <h3 v-html="$en($store.state.ens.about_us.about_us_description)"></h3>
    <view>657das68d7</view>
    <h3 v-html="$en2('about_us','about_us_description')"></h3>

    <div class="f-c">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </div>
  </view>
</template>

<script>

export default {
  data() {
    return {

    };
  },
  mounted(){
  },
  methods:{
    enFx(val){
      return val.replace(/\n/g,'<br>')
    },
    enFx2(a,b){
      let vals = this.$store.state.ens[a][b];
      console.log('test','------',this.$store.state.ens[a][b])
      return vals.replace(/\n/g,'<br>')
    },
  },


};

</script>

<style lang="scss">

</style>
