// Dados das categorias, itens e preços
const itemsByCategory = {
    cleaning: [
        { name: "Sabão", price: 5.50 },
        { name: "Detergente", price: 3.00 },
        { name: "Água Sanitária", price: 7.00 }
    ],
    food: [
        { name: "Arroz", price: 12.00 },
        { name: "Feijão", price: 9.00 },
        { name: "Macarrão", price: 4.50 }
    ],
    utilities: [
        { name: "Papel Higiênico", price: 8.50 },
        { name: "Esponja", price: 2.50 },
        { name: "Vassoura", price: 15.00 }
    ]
};

let totalAmount = 0;

// Carregar itens com base na categoria selecionada
function loadItems() {
    const category = document.getElementById("category").value;
    const itemsDropdown = document.getElementById("items");

    // Limpar os itens anteriores
    itemsDropdown.innerHTML = '';

    if (category && itemsByCategory[category]) {
        itemsByCategory[category].forEach(item => {
            const option = document.createElement("option");
            option.value = item.name;
            option.setAttribute('data-price', item.price); // Adiciona o preço ao valor do item
            option.text = `${item.name} - R$ ${item.price.toFixed(2)}`;
            itemsDropdown.add(option);
        });
    }
}

// Adicionar item à lista de selecionados e atualizar o total
function addItem() {
    const itemsDropdown = document.getElementById("items");
    const selectedItem = itemsDropdown.value;
    const selectedPrice = parseFloat(itemsDropdown.selectedOptions[0].getAttribute('data-price'));
    const selectedItemsList = document.getElementById("selected-items");

    if (selectedItem) {
        const li = document.createElement("li");
        li.textContent = `${selectedItem} - R$ ${selectedPrice.toFixed(2)}`;
        selectedItemsList.appendChild(li);

        // Atualizar o total
        totalAmount += selectedPrice;
        document.getElementById("total-amount").textContent = totalAmount.toFixed(2);
    }
}

// Registrar o service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado com sucesso:', registration);
            })
            .catch(error => {
                console.log('Falha ao registrar o Service Worker:', error);
            });
    });
}
