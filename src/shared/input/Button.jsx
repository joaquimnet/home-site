import styled from 'styled-components';

export const Button = styled.button`
  margin: 0 0.5rem;
  padding: 0.25rem 1rem;
  display: inline;
  background: white;
  color: black;
  border: 2px solid black;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    box-shadow: 3px 3px 3px rgba(74, 213, 231, 0.3),
      -2px -2px 2px rgba(231, 74, 74, 0.3);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1.03);
  }
`;
