console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const dogDiv = document.getElementById('dog_image_container');
const ul = document.getElementById('dog_breeds');
const dropDown = document.querySelector('#breed_dropdown');

function postDogImgs() {
    fetch (imgUrl)
    .then(res => res.json())
    .then(function (data) {
        let dogArray = data.message
        dogArray.forEach(dog => renderDogs(dog))
        })
};

function renderDogs(dog) {
    let p = document.createElement('p')
    p.innerHTML = `
    <img src="${dog}"/>
    `
    dogDiv.appendChild(p)
};

postDogImgs()

function postBreeds() {
    fetch (breedUrl)
    .then(res => res.json())
    .then(data => {
        let breedObj = data.message
        let breedArray = Object.entries(breedObj) // gives array of all key-value pairs
        dropDownEvent(breedObj)
        breedArray.forEach(breed => renderBreeds(breed))
        })
};

function renderBreeds (breed) {
    let li = document.createElement('li')
    if (breed[1].length === 0) {
        li.textContent = breed[0]
        ul.appendChild(li)
        li.addEventListener('click', function changeColor () {
            if (li.style.color === "firebrick") {
                li.style.color = null
            } else {
                li.style.color = "firebrick"
            }
        })
    } else if (breed[1].length != 0) {
        let newUl = document.createElement('ul')
        li.textContent = breed[0]
        ul.appendChild(li)
        li.appendChild(newUl)
        breed[1].forEach(function (subBreed) {
            let newLi = document.createElement('li')       
            newLi.textContent = subBreed
            newUl.appendChild(newLi)
        })
        li.addEventListener('click', function changeColor () {
            if (li.style.color === "firebrick") {
                li.style.color = null
                let subBreedList = li.childNodes[1]
                subBreedList.childNodes.forEach((item) => {
                item.style.color = null
               })
            } else {
                let subBreedList = li.childNodes[1]
                li.style.color = "firebrick"
                subBreedList.childNodes.forEach((item) => {
                item.style.color = "firebrick"
               })
            }
        })
    }
};

postBreeds();



function dropDownEvent(breedObj) {
    breedObjKeys = Object.keys(breedObj)
    dropDown.addEventListener('change', (e) => {
        let letter = e.target.value
        ul.innerHTML = ''
        let filteredBreedArray = breedObjKeys.filter(breedKey => {
            return breedKey.startsWith(letter)
        });
        filteredBreedArray.forEach((breed) => {
            let li = document.createElement('li')
            li.textContent = breed
            ul.appendChild(li)
        })
    })
};


