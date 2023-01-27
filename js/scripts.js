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

  function getAll() {
    return pokeList;
  }

  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokeList.push(pokemon);
    } else {
      alert('Please enter a Poke obejct');
    }
  }

  function addListItem(pokemon) {
    let pokeName = pokemon.name;
    let list = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokeName;
    button.classList.add('poke-button');
    listItem.appendChild(button);
    list.appendChild(listItem);
    addListener(button, pokemon)
  }

  function addListener(element, pokemon) {
    element.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  return {
    getAll,
    add,
    addListener,
    addListItem,
    showDetails,
  };

})();

console.log(pokemonRepository.getAll());

pokemonRepository.add({
  name: 'Bulbasaur',
  height: 0.7,
  types: ['grass', 'poison']
});

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon)
});
