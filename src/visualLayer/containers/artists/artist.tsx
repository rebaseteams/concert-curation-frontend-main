import React, { useState } from 'react';
import {
  PageHeader, Image, Button, Modal,
} from 'antd';
import { useHistory } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import CollaborationForm from '../../components/CollaborationForm/collaborationForm';
import Templates from '../../components/Templates';

const ArtistPage = (): JSX.Element => {
  // const { id }: {id: string} = useParams();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const history = useHistory();
  const [collaborationModal, setCollaborationModal] = useState(false);

  const selectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const redirectBack = () => {
    history.goBack();
  };
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => redirectBack()}
        title="Nick"
        subTitle="Hip hop singer"
        extra={[
          <Button type="primary" onClick={() => setCollaborationModal(true)}>Collaborate</Button>,
        ]}
      />
      <Image
        width={300}
        src="https://randomuser.me/api/portraits/men/15.jpg"
      />
      <Modal
        title={selectedTemplate ? 'Template related questions' : 'Select Template'}
        bodyStyle={{
          height: '300px',
          overflowY: 'auto',
        }}
        centered
        visible={collaborationModal}
        onCancel={() => setCollaborationModal(false)}
        width={600}
        footer={false}
      >
        { selectedTemplate ? (
          <CollaborationForm
            templateId={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
        ) : <Templates selectTemplate={selectTemplate} />}
        {/* <CollaborationForm /> */}
      </Modal>
    </div>
  );
};
export default ArtistPage;
