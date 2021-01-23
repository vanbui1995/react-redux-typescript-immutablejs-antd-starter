import React from 'react';
import { SignInForm } from '..';
import { LoginFormStyled } from './style';

const SignInPage = () => {
  return (
    <LoginFormStyled>
      <div style={{ width: '50%' }}>
        <SignInForm />
      </div>
    </LoginFormStyled>
  );
};

export default SignInPage;
