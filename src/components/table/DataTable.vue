<template>
    <div class="data-table">
        <table v-if="isShowTable" class="data-table__table">
            <TableHeadRow :headers="props.headers" />

            <TableBodyRow :data="props.data" :headers="props.headers">
                <template
                    v-for="(_, name) in $slots"
                    v-slot:[name]="{ row: item }"
                >
                    <slot name="space" />
                    <slot :name="name" :row="item" />
                </template>
            </TableBodyRow>
        </table>

        <div v-if="props.loading" class="data-table__loading">Loading...</div>

        <div v-if="props.error" class="data-table__error">
            {{ props.error }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed, type ComputedRef } from 'vue';

import TableHeadRow from './table-partials/TableHeadRow.vue';
import TableBodyRow from './table-partials/TableBodyRow.vue';

import type { MockData, TableHeader } from '@/types/mockData';

const props = defineProps<{
    loading: boolean;
    data: MockData | null;
    headers: TableHeader[];
    error: string | null;
}>();

const isShowTable: ComputedRef<boolean> = computed(
    () => !props.error && !props.loading,
);
</script>

<style lang="scss">
.data-table {
    &__table {
        border-collapse: separate;
        border-spacing: 6px;
    }

    &__table th,
    &__table td {
        background-color: #f0f0f0;
        min-width: 150px;
        padding: 6px 8px;
    }

    &__table .current_day {
        background-color: #cdf8fc;
    }
}
</style>
