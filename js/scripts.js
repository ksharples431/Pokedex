let pokeList = [
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

function pokePrint(poke) {
  // name and height variables declared
  let pokeName = poke.name;
  let pokeHeight = poke.height;

  //loop through poke heights to display coordinated message
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

pokeList.forEach(pokePrint)