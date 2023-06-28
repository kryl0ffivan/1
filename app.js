const searchInput = document.querySelector('.search__input');
const searchList = document.querySelector('.search__list');
const repoList = document.querySelector('.repo-list');
let searchValue = '';
let timeoutId;

searchInput.addEventListener('input', event => {
  searchValue = event.target.value.trim();
  if (searchValue === '') {
    searchList.innerHTML = '';
    return;
  }

clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    fetch(`https://api.github.com/search/repositories?q=${searchValue}&per_page=5`)
      .then(response => response.json())
      .then(data => {
        searchList.innerHTML = '';
        if (data.items && data.items.length > 0) {
        data.items.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = item.full_name;
          listItem.addEventListener('click', () => addRepo(item));
          searchList.appendChild(listItem);
        });
      }else {
        const listItem = document.createElement('li');
        listItem.textContent = 'Репозитория не существует';
        searchList.appendChild(listItem);
      }
      })
      .catch(error => console.error(error));
  }, 500);
});

function addRepo(item) {
  const repoListItem = document.createElement('li');
  const text = `Имя: ${item.name}
                Владелец: ${item.owner.login}
                Звезды: ${item.stargazers_count}`;
  repoListItem.textContent = text

  const removeButton = document.createElement('button');
  removeButton.classList.add('btn')
  removeButton.addEventListener('click', () => {
    repoList.removeChild(repoListItem);
  });
  repoListItem.appendChild(removeButton);
  repoList.appendChild(repoListItem);
  searchInput.value = '';
  searchList.innerHTML = '';
}