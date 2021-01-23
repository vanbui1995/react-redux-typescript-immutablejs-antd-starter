import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { TodoAction, TodoSelectors } from 'redux/todo';

export default function HomePage() {
  const todos = useSelector(TodoSelectors.getCurrentTodosBySelectedTodo);
  const dispatch = useDispatch();
  const handleLoad = () => {
    dispatch(TodoAction.fetchTodo());
  };
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <button onClick={handleLoad}>Load todos</button>
      <code>{`${JSON.stringify(todos)}`}</code>
      <span>HomePage container</span>
    </>
  );
}
