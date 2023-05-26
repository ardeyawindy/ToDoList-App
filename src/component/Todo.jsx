import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, deleteTodo, editTodo, showAll, showActive, showCompleted } from "../redux/actions";
import { Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import "./Todo.css";

function Todo() {
  useEffect(() => {
    document.title = "To Do List";
  }, []);

  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleEditInputChange = (event) => {
    setEditTodoText(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch(
        addTodo({
          id: Date.now(),
          text: newTodo,
          completed: false,
        })
      );
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (todo) => {
    setEditTodoId(todo.id);
    setEditTodoText(todo.text);
  };

  const handleSaveEdit = () => {
    if (editTodoText.trim() !== "") {
      dispatch(
        editTodo({
          id: editTodoId,
          text: editTodoText,
        })
      );
      setEditTodoId(null);
      setEditTodoText("");
    }
  };

  const handleFilterAll = () => {
    dispatch(showAll());
  };

  const handleFilterActive = () => {
    dispatch(showActive());
  };

  const handleFilterCompleted = () => {
    dispatch(showCompleted());
  };

  return (
    <div>
      <Container>
        {/* title */}
        <h2 className="text-center fs-2 mt-5 mb-5 fw-bold">What's the plan for today?</h2>
        {/* input data */}
        <div>
          <Row className="justify-content-center">
            <Col xs={12} md={6} className="d-flex justify-content-center">
              <Form.Control type="text" value={newTodo} onChange={handleInputChange} placeholder="What to do" />
              <div className="mx-2">
                <Button variant="primary" onClick={handleAddTodo} style={{ backgroundColor: "#BA90C6", border: "none" }}>
                  Add
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        {/* button */}
        <div className="mt-3 d-flex justify-content-center">
          <Button className={`me-2 rounded-5 ${filter === "SHOW_ALL" ? "button-active" : "button-inactive"}`} onClick={handleFilterAll} style={{ fontSize: "14px", padding: "5px 10px", border: "none" }}>
            All
          </Button>
          <Button className={`me-2 rounded-5 ${filter === "SHOW_ACTIVE" ? "button-active" : "button-inactive"}`} onClick={handleFilterActive} style={{ fontSize: "14px", padding: "5px 10px", border: "none" }}>
            Active
          </Button>
          <Button className={`rounded-5 ${filter === "SHOW_COMPLETED" ? "button-active" : "button-inactive"}`} onClick={handleFilterCompleted} style={{ fontSize: "14px", padding: "5px 10px", border: "none" }}>
            Completed
          </Button>
        </div>

        {/* penampil data */}
        <ListGroup style={{ maxWidth: "550px", margin: "0 auto", marginTop: "20px" }}>
          {todos
            .filter((todo) => {
              if (filter === "SHOW_ACTIVE") {
                return !todo.completed;
              } else if (filter === "SHOW_COMPLETED") {
                return todo.completed;
              } else {
                return true;
              }
            })
            .map((todo) => (
              <ListGroup.Item key={todo.id} className="d-flex align-items-center" style={{ fontSize: "16px" }}>
                <div className="d-flex align-items-center">
                  <input type="checkbox" checked={todo.completed} onChange={() => handleToggleTodo(todo.id)} style={{ marginRight: "10px", transform: "scale(1.5)" }} />

                  {editTodoId === todo.id ? (
                    <div className="d-flex align-items-center">
                      <input type="text" value={editTodoText} onChange={handleEditInputChange} />
                      <Button variant="primary" onClick={handleSaveEdit} className="ms-2" style={{ backgroundColor: "#ba90c6", fontSize: "12px", padding: "5px 10px" }}>
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center">
                      <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.text}</span>
                    </div>
                  )}
                </div>
                <div className="ms-auto">
                  <Button variant="link" onClick={() => handleEditTodo(todo)} style={{ fontSize: "18px", color: "#BA90C6" }}>
                    <PencilSquare />
                  </Button>

                  <Button variant="link" onClick={() => handleDeleteTodo(todo.id)} style={{ fontSize: "18px", color: "#BA90C6" }}>
                    <Trash />
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Container>
    </div>
  );
}

export default Todo;
