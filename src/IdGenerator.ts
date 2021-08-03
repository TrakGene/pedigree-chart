class IdGenerator {
  private availableId = 0

  public getId() {
      this.availableId += 1
      return this.availableId
  }
}

const generator = new IdGenerator()
export default generator