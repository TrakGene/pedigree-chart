class idGenerator {
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    randomId() {
        return this.characters.charAt(2)
    }
}

const generator = new idGenerator()
export default generator