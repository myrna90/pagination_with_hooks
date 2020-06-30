import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";

const Pagination = () => {
  const initialState = {
    todo: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"],
    currentPage: 1,
    todosPerPage: 3,
    indexOfLastTodo: undefined,
    indexOfFirstTodo: undefined,
    currentTodos: undefined,
    pageNumber: []
  };

  const todoReducer = (state, action) => {
    switch (action.type) {
      case "SET_LAST_INDEX":
        return {
          ...state,
          indexOfLastTodo: action.lastIndex
        };
      case "SET_FIRST_INDEX":
        return {
          ...state,
          indexOfFirstTodo: action.firstIndex
        };
      case "SET_CURRENT_TODO":
        return {
          ...state,
          currentTodos: action.currentTodo
        };
      case "SET_PAGE_NUMBERS":
        return {
          ...state,
          pageNumber: action.resultpageNumbers
        };
      case "SET_CURRENT_PAGE":
        return {
          ...state,
          currentPage: action.currentPage
        };
      default:
        return { state };
    }
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);

  console.log("estado inicial", state);

  useEffect(() => {
    if (state.currentPage && state.todosPerPage) {
      const lastIndex = state.currentPage * state.todosPerPage;
      dispatch({ type: "SET_LAST_INDEX", lastIndex });
    }
  }, [state.currentPage, state.todosPerPage]);

  useEffect(() => {
    if (state.indexOfLastTodo && state.todosPerPage) {
      const firstIndex = state.indexOfLastTodo - state.todosPerPage;
      dispatch({ type: "SET_FIRST_INDEX", firstIndex });
    }
  }, [state.indexOfLastTodo, state.todosPerPage]);

  useEffect(() => {
    if (
      state.indexOfFirstTodo !== undefined &&
      state.indexOfLastTodo &&
      state.todo.length > 0
    ) {
      const currentTodo = state.todo.slice(
        state.indexOfFirstTodo,
        state.indexOfLastTodo
      );
      dispatch({ type: "SET_CURRENT_TODO", currentTodo });
    }
  }, [state.indexOfFirstTodo, state.indexOfLastTodo, state.todo]);

  useEffect(() => {
    console.log("number page", state.todo, state.todosPerPage);
    if (state.todo && state.todosPerPage) {
      const resultpageNumbers = [];
      for (
        let i = 1;
        i <= Math.ceil(state.todo.length / state.todosPerPage);
        i++
      ) {
        resultpageNumbers.push(i);
      }
      dispatch({ type: "SET_PAGE_NUMBERS", resultpageNumbers });
    }
  }, [state.todo, state.todosPerPage]);

  const handleClick = e => {
    dispatch({ type: "SET_CURRENT_PAGE", currentPage: e.target.id });
  };

  return (
    <div>
      <ul>
        {state.currentTodos &&
          state.currentTodos.map((todo, index) => {
            return <li key={index}>{todo}</li>;
          })}
      </ul>
      <ul className="page-numbers">
        {state.pageNumber &&
          state.pageNumber.map(number => {
            return (
              <li key={number} id={number} onClick={handleClick}>
                {number}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Pagination;