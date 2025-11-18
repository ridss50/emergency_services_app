import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xxl};
  text-align: center;
  color: ${props => props.theme.colors.danger};
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ErrorTitle = styled.h2`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <ErrorContainer>
    <ErrorIcon>⚠️</ErrorIcon>
    <ErrorTitle>Something went wrong</ErrorTitle>
    <p>{message}</p>
  </ErrorContainer>
);

export default ErrorMessage;