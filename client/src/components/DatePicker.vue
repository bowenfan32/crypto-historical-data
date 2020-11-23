<template>
    <div>
        <div class="mb-4">
            <h2 v-if="value !== ''">
                Displaying historical data for {{ value }}
            </h2>
            <h2 v-else>
                Displaying historical data for 2019-12-04
            </h2>
        </div>

        <label>Choose another date below</label>
        <b-container>
            <b-form-datepicker
                    dropright
                    v-model="value"
                    class="w-50 m-auto"
            ></b-form-datepicker>
        </b-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: ''
            }
        },

        watch: {
            value(value) {
                this.$parent.date = value;
            }
        }
    }
</script>