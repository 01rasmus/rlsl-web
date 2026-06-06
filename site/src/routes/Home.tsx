import styled from "styled-components";
import { PLAYGROUND_ROUTE } from "./Playground";
import { DOCUMENTATION_ROUTE } from "./Documentation";
import { RouterLink } from "../components/RouterLink";

export const HOME_ROUTE = "/";

export default function Home() {

  return (
    <Container>
      <img src="./favicon.png" height="256px" />
      <ButtonContainer>
        <RouterLink to={DOCUMENTATION_ROUTE}><MainButton>Documentation</MainButton></RouterLink>
        <RouterLink to={PLAYGROUND_ROUTE}><MainButton>Playground</MainButton></RouterLink>
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
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.15rem solid #272727;
  width: 15rem;
  height: 5rem;
  background: #000000;
  transition: 0.2s;
  cursor: none;

  &:hover {
     border: 0.15rem solid #89009b;
     cursor: pointer;
  }
`;