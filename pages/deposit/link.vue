<template>
<div>
  <zhnavbar title="支付详情" :lefticon="true"></zhnavbar>
  <web-view v-if="$store.state.links"
    :src="$store.state.links"
  ></web-view>
</div>
</template>
<script>
export default {
  dicts:[],
  props:[],
    data(){
        return{

        }
    },
    methods: {
        openFx(val,data){
            this.reset();
            this.open = true;
        },
    },
}
</script>
<style lang="scss">
uni-web-view.uni-webview--fullscreen{
  position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 0;
}

</style>
