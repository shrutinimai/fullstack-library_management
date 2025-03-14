async function addBook() {
    const name = document.getElementById('bookName').value;
    if (!name.trim()) return alert("Enter a book name!");
    
    await axios.post('http://localhost:3000/books', { name });
    loadBooks();
    document.getElementById('bookName').value = ''; 
}

async function loadBooks() {
    const res = await axios.get('http://localhost:3000/books');

    document.getElementById('booksList').innerHTML = res.data
        .filter(book => book.status === 'Borrowed')
        .map(book => `
            <div class="book-item" id="book-${book.id}">
                <p><strong>Book:</strong> ${book.name}</p>

                <p><strong>Taken On:</strong> ${new Date(book.takenTime).toLocaleString()}</p>

                <p><strong>Return By:</strong> ${new Date(book.returnTime).toLocaleString()}</p>

                <p><strong>Current Fine:</strong> Rs. ${book.fine}</p> 

                ${book.fine > 0 ? `
                    <button onclick="payFine(${book.id}, ${book.fine})">Pay Fine</button>

                ` : `<button onclick="returnBook(${book.id})">Return</button>`}
            </div>
        `).join('');

  
    document.getElementById('returnedBooks').innerHTML = res.data
        .filter(book => book.status === 'Returned')
        .map(book => `
            <div class="book-item">
                <p><strong>Book:</strong> ${book.name}</p>
                <p><strong>Returned On:</strong> ${new Date(book.returnedAt).toLocaleString()}</p>
                <p><strong>Fine Paid:</strong> Rs. ${book.finePaid}</p>
            </div><hr>
        `).join('');
}

async function returnBook(id) {
    const res = await axios.put('http://localhost:3000/books/return', { id });

    if (res.data.fineAmount > 0) { 
        document.getElementById(`book-${id}`).innerHTML = `
            <p>Book: ${res.data.name}</p>
            <p>Current Fine: Rs. ${res.data.fineAmount}</p> 
            <button onclick="payFine(${id}, ${res.data.fineAmount})">Pay Fine</button>
        `;
    } else {
        loadBooks();
    }
}

async function payFine(id, fine) {
    await axios.put('http://localhost:3000/books/payfine', { id, fine });
    loadBooks(); 
}

document.addEventListener('DOMContentLoaded', loadBooks);
