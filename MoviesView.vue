<template>
  <div class="calendar">
    <div class="navigation">
      <h1>Calendar</h1>
      <div class="month-navigation">
        <button @click="prevMonth">←</button>
        <h2 class="subtitle">{{ currentMonth }} {{ currentYear }}</h2>
        <button @click="nextMonth">→</button>
      </div>
    </div>
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
              <ul v-if="day !== '' && tasks[`${formattedCurrentDate}-${String(day).padStart(2, '0')}`] && tasks[`${formattedCurrentDate}-${String(day).padStart(2, '0')}`].length > 0" class="task-list">
                <li v-for="(task, index) in tasks[`${formattedCurrentDate}-${String(day).padStart(2, '0')}`]" :key="index" class="task-item">
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
  data() {
    return {
      currentDate: new Date(),
      daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      tasks: {},
      selectedDay: null,
      newTask: '',
      calendar: [],
    };
  },
  mounted() {
    this.generateCalendar(this.currentYear, this.currentDate.getMonth());

    // Retrieve tasks from localStorage on mount
    if (localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  },
  computed: {
    currentMonth() {
      return this.currentDate.toLocaleString('default', { month: 'long' });
    },
    currentYear() {
      return this.currentDate.getFullYear();
    },
    startingDay() {
      const startOfMonth = new Date(this.currentYear, this.currentDate.getMonth(), 1);
      return startOfMonth.getDay();
    },
    formattedCurrentDate() {
      return `${this.currentYear}-${String(this.currentDate.getMonth() + 1).padStart(2, '0')}`;
    }
  },
  methods: {
    prevMonth() {
  this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
  this.generateCalendar(this.currentYear, this.currentDate.getMonth());
},
nextMonth() {
  this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));
  this.generateCalendar(this.currentYear, this.currentDate.getMonth());
},
    generateCalendar(year, month) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const calendar = [];
      let dayCounter = 1;
      for (let week = 0; week < 6; week++) {
        const weekDays = [];
        for (let day = 0; day < 7; day++) {
          if ((week === 0 && day < this.startingDay) || dayCounter > daysInMonth) {
            weekDays.push(''); // Add empty strings for days outside of the current month
          } else {
            weekDays.push(dayCounter);
            dayCounter++;
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
      this.selectedDay = day;
      // When a day is selected, compute the full date string and store it
      this.selectedFullDate = `${this.formattedCurrentDate}-${String(day).padStart(2, '0')}`;
    },

    addTask() {
      if (!this.tasks[this.selectedFullDate]) {
        this.tasks[this.selectedFullDate] = [];
      }
      if (this.newTask.trim() !== '') {
        this.tasks[this.selectedFullDate].push(this.newTask);
        this.newTask = '';
      }

      // Save tasks to localStorage after adding a task
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    removeTask(day, index) {
      const dayString = `${this.formattedCurrentDate}-${String(day).padStart(2, '0')}`;
      if (this.tasks[dayString] && this.tasks[dayString].length > index) {
        this.tasks[dayString].splice(index, 1);
      }

      // Save tasks to localStorage after removing a task
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
  },
};
</script>


<style>
.navigation {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
h1 {
  margin: 0;
  font-size: 2rem;
  color: rgb(28, 187, 240);
}
.subtitle {
  margin: 10px 0;
  font-size: 1.5rem;
}
button {
  background-color: rgb(28, 187, 240);
  color: #ffffff;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: rgb(14, 143, 192);
}
  .calendar {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  .title {
    color: rgb(28, 187, 240);
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
    background-color: rgb(28, 187, 240);
    color: #ffffff; /* Changed text color to white for better visibility */
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
    background-color: rgba(28, 187, 240, 0.1); /* Lightened blue tone for hover effect */
  }
  .day-number {
    font-size: 1.2rem;
    color: rgb(28, 187, 240); /* Same blue tone for the day numbers */
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
    border: 1px solid rgb(28, 187, 240); /* Blue border for the input field */
  }
  .task-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  .task-list li button {
    background-color: rgb(28, 187, 240);
    color: #ffffff;
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease; /* Added transition for smooth color change */
  }
  .task-list li button:hover {
    background-color: rgb(14, 143, 192); /* Darkened blue tone for hover effect */
  }
  .task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    padding: 5px;
    border: 1px solid #ccc;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
.month-navigation {
  display: flex;
  align-items: center;
  gap: 10px; /* Separation between elements */
}
.subtitle {
  margin: 0;
}
.navigation {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
h1 {
  margin-bottom: 10px; /* Give a space between the title and the navigation */
}
</style>
