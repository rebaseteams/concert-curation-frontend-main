import {
  Button,
  Result,
  Tooltip,
  Table,
  Space,
  Empty,
  Modal,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { GetDocument } from '../../../../hooks/useGetDocuments';
import { DeleteDocument } from '../../../../hooks/useDeleteDocument';
import { Documents } from '../../../../model/types/document/addDocument';
import IconRenderer from '../../../components/IconRenderer';
import CollaborationForm from '../../../components/CollaborationForm/collaborationForm';
import { TemplatesInterface } from '../../../../model/interfaces/templates';
import { DocumentsInterface } from '../../../../model/interfaces/documents';

export type CreateRenderDocumentsProps = {
  getDocument: GetDocument;
  useDeleteDocument: DeleteDocument;
  templatesService: TemplatesInterface;
  documentsService: DocumentsInterface;
};

export function createRenderDocuments({
  getDocument,
  useDeleteDocument,
  templatesService,
  documentsService,
}: CreateRenderDocumentsProps): () => JSX.Element | null {
  return function DocumentList(): JSX.Element | null {
    const [collaborationModal, setCollaborationModal] = useState(false);
    const {
      loadingForDocuments, documents, getDocuments, error,
    } = getDocument;

    const { deleteDocument, notification, loadingForDeleteDocument } = useDeleteDocument;

    if (error) {
      return (
        <Result status={500} title={error.status} subTitle={error.message} />
      );
    }

    useEffect(() => {
      if (notification) {
        if (notification.status === 'success') {
          message.success(notification.message);
        }
        if (notification.status === 'error') {
          message.error(notification.message);
        }

        getDocuments();
      }
    }, [notification?.status]);

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
              <Link to={`/editor/${documentId}`}>view document</Link>
              <Button
                type="link"
                onClick={() => {
                  Modal.confirm({
                    title: 'Delete document',
                    content: 'Are you sure?',
                    okText: 'Yes',
                    onOk: () => deleteDocument(documentId),
                    cancelText: 'No',
                  });
                }}
              >
                delete
              </Button>
            </Space>
          ),
        },
      ];

      type TableData = {
        key: string;
        documentName: string;
        date: string;
        action: string;
      };

      try {
        const data: Array<TableData> = _.map(document, (doc: Documents) => ({
          key: doc.id,
          documentName: doc.name,
          date: doc.createdOn.split('T')[0],
          action: doc.id,
        }));
        return (
          <Table
            loading={loadingForDocuments || loadingForDeleteDocument}
            columns={columns}
            dataSource={data}
          />
        );
      } catch (err) {
        return <Empty />;
      }
    };

    useEffect(() => (undefined), [notification]);

    return (
      <>
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
          <CollaborationForm
            recommendationId="8636doudufo864"
            artistId="8b633614-6264-4399-baad-e362db8f4f62"
            templatesService={templatesService}
            documentsService={documentsService}
          />
        </Modal>
        <div className="width-md">
          <div className="row-flex">
            <h4 className="text-size-3" style={{ marginRight: '20px' }}>
              Documents
            </h4>
            <Tooltip overlay="New Document">
              <Button onClick={() => setCollaborationModal(true)}>
                {IconRenderer('add')}
              </Button>
            </Tooltip>
            <Tooltip overlay="Refresh">
              <Button type="text" onClick={() => getDocuments()}>
                {IconRenderer('refresh')}
              </Button>
            </Tooltip>
          </div>
          <div>{renderDocuments(documents)}</div>
        </div>
      </>
    );
  };
}
