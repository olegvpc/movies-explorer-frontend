// ф-ия фильтрации фильмов по длительности
export function filterShortMovies(movies){
  return movies.filter((item) => item.duration < 40);
}

// ф-ия фильтрации фильмов по запросу и длительности
export function filterMovies(movies, searchQuery, shortFilms) {
  const moviesByQuery =  movies.filter((item) => {
    const strRu = String(item.nameRU).toLowerCase();
    const strEn = String(item.nameEN).toLowerCase();
    const searchStr = searchQuery.toLowerCase().trim();
    return (strRu.indexOf(searchStr) !== -1 || strEn.indexOf(searchStr) !== -1);
  });

  if(shortFilms === 'on'){
    return filterShortMovies(moviesByQuery)
  }
  return moviesByQuery;
}

// ф-ция преобразования времени
export function getTimeWithMin(mints) {
  const hours = Math.floor(mints/60);
  const minutes = mints % 60;
  return `${hours}ч ${minutes}м`;
}
