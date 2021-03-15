const React = require("react");

/**useState----------
 * updating count using useState hook
 */

// const { useState } = React;

// const ToDo = () => {
//   const [count, setCount] = useState(0);

//   const increment = () => {
//     setCount((currentCount) => {
//       return currentCount + 1;
//     });
//   };
//   const decrement = () => {
//     setCount((currentCount) => {
//       return currentCount - 1;
//     });
//   };
//   return (
//     <>
//       <button onClick={decrement}>-</button>
//       {count}
//       <button onClick={increment}>+</button>
//     </>
//   );
// };

/**useReducer----------
 * updating count using useReducer hook
 */

const { useReducer, useState } = React;

//action constants
const ACTIONS = {
  ADD_TODO: "ADD_TODO",
  DELETE_TODO: "DELETE_TODO",
  MARK_DONE: "MARK_DONE",
};

//action creators (function)
const addToDo = (data) => ({ type: ACTIONS.ADD_TODO, payload: data });
const deleteToDo = (id) => ({ type: ACTIONS.DELETE_TODO, payload: id });
const markDone = (id) => ({ type: ACTIONS.MARK_DONE, payload: id });

const reducer = (todos, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, action.payload];
      break;
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id != action.payload);
      break;
    case ACTIONS.MARK_DONE:
      return todos.map((todo) => {
        if (todo.id == action.payload) {
          todo.complete = !todo.complete;
        }
        return todo;
      });
      break;
    default:
      return todos;
  }
};
const ToDo = () => {
  //useReducer accepts (a reducer, and the default state)
  //useReducer returns [a state, and the dispatch]
  const [state, dispatch] = useReducer(reducer, []);

  //useState accepts (a default state)
  //useState returns [the state, and the setterFunction of that state]
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(() => e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addToDo({ name: input, id: Date.now(), complete: false }));
    setInput("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="your todo"
          onChange={handleChange}
          value={input}
        ></input>
        <button type="submit">Add</button>
      </form>
      <ul>
        {state.map((todo, i) => {
          return (
            <li key={i} style={{ background: todo.complete && "#abc" }}>
              {todo.name}
              <button
                onClick={() => {
                  dispatch(deleteToDo(todo.id));
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  dispatch(markDone(todo.id));
                }}
              >
                Mark Done
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
module.exports = ToDo;
