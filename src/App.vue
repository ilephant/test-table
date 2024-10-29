<script setup lang="ts">
import DataTable from './components/table/DataTable.vue';
import { useMockData } from '@/composables/useMockData';
import formatNumber from '@/utils/formatNumber';
import calculatePercentage from '@/utils/calculatePercentage';

const { mockData, loading, headers, loadError } = useMockData();
</script>

<template>
    <main>
        <DataTable
            :loading="loading"
            :data="mockData"
            :headers="headers"
            :error="loadError"
        >
            <template v-slot:name="{ row: item }">
                {{ item.name }}
            </template>
            <template v-slot:current_day="{ row: item }">
                {{ formatNumber(item.current_day) }}
            </template>
            <template v-slot:yesterday="{ row: item }">
                {{ formatNumber(item.yesterday) }}

                <span
                    :class="{
                        negative:
                            calculatePercentage(
                                item.yesterday,
                                item.current_day,
                            ) < 0,
                        positive:
                            calculatePercentage(
                                item.yesterday,
                                item.current_day,
                            ) >= 0,
                    }"
                >
                    {{ calculatePercentage(item.yesterday, item.current_day) }}
                    %
                </span>
            </template>
            <template v-slot:this_day="{ row: item }">
                {{ formatNumber(item.this_day) }}
            </template>
        </DataTable>
    </main>
</template>

<style>
header {
    line-height: 1.5;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>
