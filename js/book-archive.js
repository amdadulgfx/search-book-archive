// loading data from api
const loadBooks = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs));
    // console.log(searchText);
}
const displayBooks = books => {
    books.forEach(book => {
        console.log(book);
    })
}