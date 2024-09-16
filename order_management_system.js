// Task 1: Create an Inventory Array of Product Objects
// Each product object contains a name, price, and quantity, and the minimum stock level before it is considered "low stock".
const inventory = [
    { name: 'Espresso', price: 3, quantity: 10 },
    { name: 'Latte', price: 4, quantity: 5 },
    { name: 'Cappuccino', price: 4, quantity: 6 },
    { name: 'Mocha', price: 5, quantity: 4 }
];

// Output: Display the initialized inventory
console.log("Inventory initialized:");
console.log(inventory);

// Task 2: Create an Orders Array of Order Objects
// This empty array will store customer orders. Each order will have customer name, ordered items, and order status.
const orders = [];

// Output: Display the initialized orders array
console.log("Orders array initialized:");
console.log(orders);

// Task 3: Function to Place an Order
// This function takes a customer's name and their ordered items as input, checks if stock is sufficient, 
// and if so, places the order and updates the inventory. Otherwise, it logs an error.
function placeOrder(customerName, orderedItems) {
    // Step 1: Check if there is enough stock for each ordered item
    for (let item of orderedItems) {
        const product = inventory.find(p => p.name === item.name); // Find the product in the inventory
        
        if (!product) {
            console.log(`Error: ${item.name} is not available in the inventory.`);
            return; // Exit the function if any product is not found
        }

        if (product.quantity < item.quantity) {
            console.log(`Error: Insufficient stock for ${item.name}. Available: ${product.quantity}`);
            return; // Exit the function if stock is insufficient
        }
    }

    // Step 2: Update the inventory by subtracting the ordered quantities from stock
    orderedItems.forEach(item => {
        const product = inventory.find(p => p.name === item.name);
        product.quantity -= item.quantity; // Reduce the stock quantity
    });

    // Step 3: Add the order to the orders array with 'Pending' status
    orders.push({
        customerName: customerName,
        items: orderedItems,
        status: 'Pending' // New orders are initially marked as 'Pending'
    });

    console.log(`Order placed successfully for ${customerName}.`);
}

// Example usage of placeOrder function:
placeOrder('John Doe', [{ name: 'Espresso', quantity: 2 }, { name: 'Latte', quantity: 1 }]);
placeOrder('Jane Smith', [{ name: 'Mocha', quantity: 5 }]); // Error due to insufficient stock

// Task 4: Function to Calculate Total for an Order
// This function accepts an order object and calculates the total amount by summing up the prices of all ordered items.
function calculateOrderTotal(order) {
    let total = 0;
    order.items.forEach(item => {
        const product = inventory.find(p => p.name === item.name); // Find product in inventory
        if (product) {
            total += product.price * item.quantity; // Add price of product multiplied by its quantity to the total
        }
    });
    return total; // Return the total price for the order
}

// Example usage of calculateOrderTotal function:
const order = orders[0]; // Fetch the first order (John Doe's order)
console.log(`Total for ${order.customerName}'s order: $${calculateOrderTotal(order)}`);

// Task 5: Function to Mark an Order as Completed
// This function takes a customer's name and updates their order status to 'Completed'.
function completeOrder(customerName) {
    const order = orders.find(o => o.customerName === customerName); // Find the customer's order by name
    
    if (order) {
        order.status = 'Completed'; // Change the order status to 'Completed'
        console.log(`Order for ${customerName} has been marked as completed.`);
    } else {
        console.log(`Error: No order found for ${customerName}.`); // Error if no matching order is found
    }
}

// Example usage of completeOrder function:
completeOrder('John Doe');
completeOrder('Jane Smith'); // Error due to no order for Jane

// Task 6: Function to Check Pending Orders
// This function iterates over the orders array and logs details of all orders that are still marked as 'Pending'.
function checkPendingOrders() {
    orders.forEach(order => {
        if (order.status === 'Pending') {
            console.log(`Pending Order for ${order.customerName}:`);
            console.log(`Items: ${JSON.stringify(order.items)}`);
        }
    });
}

// Example usage of checkPendingOrders function:
checkPendingOrders(); // Logs all pending orders

// Example of running multiple tasks together
console.log("--- Initial Inventory ---");
console.log(inventory);

placeOrder('John Doe', [{ name: 'Espresso', quantity: 2 }, { name: 'Latte', quantity: 1 }]);
placeOrder('Jane Smith', [{ name: 'Mocha', quantity: 5 }]); // Error due to insufficient stock

console.log("--- Orders ---");
console.log(orders);

console.log("--- Calculating Total for John's Order ---");
console.log(`Total: $${calculateOrderTotal(orders[0])}`);

completeOrder('John Doe');
completeOrder('Jane Smith'); // Error due to no order for Jane

console.log("--- Checking Pending Orders ---");
checkPendingOrders();
