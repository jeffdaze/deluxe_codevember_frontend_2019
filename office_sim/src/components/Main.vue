<template>
  <div class="main">
    <button>Get Job ${{ jobBid }}</button>
    <button @click="addFunds(10)">Add funds $10</button>

    <div class="currentFunds">Current Funds: {{ this.$store.getters.getFunds }}</div>

    <div id="jobBoard" class="boardCell">
        Project Listings

        <div v-for="x in cardSet" v-bind:key="x">
            <Card />
        </div>

    </div>
    <div id="planning" class="boardCell">
        Planning
    </div>
    <div id="coding" class="boardCell">
        Coding
    </div>
    <div id="done" class="boardCell">
        Done
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Card from "@/components/Card.vue";

@Component({
    components: {
        Card
    }
})
export default class Main extends Vue {
  /* @Prop() private msg!: string; */
    jobBid: number = 0;
    cardSet: number = 8;
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

.boardCell {
  border: 1px solid #000000;
  width: 210px;
  height: 320px;
  margin-right: 20px;
  display: inline-block;
  overflow: auto;
}
</style>
