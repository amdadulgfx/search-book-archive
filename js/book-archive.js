// loading data from api
const loadBooks = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs));
    document.getElementById('show-results').textContent = '';
    document.getElementById('results-found').textContent = '';
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
    books.slice(0, 20).forEach(book => {
        //adding the book to the search result 
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                    <img height="400" src="https://covers.openlibrary.org/b/id/${book?.cover_i ?? 'no image'}-M.jpg" class="card-img-top" alt="this is cover for ${book.title}">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Author: ${book?.author_name ?? ''}</p>
                        <p class="card-text">First Published: ${book?.first_publish_year ?? 'Unknown'}  </p>
                        <p class="card-text">Publisher: ${book?.publisher ?? ''}</p>
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