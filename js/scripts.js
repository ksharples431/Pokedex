let pokemonRepository = (function () {
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1000';
  let pokeList = [];

  // returns a list of all pokes
  function getAll() {
    return pokeList;
  }

  // adds a new poke to the list
  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokeList.push(pokemon);
    } else {
      alert('Please enter a Poke obejct');
    }
  }

  // adds visual list item
  function addListItem(pokemon) {
    let pokeName = pokemon.name;
    let pokeCapped = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
    // *questions about jquery*
    let list = document.querySelector('ul');
    // let list = $('ul');
    list.classList.add('list-group', 'list-group-horizontal');
    // list.addClass('list-group', 'list-group-horizontal');
    let listItem = document.createElement('li');
    // let listItem = $('<li class="group-list-item"></li>')
    listItem.classList.add('group-list-item');
    let button = document.createElement('button');
    // let button = $('<button class="'poke-button', 'show-modal', 'btn', 'btn-primary'" data-toggle="modal" data-target=".modal">pokeCapped</button>')
    button.innerText = pokeCapped;
    button.classList.add(
      'poke-button',
      'show-modal',
      'btn',
      'btn-primary'
    );
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '.modal');
    listItem.appendChild(button);
    //listItem.append(button)
    list.appendChild(listItem);
    // list.append(listItem);
    addListener(button, pokemon);
  }

  // adds event listener
  function addListener(element, pokemon) {
    element.addEventListener('click', function () {
      showModal(pokemon);
    });
  }

  // fetches poke list from api
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // add each pokes details from api
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageFront = details.sprites.front_default;
        item.imageBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // function searchList(input) {
  //   // let searchButton = document.getElementsByClassName('search-btn');
  //   // let input = document.querySelector('.form-control');
  //   let poke = input.value;
  //   console.log(poke);
  //   showModal(poke);
  // }

  function filterPokes(input) {
    return pokeList.filter(function (pokemon) {
      let pokeLower = pokemon.name.toLowerCase();
      let inputLower = input.toLowerCase();
      return pokeLower.startsWith(inputLower)
    })
  }

  let searchField = document.querySelector('.form-control');
  searchField.addEventListener('input', function() {
    let query = searchField.value;
    let filteredList = filterPokes(query);
    let wholeList = document.querySelector('.poke-list');
    wholeList.innerHTML = '';
    if (filteredList.length === 0) {

    }}
})

  // displays modal
  function showModal(pokemon) {
    console.log(pokemon)
    loadDetails(pokemon).then(function () {
      // modal title
      // eslint-disable-next-line no-undef
      let modalTitle = $('.modal-title');
      modalTitle.empty();
      let pokeCapped =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      modalTitle.append(pokeCapped);

      //modal body
      // eslint-disable-next-line no-undef
      let modalBody = $('.modal-body');
      modalBody.empty();
      modalBody.append(
        `<img class="modal-image" src="${pokemon.imageFront}">`
      );
      modalBody.append(
        `<img class="modal-image" src="${pokemon.imageBack}">`
      );
      modalBody.append(`<p>Height: ${pokemon.height}</p>`);
      modalBody.append(`<p>Weight: ${pokemon.weight}</p>`);

      let types = pokemon.types;
      let typesList = '';
      // puts comma after each item unless last item
      for (let i = 0; i < types.length; i++) {
        if (i < types.length - 1) {
          typesList += types[i].type.name + ', ';
        } else {
          typesList += types[i].type.name;
        }
      }
      modalBody.append(`<p>Types: ${typesList}</p>`);

      let abilities = pokemon.abilities;
      let abilityList = '';
      // puts comma after each item unless last item
      for (let i = 0; i < abilities.length; i++) {
        if (i < abilities.length - 1) {
          abilityList += abilities[i].ability.name + ', ';
        } else {
          abilityList += abilities[i].ability.name;
        }
      }
      modalBody.append(`<p>Abilities: ${abilityList}</p>`);
    });
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (
      e.key === 'Escape' &&
      modalContainer.classList.contains('is-visible')
    ) {
      hideModal();
    }
  });

  return {
    getAll,
    add,
    addListItem,
    addListener,
    loadList,
    loadDetails,
    // searchList,
    showModal,
    hideModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


