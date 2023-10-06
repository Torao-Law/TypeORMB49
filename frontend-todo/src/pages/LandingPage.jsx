import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import LoginCard from '../components/CardLogin';
import RegisterCard from '../components/CardRegister';

const LandingPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  const toggleAuthMode = () => {
    setIsRegister(!isRegister);
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col sm={6}>
          {/* Konten menarik */}
          <h1>Selamat Datang di Situs Kami</h1>
          <p>Ini adalah deskripsi dari konten menarik di sini.</p>
        </Col>
        <Col sm={6}>
          {/* Kartu Login atau Register */}
          {isRegister ? <RegisterCard toLogin={toggleAuthMode} isRegis={isRegister} /> : <LoginCard toRegis={toggleAuthMode} isLogin={isRegister} />}
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
