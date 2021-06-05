class IdGenerator {
    offset = -1
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    randomId() {
        this.offset += 1
        return this.characters.charAt(this.offset)
    }
}

const generator = new IdGenerator()
export default generator