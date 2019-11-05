<template>
  <div class="cardForm">
    <div class="formGroup">
        <div class="fieldLabel">Card Number:</div>
        <div><input type="number" class="formInput"></div>
    </div>
    <div class="formGroup">
        <div class="fieldLabel">Cardholder Name:</div>
        <div><input type="text" class="formInput"></div>
    </div>
        <div>
            <div class="formSplit">
                <div class="formGroup">
                    <div class="fieldLabel">Expiration:</div>
                    <select>
                        <option value="" disabled selected>Month</option>
                        <option></option>
                    </select>
                    <select>
                        <option value="" disabled selected>Year</option>
                        <option></option>
                    </select>
                </div>
            </div>
            <div class="formSplit">
                <div class="formGroup">
                    <div class="fieldLabel">CVV:</div>
                    <input type="number" class="formInput">
                </div>
            </div>
        </div>

      <button @click="test2()">Submit</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CreditCard extends Vue {
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
INPUT {
    height: 20px;
    float: left;
}

SELECT {
    height: 20px;
    width: 40%;
    margin: 4px 5px 0 0;
    float: left;
}

.formGroup {
    padding: 10px;
    width: 100%;
}

.cardForm {
    border:1px solid #000;
    border-radius: 25px;
    width: 600px;
    margin: 0 auto;
    padding: 30px;
}

.fieldLabel {
    text-align: left;
}

.formInput {
    width: 94%;
    height: 20px;
}

.formSplit {
    display: inline-flex;
    width: 50%;
}

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
