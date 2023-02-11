
const thumbImgEl = document.querySelector("#thumbImg");
const mainImgEl = document.querySelector("#mainImg");
const specProdDetailEl = document.querySelector("#specProd")
const itemsListEl = document.querySelector(".product-list");

/*
const endpoint = {
    platzi: {
      products: 'https://api.escuelajs.co/api/v1/products/',
      categories: 'https://api.escuelajs.co/api/v1/categories?limit=5',
    },
    faker: {
      credit_cards: 'https://fakerapi.it/api/v1/credit_cards?_quantity=1',
    },
    exchange_rate: {
      currency:
        'https://v6.exchangerate-api.com/v6/ae007f997716ef4e399f00af/latest/GBP',
    },
  }

  let option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
*/
//itemsListEl.addEventListener("click", (event) => {
//})
  // const selectedItem = `?categoryId=${event.target.dataset.categoryId}`;


console.log("hy");
   
    
fetch(`https://api.escuelajs.co/api/v1/products/`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log(data[0].images.length)

        createThumbnails(data)
        createSpec(data[0])

    })

thumbImgEl.addEventListener('click', (event) => {
    if(event.target.matches('img')) {

        const selectedImg = event.target

     //   const categoryImage = `?categoryId=${event.target.dataset.categoryId}`
     //   searchProductsEndpoint(categoryQuery)
        console.log(selectedImg)

        createImage(selectedImg)

    }
    
})



    function createThumbnails(data){

        const newThumb = document.createElement('div');
        newThumb.innerHTML= `<a href="#"> <img src="${data[0].category.image}" alt="" style="width:70px"> </a>`;
        thumbImgEl.appendChild(newThumb);


        for (let i = 0; i < data[0].images.length; i++) {

            mainThumbnail(data[0].images[i])

            console.log(data[0].images[i])   
        }

        const newImg = document.createElement('div');
        newImg.innerHTML= `<a href="#"> <img src="${data[0].category.image}" alt=""> </a>`;
        mainImgEl.appendChild(newImg);



    }

    function mainThumbnail(data){
        const newThumb = document.createElement('div');
            newThumb.innerHTML= `<a href="#"> <img src="${data}" alt="" style="width:70px"> </a>`;
            thumbImgEl.appendChild(newThumb);
    }


    function createImage(selectedImg){
        mainImgEl.innerHTML = "";

        console.log(selectedImg)

        const newImg = document.createElement('div');
        newImg.innerHTML= `<a href="#"> ${selectedImg} </a>`;
        mainImgEl.appendChild(newImg);

    }


    function createSpec(data){
        const newSpecDetail = document.createElement('div')


        console.log(data.price)
        newSpecDetail.innerHTML = `
        
        <div class="p-5">
        <a href="#">
        <h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${data.title}</h5>
        </a>
        <p class="mb-3 font-bold text-red-900">£${data.price}</p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${data.description}</p>

        <a href="#">
        Size
        </a>
        
        </div>
        `
        specProdDetailEl.appendChild(newSpecDetail)
    }
            
     



  /*
  // JavaScript of Product listing page.
const productListEl = document.querySelector('#product-list')
const searchBoxEl = document.querySelector('#search-box')
const searchButtonEl = document.querySelector('#search-button')
const navPrimaryItemsEl = document.querySelector('#nav-primary-items')

const endpoints = {
  platzi: {
    products: 'https://api.escuelajs.co/api/v1/products/',
    categories: 'https://api.escuelajs.co/api/v1/categories?limit=5',
  },
  faker: {
    credit_cards: 'https://fakerapi.it/api/v1/credit_cards?_quantity=1',
  },
  exchange_rate: {
    currency:
      'https://v6.exchangerate-api.com/v6/ae007f997716ef4e399f00af/latest/GBP',
  },
}

// Request HTTP Method and Headers
let options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}

// add categories dynamically to main nav, from api
populateNavPrimaryItems()

// FUNCTIONS ------------------------------------------------------- //

function searchProductsEndpoint(query) {
  fetch(endpoints['platzi']['products'] + query, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response)

      // clear contents before populating
      productListEl.innerHTML = ''

      response.forEach((item) => {
        createCard(item)
      })
    })
    .catch((err) => console.error(err))
}

function populateNavPrimaryItems() {
  // clear existing list items
  navPrimaryItemsEl.innerHTML = ''

  // create category buttons from api
  fetch(endpoints['platzi']['categories'], options)
    .then((response) => response.json())
    .then((response) => {
      response.forEach((category) => {
        const newListItemEl = document.createElement('li')
        newListItemEl.classList.add('nav-item')

        newListItemEl.innerHTML = `
          <a
            class="nav-link block py-2 pr-2 text-gray-600 transition duration-150 ease-in-out hover:text-gray-700 focus:text-gray-700 lg:px-2"
            href="#!" data-category-id="${category.id}"
            >${category.name}</a
          >
        `
        navPrimaryItemsEl.appendChild(newListItemEl)
      })
    })
    .catch((err) => console.error(err))
}

function createCard(item) {
  const newCardDiv = document.createElement('div')

  newCardDiv.classList.add(
    'm-1',
    'max-w-sm',
    'bg-white',
    'border',
    'border-gray-200',
    'rounded-lg',
    'shadow',
    'dark:bg-gray-800',
    'dark:border-gray-700'
  )

  newCardDiv.innerHTML = `
    <a href="#">
        <img class="rounded-t-lg" src="${item.images[0]}" alt="" />
    </a>
    <div class="p-5">
    <a href="#">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${item.title}</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${item.description}</p>
    <p class="mb-3 font-bold text-gray-900">£${item.price}</p>
    </div>
  `

  productListEl.appendChild(newCardDiv)
}

// EVENT LISTNERS ------------------------------------------------------------ //

navPrimaryItemsEl.addEventListener('click', (event) => {
  event.preventDefault()
  
  if (event.target.matches('a')) {
    const categoryQuery = `?categoryId=${event.target.dataset.categoryId}`
    searchProductsEndpoint(categoryQuery)
  }
})

searchButtonEl.addEventListener('click', (event) => {
  const searchText = searchBoxEl.value.trim()

  if (searchText) {
    const titleQuery = `?title=${searchText}`
    searchProductsEndpoint(titleQuery)
  }
})

*/
