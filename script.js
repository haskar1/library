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
    const modalReadCheckbox = document.getElementById('read');
    const read = document.createElement('label');
    const addedBookReadCheckbox = document.createElement('input');
    const readSlider = document.createElement('span');
    const readLabelText = document.createElement('span');

    card.setAttribute("id", myLibrary.length - 1);
    title.textContent = '"' + this.title + '"';
    remove.setAttribute("src", "xmark.png");
    remove.setAttribute("alt", "red X");
    author.textContent = "By: " + this.author;
    read.setAttribute("for", `added-book-read-${myLibrary.length - 1}`);
    read.classList.add('switch');
    addedBookReadCheckbox.setAttribute("type", "checkbox");
    addedBookReadCheckbox.setAttribute("id", `added-book-read-${myLibrary.length - 1}`);
    readSlider.classList.add('slider', 'round');
    readLabelText.textContent = "Finished reading";

    if (this.pages == 1) {
        pages.textContent = this.pages + " page";
    }
    else {
        pages.textContent = this.pages + " pages";
    }

    if (modalReadCheckbox.checked === true) {
        addedBookReadCheckbox.checked = true;
    }
    else {
        addedBookReadCheckbox.checked = false;
    }

    cardsContainer.appendChild(card);
    card.appendChild(remove);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    read.appendChild(addedBookReadCheckbox);
    read.appendChild(readSlider);
    read.appendChild(readLabelText);
}

createBookEntry.prototype.changeRead = function () {
    let addedBookReadCheckbox = document.querySelectorAll('.cards-container > div > label > input');
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

function removeBook() {
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

function addBookToLibrary(title, author, pages, read) {
    const newBook = new createBookEntry(title, author, pages, read);
    myLibrary.push(newBook);
    newBook.createCard();
    newBook.changeRead();
    removeBook();
}



// New Book button; Modal; Overlay

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const newBookBtn = document.querySelector('.new-book-btn');
newBookBtn.addEventListener('click', () => {
    modal.classList.add('active');
    overlay.classList.add('active');
})

const modalExitBtn = document.querySelector('.modal > img');
modalExitBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
})

const modalAddBtn = document.querySelector('.modal-add-btn');
modalAddBtn.addEventListener('click', () => {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read');

    if (title === '' || author === '' || pages === '') {
        return
    }

    addBookToLibrary(title, author, pages, read.checked);

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;
    modal.classList.remove('active');
    overlay.classList.remove('active');
})

overlay.addEventListener('click', () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
})