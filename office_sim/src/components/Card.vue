<template>
  <div class="card">
    <font-awesome-icon :icon="icon" />
    <div class="projectName">{{ projectName }}</div>
    <div class="projectState">{{ projectState }}</div>
    <div class="challenge">{{ challenge }}</div>
    <div class="slotStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Card extends Vue {
  @Prop() private projectName!: string;
  @Prop() private projectState!: string;
  @Prop() private icon!: string;
  @Prop() private challenge!: number;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  font-size: 10px;
  border: 1px solid #333333;
  border-radius: 25%;
  width: 70px;
  height: 70px;
  float: left;
  margin: 12px;
  overflow: hidden;
}

.slotStyle{
  position:relative;
  top:-70px;
  height:13px;
  overflow: hidden;
  opacity:0.2;
}
</style>
