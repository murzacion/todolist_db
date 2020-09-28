import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import axios from "axios";
export default new Vuex.Store({
  state: {
    tasks: [],
    NumberTasks: 0
  },
  getters: {
    Tasks: state => {
      return state.tasks;
    },
    numberOfTasks: state => {
      return state.NumberTasks;
    },
    selectedTask: state => {
      return state.tasks.filter(t => t.done);
    },
    unselectedTask: state => {
      return state.tasks.filter(t => !t.done);
    }
  },
  mutations: {
    getTasks(state, value) {
      state.tasks = value;
      state.NumberTasks = value.length;
    },
    addTask(state, value) {
      state.tasks.push(value);
      state.NumberTasks++;
    },
    selectTask(state, value) {
      state.tasks[state.tasks.indexOf(value)].done =
        value.done === false ? true : false;
    },
    deleteTask(state, value) {
      state.tasks.splice(state.tasks.indexOf(value), 1);
      state.NumberTasks--;
    },
    selectAllTasks(state) {
      state.tasks.forEach(e => (e.done = true));
    },
    unselectAllTasks(state) {
      state.tasks.forEach(e => (e.done = false));
    },
    deleteAllTasks(state) {
      state.tasks = state.tasks.filter(t => !t.done);
      state.NumberTasks = state.tasks.length;
    },
    saveTask(state, value) {
      state.tasks[state.tasks.indexOf(value)] = value;
    }
  },
  actions: {
    GET_TASKS({ commit }) {
      axios.get("/api/tasks").then(
        result => {
          console.log(result.data);
          commit("getTasks", result.data);
        },
        error => {
          console.log(error);
        }
      );
    },
    ADD_TASK({ commit, dispatch }, { text, datein, done }) {
      axios
        .post(`/api/task`, {
          text: text,
          datein: datein,
          done: done
        })
        .then(res => {
          console.log(res);
          commit("addTask", { text, datein, done });
          dispatch("GET_TASKS");
        })
        .catch(err => {
          console.log(err);
        });
    },
    SELECT_TASK({ commit }, value) {
      axios
        .put(`/api/task/${value.id}`, {
          text: value.text,
          datein: value.datein,
          done: value.done === false ? true : false
        })
        .then(res => {
          console.log(res);
          commit("selectTask", value);
        })
        .catch(err => {
          console.log(err);
        });
    },
    DELETE_TASK({ commit }, value) {
      axios
        .delete(`/api/task/${value.id}`)
        .then(res => {
          console.log(res);
          commit("deleteTask", value);
        })
        .catch(err => {
          console.log(err);
        });
    },
    SELECT_ALL_TASKS({ commit }) {
      axios
        .put(`/api/tasks`, {
          done: true
        })
        .then(res => {
          commit("selectAllTasks");
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    UNSELECT_ALL_TASKS({ commit }) {
      axios
        .put(`/api/tasks`, {
          done: false
        })
        .then(res => {
          commit("unselectAllTasks");
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    DELETE_ALL_TASKS({ commit }) {
      axios
        .delete(`/api/tasks`)
        .then(res => {
          commit("deleteAllTasks");
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    SAVE_TASK({ commit }, value) {
      axios
        .put(`/api/task/${value.id}`, {
          text: value.text,
          datein: value.datein,
          done: value.done
        })
        .then(res => {
          commit("saveTask", value);
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  modules: {}
});
