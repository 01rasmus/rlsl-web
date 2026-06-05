import styled from "styled-components";
import Header from "./Header"

export default function Main() {

  return (
    <Container>
      <Header />
      <img src="./favicon.png" height="256px" />
      <ButtonContainer>
        <MainButton>Documentation</MainButton>
        <MainButton>Playground</MainButton>
      </ButtonContainer>
      <TextContainer>
        <p>A custom shader language that simplifies shader creation for multi graphics api backend renderers</p>
      </TextContainer>
    </Container>
  )
}

const TextContainer = styled.div`
  width: 25rem;
  text-align: center;
`;

const Container = styled.div`
  padding-top: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const MainButton = styled.div`
  -webkit-user-select: none;    
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: white;
  font-size: 1.5rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.15rem solid #272727;
  width: 15rem;
  height: 5rem;
  background: #000000;
  transition: 0.2s;
  cursor: none;
  space: 10px;

  &:hover {
     border: 0.15rem solid #89009b;
     cursor: pointer;
  }
`;