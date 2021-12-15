import { Empty, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { Documents } from '../../../../model/types/document/addDocument';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderDocumentList = (documents: Array<Documents>): any => {
  if (!documents || documents.length <= 0) {
    return <Empty />;
  }
  return (
    documents.map((doc) => (
      <>
        <Row>
          <Col xs={{ span: 8 }}>
            <h5>{doc.name}</h5>
          </Col>
          <Col xs={{ span: 8 }}>
            <h5>{doc.createdOn.split('T')[0]}</h5>
          </Col>
          <Col xs={{ span: 8 }}>
            <Link to={`/editor/${doc.id}`}>view</Link>
          </Col>
        </Row>
      </>
    )));
};

export default renderDocumentList;
