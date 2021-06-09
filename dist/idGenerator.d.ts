declare class IdGenerator {
    offset: number;
    characters: string;
    randomId(): string;
}
declare const generator: IdGenerator;
export default generator;
