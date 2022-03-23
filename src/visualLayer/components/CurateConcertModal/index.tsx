import {
  Modal,
} from 'antd';

import ConcertForm from '../concert';
import { ConcertCreationResponse, QuestionsUI } from '../../../model/types/questions';
import { AddRecommendationResponse, ValidateRecommendationFieldsResponse } from '../../../model/types/service-response';
import { VenuesInterface } from '../../../model/interfaces/venues';
import { EventsTypeInterface } from '../../../model/interfaces/eventsType';
import { BrandsInterface } from '../../../model/interfaces/brands';
import { RecommendtionValidation } from '../../../model/types/artist-recommendation';

interface CurateConcertModalProp {
  setDisplayFormModal: React.Dispatch<React.SetStateAction<boolean>>;
  displayFormModal: boolean;
  forms: Array<ConcertCreationResponse>;
  addNewRecommendation(concertData : QuestionsUI): Promise<AddRecommendationResponse>;
  validateRecommendationFields(fields: RecommendtionValidation)
  : Promise<ValidateRecommendationFieldsResponse>;
  venuesService: VenuesInterface;
  eventsTypeService: EventsTypeInterface;
  brandsService: BrandsInterface;
}

const CurateConcertModal = ({
  setDisplayFormModal,
  displayFormModal,
  forms,
  addNewRecommendation,
  validateRecommendationFields,
  venuesService,
  eventsTypeService,
  brandsService,
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
      validateRecommendationFields={validateRecommendationFields}
      venuesService={venuesService}
      eventsTypeService={eventsTypeService}
      brandsService={brandsService}
    />
  </Modal>
);

export default CurateConcertModal;
