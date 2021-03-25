export interface Field {
    name: string,
    type: string,
    labelText: string,
    options?: {
        value: number;
        name: string;
    }[]
};

export interface BMIValues {
    name: string;
    gender: number;
    height: number;
    weight: number;
}