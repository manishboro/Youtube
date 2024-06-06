import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";

const ListItem = ({ title, listItemIndex, handleDeleteItem }) => {
  console.log("hey i am rendering");

  return (
    <div className="item">
      {title}
      <button onClick={() => handleDeleteItem(listItemIndex)}>Delete</button>
    </div>
  );
};

function App() {
  const [item, setItem] = useState("");

  const [items, setItems] = useState([]);

  const handleAddItem = ({ id, title }) => {
    if (!id || !title) return;
    setItem("");
    setItems((items) => [...items, { id, title }]);
  };

  const handleDeleteItem = (index) => {
    setItems((items) => {
      let _items = [...items];
      _items.splice(index, 1);
      return _items;
    });
  };

  return (
    <div className="main">
      <form
        className="input-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddItem({ id: nanoid(), title: item });
        }}
      >
        <input value={item} onChange={(e) => setItem(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      {items.length ? (
        <div className="items-container">
          {items.map((item, idx) => (
            <ListItem
              key={item.id}
              title={item.title}
              listItemIndex={idx}
              handleDeleteItem={handleDeleteItem}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default App;
