const buttonAdd = document.querySelector('#buttonAdd');
const overlayDark = document.querySelector('#overlayDark');
const formContainer = document.querySelector('#formContainer');
const formElement = document.querySelector('#formElement');
let bookList = [];

function Book(name, author, pages, read){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook(){

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