<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <DatePicker></DatePicker>
    <Table :items="results"></Table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Table from '@/components/Table.vue';
import DatePicker from '@/components/DatePicker.vue'
import axios from 'axios';

export default Vue.extend({
  name: 'Home',
  components: {
    Table,
    DatePicker,
  },

  data() {
    return {
      date: "2019-12-04",
      results: []
    };
  },

  mounted() {
    this.getData();
  },

  watch: {
    date(value) {
      this.getData();
    }
  },

  methods: {
    getData() {
      axios.get("http://localhost:9000/api/" + this.date,
              {}
              ).then((response: { data: any; }) => {
          this.results = response.data;
        })
        .catch((error: any) => alert(error));
    },
  }
});
</script>
