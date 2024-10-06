import React from 'react';

const OrderSummary = ({ order }) => {
    if (!order) return null;

    return (
        <div>
            <h2>Order Summary</h2>
            <p>Flavor: {order.flavor}</p>
            <p>Topping: {order.topping}</p>
            <p>Size: {order.size}</p>
        </div>
    );
};

export default OrderSummary;