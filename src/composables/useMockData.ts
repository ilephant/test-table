import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import type { MockData, TableHeader } from '@/types/mockData';

export function useMockData(): {
    mockData: Ref<MockData | null>;
    loadError: Ref<string | null>;
    loading: Ref<boolean>;
    headers: TableHeader[];
} {
    const mockData = ref<MockData | null>(null);
    const loadError = ref<string | null>(null);
    const loading = ref<boolean>(false);

    const headers: TableHeader[] = [
        { name: 'Показатель', label: 'name' },
        { name: 'Текущий день', label: 'current_day' },
        { name: 'Вчера', label: 'yesterday' },
        { name: 'Этот день недели', label: 'this_day' },
    ];

    onMounted(async () => {
        loading.value = true;

        try {
            const data = await import('@/assets/mockData.json');

            mockData.value = data.default as MockData;
            loading.value = false;
        } catch (error) {
            loadError.value = 'Ошибка при загрузке данных';
            console.error(error);
        }
    });

    return { mockData, loadError, loading, headers };
}
