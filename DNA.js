class DNA{
  constructor(nama, berat, worth, quantity){
    this.nama = nama;
    this.berat = berat;
    this.worth = worth;
    this.quantity = quantity;
  }

  id(){
    return `${this.quantity} ${this.nama} (${this.berat}, ${this.worth})`
  }

  print(){
    console.log(`${this.quantity} ${this.nama} (${this.berat}, ${this.worth})`)
  }
}

module.exports = DNA