const Book = require('../models/Book');

exports.addBook = async (req, res) => {
    try {
        const { name } = req.body;
        const returnTime = new Date(Date.now() + 60 * 60 * 1000); 
        const book = await Book.create({ name, returnTime });
        res.json(book);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getBooks = async (req, res) => {
    const books = await Book.findAll(); 

    const updatedBooks = books.map(book => {
        const now = new Date();
        let fineAmount = 0;
        if (book.status === 'Borrowed' && now > book.returnTime) {
            fineAmount = Math.floor((now - book.returnTime) / (1000 * 60 * 60)) * 10;
        }
        return { ...book.toJSON(), fineAmount };
    });

    res.json(updatedBooks);
};





exports.returnBook = async (req, res) => {
    try {
        const { id, payFine } = req.body;
        const book = await Book.findByPk(id);
        const now = new Date();
        let fineAmount = 0;

        if (now > book.returnTime) {
            const hoursLate = Math.floor((now - book.returnTime) / (1000 * 60 * 60));
            fineAmount = hoursLate * 10;
        }

        if (fineAmount > 0 && !payFine) {
            return res.json({ message: `Fine of Rs. ${fineAmount} must be paid`, fineRequired: true, fineAmount });
        }

        await book.update({ status: 'Returned', returnedAt: now, finePaid: fineAmount });
        res.json({ message: 'Book returned successfully', finePaid: `Rs. ${fineAmount}` });
    } catch (error) { res.status(500).json({ error: error.message }); }
};
