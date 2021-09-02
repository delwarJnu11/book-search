//Get input value and fetch data
const loadBooks = async () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    // error handle and fetching data 
    if (searchText === '') {
        document.getElementById('message').innerHTML = `<p class="text-danger text-center fs-4 p-2">Please Input valid book name!</p>`;
        document.getElementById('books-container').innerHTML = '';
    } else {
        const response = await fetch(`http://openlibrary.org/search.json?q=${searchText}`);
        const data = await response.json();
        //clear
        searchInput.value = '';
        document.getElementById('message').innerHTML = '';
        // display books function 
        displayBooks(data.docs);

    }

};
//Display Books
const displayBooks = (books) => {
    const booksContainer = document.getElementById('books-container');
    booksContainer.textContent = '';
    //filtering array for remove undefined property of keys
    const filteredBooks = books.filter(book => book.cover_i !== undefined && book.author_name !== undefined && book.publisher !== undefined && book.first_publish_year !== undefined);
    // error handling
    if (filteredBooks.length === 0) {
        document.getElementById('message').innerHTML = `<p class="text-danger text-center fs-4 p-2">Data Not Found!</p>`;
    } else {
        document.getElementById('message').innerHTML = `<p class="text-white bg-success text-center fs-3 p-3 rounded">${filteredBooks.length} Search Result Found.</p>`;
    };
    //forEach loop for dynamic data show
    filteredBooks.forEach(book => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${book.title}</h4>
                    <p class="card-text text-danger">${book.author_name[0]}</p>
                    <h6 class="card-title">Publisher : ${book.publisher[0]}</h6>
                    <h6 class="card-title">Published : ${book.first_publish_year}</h6>
                </div>
            </div>
        `;
        booksContainer.appendChild(newDiv);
    });
};

