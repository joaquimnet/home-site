import styled from 'styled-components';

export const Page = styled.div`
  min-height: calc(100vh - 5rem);
  max-width: 900px;
  margin: auto;
  padding: 1rem 4rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  animation: fadein 1s;

  & h1 {
    margin-bottom: 1rem;
  }

  & p {
    font-size: 1.2rem;
  }

  //@media only screen and (max-width: 1360px) {
  //  padding: 1rem 4rem;
  //}

  @media only screen and (max-width: 1000px) {
    padding: 1rem 2rem;
  }

  @media only screen and (max-width: 768px) {
    padding: 1rem 1.5rem;
  }

  @media only screen and (max-width: 400px) {
    padding: 1rem 0.5rem;
  }
`;
