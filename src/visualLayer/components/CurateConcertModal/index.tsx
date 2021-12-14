import {
  Modal,
} from 'antd';

import ConcertForm from '../concert';
import { ConcertCreationResponse, QuestionsUI } from '../../../model/types/questions';
import { AddRecommendationResponse } from '../../../model/types/service-response';

interface CurateConcertModalProp {
  setDisplayFormModal: React.Dispatch<React.SetStateAction<boolean>>;
  displayFormModal: boolean;
  forms: Array<ConcertCreationResponse>;
  addNewRecommendation(concertData : QuestionsUI): Promise<AddRecommendationResponse>;
}

const CurateConcertModal = ({
  setDisplayFormModal, displayFormModal, forms, addNewRecommendation,
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
      addNewRecommendation={addNewRecommendation}
    />
  </Modal>
);

export default CurateConcertModal;
