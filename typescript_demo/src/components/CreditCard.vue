<template>
<div class="mainView">

<div id="cardDisplay" :class="{'tiltView': focusSet}">CARD TEST</div>

  <div class="cardForm" :class="{'moveDown': focusSet}">
    <div class="formGroup">
        <div class="fieldLabel">Card Number:</div>
        <div><input type="number" class="formInput" @focus="gotFocus()"></div>
    </div>
    <div class="formGroup">
        <div class="fieldLabel">Cardholder Name:</div>
        <div><input type="text" class="formInput" @focus="gotFocus()"></div>
    </div>
        <div>
            <div class="formSplit">
                <div class="formGroup">
                    <div class="fieldLabel">Expiration:</div>
                    <select @focus="gotFocus()">
                        <option value="" disabled selected>Month</option>
                        <option></option>
                    </select>
                    <select @focus="gotFocus()">
                        <option value="" disabled selected>Year</option>
                        <option></option>
                    </select>
                </div>
            </div>
            <div class="formSplit">
                <div class="formGroup">
                    <div class="fieldLabel">CVV:</div>
                    <input type="number" class="formInput" @focus="gotFocus()">
                </div>
            </div>
        </div>

      <button @click="test2()">Submit</button>
  </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CreditCard extends Vue {
  someVal: string = 'test'
  fromForm: string = ''
  focusSet: boolean = false;

  test (): void{
    console.log('Ran a test method...')
  }
  test2 (): void{
    // set this value on click...
    this.someVal = this.fromForm
    // now clear the form...
    this.fromForm = ''
  }
  gotFocus (): void{
    this.focusSet = true
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

.mainView {
    perspective: 600px;
}

#cardDisplay {
    top: 10px;
    right:300px;
    position: absolute;
    border:2px solid #000;
    border-radius: 25px;
    width: 300px;
    height: 200px;
    background: #e66c6c;
    transition: all 0.8s;
}

.formGroup {
    padding: 10px;
    width: 100%;
}

.cardForm {
    background: #7ebcf7;
    position: absolute;
    display: block;
    border:2px solid #000;
    border-radius: 25px;
    width: 600px;
    margin: 0 auto;
    padding: 30px;
    transition: all 0.5s;
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

.moveDown {
    margin-top: 100px;
}

.tiltView {
    top: -50px !important;
    right: 10px !important;
    transform-origin: 100% 70%;
    transform: rotateY(-15deg);
    z-index:1000;
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
