//Get input value and fetch data
const loadBooks = async () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    if (searchText === '') {
        document.getElementById('error-message').innerHTML = `<p class="text-danger text-center fs-4 p-2">Please Input valid book name!</p>`;
    } else {
        const response = await fetch(`http://openlibrary.org/search.json?q=${searchText}`);
        const data = await response.json();
        //clear
        searchInput.value = '';
        document.getElementById('error-message').innerHTML = '';
        // display books function 
        displayBooks(data.docs);

    }

};
//Display Books
const displayBooks = (books) => {
    const booksContainer = document.getElementById('books-container');
    booksContainer.textContent = '';
    books.forEach(book => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">Name : ${book.title}</h4>
                    <h5 class="card-title">Author : ${book.author_name}</h5>
                    <h6 class="card-title">Publisher : ${book.publisher[0]}</h6>
                    <h6 class="card-title">First Published : ${book.first_publish_year}</h6>
            </div>
        </div>
        `;
        booksContainer.appendChild(newDiv);
    });
};