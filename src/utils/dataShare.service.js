/* JavaScript singleton pattern */
class DataShare {

  constructor() {
      this.data = {};
  }

  setData(data) {
      this.data = data;
      console.log(data);
  }

  getData() {
      return this.data;
  }

}
export default new DataShare(); //new keyword does the trick