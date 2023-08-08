<script setup>
import { ref } from 'vue'
import moment from 'moment'
import { LunarDate } from 'vietnamese-lunar-calendar';
import { usePiniaStore } from '@/stores/session';

const store = usePiniaStore()
console.log(store.session)

let chosenMonth = ref('')
let dayVar = ref('')
let startTerm = ref('')
const months = moment.monthsShort()
const week = moment.weekdaysShort()

// Ex1: lunar calendar info
const days = 31
let lunarDayInput = ref('')
let lunarMonthInput = ref('')
let lunarYearInput = ref('')
// only used to display lunar values
let lunarYear = ref('')
let lunarMonth = ref('')
let lunarDay = ref('')

function onChange(givenMonth) {
  console.log(givenMonth)
  dayVar.value = moment(moment().month(givenMonth).format("M")).daysInMonth()
  const startDay = moment("2023-" + moment().month(givenMonth).format("M") + "-01"); // Thursday Feb 2015
  startTerm.value = startDay.day()
  console.log(startTerm)
  console.log(dayVar)
}

function lunarCalulator(day, newMonth, newYear) {
  let monthNum = moment().month(newMonth).format("M")
  let tempDateObject = new LunarDate(+newYear, +monthNum, +day)
  lunarYear.value = tempDateObject.year
  lunarMonth.value = tempDateObject.month
  lunarDay.value = tempDateObject.date
}

</script>

<template>
  <h3 class="login2" v-show=!(store.session)>
    PLEASE LOGIN
  </h3>
  <div v-show=store.session>
  <div class="page">
    <h1>Calendar</h1>
  </div>
  <!-- Dropdown box with all the months for user to pick from -->
  <div>Select Month: {{ chosenMonth }}</div>
  <select v-model="chosenMonth" @change="onChange(chosenMonth)">
    <option v-for="month in months" v-bind:key="month">
      {{ month }}
    </option>
  </select>
  <div>This month has {{ dayVar }} days</div>
  <!-- calendar showing the name of days in the week -->
  <div class="grid-container">
    <li v-for="term in week" :key="term.id">
      <div class="grid-item">{{ term }}</div>
    </li>
  </div>
  <!-- outputs the table showng the number of days in a month -->
  <div class="grid-container">
    <li1 v-for="box in startTerm" :key="box.id">
      <div>{{ null }}</div>
    </li1>
    <li1 v-for="day in dayVar" :key="day.id">
      <div class="grid-item">{{ day }}</div>
    </li1>
  </div>
  <hr class="thick-red">
  <!-- Ex1 lunar date calculator -->
  <h2>Lunar Date Calculator</h2>
  <div>Input Year: {{ lunarYearInput }}
    <select v-model="lunarYearInput">
      <option v-for="startYear in 201" v-bind:key="startYear">
        {{ startYear + 1899 }}
      </option>
    </select>
  </div>
  <div>Input Month: {{ lunarMonthInput }}
    <select v-model="lunarMonthInput">
      <option v-for="lunarMonths in months" v-bind:key="lunarMonths">
        {{ lunarMonths }}
      </option>
    </select>
  </div>
  <div>Input Day: {{ lunarDayInput }}
    <select v-model="lunarDayInput">
      <option v-for="lunarDays in days" v-bind:key="lunarDays">
        {{ lunarDays }}
      </option>
    </select>
  </div>
  <button @click="lunarCalulator(lunarDayInput, lunarMonthInput, lunarYearInput)">quack</button>
  <p>Lunar Day is: {{ lunarYear }} / {{ lunarMonth }} / {{ lunarDay }}</p>
  </div>
</template>

<style>
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  background-color: indigo;
  padding: 10px;
  list-style-type: none;
  box-sizing: border-box;
  overflow: hidden;
  font-family: 'IBM Plex Sans', sans-serif;
}

.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 10px;
  font-size: 20px;
  text-align: center;
}

hr.thick-red {
  border: 1px solid red;
}

.login2 {
  text-align:center;
  color: purple;
  font-weight: bold;
  font-size: 100px;
}
</style>