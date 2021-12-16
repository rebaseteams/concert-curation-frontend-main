import { Col, Row } from 'antd';

const Information = (): JSX.Element => (
  <div className="height-100 second-sec">
    <Row className="height-100 row-flex justify-center align-center">
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <div className="width-100 column-flex justify-center align-center">
          <img
            src="https://leireomadina.github.io/fylo-dark-theme-landing-page/assets/images/illustration-stay-productive.png"
            alt="second"
            style={{ width: '80%' }}
          />
        </div>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <div className="column-flex justify-center width-100 height-100 message-box">
          <h4>
            Stay productive,
            <br />
            wherever you are
          </h4>
          <p>
            Never let location be an issue when accessing your files.
            Fylo has you covered for all of your file storage needs.
            Securely share files and folders with friends,
            family and colleagues for live collaboration. No email attachments required.
          </p>
        </div>
      </Col>
    </Row>
  </div>
);

export default Information;
