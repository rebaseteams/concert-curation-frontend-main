import React from 'react';

import {
  Modal,
} from 'antd';

import ConcertForm from '../concert';
import { ConcertCreationResponse } from '../../model/types/questions';

interface CurateConcertModalProp {
  setDisplayFormModal: React.Dispatch<React.SetStateAction<boolean>>;
  displayFormModal: boolean;
  forms: Array<ConcertCreationResponse> | undefined;
  getConcerts: () => Promise<void>;
}

const CurateConcertModal = ({
  setDisplayFormModal, displayFormModal, forms, getConcerts,
}: CurateConcertModalProp): JSX.Element => (
  <Modal
    title="Choose your prefrences"
    centered
    style={
          {
            padding: '0',
          }
        }
    bodyStyle={
            {
              height: 'calc(100vh - 200px)',
              padding: '0',
              overflowY: 'scroll',
              margin: '0',
            }
          }
    visible={displayFormModal}
    onOk={() => setDisplayFormModal(false)}
    onCancel={() => setDisplayFormModal(false)}
    width={800}
    className="questionsModal"
    footer={false}
  >
    <ConcertForm
      setVisible={setDisplayFormModal}
      forms={forms}
      getConcerts={getConcerts}
    />
  </Modal>
);

export default CurateConcertModal;
