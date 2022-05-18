import { Button, Modal } from 'antd';
import { useState } from 'react';
import collaborationImage from '../../../assets/job.png';
import { NewBrandResponse } from '../../../model/types/brand';

const BrandContactDetails = ({ brand }: { brand: NewBrandResponse }): JSX.Element => {
  const [collaborationModal, setCollaborationModal] = useState(false);
  return (
    <div style={{ width: '70%', margin: 'auto' }} className="row-flex ">
      <img
        src={collaborationImage}
        alt="collaboration"
        width={400}
      />
      <div className="width-100 column-flex justify-center align-center">
        <h4 style={{ fontSize: '50px', fontWeight: 100 }}>Collaborate Now</h4>
        <Button style={{ }} type="primary" onClick={() => setCollaborationModal(true)}>Select Template</Button>
      </div>
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
        Contact for Collaboration:
        {brand.contact}
      </Modal>
    </div>
  );
};

export default BrandContactDetails;
