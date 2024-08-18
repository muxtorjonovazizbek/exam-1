const add__product = document.getElementById("addProduct")
const user__modal = document.getElementById("user__modal")
const result = document.getElementById("result")
const save = document.getElementById("save")
const searchInput = document.getElementById("search")


let form = {}
let products = []
let editId
// let search = ""
let baseUrl = "http://localhost:3000/product"


document.addEventListener("DOMContentLoaded", () => {
    add__product.addEventListener("click", openModal)   
    save.addEventListener("click", saveModal)

    // searchInput.addEventListener("input",handleSearch)
    getProducts()
})
   

function openModal() {
    toggleModal("block")
}

window.addEventListener("click", (event) => {
    if (event.target === user__modal) {
        toggleModal("none")
    }
})


function toggleModal(status) {
    user__modal.style.display = status
}

function handleChange(event) {
    const {name,value} = event.target
    form = {...form, [name]:value}

    
}

async function saveModal() {
if (editId) {
    try {
        await fetch(`${baseUrl}/${editId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        editId = null
        getProducts()
        toggleModal("none")
    } catch (error) {
        console.log(error);
        
    }
}else {
    try{
        const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        console.log(response);
        search = ""
        getProducts()
        toggleModal("none")
    } catch (error) {
        console.log(error);
        
    }
}

   
}


async function getProducts() {
    try {
        const response = await fetch(`${baseUrl}`)
        products = await response.json()
        displayProduct()
        toggleModal("none")
    } catch (error) {
        console.log(error);
        
    }
}



function displayProduct() {
   
    result.innerHTML = ""
    // const filteredProduct = products.filter(val => val.name.toLowerCase().includes(search.toLowerCase()))
    // console.log(filteredProduct);
    
    
        products.forEach((val, ind) => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${ind + 1}</td>
            <td>${val.name}</td>
            <td>${val.price}</td>
            <td>${val.brand}</td>
            <td>${val.color}</td>
            <td>
                <button class="btn btn-primary mx-1" onclick="editProducts('${val.id}')">Edit</button>
                <button class="btn btn-danger mx-1" onclick="delProducts('${val.id}')">Del</button>
            </td>
        `
        result.appendChild(tr)
    })
}

// function handleSearch(event) {
//     search = event.target.value  
//     displayProduct() 
// }

async function delProducts(id) {
    console.log(id);
    
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: "DELETE"
        })

        if (response.ok) {
            getProducts()
        }
    } catch (error) {
        console.log(error);
        
    }
}


async function editProducts(id) {
    editId = id
    let product = products.find(item => item.id == id)
        form = {...product}
        toggleModal("block")
        
        document.querySelector("input[name='name']").value  = form.name
        document.querySelector("input[name='price']").value  = form.price
        document.querySelector("input[name='brand']").value  = form.brand
        document.querySelector("input[name='color']").value = form.color
     
        
    }
    


