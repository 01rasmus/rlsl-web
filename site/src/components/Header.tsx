import styled from "styled-components";
import githubLogo from "../assets/GitHub_Invertocat_White.svg";
import { HOME_ROUTE } from "../routes/Home";
import { RouterLink } from "./RouterLink";

export const HEADER_HEIGHT = "3rem";

export default function Header() {
  return (
    <>
      <Container>
        <RouterLink to={HOME_ROUTE}>RLSL</RouterLink>
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
    font-size: 2rem;
    height: ${HEADER_HEIGHT};
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