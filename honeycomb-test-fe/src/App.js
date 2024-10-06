import React, { useState } from 'react';
import Header from './components/Header';
import BubbleTeaOrderForm from './components/BubbleTeaOrderForm';
import OrderSummary from './components/OrderSummary';
import './styles/App.css';

function App() {
  
  const [order, setOrder] = useState(null);

  const handleOrderSubmit = (order) => {
    setOrder(order);
  }


  return (
    <div className = "App">
      <Header />
      <BubbleTeaOrderForm onSubmit={handleOrderSubmit} />
      <OrderSummary order={order} />
      </div>
  );
}

export default App;
