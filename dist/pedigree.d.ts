declare class PedigreeBuilder {
    protected pedigree: HTMLElement;
    protected init(): void;
    protected setTypeStyle(type: string): void;
    protected setSexStyle(sex: string): void;
    private setIndividualType;
    private setAffectedType;
    private setMultipleType;
    private setDeceasedType;
    private setPregnacyType;
    private setMiscarriageType;
    private setProviderType;
    private setMaleSex;
    private setFemaleSex;
    private setUnknownSex;
}
export declare class Pedigree extends PedigreeBuilder {
    create(type: string, sex: string): void;
    setType(type: string): void;
    setSex(sex: string): void;
}
export {};
