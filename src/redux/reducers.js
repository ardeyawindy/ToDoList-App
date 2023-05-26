import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, EDIT_TODO, SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from "./actions";

const initialState = {
  todos: [],
  filter: "SHOW_ALL",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo)),
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo)),
      };

    case SHOW_ALL:
      return {
        ...state,
        filter: "SHOW_ALL",
      };

    case SHOW_ACTIVE:
      return {
        ...state,
        filter: "SHOW_ACTIVE",
      };

    case SHOW_COMPLETED:
      return {
        ...state,
        filter: "SHOW_COMPLETED",
      };

    default:
      return state;
  }
};

export default rootReducer;
