<template>
  <div class="calendar">
    <h1 class="title">October 2023 Calendar</h1>
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th class="day-header">Sun</th>
            <th class="day-header">Mon</th>
            <th class="day-header">Tue</th>
            <th class="day-header">Wed</th>
            <th class="day-header">Thu</th>
            <th class="day-header">Fri</th>
            <th class="day-header">Sat</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in calendar" :key="week">
            <td v-for="day in week" :key="day" class="calendar-day" @click="selectDay(day)">
              <div class="day-number">{{ day }}</div>
              <div v-if="day !== '' && selectedDay === day" class="task-input-container">
                <input v-model="newTask" class="task-input" placeholder="Add a task" />
                <button @click="addTask(day)">Add Task</button>
              </div>
              <ul v-if="day !== '' && tasks[day] && tasks[day].length > 0" class="task-list">
                <li v-for="(task, index) in tasks[day]" :key="index" class="task-item">
                  {{ task }}
                  <button @click="removeTask(day, index)">Remove</button>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarView",
  data() {
    return {
      calendar: [],
      tasks: {}, // To store tasks for each day as an object of arrays
      selectedDay: null, // To store the selected day for adding tasks
      newTask: '', // To store the new task input
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
    selectDay(day) {
      this.selectedDay = day; // Set the selected day when a calendar date is clicked
    },
    addTask(day) {
      if (!this.tasks[day]) {
        this.tasks[day] = []; // Initialize an array for the day if it doesn't exist
      }
      if (this.newTask.trim() !== '') {
        this.tasks[day].push(this.newTask); // Add the new task to the selected day
        this.newTask = ''; // Clear the input field
      }  
    },
    removeTask(day, index) {
      if (this.tasks[day] && this.tasks[day].length > index) {
        this.tasks[day].splice(index, 1); // Remove the task at the specified index
      }
    },
  }
};
</script>

<style>
  .calendar {
    background-color: #ffffff;
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

  .table-container {
    display: flex;
    justify-content: center;
  }

  .table {
    width: 80%;
    border-collapse: collapse;
  }

  .day-header {
    background-color: #333;
    color: #170101;
    text-align: center;
    padding: 10px;
  }

  .calendar-day {
    width: 80px;
    height: 80px;
    padding: 10px;
    text-align: center;
    border: 1px solid #ccc;
    cursor: pointer;
    position: relative;
  }

  .calendar-day:hover {
    background-color: #f0f0f0;
  }

  .day-number {
    font-size: 1.2rem;
  }

  .task-input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }

  .task-input {
    width: 120px;
    padding: 5px;
  }

  .task-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .task-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    padding: 5px;
    border: 1px solid #ccc;
  }

  .task-list li button {
    background-color: #f5f5f5;
    border: none;
    cursor: pointer;
  }
  .task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    padding: 5px;
    border: 1px solid #ccc;
    white-space: nowrap; /* Prevent text from wrapping */
    overflow: hidden; /* Hide overflowing text */
    text-overflow: ellipsis; /* Add an ellipsis when text overflows */
  }
</style>