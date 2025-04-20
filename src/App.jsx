import { useState, useEffect } from "react";
import "./styles/App.css";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem("expenses");
    return stored ? JSON.parse(stored) : [];
  });

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Save to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    const expenseObj = {
      name,
      amount: parseFloat(amount), // sanitize number input
      category,
      id: crypto.randomUUID(), // add ID for possible deletion later
    };

    setExpenses((prev) => [...prev, expenseObj]);

    // Reset form
    setName("");
    setAmount("");
    setCategory("");
  };

  const deleteExpense = (id) => {
    const filtered = expenses.filter((exp) => exp.id !== id);
    setExpenses(filtered);
    // localStorage updates automatically via useEffect
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <h1>Budget Tracker</h1>

      <input
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="Housing">Housing</option>
        <option value="Auto">Auto</option>
        <option value="Subscriptions">Subscriptions</option>
        <option value="Food/Groceries">Food/Groceries</option>
      </select>
      <button onClick={addExpense}>Add Expense</button>
      <h3>Filter by Category:</h3>
      <select value={selectedCategory} onChange={handleChange}>
        <option>All</option>
        <option>Housing</option>
        <option>Auto</option>
        <option>Subscriptions</option>
        <option>Food/Groceries</option>
      </select>
      <ul>
        {expenses
          .filter(
            (exp) =>
              selectedCategory === "All" || exp.category === selectedCategory
          )
          .map((exp) => (
            <li key={exp.id}>
              {exp.name} - ${exp.amount} [{exp.category}]
              <button onClick={() => deleteExpense(exp.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
