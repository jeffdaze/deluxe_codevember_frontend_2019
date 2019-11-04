<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="test()">Test Button -- log</button>
    <p>
      <button @click="test2()">Test Button -- set val</button><input type="text" v-model="fromForm">
    </p>
    <h4>{{ someVal }}</h4>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  someVal: string = 'test'
  fromForm: string = ''
  test (): void{
    console.log('Ran a test method...')
  }
  test2 (): void{
    // set this value on click...
    this.someVal = this.fromForm
    // now clear the form...
    this.fromForm = ''
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
