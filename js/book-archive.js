// loading data from api
const loadBooks = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs));
    toggleSpinner('block');
};
//function to display books
const displayBooks = books => {
    const showResults = document.getElementById('show-results');
    showResults.textContent = '';
    // total results 
    if (books.length === 0) {
        document.getElementById('results-found').innerHTML = `<h3 class="text-center text-danger">No Results found</h3>`;
    }
    else {
        document.getElementById('results-found').innerHTML = `<h3 class="text-center text-danger">${books.length} Results found</h3>`;
    }
    //forEach to find every book
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="this is cover for ${book.title}">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Author: ${book.author_name}</p>
                        <p class="card-text">The first edition was published in ${book?.first_publish_year ?? 'Unknown'} year by ${book?.publisher ?? 'An Unknown Publisher'}</p>
                    </div>
                </div>
        `
        showResults.appendChild(div);
    });
    toggleSpinner('none');
};
//loading spinner 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
};