document.getElementById('empty_search').style.display = 'none';
document.getElementById('error_message').style.display = 'none';

// search button 
const searchBookBtn = async () => {
    const searchField = document.getElementById('search_field');
    const searchText = searchField.value;

    // clear the field
    searchField.value = '';
    if (searchText === '') {
        document.getElementById('empty_search').style.display = 'block';
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        displayBooks(data.docs, data.numFound);
    }
}


// show all books
const displayBooks = (books, numFound) => {
    if (books.length === 0) {
        document.getElementById('error_message').style.display = 'block';
    }
    else {
        const resultContainer = document.getElementById('search_result');
        const foundResult = document.getElementById('found_result');
        foundResult.innerHTML = `
        <p> About ${numFound} books found and showing you ${books.length} books.</p>    
        `;
        books?.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
            <h5>Book Name : ${book.title}</h5>
            <h6><strong>Author Name </strong>: ${book.author_name ? book.author_name : ''}</h6>
            <p><strong>Publisher </strong>: ${book.publisher} </p>
            <p><strong>First published (year) </strong>: ${book.first_publish_year ? book.first_publish_year : ''}</p>
            </div>
         </div>
        `;
            resultContainer.appendChild(div);
        });
    }
}

