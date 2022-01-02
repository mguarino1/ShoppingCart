import { useState } from 'react'
import './App.css'

function App() {

  interface Item {
    id: number,
    item: String,
    price: number,
    quantity: number
  }

  const inventory: Item[] = [
    {id: 0, item: "Bread", price: 1.50, quantity: 0},
    {id: 1, item: "Butter", price: 1.50, quantity: 0},
    {id: 2, item: "Milk", price: 2.00, quantity: 0},
    {id: 3, item: "Apple", price: .99, quantity: 0},
    {id: 4, item: "Lettuce", price: 1.30, quantity: 0},
    {id: 5, item: "Water", price: 1.00, quantity: 0},
    {id: 6, item: "Steak", price: 4.99, quantity: 0},
    {id: 7, item: "Bacon", price: 2.99, quantity: 0},
    {id: 8, item: "Grapes", price: 1.99, quantity: 0},
    {id: 9, item: "Ice Cream", price: 2.99, quantity: 0}
  ];
  inventory.map((obj) => Object.freeze(obj)); 

  const [shoppingCart, setShoppingCart] = useState<Item[]>([]);
  let totalItems: number = shoppingCart.map((item) => item.quantity).reduce((a,b) => a + b, 0);
  let totalPrice: number = shoppingCart.map((item) => (item.price * item.quantity)).reduce((a,b) => a + b, 0); 
  
  return (
    <div className="App">
        <div className="inventoryList">
          {inventory.map((item) => <InventoryItem {...item} key={item.id} />)}
        </div>
        <div className="shoppingCart">
          <div className="itemList">
          {shoppingCart.map((item) => <CartItem {...item} key={item.id} />)}
          </div>
          <div className="totalPrice">
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
        </div>
    </div>
  )

  function InventoryItem({ id, item, price }: Item) {

    const addToCart = () => {
      const product = shoppingCart.find(item => item.id === id);
      if(product) {
        setShoppingCart(prevCart => prevCart.map(item =>
          item.id === id ? {...product, quantity: product.quantity + 1} : item    
        ));
      } else {
        setShoppingCart(prevCart => prevCart.concat({id, item, price, quantity: 1}))
      };
    }

    return (
      <div className="inventoryItem" onClick={addToCart}>
        <p>{item}</p>
        <p>${price.toFixed(2)}</p>
      </div>
    )
  }

  function CartItem({ id, item, price, quantity }: Item) {

    const decrement = () => {
      if(quantity > 1) {
        setShoppingCart(prevCart => prevCart.map(item => item.id === id ? {...item, quantity: item.quantity - 1} : item))
      }
    }

    const increment = () => {
      setShoppingCart(prevCart => prevCart.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item))
    }

    const deleteItem = () => {
      setShoppingCart(prevCart => prevCart.filter(item => item.id !== id));
    }

    return (
      <div className="cartItem">
        <p>{item}</p>
        <button onClick={decrement}>-</button>
        <p>{quantity}</p>
        <button onClick={increment}>+</button>
        <p>${(price * quantity).toFixed(2)}</p>
        <button onClick={deleteItem}>X</button>
      </div>
    )
  }
}

export default App
