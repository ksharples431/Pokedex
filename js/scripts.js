let pokemonRepository = (function () {
  let pokeList = [
    {
      name: 'Dewgong',
      height: 1.7,
      types: ['ice', 'water'],
    },
    {
      name: 'Weedle',
      height: 0.3,
      types: ['bug', 'poison'],
    },
    {
      name: 'Oddish',
      height: 0.5,
      types: ['grass', 'poison'],
    },
  ];

  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokeList.push(pokemon);
    } else {
      alert('Please enter a Poke obejct')
    }
  }

  function getAll() {
    return pokeList;
  }

  return {
    add,
    getAll
  };

})();


console.log(pokemonRepository.getAll());

pokemonRepository.add({
  name: 'Bulbasaur',
  height: 0.7,
  types: ['grass', 'poison']
});

pokemonRepository.add('bulbasaur');


function pokePrint(poke) {
  let pokeName = poke.name;
  let pokeHeight = poke.height;

  if (poke.height > 1) {
    document.write(
      `${pokeName} (height: ${pokeHeight}) - Wow, that's big! <br>`
    );
  } else if (poke.height < 0.5) {
    document.write(
      `${pokeName} (height: ${pokeHeight}) - Wow, that's tiny! <br>`
    );
  } else {
    document.write(
      `${pokeName} (height: ${pokeHeight}) - Huh, he's pretty average. <br>`
    );
  }
}

pokemonRepository.getAll().forEach(pokePrint);
