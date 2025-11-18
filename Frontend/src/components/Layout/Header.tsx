import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: ${(props) => props.theme.spacing.lg};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.lg};
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  color: white;
  text-decoration: none;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: ${(props) =>
    props.$active ? "rgba(255, 255, 255, 0.2)" : "transparent"};
  transition: background-color 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <HeaderContainer>
      <Nav>
        <Logo>Emergency Services</Logo>
        <NavLinks>
          <NavLink
            to="/ambulances"
            $active={
              location.pathname === "/ambulances" || location.pathname === "/"
            }
          >
            Ambulances
          </NavLink>
          <NavLink to="/doctors" $active={location.pathname === "/doctors"}>
            Doctors
          </NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
