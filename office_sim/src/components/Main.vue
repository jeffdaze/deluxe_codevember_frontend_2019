<template>
  <div class="main">
    <div v-if="projectEntityIcon != ''">
      {{ projectEntity }} <font-awesome-icon :icon="projectEntityIcon" />
    </div>
    <button @click="generateName()">Generate Random Project</button>
    <button @click="addFunds(10)">Add funds $10</button>
    <button @click="init()">Init</button>

    <div class="currentFunds">
      Current Funds: {{ this.$store.getters.getFunds }}
    </div>

    <div id="jobBoard" class="boardCell">
      TODO

      <div v-for="(card, idx) in todo" v-bind:key="idx">
        <Card
          :projectName="card.title"
          :projectState="card.state"
          :icon="card.icon"
          :challenge="card.challenge"
          @click.native="cardClick(idx, 'job', card)"
        />
      </div>
    </div>
    <div id="planning" class="boardCell">
      Planning

      <div v-for="(card, idx) in planning" v-bind:key="idx">
        <Card
          :projectName="card.title"
          :projectState="card.state"
          :icon="card.icon"
          :challenge="card.challenge"
          @click.native="cardClick(idx, 'job', card)"
        />
      </div>
    </div>
    <div id="coding" class="boardCell">
      Coding

      <div v-for="(card, idx) in coding" v-bind:key="idx">
        <Card
          :projectName="card.title"
          :projectState="card.state"
          :icon="card.icon"
          :challenge="card.challenge"
          @click.native="cardClick(idx, 'job', card)"
        />
      </div>
    </div>
    <div id="done" class="boardCell">
      Testing

      <div v-for="(card, idx) in testing" v-bind:key="idx">
        <Card
          :projectName="card.title"
          :projectState="card.state"
          :icon="card.icon"
          :challenge="card.challenge"
          @click.native="cardClick(idx, 'job', card)"
        />
      </div>
    </div>
    <div class="eventStream">
      <Progress
        :eventLabel="currentEvent"
        :total="currentTurnLimit"
        :currentVal="currentTurnCount"
      />
    </div>

    <div class="staffSeats">
      <div
        v-for="employeeIndex in staffSeats"
        v-bind:key="employeeIndex"
        class="staffCard"
        @click="cardClick(employeeIndex - 1, 'staff', {})"
      >
        <div v-if="staff[employeeIndex - 1]">
          <div class="staffTitle">{{ staff[employeeIndex - 1].type }}</div>

          <div
            v-for="(skill, idx) in staff[employeeIndex - 1].skills"
            :key="idx"
            class="staffSkills"
          >
            {{ skill.title }}: {{ skill.level }}
          </div>
        </div>
        <div v-else class="emptySeat">
          Help Wanted
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Card from "@/components/Card.vue";
import Progress from "@/components/Progress.vue";
import { title1, title2, iconList } from "./data.json";

@Component({
  components: {
    Card,
    Progress
  }
})
export default class Main extends Vue {
  /* @Prop() private msg!: string; */
  jobBid: number = 0;
  cardSet: number = 8;

  projectEntity: string = "";
  projectEntityIcon: Array<string> = []; 

  //how many employees can currently be hired in the company...
  staffSeats: number = 4;

  //total turns? game ends after x turns...
  turnCount: number = 0;

  //event handling; after x turns we'll have an event with some effect...
  currentEvent: string = "";
  currentTurnCount: number = 0;
  currentTurnLimit: number = 0;

  //event handling boolean flags to match user with a job...
  staffClicked: boolean = false;
  jobClicked: boolean = false;

  currentStaffIndex: number | null = null;
  currentJobIndex: number | null = null;
  //because the job can come from any column we need to copy it here...
  currentJobObject: any = {};

  //values for random generator...
  projectNameList = title1;
  projectTypeList = title2;
  projectIconList = iconList;

  //random gen test...
  generateName(): void {

    let pName = this.projectNameList[Math.floor(Math.random()*this.projectNameList.length)];
    let pType = this.projectTypeList[Math.floor(Math.random()*this.projectTypeList.length)];

    this.projectEntityIcon = this.projectIconList[Math.floor(Math.random()*this.projectIconList.length)];
    this.projectEntity = pName +" "+ pType;
    
  }

  //jobs, training etc....
  todo: Array<any> = [
    {
      "title": "Hello World!",
      "icon": "globe",
      "state": "todo",
      "challenge": 1

    }
  ];

  planning: Array<any> = [

  ];

  coding: Array<any> = [

  ];

  testing: Array<any> = [

  ];

  //board manipulation methods...
  cardClick(index: number, type: string, object: any): void{

    window.console.log("clicked:", index, type, object);

    //figure out what kind of card this is and parse it appropriately;
    //also set flags to make sure we can perform the job with the person selected...
    //clicked on an employee
    if(type == "staff"){
      //set flag for checking...
      this.staffClicked = true;
      //set data about the selected staff...
      this.currentStaffIndex = index;
    }

    //some data for the items; staff will always come from staff
    //the other arrays are set by the type...
    if(this.currentStaffIndex){
      let selectedStaff: any = this.staff[this.currentStaffIndex];
    }
    
    if(type == "job"){
      //use the state value to figure out what happens next...
      this.jobClicked = true;
      //set data about selected job...
      this.currentJobObject = object;
      this.currentJobIndex = index;
    }

    //now that values are set, see if we can complete the action...
    if(this.jobClicked && this.staffClicked){
      //todo can be done by anyone; just moves the card into the planning phase...
      if(this.currentJobObject.state == "todo"){
        //update the item state to the next column...
        this.currentJobObject.state = "planning";
        //copy it into the next column...
        this.planning.push(this.currentJobObject);
        //and remove it from the original array...
        //typescript is a little overzelous -- currentJobIndex is set along with jobClicked;
        //might bundle all these into an object for refactor improvement...
        if(this.currentJobIndex !== null){
          this.todo.splice(this.currentJobIndex, 1);
        }

        //now we reset so we don't trigger the rest of the calls...
        //reset the tracking...
        this.resetClickState();

        //increment a turn...
        this.incrementTurn(1);
      }

      //other types of task require a specific set of skills...
      //may refactor this as there is a lot of repeated code here...
      if(this.currentJobObject.state == "planning"){
        //see what the staff memeber can do; BAs can analyze things in planning...
        if(this.findSkill("BA", this.staff[this.currentStaffIndex].skills)){
          this.currentJobObject.state = "coding";
          this.coding.push(this.currentJobObject);
          if(this.currentJobIndex !== null){
            this.planning.splice(this.currentJobIndex, 1);
          }
        }else{
          //reset the job click...
          this.resetJob();
        }
      } 

      if(this.currentJobObject.state == "coding"){
        //see what the staff memeber can do; BAs can analyze things in planning...
        if("Coder" in this.staff[this.currentStaffIndex].skills){
          this.currentJobObject.state = "testing";
          this.testing.push(this.currentJobObject);
          if(this.currentJobIndex !== null){
            this.coding.splice(this.currentJobIndex, 1);
          }
        }else{
          //reset the job click...
          this.resetJob();
        }
      } 

    }

  }

  findSkill(skill: string, skillList: Array<any>): boolean{
    for(let i:number=0;i < skillList.length; i++){
      if(skillList[i].title == skill){
        return true;
      }
    }
    return false;

  }

  incrementTurn(count: number): void{
    this.turnCount += count;

    if(this.currentTurnCount < this.currentTurnLimit){
      this.currentTurnCount += count;
    } else {
      this.currentTurnCount = count;
    }
  }

  resetClickState(): void{
    this.resetStaff();
    this.resetJob(); 
  }

  resetStaff(): void{
    //staff properties...
    this.staffClicked = false;
    this.currentStaffIndex = null;
  }

  resetJob(): void{
    //job properties...
    this.jobClicked = false;
    this.currentJobIndex = null;
    this.currentJobObject = {};
  }

  //make a new job object...
  buildRandomJob(): any{
    //might switch this to use an interface once I've settled on a job object format...
    let jobObj: any = {
      
    }

    return jobObj;
  }

  addJob(arr: Array<any>): void {
    //this should generate a job object for us to add to the array...
    let newJob = this.buildRandomJob();
    arr.push(newJob);
  }

  init(): void{
    //set some values to start...
    this.currentTurnLimit = 10;
    this.currentEvent = "First Quarter Report";
  }


  //array of all employees with their skills and skill levels...
  //kind of hate how it makes me use arrays and doesn't like duplicate keys...
  staff: Array<any> = [
    {
      "type": "CEO",
      "skills": [
        {"title": "BA", "level": 1 },
        {"title": "Coder", "level": 1 },
        {"title": "Tester", "level": 1}
      ]
    }
  ]; 

  addFunds(amt: number): void {
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

.staffSeats {
  height: 100px;
  width: 100%;
}

.staffCard {
  display: inline-block;
  float:left;
  width: 80px;
  height: 86px;
  border: 1px solid #333333;
  margin: 10px;
}

.staffTitle {
  margin:2px;
}

.staffSkills {
  font-size: 10px;
  text-align: right;
  margin-right:20px;
}

.emptySeat {
  margin-top:20px;
  text-align: center;
  color: rgb(199, 196, 196);
}
</style>
