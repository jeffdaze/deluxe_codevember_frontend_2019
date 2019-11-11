<template>
<div class="mainView">

<div id="cardDisplay" :class="{'tiltView': focusSet}" class="cdText">CREDIT CARD
    <div id="cdCCnum">{{ ccValue }}</div>
    <div id="cdCCname">{{ ccName }}</div>
    <div id="cdCCcvv">{{ ccCvv }}</div>
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
                    <select @focus="gotFocus()" @blur="lostFocus()">
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
                    <select @focus="gotFocus()" @blur="lostFocus()">
                        <option value="" disabled selected>Year</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                    </select>
                </div>
            </div>
            <div class="formSplit">
                <div class="formGroup">
                    <div class="fieldLabel">CVV:</div>
                    <input type="number" class="formInput" @focus="gotFocus()" @blur="lostFocus()" v-model="ccCvv" @input="limitLength($event, 'ccCvv')" maxlength="4">
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
  ccValue: number | null = null;
  ccCvv: number | null = null;
  ccName: string = '';
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
  lostFocus (): void{
    this.focusSet = false
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

#cardDisplay {
    top: 10px;
    right:300px;
    position: absolute;
    border:2px solid #000;
    border-radius: 25px;
    width: 300px;
    height: 200px;
    background: #a382e0;
    transition: all 0.8s;
    color: rgb(94, 92, 92);
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

#cdCCnum {
    position:relative;
    margin-top:50px;
    font-size: 20px;
}

#cdCCname {
  position:relative;
  display:inline-block;
  top: 60px;
  left: -80px;
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
