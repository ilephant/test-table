<template>
    <tbody>
        <template v-for="(row, i) in props.data" :key="i">
            <tr class="table-body__item" @click="toggleRow(i)">
                <template v-for="(properties, j) in headers" :key="j">
                    <td
                        :class="{
                            current_day: properties.label === 'current_day',
                        }"
                    >
                        <slot :name="`${properties.label}`" :row="row">
                            {{ row }}
                        </slot>
                    </td>
                </template>
            </tr>
            <template v-if="toggledRows[i]">
                <tr v-if="row.chart">
                    <td colspan="4" style="background-color: white">
                        <Chart
                            :size="{ width: 756, height: 400 }"
                            :data="row.chart"
                        >
                            <template #layers>
                                <Grid strokeDasharray="2,2" />
                                <Line :dataKeys="['name', 'pl']" />
                            </template>
                        </Chart>
                    </td>
                </tr>

                <tr v-for="(sub, s) in row.subs" :key="s">
                    <template v-for="(properties, j) in headers" :key="j">
                        <td
                            :class="{
                                current_day: properties.label === 'current_day',
                            }"
                            class="table-body__sub"
                        >
                            <slot :name="`${properties.label}`" :row="sub">
                                {{ sub }}
                            </slot>
                        </td>
                    </template>
                </tr>
            </template>
        </template>
    </tbody>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import type { MockData, TableHeader } from '@/types/mockData';
import { Chart, Grid, Line } from 'vue3-charts';

const props = defineProps<{
    data: MockData | null;
    headers: TableHeader[];
}>();

const toggledRows = ref<Record<number, boolean>>({});

function toggleRow(index: number) {
    toggledRows.value[index] = !toggledRows.value[index];
}
</script>

<style lang="scss">
.table-body__item {
    cursor: pointer;
    transition: all ease 0.1s;

    &:hover {
        transform: scale(1.05);
    }
}
.table-body__sub {
    opacity: 0.8;

    &:first-child {
        padding-left: 30px;
    }
}
</style>
