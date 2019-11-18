<template>
  <div class="main">
    <button>Get Job ${{ jobBid }}</button>
    <button @click="addFunds(10)">Add funds $10</button>

    <div class="currentFunds">Current Funds: {{ this.$store.getters.getFunds }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Main extends Vue {
  /* @Prop() private msg!: string; */
    jobBid: number = 0;

    addFunds(amt: number): void{
        this.$store.commit('addFunds', amt);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
