import { Col, Row } from 'antd';

const Products = (): JSX.Element => (
  <div className="height-100 third-sec">
    <Row className="height-100 row-flex justify-center align-center">
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <div className="column-flex justify-center align-center">
          <span style={{ fontSize: '65px', color: '#6f4' }} className="material-icons">
            analytics
          </span>
          <h4>Heading 1</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Odit nostrum nobis voluptatibus atque minus ducimus doloribus deleniti iure eligendi
          </p>
        </div>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <div className="column-flex justify-center align-center">
          <span style={{ fontSize: '65px', color: '#6f4' }} className="material-icons">
            home
          </span>
          <h4>Heading 2</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Odit nostrum nobis voluptatibus atque minus ducimus doloribus deleniti iure eligendi
          </p>
        </div>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <div className="column-flex justify-center align-center">
          <span style={{ fontSize: '65px', color: '#6f4' }} className="material-icons">
            insights
          </span>
          <h4>Heading 3</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, natus.</p>
        </div>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <div className="column-flex justify-center align-center">
          <span style={{ fontSize: '65px', color: '#6f4' }} className="material-icons">
            bubble_chart
          </span>
          <h4>Heading 4</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, natus.</p>
        </div>
      </Col>
    </Row>
  </div>
);

export default Products;
