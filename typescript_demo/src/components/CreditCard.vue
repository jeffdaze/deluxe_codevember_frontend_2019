<template>
<div class="mainView">

<div :class="{'moveCard': focusSet, 'cvv': cvv}" class="cardDisplayBack card">
  <div id="cdMagstrip"></div>
  <div id="cdSignature"></div>
  <div id="cdCCcvv">CVV: {{ ccCvv }}</div>
</div>

<div :class="{'moveCard': focusSet, 'tiltView': focusSet, 'flip': cardFlip}" class="cardDisplay cdText card" :style="{ 'background-color': 'hsl('+HSLcolor+', 70%, 67%)' }">CREDIT CARD
    <div id="cdCCnum"><div class="ccQuad">{{ ccQuad1 }}</div><div class="ccQuad">{{ ccQuad2 }}</div><div class="ccQuad">{{ ccQuad3 }}</div><div class="ccQuad">{{ ccQuad4 }}</div></div>
    <div id="cdExpiry">EXP: <div class="ccDate">{{ ccMonth }}</div> / <div class="ccDate">{{ ccYear }}</div></div>
    <div id="cdCCname">{{ ccName }}</div>
</div>

  <div class="cardForm" :class="{'moveDown': focusSet}">
    <div class="formGroup">
        <div class="fieldLabel">Card Number:</div>
        <div><input type="number" class="formInput" @focus="gotFocus()" @blur="lostFocus()" @input="limitLength($event, 'ccValue')" v-model="ccValue" maxlength="16"></div>
    </div>
    <div class="formGroup">
        <div class="fieldLabel">Cardholder Name:</div>
        <div><input type="text" class="formInput" @focus="gotFocus()" @blur="lostFocus()" v-model="ccName"></div>
    </div>
        <div>
            <div class="formSplit">
                <div class="formGroup">
                    <div class="fieldLabel">Expiration:</div>
                    <select @focus="gotFocus()" @blur="lostFocus()" v-model="ccMonth">
                        <option value="" disabled selected>Month</option>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                    <select @focus="gotFocus()" @blur="lostFocus()" v-model="ccYear">
                        <option value="" disabled selected>Year</option>
                        <option value="19">2019</option>
                        <option value="20">2020</option>
                        <option value="21">2021</option>
                        <option value="22">2022</option>
                        <option value="23">2023</option>
                        <option value="24">2024</option>
                        <option value="25">2025</option>
                        <option value="26">2026</option>
                        <option value="27">2027</option>
                        <option value="28">2028</option>
                        <option value="29">2029</option>
                    </select>
                </div>
            </div>
            <div class="formSplit">
                <div class="formGroup">
                    <div class="fieldLabel">CVV:</div>
                    <input type="number" class="formInput" @focus="gotFocusCvv()" @blur="lostFocusCvv()" v-model="ccCvv" @input="limitLength($event, 'ccCvv')" maxlength="4">
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
  HSLcolor: number = this.randomHSL();
  ccValue: number | null = null;
  ccQuad1: number | null = null;
  ccQuad2: number | null = null;
  ccQuad3: number | null = null;
  ccQuad4: number | null = null;
  ccCvv: number | null = null;
  ccName: string = '';
  // even though these are technically numbers they will be handled like strings...
  ccMonth: string = '';
  ccYear: string = '';
  cardFlip: boolean = false;
  cvv: boolean = false;
  test (): void{
    console.log('Ran a test method...')
  }
  test2 (): void{
    // set this value on click...
    this.someVal = this.fromForm
    // now clear the form...
    this.fromForm = ''
  }
  randomHSL (): number {
    return Math.floor(Math.random() * 255)
  }
  gotFocus (): void{
    this.focusSet = true
  }
  lostFocus (): void{
    this.focusSet = false
  }
  gotFocusCvv (): void{
    this.gotFocus()
    this.cvv = true
    this.cardFlip = true
  }
  lostFocusCvv (): void{
    this.lostFocus()
    this.cvv = false
    this.cardFlip = false
  }
  limitLength (e: any, modelName: string): void{
    let mLength: number = e.currentTarget.getAttribute('maxlength')
    let numString: string = ''
    let passedVal: number = e.target.value
    // @TODO: need to figure out why this is freaking out about the type...
    // perhaps I need to pass it as object?
    let that: any = this

    if (passedVal) {
      numString = passedVal.toString()
    }

    // now pass the value to the various CC number 'quad' parts;
    // this does not account for one card type that has a 5 number 'quad' in the middle (discovery?)
    // first 4 digits, then second set of 4 etc...
    if (modelName === 'ccValue') {
      that.ccQuad1 = parseInt(numString.slice(0, 4), 10) || null
      that.ccQuad2 = parseInt(numString.slice(4, 8), 10) || null
      that.ccQuad3 = parseInt(numString.slice(8, 12), 10) || null
      that.ccQuad4 = parseInt(numString.slice(12, 16), 10) || null
    }

    if (numString.length > mLength) {
      that[modelName] = parseInt(numString.slice(0, mLength), 10)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
INPUT {
    height: 20px;
    float: left;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

SELECT {
    height: 20px;
    width: 40%;
    margin: 4px 5px 0 0;
    float: left;
}

.mainView {
    perspective: 600px;
    width:800px;
    margin:0 auto;
}

.cardDisplay {
    background: hsl(270, 70%, 67%);
    /* generate random background */
    background-image: url('https://source.unsplash.com/300x200/?abstract');
    background-blend-mode: screen;
}

/* Hiding for now; will set this to be the back of the card eventually... */
.cardDisplayBack {
    background: #f0f5fa;
    transform: rotateY(-195deg);
}

.card {
  top: 10px;
  right:300px;
  position: absolute;
  transition: all 0.8s;
  color: rgb(94, 92, 92);
  border:2px solid #000;
  border-radius: 25px;
  width: 300px;
  height: 200px;
  backface-visibility: hidden;
}

.flip {
  transform: rotateY(180deg) !important;
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

.moveCard {
  top: -50px !important;
  right: 10px !important;
  z-index:1;
}

.tiltView {
    transform: rotateY(-15deg);
}

.ccQuad {
  margin-right:5px;
  display:inline-block;
  text-align: left;
  width:55px;
}

.ccDate {
  display: inline-block;
  width: 20px;
}

#cdCCnum {
    position:relative;
    margin:50px auto;
    font-size: 24px;
    width:240px;
}

#cdExpiry {
  margin-top:-30px;
}

#cdCCname {
  position:relative;
  display:inline-block;
  top: 20px;
  left: -80px;
}

#cdCCcvv {
  position:absolute;
  width:80px;
  top:90px;
  right:25px;
  text-align: left;
}

#cdMagstrip {
  position:absolute;
  top:25px;
  height:30px;
  width:100%;
  background:#222222;
}

#cdSignature {
  position:absolute;
  top:80px;
  left:10px;
  height:40px;
  width:180px;
  background: rgb(243, 238, 238) url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAa0lEQVQoU2NkgIKmQ37/6+w2MYK4xpnX/h9piWDgFL4E54MZhBSdna7FyEiMIpBhYBNxWQcyCWYjTjchKwK5nRGbw9EVga3+/lbvP7LvsCkCGYbiRlyKdtW2QDwD0oFPkbDUMogbCSkCGQYAka1/qtQO9d8AAAAASUVORK5CYII=');
}

.cvv {
  transform: rotateY(-15deg);
}

.cdText {
  text-shadow: 0px -1px 0px rgba(255,255,255,.5);
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
