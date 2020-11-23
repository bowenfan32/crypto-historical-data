<template>
    <div class="p-4">
        <b-table
            striped
            hover
            :items="items"
            :fields="fields"
            :sort-desc.sync="sortDesc"
            :sort-by.sync="sortBy"
        ></b-table>
    </div>
</template>

<script>

    export default {
        props: {
            items: {
                type: Object,
                required: true,
            },
        },

        data() {
            return {
                sortBy: 'market_cap',
                sortDesc: true,
                fields: [
                    {
                        key: 'currency',
                        sortable: true,
                    },
                    {
                        key: 'percent_change_24h',
                        sortable: true,
                    },
                    {
                        key: 'percent_change_7d',
                        sortable: true,
                    },
                    {
                        key: 'percent_change_1m',
                        sortable: true,
                    },
                    {
                        key: 'volume',
                        sortable: true,
                    },
                    {
                        key: 'market_cap',
                        sortable: true,
                    },

                ]
            }
        }
    }
</script>