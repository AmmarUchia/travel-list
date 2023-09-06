//Importing Nessecary modules

import { useState } from "react";

//*The Root of the app which basically displays everything
export default function App() {
  const [items, setItems] = useState([]);

  //!Funtction To Handle Adding Items
  function HandleAddItems(item) {
    setItems((items) => [...items, item]);
    console.log(items);
    console.log(item);
  }

  //!Function to handle deleting items
  function handleItemsDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleClear() {
    setItems([]);
  }

  //!Function To Handle the toggling of the items
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : { ...item }
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={HandleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleItemsDelete}
        onToggleItem={handleToggleItem}
        onClear={handleClear}
      />
      <Stats items={items} />
    </div>
  );
}

//!Rendering The lOGO
function Logo() {
  return <h1 className="">🌴Far Away 💼</h1>;
}

//*Rendering And Creating the functionality for the form
function Form({ onAddItems }) {
  const [des, setDes] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    if (!des) return;

    const newItem = { des, quantity, packed: false, id: Date.now() };
    // console.log(newItem);

    onAddItems(newItem);

    setDes("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What Do You Need For Your Trip?</h3>
      <select
        value={quantity}
        onChange={(q) => setQuantity(Number(q.target.value))}
      >
        {Array.from({ length: 90 }, (_, i) => i + 1).map((options) => (
          <option value={options} key={333323}>
            {options}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items..."
        value={des}
        onChange={(e) => setDes(e.target.value)}
        key={2223}
      />
      <button>Add</button>
    </form>
  );
}

//!Creaing The Component Which will be the place where all items are displayed
function PackingList({ items, onDeleteItem, onToggleItem, onClear }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items.slice().sort((a, b) => a.des.localeCompare(b.des));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort By Input Order</option>
          <option value="description">Sort By description</option>
          <option value="packed">Sort By Packed Status</option>
        </select>
        <button
          onClick={() =>
            items.length === 0 ? alert("There are no elemnts") : onClear()
          }
        >
          Clear List
        </button>
      </div>
    </div>
  );
}

//!Creating The Component Which Displays The item
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span
        key={332894949}
        style={item.packed ? { textDecoration: "line-through" } : {}}
      >
        {item.quantity} {item.des}
      </span>
      <button key={777} onClick={() => onDeleteItem(item.id)}>
        ❌
      </button>
    </li>
  );
}

//!Returning The Footer Of The Page
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const numPrecentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {numPrecentage === 100
          ? "You Got Everything! You are ready to go✈️"
          : `💼 You Have ${numItems} Items On Your List and You already Packed ${""}
        ${numPacked} (${numPrecentage}%)`}
      </em>
    </footer>
  );
}
