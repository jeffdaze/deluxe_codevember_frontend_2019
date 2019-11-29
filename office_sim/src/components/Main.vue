<template>
  <div class="main">
    <div v-if="projectEntityIcon != ''">
      {{ projectEntity }} <font-awesome-icon :icon="projectEntityIcon" />
    </div>
    <button @click="addJob('todo')">Generate Random Project</button>
    <button @click="addFunds(10)">Add funds $10</button>
    <button @click="init()">Init</button>

    <div class="currentFunds">
      Current Funds: ${{ this.$store.getters.getFunds }}
    </div>

    <div id="jobBoard" class="boardCell">
      TODO

      <div v-for="(card, idx) in todo" v-bind:key="idx" class="jobCard">
        <Card
          :projectName="card.title + ' ' + card.type"
          :projectState="card.state"
          :icon="card.icon"
          :challenge="card.challenge"
          @click.native="cardClick(idx, 'job', card)"
          :class="{'activeClick': card.activeIndex != null}"
        />
      </div>
    </div>
    <div id="planning" class="boardCell">
      Planning

      <div v-for="(card, idx) in planning" v-bind:key="idx" class="jobCard">
        <Card
          :projectName="card.title + ' ' + card.type"
          :projectState="card.state"
          :icon="card.icon"
          :challenge="card.challenge"
          @click.native="cardClick(idx, 'job', card)"
          :class="{'activeClick': card.activeIndex != null, 'busyState': card.currentTick > 0}"
        >
        <Progress 
            :total="card.baseEffort"
            :current="card.currentTick"
          />
        </card>
      </div>
    </div>
    <div id="coding" class="boardCell">
      Coding

      <div v-for="(card, idx) in coding" v-bind:key="idx" class="jobCard">
        <Card
          :projectName="card.title + ' ' + card.type"
          :projectState="card.state"
          :icon="card.icon"
          :challenge="card.challenge"
          @click.native="cardClick(idx, 'job', card)"
          :class="{'activeClick': card.activeIndex != null, 'busyState': card.currentTick > 0}"
        >
          <Progress 
            :total="card.baseEffort"
            :current="card.currentTick"
          />
        </Card>
      </div>
    </div>
    <div id="done" class="boardCell">
      Testing

      <div v-for="(card, idx) in testing" v-bind:key="idx" class="jobCard">
        <Card
          :projectName="card.title + ' ' + card.type"
          :projectState="card.state"
          :icon="card.icon"
          :challenge="card.challenge"
          @click.native="cardClick(idx, 'job', card)"
          :class="{'activeClick': card.activeIndex != null, 'busyState': card.currentTick > 0}"
        >
        <Progress 
            :total="card.baseEffort"
            :current="card.currentTick"
          />
        </Card>
      </div>
    </div>
    <div class="eventStream">
      <Progress
        :eventLabel="currentEvent"
        :total="currentTurnLimit"
        :current="currentTurnCount"
      />
    </div>

    <div class="staffSeats">
      <div
        v-for="employeeIndex in staffSeats"
        v-bind:key="employeeIndex"
        class="staffCard"
        :class="{'activeClick': employeeIndex-1 == currentStaffIndex, 'busyState': (staff[employeeIndex - 1] && staff[employeeIndex - 1].working)}"
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
  generateName(challenge:number = 1): any {

    let pName: string = this.projectNameList[Math.floor(Math.random()*this.projectNameList.length)];
    let pType: string = this.projectTypeList[Math.floor(Math.random()*this.projectTypeList.length)];
    let pIcon: Array<string> = this.projectIconList[Math.floor(Math.random()*this.projectIconList.length)];

    this.projectEntityIcon = pIcon;
    this.projectEntity = pName +" "+ pType;
    
    let pObject: any = {
      "title": pName,
      "type": pType,
      "icon": pIcon,
      "state": "todo",
      "activeIndex": null,
      "activeStaff": null,
      "challenge": challenge,
      "currentTick": 0,
      "baseEffort": 0
    };

    return pObject;

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
      ],
      "working": false,
      "baseEffort": 20,
      "baseSpeed": 300
    }
  ]; 

  //jobs, training etc....
  todo: Array<any> = [
    /*
    {
      "title": "Hello World!",
      "type": "Deploy",
      "icon": "globe",
      "state": "todo",
      "activeIndex": null,
      "challenge": 1,
      "staffObject": {
        "baseEffort": 10,
        "currentTick": 0
      } 
    }
    */
  ];

  //break down tasks into parts to work on...
  planning: Array<any> = [

  ];

  //coding tasks...
  coding: Array<any> = [

  ];

  //testing features that were coded...
  testing: Array<any> = [

  ];

  //board manipulation methods...
  cardClick(index: number, type: string, object: any): void{
    //figure out what kind of card this is and parse it appropriately;
    //also set flags to make sure we can perform the job with the person selected...
    //clicked on an employee
    if(type == "staff"){
      //set flag for checking...
      this.staffClicked = true;
      //set data about the selected staff...
      this.currentStaffIndex = index;

      //handling for empty staff slot...
      if(this.staff[this.currentStaffIndex] === undefined){
        //present hiring options vs current funds...
        //should this appear in the 'TODO' column? that might be easiest actually...
        window.console.log("Empty staff seat");
      }else if(this.staff[this.currentStaffIndex].working){
        //this staff member is busy!
        this.staffClicked = false;
      }
    }

    //some data for the items; staff will always come from staff array
    //the other arrays are set by the type...
    if(type == "job"){
      //use the state value to figure out what happens next...
      this.unsetActiveJobs();
      this.jobClicked = true;
      //set data about selected job...
      this.currentJobObject = object;
      this.currentJobObject.activeIndex = index;
    }

    //now that values are set, see if we can complete the action...
    if(this.jobClicked && this.staffClicked){
      //other types of task require a specific set of skills...
      //may refactor this as there is a lot of repeated code here...

      //assign a staff member to this job...
      this.currentJobObject.activeStaff = this.currentStaffIndex;

        //todo can be done by anyone; just moves the card into the planning phase...
        //this happens instantly; no timer needed...
        if(this.currentJobObject.state == "todo"){
          //free to move items from todo; this may include hiring new staff or augmenting staff with training / items...
        
          //update the item state to the next column...
          this.currentJobObject.state = "planning";
          //copy it into the next column...
          this.planning.push(this.currentJobObject);
          //and remove it from the original array...
          //typescript is a little overzelous -- currentJobIndex is set along with jobClicked;
          //might bundle all these into an object for refactor improvement...
          if(this.currentJobObject.activeIndex !== null){
            this.todo.splice(this.currentJobObject.activeIndex, 1);
            //reset the click state...
            this.currentJobObject.activeIndex = null;
          }

          //now we reset so we don't trigger the rest of the calls...
          //reset the tracking...
          this.resetClickState();
        }

        //planning may result in multiple tasks being created; task is broken down and we can
        //re-use the job name with a different 'type'
        //this takes some amount of time based on the staff skill and bonuses...
        this.doTask(this.currentJobObject.state);

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

  doTask(taskType: string): void{
    //some tables to look up which skill goes with which action...
    let skillMap: any = {
      'planning': 'BA',
      'coding': 'Coder',
      'testing': 'Tester'
    };

    //now outline sequence of next states...
    //starts at 'planning'; TODO is already handled...
    let stateSet: any = {
      'planning': 'coding',
      'coding': 'testing',
      'testing': 'done'
    };

    //check if the current staff can perform this task...
    if(this.staff[this.currentJobObject.activeStaff] && this.findSkill(skillMap[taskType], this.staff[this.currentJobObject.activeStaff].skills)){
      //staff has the skills to do this task; add them to the task...
      //copy the staff object into the card task...
      //@TODO convert this to a clone rather than copy by reference?
      
      //these are the indicies where we find the tiles we're working with directly...
      //get the job object reference here...
      let jobInstance = this[taskType][this.currentJobObject.activeIndex];
      let staffInstance = this.staff[this.currentStaffIndex];

      jobInstance.baseEffort = staffInstance.baseEffort;

      let ticks:number = jobInstance.baseEffort;
      jobInstance.currentTick++;

      //set working flag for the staff member associated with the job...
      staffInstance.working = true;

      //capture 'this' to use within the timer...
      let that: any = this;

      let intervalTimer:any = setInterval(function(){
        //run a timer and set the staff to 'disabled' to simulate them working on it...  
        jobInstance.currentTick++;

        //reset once our task is complete...
        if(jobInstance.currentTick > ticks){
          clearInterval(intervalTimer);
          jobInstance.currentTick = 0;

          //set the next column for this task...
          jobInstance.state = stateSet[taskType];
          
          if(stateSet[taskType] != 'done'){
            that[stateSet[taskType]].push(jobInstance);
          }

          staffInstance.working = false;
          that[taskType].splice(jobInstance.activeIndex, 1);
          jobInstance.activeIndex = null;
          jobInstance.activeStaff = null;
          

          ///handle done state here...
          if(stateSet[taskType] == 'done'){
            //@TODO -- need to add failure state where there are more bugs produced as a result...

            //success state
            //now calculate the value this task provided...
            let payment: number = jobInstance.challenge * (Math.floor(Math.random() * 200) + 100);
            that.addFunds(payment);
          }

          //now we reset so we don't trigger the rest of the calls...
          //reset the tracking...
          that.resetClickState();

          //increment a turn...
          that.incrementTurn(1);
        }
      }, this.staff[jobInstance.activeStaff].baseSpeed)

    }else{
      //reset the job click...
      this.resetJob();
    }
    
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

  unsetActiveJobs(): void{
    //unset activeIndex in all objects within todo, planning, coding, testing...
    let columnSet: Array<string> = [
      'todo',
      'planning',
      'coding',
      'testing'
    ];
    for(let set in columnSet){
      let setName: string = columnSet[set]; 
      for(let x in this[setName]){
        this[setName][x].activeIndex = null;
      }
    }
  }

  addJob(col: string): void {
    //this should generate a job object for us to add to the array...
    let newJob = this.generateName();
    this[col].push(newJob);
  }

  init(): void{
    //set some values to start...
    this.currentTurnLimit = 10;
    this.currentEvent = "First Quarter Report";
  }

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

.jobCard {
  cursor: pointer;
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
  cursor: pointer;
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

.activeClick {
  border:1px solid #009900;
  box-shadow: 0px 8px 13px 0px rgba(50, 50, 50, 0.75);
  transition: all 0.5s;
}

.busyState {
  border: 1px solid orange;
  box-shadow: none;
  cursor: progress;
  transition: all 0.1s;
}

</style>
