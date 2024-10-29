<template>
    <thead class="table-head-row">
        <tr>
            <template v-for="(column, i) in props.headers" :key="i">
                <th :class="{ current_day: column.label === 'current_day' }">
                    {{ column.name }}
                </th>
            </template>
        </tr>
    </thead>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { TableHeader } from '@/types/mockData';

const props = defineProps<{
    headers: TableHeader[];
}>();
</script>
