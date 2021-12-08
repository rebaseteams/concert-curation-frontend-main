/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react';
import _ from 'lodash';
import {
  Layout, Button, Result, Row, Col, Table, Space, Empty, message, Modal, Tooltip,
} from 'antd';
import { Link } from 'react-router-dom';

// Components
import ConcertsTable from '../../components/ConcertsTable';
import CurateConcertModal from '../../components/CurateConcertModal';

// Services and utils
import services from '../../services';
import { Documents } from '../../../model/types/document/addDocument';

// styles
import './dashboard.style.scss';
import IconRenderer from '../../components/IconRenderer';
import CollaborationForm from '../../components/CollaborationForm/collaborationForm';
import { UseGetConcerts, useGetConcerts as defaultUseGetConcerts } from '../../../hooks/useGetConcerts';

const { Content } = Layout;

export interface CreateDashboardComponentProps {
  useGetConcerts?: UseGetConcerts
}

export function createDashboardComponent({
  useGetConcerts = defaultUseGetConcerts,
}: CreateDashboardComponentProps): () => JSX.Element | null {
  return function DashboardComponent() {
    const [displayFormModal, setDisplayFormModal] = useState(false);
    const [collaborationModal, setCollaborationModal] = useState(false);
    const [loadingForDocuments, setLoadingForDocuments] = useState(false);
    const [documents, setDocuments] = useState<Array<Documents>>([]);

    const {
      loadingForConcerts, error, forms, getRecommendations,
    } = useGetConcerts();

    const getDocuments = async () => {
      setLoadingForDocuments(true);
      const documentsResponse = await services.Documents.getDocuments();
      if (documentsResponse.error) {
        // setError({ status: documentsResponse.status, message: documentsResponse.message });
      } else if (documentsResponse.data && documentsResponse.data.data) {
        setDocuments(documentsResponse.data.data);
      }
      setLoadingForDocuments(false);
    };

    useEffect(() => {
      getDocuments();
    }, []);

    const renderConcerts = ():
    JSX.Element => (
      <ConcertsTable
        forms={forms}
        concertLoading={loadingForConcerts}
        getConcerts={getRecommendations}
      />
    );

    if (error) {
      return (
        <Result
          status={500}
          title={error.status}
          subTitle={error.message}
        />
      );
    }

    // eslint-disable-next-line max-len
    const renderDocuments = (document: Array<Documents>): JSX.Element => {
      const columns = [
        {
          title: 'Document Name',
          dataIndex: 'documentName',
          key: 'documentName',
        // render: text => <a>{text}</a>,
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Action',
          key: 'action',
          dataIndex: 'action',
          render: (documentId: string) => (
            <Space size="middle">
              <Link to={`/editor/${documentId}`}>
                view document
              </Link>
              <Button type="link" onClick={() => deleteDocument(documentId, getDocuments)}>delete</Button>
            </Space>
          ),
        },
      ];

    type TableData = {
      key: string,
      documentName: string,
      date: string,
      action: string
    }

    try {
      const data: Array<TableData> = _.map(document, (doc: Documents) => ({
        key: doc.id,
        documentName: doc.name,
        date: doc.createdOn.split('T')[0],
        action: doc.id,
      }));
      return (<Table loading={loadingForDocuments} columns={columns} dataSource={data} />);
    } catch (err) {
      return <Empty />;
    }
    };

    return (
      <Content style={{ height: '88vh', overflowY: 'auto', marginTop: '10px' }}>
        <Modal
          bodyStyle={{
            height: '500px',
            overflowY: 'auto',
          }}
          centered
          visible={collaborationModal}
          onCancel={() => setCollaborationModal(false)}
          width={800}
          footer={false}
        >
          <CollaborationForm recommendationId="8636864" />
        </Modal>
        <CurateConcertModal
          setDisplayFormModal={setDisplayFormModal}
          displayFormModal={displayFormModal}
          forms={forms}
        />
        <Row>
          <Col md={{ span: 24 }}>
            <div className="row-flex width-md">
              <h4 className="text-size-3" style={{ marginRight: '20px' }}>Concert List</h4>
              <Tooltip overlay="New Concert">
                <Button data-testid="curate-concert" onClick={() => setDisplayFormModal(true)}>
                  { IconRenderer('add') }
                </Button>
              </Tooltip>
              <Tooltip overlay="Refresh">
                <Button type="text" onClick={() => getRecommendations()}>
                  { IconRenderer('refresh') }
                </Button>
              </Tooltip>
            </div>
            { renderConcerts() }
          </Col>

          <Col md={{ span: 24 }}>
            <div className="width-md">
              <div className="row-flex">
                <h4 className="text-size-3" style={{ marginRight: '20px' }}>Documents</h4>
                <Tooltip overlay="New Document">
                  <Button onClick={() => setCollaborationModal(true)}>
                    { IconRenderer('add') }
                  </Button>
                </Tooltip>
                <Tooltip overlay="Refresh">
                  <Button type="text" onClick={() => getDocuments()}>
                    { IconRenderer('refresh') }
                  </Button>
                </Tooltip>
              </div>
              <div>
                { renderDocuments(documents) }
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    );
  };
}

const deleteDocument = (documentId: string, getDocuments: () => Promise<void>) => {
  Modal.confirm({
    title: 'Delete document',
    content: 'Are you sure?',
    okText: 'Yes',
    onOk: () => confirmDelete(),
    cancelText: 'No',
  });
  const confirmDelete = async () => {
    const response = await services.Documents.deleteDocument(documentId);
    if (response.error) {
      message.error('failed delete document');
      return;
    }
    if (response.data && response.data.success) {
      message.success('delete success');
      getDocuments();
      return;
    }
    message.error('something went wrong');
  };
};
