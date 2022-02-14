import logo from '../../logo.svg';
import { Button, Container, Row } from 'react-bootstrap';

import NavigationBar from "../Navbar/NavigationBar.js";

function Home() {
  return (
    <Container fluid>
      <Row>
        <NavigationBar />
      </Row>
      <Row>
        <h1>help</h1>
      </Row>
    </Container>
  );
}

export default Home;
