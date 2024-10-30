import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
//import { initializeApp } from "firebase/app"                 <----Replaced
//import { getDatabase, ref, push } from "firebase/database"   <----Replaced

const appSettings = {
    databaseURL: "https://lasallerj-242-ipizza-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const pizzasInDB = ref(database, "pizzas")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const pedidoInDB = document.getElementById("pedido")

onValue(pizzasInDB, function(snapshot) {
    
    if(snapshot.exists()) {
        let pizzasArray = Object.entries(snapshot.val())

        clearPedidoListEl()

        for(let i = 0; i < pizzasArray.length; i++) {
            let currentPizza = pizzasArray[i]

            appendPizzaToPedido(currentPizza)
        }
    }else {
        pedidoInDB.innerHTML = "Vazio..."
    }
})

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(pizzasInDB, inputValue)
    console.log( `${inputValue} added to database`)

    clearInputFieldEl()
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearPedidoListEl() {
    pedidoInDB.innerHTML = ""
}

function appendPizzaToPedido(item) {
    let pizzaID = item[0]
    let pizzaValue = item[1]
    let newEl = document.createElement("li")

    newEl.textContent = pizzaValue

    newEl.addEventListener("dblclick", function() {
        let pizza = ref(database, `pizzas/${pizzaID}`)

        remove(pizza)
    })

    pedidoInDB.append(newEl)
}
