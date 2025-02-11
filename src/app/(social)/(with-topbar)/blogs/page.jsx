import { Col, Container, Row } from 'react-bootstrap';
import LatestBlogs from './components/LatestBlogs';
import SidePenal from './components/SidePenal';
import Footer from './components/Footer';
export const metadata = {
  title: 'Blogs'
};
const Blogs = () => {
  return <>
      <main>
        <Container>
          <Row className="g-4">
            <Col lg={8}>
              <LatestBlogs />
            </Col>
            <Col lg={4}>
              <Row className="g-4">
                <SidePenal />
              </Row>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </>;
};
export default Blogs;