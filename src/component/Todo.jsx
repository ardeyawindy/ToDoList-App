import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, deleteTodo, editTodo, showAll, showActive, showCompleted } from "../redux/actions/actions";
import { Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";

function Todo() {
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
        <div className="text-center fs-2 mt-5 mb-3 fw-bold">To Do List</div>
        {/* input data */}
        <div>
          <Row className="justify-content-center">
            <Col xs={6} md={5} className="d-flex justify-content-center">
              <Form.Control type="text" value={newTodo} onChange={handleInputChange} placeholder="What to do" />
              <div className="mx-2">
                <Button variant="primary" onClick={handleAddTodo}>
                  Add
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        {/* button */}
        <div className="mt-3 d-flex justify-content-center">
          <Button className="me-2 rounded-4" variant={filter === "SHOW_ALL" ? "primary" : "light"} onClick={handleFilterAll}>
            All
          </Button>
          <Button className="me-2 rounded-4" variant={filter === "SHOW_ACTIVE" ? "primary" : "light"} onClick={handleFilterActive}>
            Active
          </Button>
          <Button className="rounded-4" variant={filter === "SHOW_COMPLETED" ? "primary" : "light"} onClick={handleFilterCompleted}>
            Completed
          </Button>
        </div>
        {/* penampil data */}
        <ListGroup>
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
              <ListGroup.Item key={todo.id} className="d-flex align-items-center">
                <input type="checkbox" checked={todo.completed} onChange={() => handleToggleTodo(todo.id)} />
                {editTodoId === todo.id ? (
                  <div className="d-flex align-items-center">
                    <input type="text" value={editTodoText} onChange={handleEditInputChange} />
                    <Button variant="primary" onClick={handleSaveEdit}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    <span>{todo.text}</span>
                    <Button variant="link" onClick={() => handleEditTodo(todo)}>
                      <PencilSquare /> {/* Ikon Edit */}
                    </Button>
                  </div>
                )}
                <Button variant="link" onClick={() => handleDeleteTodo(todo.id)}>
                  <Trash /> {/* Ikon Delete */}
                </Button>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Container>
    </div>
  );
}

export default Todo;
