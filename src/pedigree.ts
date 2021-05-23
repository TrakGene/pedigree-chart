import generator from "./idGenerator"

class PedigreeBuilder {
    protected pedigree: HTMLElement;
    protected size = 80;
    protected border = 3;

    init(type: string, sex: string) {
        const pedigreeContainer = document.createElement('div')
        pedigreeContainer.style.width = `${this.size}px`
        pedigreeContainer.style.height = `${this.size}px`

        const pedigree = document.createElement('div')
        pedigree.classList.add('pedigree')
        pedigree.style.width = "100%"
        pedigree.style.height = "100%"
        pedigree.style.boxSizing = "border-box"

        const upperPart = document.createElement('div')
        upperPart.style.height = `calc(50% - ${this.border}px)`
        upperPart.style.backgroundColor = "red"
        upperPart.style.borderTop = `${this.border}px solid black`
        upperPart.style.borderLeft = `${this.border}px solid black`
        upperPart.style.borderRight = `${this.border}px solid black`        

        const bottomPart = document.createElement('div')
        bottomPart.style.height = `calc(50% - ${this.border}px)`
        bottomPart.style.backgroundColor = "blue"
        bottomPart.style.borderBottom = `${this.border}px solid black`
        bottomPart.style.borderLeft = `${this.border}px solid black`
        bottomPart.style.borderRight = `${this.border}px solid black`

        pedigree.appendChild(upperPart)
        pedigree.appendChild(bottomPart)
        // pedigree.style.overflow = "hidden"

        // pedigree.style.width = `${this.size}px`
        // pedigree.style.height = `${this.size}px`
        // pedigreeContainer.style.width = `${this.size}px`
        // pedigreeContainer.style.height = `${this.size}px`
        // pedigreeContainer.style.display = "flex"
        // pedigreeContainer.style.justifyContent = "center"
        // pedigreeContainer.style.alignItems = "center"
        // pedigree.style.border = "4px solid black"
        // pedigree.style.boxSizing = "border-box"
        // pedigree.style.cursor = "pointer"
        // pedigree.style.transformOrigin = "center"

        pedigreeContainer.appendChild(pedigree)
        this.pedigree = pedigreeContainer
        this.setTypeStyle(type)
        this.setSexStyle(sex)
        return this.pedigree
    }

    protected setTypeStyle(type: string) {
        switch (type) {
            case 'individual': this.setIndividualType(); break;
            case 'affectedIndividual': this.setAffectedType(); break;
            case 'multipleIndividual': this.setMultipleType(); break;
            case 'deceased': this.setDeceasedType(); break;
            case 'pregnacy': this.setPregnacyType(); break;
            case 'miscarriage': this.setMiscarriageType(); break;
            case 'provider': this.setProviderType(); break;
        }
    }
    protected setSexStyle(sex: string) {
        switch (sex) {
            case 'male': this.setMaleSex(); break;
            case 'female': this.setFemaleSex(); break;
            case 'unknown': this.setUnknownSex(); break;
        }
    }
    private setIndividualType() {
        console.log("Individual")
    }

    private setAffectedType() {
        console.log("Affected")
    }

    private setMultipleType() {
        console.log("MultipleType")
    }

    private setDeceasedType() {
        console.log("Deceased")
    }

    private setPregnacyType() {
        console.log("Pregnacy")
    }

    private setMiscarriageType() {
        console.log("Miscarriage")
    }

    private setProviderType() {
        console.log("Provider")
    }

    private setMaleSex() {
        this.pedigree.style.borderRadius = "0"
    }
    private setFemaleSex() {
        this.pedigree.childNodes.forEach((node: any)=>{
            if(node.className = "pedigree") {
                node.style.borderRadius = "100%" 
            }
        })
    }
    private setUnknownSex() {
        this.pedigree.childNodes.forEach((node: any)=>{
            if(node.className = "pedigree") {
                // node.style.borderRadius = "0"
                // let x = this.size
                // x = x/(Math.sqrt(2))
                // node.style.width = `${x-3}px`
                // node.style.height = `${x-3}px`
                // node.style.transform = "rotate(45deg)"
                // node.display = "flex"
                // node.style.justifyContent = "center"
                // node.style.alignItems = "center"
                node.childNodes.forEach(child => {
                    // child.style.transform = "rotate(-45deg)"
                    // child.style.width =  `${this.size-3}px`
                    // child.style.height = `${(this.size/2)-3}px`
                    // console.log(child)
                });
            }
        })

    }
}

const builder = new PedigreeBuilder()

export class Pedigree {
    pedigree: HTMLElement
    id = generator.randomId()
    constructor(type: string, sex: string) {
        this.pedigree = builder.init(type, sex) 
        this.pedigree.id = this.id
    }
    
    insert(id) {
        const w = document.querySelector(id)
        w.appendChild(this.pedigree)
    }
    // setSize(size: number) {
    //     this.size = size
    //     this.pedigree.style.width = `${size}`
    //     this.pedigree.style.height = `${size}`
    // }
    style(style: Object) {
        Object.keys(style).forEach((styleParam)=>{
            this.pedigree[styleParam] = style[styleParam]
        })
    }
}