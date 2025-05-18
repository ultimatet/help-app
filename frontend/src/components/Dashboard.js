import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth0();

  const [userRole, setUserRole] = useState(null); // role fetched from backend
  const [questions, setQuestions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ question_text: "", category: "", choices: [] });
  const [error, setError] = useState("");

  // Fetch user role from backend after authentication
  useEffect(() => {
      const fetchRole = async () => {
          if (isAuthenticated && user?.email) {
              try {
                  const encodedEmail = encodeURIComponent(user.email); // handle @
                  const response = await fetch(
                      `http://localhost:5000/user/auth0_email/${encodedEmail}`
                  );
                  const data = await response.json();

                  if (response.ok) {
                      setUserRole(data.role);
                  } else {
                      console.error("Error fetching role:", data.error);
                  }
              } catch (error) {
                  console.error("API error:", error);
              }
          }
      };

      fetchRole();
  }, [isAuthenticated, user]);

  // Role verification
  useEffect(() => {
    if (isAuthenticated && userRole !== "admin") {
      setError("Access denied: Admins only.");
    } else {
      setError("");
    }
  }, [isAuthenticated, userRole]);

  //Fetch questions only if admin
  useEffect(() => {
    if (isAuthenticated && userRole === "admin") {
      axios.get("http://localhost:5000/question").then((res) => setQuestions(res.data));
    }
  }, [isAuthenticated, userRole]);

  const handleEdit = (q) => {
    setEditing(q.id);
    setForm({
      question_text: q.question_text,
      category: q.category,
      choices: q.choices ? q.choices.map((c) => ({ ...c })) : [],
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/question/${id}`)
      .then(() => {
        setQuestions(questions.filter((q) => q.id !== id));
        setForm({ question_text: "", category: "", choices: [] });
        setEditing(null);
      })
      .catch((err) => {
        console.error("Error deleting question:", err);
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChoiceChange = (idx, value) => {
    const newChoices = [...form.choices];
    newChoices[idx].choice_text = value;
    setForm({ ...form, choices: newChoices });
  };

  const addChoice = () => {
    setForm({ ...form, choices: [...form.choices, { choice_text: "" }] });
  };

  const removeChoice = (idx) => {
    const newChoices = form.choices.filter((_, i) => i !== idx);
    setForm({ ...form, choices: newChoices });
  };

  const handleSubmit = (e) => {
    
  };

  if (error) return <div className="dashboard-error">{error}</div>;
  if (!isAuthenticated || userRole !== "admin") return null;

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <form 
      onSubmit={handleSubmit} 
      className="dashboard-form">
        <input
          name="question_text"
          value={form.question_text}
          onChange={handleChange}
          placeholder="Question text"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <div className="dashboard-choices">
          <b>Choices:</b>
          {form.choices.map((c, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
              <input
                value={c.choice_text}
                onChange={(e) => handleChoiceChange(idx, e.target.value)}
                placeholder={`Choice ${idx + 1}`}
                required
              />
              <button type="button" className="remove-btn" onClick={() => removeChoice(idx)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addChoice}>
            Add Choice
          </button>
        </div>
        <button type="submit">{editing ? "Update" : "Add"} Question</button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setForm({ question_text: "", category: "", choices: [] });
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <h3>All Questions</h3>
      <ul className="dashboard-list">
        {questions.map((q) => (
          <li key={q.id}>
            <b>{q.question_text}</b> <i>({q.category})</i>
            <ul>{q.choices && q.choices.map((c, i) => <li key={i}>{c.choice_text}</li>)}</ul>
            <button onClick={() => handleEdit(q)}>Edit</button>
            <button onClick={() => handleDelete(q.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
