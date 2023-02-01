let pokemonRepository = (function () {
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1000';
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
    button.classList.add('show-modal');
    listItem.appendChild(button);
    list.appendChild(listItem);
    addListener(button, pokemon);
  }

  function addListener(element, pokemon) {
    element.addEventListener('click', function () {
      showModal(pokemon);
    });
  }

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

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(pokemon) {
    loadDetails(pokemon).then(function () {
      let modalContainer = document.getElementById('modal-container');

      modalContainer.innerText = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      
      let imageWrapper = document.createElement('div')
      let imageElement = document.createElement('img');
      imageElement.src = pokemon.imageUrl;
      console.log(pokemon.imageUrl)

      let contentElement = document.createElement('p');
      contentElement.innerText = `Height: ${pokemon.height}`;
      console.log(pokemon);

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      imageWrapper.appendChild(imageElement);
      modal.appendChild(imageWrapper);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');

      modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
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
    showModal,
    hideModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
