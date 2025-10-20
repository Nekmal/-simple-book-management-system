// Book data storage
let books = [];

// DOM elements
const bookForm = document.getElementById('bookForm');
const booksGrid = document.getElementById('booksGrid');
const searchInput = document.getElementById('searchInput');
const bookCount = document.getElementById('bookCount');

// Load books from memory on page load
function init() {
    displayBooks();
    updateBookCount();
}

// Add book
bookForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const status = document.getElementById('status').value;
    
    const book = {
        id: Date.now(),
        title: title,
        author: author,
        isbn: isbn,
        status: status
    };
    
    books.push(book);
    bookForm.reset();
    displayBooks();
    updateBookCount();
});

// Display books
function displayBooks(booksToDisplay = books) {
    if (booksToDisplay.length === 0) {
        booksGrid.innerHTML = `
            <div class="empty-state">
                <h3>No books found</h3>
                <p>Add your first book to get started!</p>
            </div>
        `;
        return;
    }
    
    booksGrid.innerHTML = booksToDisplay.map(book => `
        <div class="book-card">
            <div class="book-title">${book.title}</div>
            <div class="book-info"><strong>Author:</strong> ${book.author}</div>
            <div class="book-info"><strong>ISBN:</strong> ${book.isbn}</div>
            <span class="book-status status-${book.status}">
                ${book.status === 'available' ? 'Available' : 'Borrowed'}
            </span>
            <div class="book-actions">
                <button class="btn-small btn-toggle" onclick="toggleStatus(${book.id})">
                    Toggle Status
                </button>
                <button class="btn-small btn-delete" onclick="deleteBook(${book.id})">
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Delete book
function deleteBook(id) {
    if (confirm('Are you sure you want to delete this book?')) {
        books = books.filter(book => book.id !== id);
        displayBooks();
        updateBookCount();
    }
}

// Toggle book status
function toggleStatus(id) {
    const book = books.find(book => book.id === id);
    if (book) {
        book.status = book.status === 'available' ? 'borrowed' : 'available';
        displayBooks();
    }
}

// Search books
searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.isbn.toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredBooks);
});

// Update book count
function updateBookCount() {
    const total = books.length;
    const available = books.filter(book => book.status === 'available').length;
    const borrowed = books.filter(book => book.status === 'borrowed').length;
    
    bookCount.innerHTML = `
        <strong>Total Books:</strong> ${total} | 
        <strong>Available:</strong> ${available} | 
        <strong>Borrowed:</strong> ${borrowed}
    `;
}

// Initialize the app
init();