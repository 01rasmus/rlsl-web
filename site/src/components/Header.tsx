import styled from "styled-components";
import githubLogo from "../assets/GitHub_Invertocat_White.svg";

export default function Header() {

  return (
    <>
      <Container>
        rlsl
        <a href="https://github.com/01rasmus/rlsl" target="_blank" rel="noopener noreferrer"><Image src={githubLogo} /></a>
      </Container>
    </>
  )
}

const Image = styled.img`
  width: 2rem;
  height: 2rem;
`;

const Container = styled.div`
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    font-size: 2rem;
    height: 3rem;
    display: flex;
    align-items: center;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    padding-bottom: 0.2rem;
    justify-content: space-between;
    background: #000000;
    color: #ffffff;
    border-bottom: 1px solid #606060;
`;