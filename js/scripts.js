let pokemonList = [
  {
    name: 'Dewgong',
    height: 1.7,
    types: ['ice', 'water']
  },
  {
    name: 'Weedle',
    height: 0.3,
    types: ['bug', 'poison']
  },
  {
    name: 'Oddish',
    height: 0.5,
    types: ['grass', 'poison']
  }
];

for(let i = 0; i < pokemonList.length; i++) {
  // name and height variables declared
  let pokeName = pokemonList[i].name;
  let pokeHeight = pokemonList[i].height;

  //loop through poke heights to display coordinated message
  if (pokemonList[i].height > 1) {
    document.write(
      `${pokeName} (height: ${pokeHeight}) - Wow, that's big! <br>`
    )
  } else if(pokemonList[i].height < 0.5) {
    document.write(
      `${pokeName} (height: ${pokeHeight}) - Wow, that's tiny! <br>`
    );
  } else {
    document.write(
      `${pokeName} (height: ${pokeHeight}) - Huh, he's pretty average. <br>`
    );
  }
}