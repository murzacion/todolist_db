import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);
import Header from "@/components/Header.vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";

const localVue = createLocalVue();

describe("Header.vue", () => {
  let vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
  });
  test("snapshot", () => {
    const $store = {
      state: {
        tasks: [],
        NumberTasks: 0
      },
      getters: {
        numberOfTasks: 0,
        Tasks: [],
        selectedTask: []
      }
    };
    const wrapper = shallowMount(Header, {
      localVue,
      vuetify,
      mocks: {
        $store
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
