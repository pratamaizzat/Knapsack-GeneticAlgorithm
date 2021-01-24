const Population = require('./Population');
const NumJS = require('./NumJS');
const { pop } = require('./Stuff');

class GeneticAlgorithm{
  constructor(item, thresh, mutationRate, crossRate, popSize, numGen){
    this.params =  [];
    this.history = [];
    this.popSize = popSize;
    this.numGen = numGen;
    this.item = item;
    this.thresh = thresh;
    this.mutationRate = mutationRate;
    this.crossRate = crossRate;

    this.numParents = Number.parseInt(this.popSize[0] / 2);
    this.numOffspring = this.popSize[0] - this.numParents;

    this.populations = NumJS.random(2, this.popSize[0], this.popSize[1]);
    this.parents = NumJS.randomBetween(this.numParents, this.populations.shape[1]);
    this.offsprings = NumJS.randomBetween(this.numOffspring, this.parents.shape[1]);
    this.mutants = NumJS.randomBetween(
      this.offsprings.shape[0], 
      this.offsprings.shape[1]
      );
    this.fitness = [];

    for(let i = 0; i < this.populations.shape[0]; i++){
      this.fitness[i] = Math.random();
    }

    this.population = new Population(
      this.item,
      this.thresh,
      this.mutationRate,
      this.crossRate,
    );
  }

  optimize(){
    for(let i = 0; i < this.numGen; i++){
      this.fitness = this.population.calcFitness(this.populations);
      this.history.push(this.fitness);
      this.parents = this.population.selection(this.fitness, this.numParents, this.populations);
      this.offsprings = this.population.crossover(this.parents, this.numOffspring);
      this.mutants = this.population.mutation(this.offsprings);

      let newPop = this.parents.data.concat(this.mutants.data)
      this.populations.data = [...newPop];
    }

    console.log("Last Generation:");
    console.log(this.populations.data);
    // console.log(this.population.population.data[this.population.population.shape[0] - 1]);
    let fitnessLast = this.population.calcFitness(this.populations);
    console.log("Fitness Last Generation:");
    console.log(fitnessLast);
    let maxFitness = fitnessLast.indexOf(Math.max(...fitnessLast));
    this.params.push(this.populations.data[maxFitness]);

    return {
      parameter: this.params,
      history: this.history
    }
  }
}

module.exports = GeneticAlgorithm;