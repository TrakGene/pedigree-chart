export interface StyleConfig {
    type: string;
    sex: string;
    size?: number;
    border?: number;
    mode?: "node" | "icon";
    drag?: boolean;
    x?: number;
    y?: number;
    topColor?: string;
    bottomColor?: string;
}