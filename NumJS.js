class NumJS{
  constructor(x, y){
    this.shape = [x, y];
    this.data = [];

    for(let i = 0; i < this.shape[0]; i++){
      this.data[i] = [];
      for(let j = 0; j < this.shape[1]; j++){
        this.data[i][j] = 0;
      }
    }
  }

  static fromArray(arr){
    let numjs = new NumJS(1, arr.length);
    for(let i = 0; i < arr.length; i++){
      numjs.data[0][i] = arr[i];
    }

    return numjs;
  }

  static random(max, x, y){
    let numjs = new NumJS(x, y);
    for(let i = 0; i < numjs.shape[0]; i++){
      for(let j = 0; j < numjs.shape[1]; j++){
        numjs.data[i][j] = Math.floor(Math.random() * Math.floor(max));
      }
    }

    return numjs;
  }

  static randomBetween(x, y){
    let numjs = new NumJS(x, y);
    for(let i = 0; i < numjs.shape[0]; i++){
      for(let j = 0; j < numjs.shape[1]; j++){
        numjs.data[i][j] = Math.random();
      }
    }

    return numjs;
  }

  static sum(arr1, arr2){
    let result = 0;
    for(let i = 0; i < arr1.length; i++){
      result += arr1[i] * arr2[i];
    }

    return result;
  }

  copy(numjs){
    for(let i = 0; i < this.shape[0]; i++){
      for(let j = 0; j < this.shape[1]; j++){
        this.data[i][j] = numjs.data[i][j];
      }
    }
  }
}

module.exports = NumJS;