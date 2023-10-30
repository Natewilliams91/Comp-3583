<template>
  <div class="calendar container">
    <h1 class="title">October 2023 Calendar</h1>

    <table class="table table-bordered table-dark">
      <thead>
        <tr>
          <th class="day-header">Sunday</th>
          <th class="day-header">Monday</th>
          <th class="day-header">Tuesday</th>
          <th class="day-header">Wednesday</th>
          <th class="day-header">Thursday</th>
          <th class="day-header">Friday</th>
          <th class="day-header">Saturday</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in calendar" :key="week">
          <td v-for="day in week" :key="day" class="calendar-day" @mouseover="onMouseOver(day)" @mouseout="onMouseOut" @click="selectDay(day)">
            {{ day }}
            <!-- Conditionally render input and button only if day is not empty -->
            <input v-model="tasks[day]" placeholder="Add a task" v-if="day !== '' && selectedDay === day" />
            <button @click="addTask(day)" v-if="day !== '' && selectedDay === day">Add Task</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
  .calendar {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .title {
    color: #333;
    font-size: 2.5rem;
    margin-top: 0;
    margin-bottom: 30px;
  }

  .day-header {
    background-color: #333;
    color: #fff;
    text-align: center;
  }

  .calendar-day {
    width: 80px; /* Adjust the width for larger squares */
    height: 80px; /* Adjust the height for larger squares */
    padding: 10px;
    text-align: center;
    border: 1px solid #ccc;
    cursor: pointer;
    position: relative;
  }

  .calendar-day:hover {
    background-color: #f0f0f0; /* Hover background color */
  }

  input, button {
    display: block;
    margin: 10px auto;
  }
</style>



<script>
export default {
  name: "CalendarView",
  data() {
    return {
      calendar: [],
      tasks: {} // To store tasks for each day
    };
  },
  mounted() {
    this.generateCalendar(2023, 10); // Generate the October 2023 calendar
  },
  methods: {
    generateCalendar(year, month) {
      const daysInMonth = new Date(year, month, 0).getDate();
      const calendar = [];
      let dayCounter = 1;

      for (let week = 0; week < 6; week++) {
        const weekDays = [];

        for (let day = 0; day < 7; day++) {
          if (dayCounter <= daysInMonth) {
            weekDays.push(dayCounter);
            dayCounter++;
          } else {
            weekDays.push('');
          }
        }

        calendar.push(weekDays);
      }

      this.calendar = calendar;
    },
    onMouseOver() {
      // You can add logic for hover events if needed
    },
    onMouseOut() {
      // You can add logic for hover events if needed
    },
    selectDay() {
      // Handle day selection if needed
    }
  }
};
</script>
