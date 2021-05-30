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

export let initialConfig: StyleConfig = {
    type: "individual", 
    sex: "male",
    size: 100,
    border: 5,
    mode: "icon",
    drag: false,
    x: 0,
    y: 0,
    topColor: "white",
    bottomColor: "white"
}