import React from 'react'
import img2 from '../images/nursyease.jpg';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import UpNavbar from '../components/UpNavbar';
const About = () => {
  return (
    <>
    <div>
      <UpNavbar/>
    </div>
    <div>
      <Navbar />
    </div><Container className="mt-3">
        <Row>
          <Col md={7}>
            <h2 style={{ color: "green", fontSize: "2em", fontWeight: "bold", marginBottom: "20px" }}>About Nursyease</h2>
            <p>
              At Nursy Ease, we celebrate the beauty of nature and the tranquility it brings to our lives through an extensive collection of plants. Our passion lies in curating a diverse range of lush greens, vibrant florals, and unique foliage that effortlessly infuse life and positivity into any space.
            </p>
            <Row className="mt-3">
              <Col>
                <Container className="p-3 mb-3" style={{ backgroundColor: '#cefad0' }}>
                  <h3>Our Story</h3>
                  <p>
                    Nursy Ease was born from a shared love for plants and the desire to spread the joys of nurturing green life.
                  </p>
                </Container>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <Container className="p-3 mb-3" style={{ backgroundColor: '#abf7b1' }}>
                  <h3>Our Vision</h3>
                  <p>
                    To create a community-driven space that fosters a deeper connection with nature, where people can discover the therapeutic benefits of plants.
                  </p>
                </Container>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <Container className="p-3 mb-3" style={{ backgroundColor: '	#83f28f' }}>
                  <h3>Our Commitment</h3>
                  <p>
                    Nursy Ease is committed to sustainability and environmental consciousness.
                  </p>
                </Container>
              </Col>
            </Row>
          </Col>

          <Col md={5} className="d-flex justify-content-end align-items-center">
            <img src={img2} style={{ height: '560px', width: '620px', maxWidth: '100%' }} fluid />
          </Col>
        </Row>

      </Container></>
      );
    };
 

export default About