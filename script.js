let myLibrary = [];

function createBookEntry(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

createBookEntry.prototype.createCard = function () {
    const cardsContainer = document.querySelector('.cards-container');
    const card = document.createElement('div');
    const title = document.createElement('p');
    const remove = document.createElement('img');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const formReadCheckbox = document.getElementById('read');
    const addedBookReadCheckbox = document.createElement('input');
    let read = document.createElement('label');

    card.setAttribute("id", myLibrary.length - 1);
    title.textContent = this.title;
    remove.setAttribute("src", "xmark.png");
    remove.setAttribute("alt", "red X");
    author.textContent = this.author;
    pages.textContent = this.pages;
    addedBookReadCheckbox.setAttribute("type", "checkbox");
    addedBookReadCheckbox.setAttribute("id", `added-book-read-${myLibrary.length - 1}`);
    read.innerText = "Finished reading";
    read.setAttribute("for", `added-book-read-${myLibrary.length - 1}`);

    if (formReadCheckbox.checked === true) {
        addedBookReadCheckbox.checked = true;
    }
    else {
        addedBookReadCheckbox.checked = false;
    }

    cardsContainer.appendChild(card);
    card.appendChild(title);
    card.appendChild(remove);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(addedBookReadCheckbox);
    card.appendChild(read);
}

createBookEntry.prototype.removeBook = function () {
    let cards = document.querySelectorAll('.cards-container > div');
    const removeBtn = cards[cards.length - 1].querySelector('img');
    removeBtn.addEventListener('click', (e) => {
        let arrNum = e.target.parentElement.getAttribute('id');
        myLibrary.splice(Number(arrNum), 1);
        e.target.parentElement.remove();

        // Reassign card order numbers after removing a book
        cards = document.querySelectorAll('.cards-container > div');
        for (let i = 0; i < (myLibrary.length); i++) {
            if (i != cards[i].getAttribute('id')) {
                cards[i].setAttribute('id', i);
            }

            let input = cards[i].querySelector('input');
            if (i != input.getAttribute('id').charAt(input.getAttribute('id').length - 1)) {
                input.setAttribute("id", `${input.getAttribute('id').replace(input.getAttribute('id').charAt(input.getAttribute('id').length - 1), i)}`);
            }

            let label = cards[i].querySelector('label');
            if (i != label.getAttribute('for').charAt(label.getAttribute('for').length - 1)) {
                label.setAttribute("for", `${label.getAttribute('for').replace(label.getAttribute('for').charAt(label.getAttribute('for').length - 1), i)}`);
            }
        }
    })
}

createBookEntry.prototype.changeRead = function () {
    let addedBookReadCheckbox = document.querySelectorAll('.cards-container > div > input');
    addedBookReadCheckbox = addedBookReadCheckbox[addedBookReadCheckbox.length - 1];
    addedBookReadCheckbox.addEventListener('click', () => {
        if (this.read === true) {
            this.read = false;
        }
        else {
            this.read = true;
        }
    })
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new createBookEntry(title, author, pages, read);
    myLibrary.push(newBook);
    newBook.createCard();
    newBook.removeBook();
    newBook.changeRead();
}



// New Book button and Modal

const newBookBtn = document.querySelector('.new-book-btn');
const modal = document.querySelector('.modal');
newBookBtn.addEventListener('click', () => {
    modal.classList.add('active');
})

const modalExitBtn = document.querySelector('.modal > img');
modalExitBtn.addEventListener('click', () => {
    modal.classList.remove('active');
})

const modalAddBtn = document.querySelector('.modal-add-btn');
modalAddBtn.addEventListener('click', () => {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read');

    addBookToLibrary(title, author, pages, read.checked);

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;
    modal.classList.remove('active');
})