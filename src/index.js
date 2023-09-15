// Selecting all elements
const dogList = document.querySelector('#dog-image-container')
const breedList = document.querySelector('#dog-breeds')
const dropDown = document.querySelector('#breed-dropdown')

// URLs 
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

let breeds = []

// CHALLENGE 1
fetch(imgUrl)
.then(response => response.json())
.then(data => {
   data.message.forEach(imgUrl => renderDogs(imgUrl))
})

function renderDogs(imgUrl) {
    const dogPic = document.createElement('img')
    dogPic.src = imgUrl
    // Optional: just making image to look a bit better by setting the height
    dogPic.style.height = '300px'

    dogList.appendChild(dogPic)
}

// CHALLENGE 2
fetch(breedUrl)
.then(res => res.json())
.then(data => {
    // Getting all the keys 
    breeds = Object.keys(data.message)
    // Passing an array of breeds to orderFunc
    orderFunc(breeds)
})

// Function that loops through the array (NOT THE BEST NAME 🥲)
function orderFunc(breeds) {
    // resetting ul element's text content
    breedList.textContent = ''
    breeds.forEach(breed => renderBreeds(breed))
}

function renderBreeds(breed) {
    const li = document.createElement('li')
    li.textContent = breed
    breedList.appendChild(li)

    // Solution #1 to change color
    li.addEventListener("click", (event) => {

    if (event.target.style.color !== 'red') {
        event.target.style.color = 'red'
    } else {
        event.target.style.color = 'black'
    }

    // One line solution using ternary operator
    // event.target.style.color = event.target.style.color == "red" ? "black" : "red";

    })

    // Solution #2 to change color (not reversible)
    // li.addEventListener('click',() => {
    //     li.style.color = 'red'
    // })

}

// Adding an event listener for the dropDown element and filtering through original array
dropDown.addEventListener('change', (e) => {
   const newList = breeds.filter(breed => breed.startsWith(e.target.value))
   orderFunc(newList)
})



// SOLUTION TO FETCH DATA AND GET THE BREEDS WITH MULTIPLE WORDS IN THE NAME

// fetch(breedUrl)
//     .then((response) => response.json())
//     .then((dogs) => {
//         for (const breed in dogs.message) {
//             const subBreed = dogs.message[breed];
//             const li = document.createElement("li");
//             li.innerText = breed;
//             li.classList.add("changeColor");
//             if (subBreed.length > 0) {
//                 for (let i = 0; i < subBreed.length; i++) {
//                     const subLi = document.createElement("li");
//                     subLi.innerText = `${breed}  ${subBreed[i]}`;
//                     doglist.appendChild(subLi);
//                 }
//             }
//             else {
//                 doglist.appendChild(li);
//             }
//         }