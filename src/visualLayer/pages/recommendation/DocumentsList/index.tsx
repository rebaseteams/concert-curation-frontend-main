import {
  Empty, Row, Col,
} from 'antd';
import { Link } from 'react-router-dom';
import { Documents } from '../../../../model/types/document/addDocument';
import { renderDocumentModeTab } from '../../../components/DocumentMode';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderDocumentList = (documents: Array<Documents>): any => {
  if (!documents || documents.length <= 0) {
    return <Empty />;
  }
  return (
    <>
      <Row style={{ borderBottom: '1px solid #aaa', marginBottom: '10px' }}>
        <Col xs={{ span: 8 }}>
          Name
        </Col>
        <Col xs={{ span: 6 }}>
          Date
        </Col>
        <Col xs={{ span: 5 }}>
          Status
        </Col>
        <Col xs={{ span: 5 }}>
          Actions
        </Col>
      </Row>
      {
        documents.map((doc) => (
          <div key={doc.id}>
            <Row>
              <Col xs={{ span: 8 }}>
                <h5>{doc.name}</h5>
              </Col>
              <Col xs={{ span: 6 }}>
                <h5>{doc.createdOn.split('T')[0]}</h5>
              </Col>
              <Col xs={{ span: 5 }}>
                { renderDocumentModeTab(doc.mode) }
              </Col>
              <Col xs={{ span: 5 }}>
                <Link to={`/editor/${doc.id}`}>view</Link>
              </Col>
            </Row>
          </div>
        ))
      }
    </>
  );
};

export default renderDocumentList;
