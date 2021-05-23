class idGenerator {
    offset = 0
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    randomId() {
        this.offset += 1
        return this.characters.charAt(this.offset)
    }
}

const generator = new idGenerator()
export default generator