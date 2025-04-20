import { useState, useEffect } from 'react';
import './styles/App.css';

function App() {
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem("expenses");
    return stored ? JSON.parse(stored) : [];
  });

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

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

    setExpenses(prev => [...prev, expenseObj]);

    // Reset form
    setName("");
    setAmount("");
    setCategory("");
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
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button onClick={addExpense}>Add Expense</button>

      <ul>
        {expenses.map(exp => (
          <li key={exp.id}>
            {exp.name} - ${exp.amount} [{exp.category}]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
