let pokemonRepository = (function () {
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokeList = [];


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
    let pokeCapped = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
    let list = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokeCapped;
    button.classList.add('poke-button');
    listItem.appendChild(button);
    list.appendChild(listItem);
    // addListener(button, pokemon);
  }

  // function addListener(element, pokemon) {
  //   element.addEventListener('click', function () {
  //     showDetails(pokemon);
  //   });
  // }

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

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
  
    let titleElement = document.createElement('h1');
    titleElement.classList.add('modal-title');
    titleElement.innerText = pokemon.name;

    let imageWrapper = document.createElement('div');
    let imageElement = document.createElement('img');
    imageWrapper.classList.add('image-wrapper');
    imageElement.classList.add('modal-image');
    imageElement.src = pokemon.imgeUrl;
    imageWrapper.appendChild(imageElement);

    let detailsElement = document.createElement('div');
    detailsElement.classList.add('modal-details');
    detailsElement.innerText = `Height: ${pokemon.height} <br> Types: $pokemon.types`

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageWrapper);
    modal.appendChild(detailsElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  return {
    getAll,
    add,
    // addListener,
    addListItem,
    loadList,
    loadDetails,
    showDetails,
    // showModal
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
