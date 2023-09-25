import styled from 'styled-components';

export const StyledBurger = styled.div<{open: boolean}>`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 25px;
  left: 30px;
  z-index: 20;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  cursor: pointer;
  z-index: 10;
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => open ? '#fff' : '#fff'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }

    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

export const Ul = styled.div<{open: boolean}>`
list-style: none;
display: flex;

flex-flow: column nowrap;
background-color: #D0F4D8;
position: fixed;
transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-65%)'};
top: 0;
left: 0;
height: 100vh;
width: 320px;
padding-top: 3.5rem;
transition: transform 0.3s ease-in-out;

.nomeMenu {
  cursor: pointer;
  color: #000;
  padding: 63px 12px 22px 132px;
}

`;

export const UlIcon = styled.div`
display: flex;
z-index: 9;
flex-flow: column nowrap;
background-color: #119E30;
position: fixed;
top: 0;
left: 0;
height: 100vh;
width: 110px;
padding-top: 3.5rem;

img{
  margin: 3.6rem 0 0 1.5rem;
}
`;

