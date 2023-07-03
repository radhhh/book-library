const cardsContainer = document.querySelector('#cardsContainer');
const buttonAdd = document.querySelector('#buttonAdd');
const overlayDark = document.querySelector('#overlayDark');
const formContainer = document.querySelector('#formContainer');
const formElement = document.querySelector('#formElement');
const buttonSubmit = document.querySelector('#buttonSubmit');
const nameInput = document.querySelector('#nameInput');
const authorInput = document.querySelector('#authorInput');
const pagesInput = document.querySelector('#pagesInput');
const descriptionInput = document.querySelector('#descriptionInput');
const readInput = document.querySelector('#readInput');

let bookList = [];
let currentIndex = 0;

function Book(name, author, pages, description, read){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.description = description;
    this.read = read;
}

function removeBook(removedIndex){
    bookList.filter((currentBook) => currentBook.index != removedIndex);
    const removedCard = document.querySelector(`#card-${removedIndex}`);
    removedCard.remove();
}

function changeArrayRead(changedIndex){
    const changedArrayindex = bookList.findIndex((currentBook) => currentBook.index == changedIndex);
    bookList[changedArrayindex].read ^= true;
}

function handleCardRead(event){
    const clickedButton = (event.target.nodeName == 'SPAN' ? event.target.parentNode : event.target);
    console.log(clickedButton);
    // console.log(clickedButton.id);
    const clickedButtonIndex = parseInt(clickedButton.id.split('-').at(1));
    console.log(clickedButtonIndex);
    changeArrayRead(clickedButtonIndex);
    clickedButton.classList.toggle('finished');
}

function handleCardDelete(event){
    const clickedButton = event.target;
    const clickedButtonIndex = parseInt(clickedButton.id.split('-').at(1));
    console.log(clickedButtonIndex);
    removeBook(clickedButtonIndex);
}

function generateCard(currentBook){
    const currentCard = document.createElement('div');
    currentCard.classList.add('card');
    currentCard.id = `card-${currentBook.index}`;
    const cardTitle = document.createElement('h3');
    cardTitle.textContent = currentBook.name;
    const cardAuthor = document.createElement('h4');
    cardAuthor.textContent = `${currentBook.author}, ${currentBook.pages} pages`;
    const cardDescription = document.createElement('p');
    cardDescription.textContent = currentBook.description;
    const cardControls = document.createElement('div');
    cardControls.classList.add('controls');
    const cardRead = document.createElement('button');
    cardRead.classList.add('read');
    if(currentBook.read) cardRead.classList.add('finished');
    cardRead.id = `read-${currentBook.index}`;
    const cardReadSpan = document.createElement('span');
    const cardRemove = document.createElement('button');
    cardRemove.classList.add('remove');
    cardRemove.id = `remove-${currentBook.index}`;
    cardRemove.textContent = '✕';
    cardRead.addEventListener('click', handleCardRead);
    cardRemove.addEventListener('click', handleCardDelete);
    cardRead.appendChild(cardReadSpan);
    cardControls.appendChild(cardRead);
    cardControls.appendChild(cardRemove);
    currentCard.appendChild(cardTitle);
    currentCard.appendChild(cardAuthor);
    currentCard.appendChild(cardDescription);
    currentCard.appendChild(cardControls);
    return currentCard;
}

function validateForm(currentBook){
    for(key in currentBook){
        if(currentBook[key] === "") return false;
    }
    return true;
}

function resetForm(){
    overlayDark.classList.remove('active');
    formContainer.classList.remove('active');
    setTimeout(() => formElement.reset(), 500);
}

buttonAdd.addEventListener('click', () => {
    overlayDark.classList.add('active');
    formContainer.classList.add('active');
});

overlayDark.addEventListener('click', resetForm);


buttonSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    const currentBook = new Book(
        nameInput.value,
        authorInput.value,
        pagesInput.value,
        descriptionInput.value,
        readInput.checked
    )
    if(!validateForm(currentBook)){
        console.log('INVALID');
        return;
    }
    console.log("VALID");
    currentBook.index = currentIndex;
    currentIndex++;
    bookList.push(currentBook);
    cardsContainer.appendChild(generateCard(currentBook));
    resetForm();
});