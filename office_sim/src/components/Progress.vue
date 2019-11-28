<template>
  <div class="progress">
    <div class="bar" role="progressbar" :style="{ width: getPercent + '%' }" :class="{'noAnimate':getPercent == 0}">
      {{ eventLabel }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Card extends Vue {
  @Prop() private eventLabel!: string;
  @Prop() private total!: number;
  @Prop() private current!: number;

  get getPercent(): number {
    if(this.total == 0){
      return 0;
    }
    return (this.current / this.total) * 100;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.progress {
  width: 100%;
  height: 20px;
  background: #eaeaea;
  color: #ffffff;
}

.bar {
  background: #008800;
  height: 100%;
  line-height: 20px;
  transition: width 0.5s;
}

.noAnimate {
  transition: width 0s;
}
</style>
