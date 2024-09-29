// Sample menu data with individual prices
const menu = {
    Starters: [
        { name: "Garlic Bread", price: 80 },
        { name: "Bruschetta", price: 69 }
    ],
    MainCourses: [
        { name: "Margherita Pizza", price: 140 },
        { name: "Spaghetti Carbonara", price: 200 }
    ],
    Desserts: [
        { name: "Tiramisu", price: 150 },
        { name: "Cheesecake", price: 180 }
    ]
};

let orderPlaced = false; // Track if the order has been placed

function displayMenuItems(menu) {
    const menuContainer = document.getElementById('menu');
    
    for (let category in menu) {
        // Create and append the category name
        const categoryElement = document.createElement('h3');
        categoryElement.textContent = category;
        menuContainer.appendChild(categoryElement);

        // Create a list of items for each category
        const itemList = document.createElement('ul');
        menu[category].forEach(item => {
            // Create a list item element
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - R${item.price}`;

            // Attach event listener with the correct item name and price
            listItem.addEventListener('click', () => addToOrder(item));
            itemList.appendChild(listItem);
        });
        menuContainer.appendChild(itemList);
    }
}

function addToOrder(item) {
    // Ensure the "Place Order" button is visible
    document.getElementById('order-button').style.display = 'block';

    const orderItemsList = document.getElementById('order-items');
    const orderTotalElement = document.getElementById('order-total');
    const totalParagraph = orderTotalElement.parentElement;

    // A new order item element
    const orderItem = document.createElement('li');
    orderItem.textContent = `${item.name} - R${item.price}`;

    // An 'X' button for removing the item
    const removeButton = document.createElement('span');
    removeButton.textContent = ' X';
    removeButton.style.color = 'grey';
    removeButton.style.cursor = 'pointer';
    removeButton.style.marginLeft = '10px';

    // Event listener for removing the item
    removeButton.addEventListener('click', function() {
        if (!orderPlaced) {
            const confirmation = confirm(`Are you sure you want to remove ${item.name}?`);
            if (confirmation) {
                orderItemsList.removeChild(orderItem);
                let currentTotal = parseFloat(orderTotalElement.textContent);
                currentTotal -= item.price;
                orderTotalElement.textContent = currentTotal.toFixed(2);
            }
        }
    });

    orderItem.appendChild(removeButton);
    orderItemsList.appendChild(orderItem);

    // Update the total price
    let currentTotal = parseFloat(orderTotalElement.textContent);
    currentTotal += item.price;
    orderTotalElement.textContent = currentTotal.toFixed(2);

    // Set the color of the total to white
    totalParagraph.style.color = 'white';
}

// Event listener for "Place Order" button
document.getElementById('order-button').addEventListener('click', function() {
    orderPlaced = true; // Disable removal after order is placed

    if (!document.getElementById('thank-you-message')) {
        const thankYouMessage = document.createElement('p');
        thankYouMessage.id = 'thank-you-message';
        thankYouMessage.textContent = 'Thank you for placing your order!';
        thankYouMessage.style.color = 'white';
        thankYouMessage.style.fontWeight = 'bold';
        thankYouMessage.style.marginTop = '10px';
        const orderButton = document.getElementById('order-button');
        orderButton.parentNode.insertBefore(thankYouMessage, orderButton.nextSibling);
    }
});

// Hide the "Place Order" button initially
document.getElementById('order-button').style.display = 'none';

// Initialize the menu system with dynamic menu items
function initMenuSystem(menu) {
    displayMenuItems(menu);
}

// Initialize the menu when the page loads
initMenuSystem(menu);
