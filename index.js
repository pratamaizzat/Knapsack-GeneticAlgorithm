const {plot, Plot} = require('nodeplotlib');
const NumJS = require('./NumJS');
const dna = require('./Stuff')
const GA = require('./GA');

const spp = 100;
const popSize = [spp, dna.length];

const thresh = 10000;
const mutationRate = 0.4;
const crossRate = 0.8;
const numGen = 500;
let totalWorth = 0;
let totalWeight = 0;

let item = NumJS.fromArray(dna);

const result = new GA(item, thresh, mutationRate, crossRate, popSize, numGen);
const {parameter, history} = result.optimize();

const selectedItem = parameter.flat();

const pickedItem = dna.filter((v, i) => {
  if(selectedItem[i] === 1) return v;
});

for(const el of pickedItem){
  totalWorth += el.worth;
  totalWeight += el.berat;
}

pickedItem.forEach(x => {
  x.print();
});

console.log(`Total Worth: ${totalWorth}`);
console.log(`Total Weight: ${totalWeight}`);

const meanHist = history.map(x => {
  return x.reduce((acc, curr) => acc + curr);
});

const maxHist = history.map(x => {
  return Math.max(...x);
})

///
///
///
///Plotting Section
const range = (min, max) => {
  let result = [];
  for(let i = min; i < max; i++){
    result.push(i)
  }

  return result;
}


const trace1 = [{x: [...range(0, meanHist.length)], y: [...meanHist], type: 'line'}];
const trace2 = [{x: [...range(0, maxHist.length)], y: [...maxHist], type: 'scatter'}];

plot(trace1);
plot(trace2);