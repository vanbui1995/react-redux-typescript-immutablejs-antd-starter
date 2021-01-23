import * as React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { TodoSelectors } from 'redux/todo';

export function HomePage() {
  const todos = useSelector(TodoSelectors.getCurrentTodosBySelectedTodo);
  console.log('Get all todos belong to Daily category: ', { todos });
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>HomePage container</span>
    </>
  );
}
