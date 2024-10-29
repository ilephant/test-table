export default function formatNumber(value: number) {
    const numberFormatter = new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        useGrouping: true,
    });

    return numberFormatter.format(value);
}
