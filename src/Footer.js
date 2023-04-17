
import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    function handleClick(path) {
      navigate(path);
    }
  return (
    <Box>
      <h1 style={{ color: "#d4f6f0", 
                   textAlign: "center", 
                   marginTop: "-50px" }}>
      </h1>
      <Container>
        <Row>
        <Column>
            <Heading>Home</Heading>
            <FooterLink href="#"onClick={() => handleClick("/")}>Home</FooterLink>

          </Column>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="#" onClick={() => handleClick("contact")}>Contact Us</FooterLink>
            <FooterLink href="#" onClick={() => handleClick("about")}>About Us</FooterLink>

          </Column>
          <Column>
            <Heading>Services</Heading>
            <FooterLink href="#" onClick={() => handleClick("calculator")}>Waterfall Calculator</FooterLink>
            <FooterLink href="#" onClick={() => handleClick("comingsoon")}>Coming Soon</FooterLink>
          </Column>
          <Column>
            <Heading>Learning</Heading>
            <FooterLink href="#"onClick={() => handleClick("workflow")}>Work Flow</FooterLink>
            <FooterLink href="#"onClick={() => handleClick("definitions")}>Definitions</FooterLink>
          </Column>
          {/* <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  Youtube
                </span>
              </i>
            </FooterLink>
          </Column> */}
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;