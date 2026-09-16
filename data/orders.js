export let orders = loadOrders();

loadOrders();

export function loadOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
};

export function saveOrders() {
    localStorage.setItem('orders', JSON.stringify(orders));
};

export function addOrder(order) {
    try {
        const sameId = orders.find(value => value.id === order.id);
        if (sameId){
            alert(sameId)
            throw 'There is already an order with this id';
        };

        orders.unshift(order);
        saveOrders();
    } catch (error) {
        alert(`Error : ${error}`);
    }
};
