export interface Summary {
    name: string;
    current_day: number;
    yesterday: number;
    this_day: number;
    subs?: Summary[];
    chart?: [];
}

export interface ChartData {
    dates: string[];
    values: number[];
}

export type MockData = Summary[];

export interface TableHeader {
    name: string;
    label: string;
}
