const NumJS = require('./NumJS');

const randint = (start, end) => {
  start = Math.ceil(start);
  end = Math.floor(end);
  return Math.floor(Math.random() * (start - end) + end);
}

class Population{
  constructor(dna, thresh, mutationRate, crossoverRate){
    this.dna = dna;
    this.thresh = thresh;
    this.mutationRate = mutationRate;
    this.crossoverRate = crossoverRate;
  }

  calcFitness(population){
    let fitness = [];
    for(let f = 0; f < population.shape[0]; f++){
      fitness[f] = Math.random();
    }
    let sumValue = 0;
    let sumWeight = 0;

    let value = this.dna.data[0].map(x => {
      return x.worth;
    });
    
    let quantity = this.dna.data[0].map(x => {
      return x.quantity;
    });
    
    let weight = this.dna.data[0].map((x, i) => {
      return x.berat * quantity[i];
    });

    for(let i = 0; i < population.shape[0]; i++){
      sumValue = NumJS.sum(population.data[i], value);
      sumWeight = NumJS.sum(population.data[i], weight);
      if(sumWeight <= this.thresh) {
        fitness[i] = Number.parseInt(sumValue);
      }
      else {
        fitness[i] = 0;
      }
    }
    return fitness;
  }

  selection(fitnessArr, numParents, population){
    let fitness = [...fitnessArr];
    let parents = NumJS.randomBetween(numParents, population.shape[1]);
    for(let i = 0; i < numParents; i++){
      let maxId = fitness.indexOf(Math.max(...fitness));
      for(let j = 0; j < parents.shape[1]; j++){
        parents.data[i][j] = population.data[maxId][j];
      }
      fitness[maxId] = -999999;
    }

    return parents;
  }

  crossover(parents, numOffspring){
    let offsprings = NumJS.randomBetween(numOffspring, parents.shape[1]);
    const crossoverPoint = Number.parseInt(parents.shape[1] / 2);
    let i = 0;
    while(parents.shape[0] < numOffspring){
      let par1Idx = i % parents.shape[0];
      let par2Idx = (i + 1) % parents.shape[0];
      let x = Math.random();
      if (x > this.crossoverRate) continue;
      par1Idx = i % parents.shape[0];
      par2Idx = (i + 1) % parents.shape[0];
      for(let j = 0; j < crossoverPoint; j++){
        offsprings.data[i][j] = parents.data[par1Idx][j];
      }
      for(let k = crossoverPoint; k < offsprings.shape[1]; k++){
        offsprings.data[i][j] = parents.data[par2Idx][j];
      }
      i++;
    }

    return offsprings;
  }

  mutation(offsprings){
    let mutants = NumJS.randomBetween(offsprings.shape[0], offsprings.shape[1]);
    for(let i = 0; i < mutants.shape[0]; i++){
      let rand = Math.random();
      for(let j = 0; j < mutants.shape[1]; j++){
        offsprings.data[i][j] > 0.5 ? mutants.data[i][j] = 0.99999999999999999999 : mutants.data[i][j] = 0.00000000000000000000
      }
      if (rand > this.mutationRate) continue;
      let intRand = randint(0, offsprings.shape[1]);
      if (mutants.data[i][intRand] > 0.5) {
        mutants.data[i][intRand] = 1;
      }
      else {
        mutants.data[i][intRand] = 0;
      }
    }
    return mutants;
  }
}


module.exports = Population;