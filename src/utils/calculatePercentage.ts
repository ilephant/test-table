export default function calculatePercentage(
    oldValue: number,
    newValue: number,
): number {
    if (oldValue === 0) {
        return 0;
    }
    const difference = newValue - oldValue;
    const percentageDifference = (difference / oldValue) * 100;

    return Math.round(percentageDifference);
}
