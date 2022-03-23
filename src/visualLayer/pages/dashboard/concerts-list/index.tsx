import { Button, Result, Tooltip } from 'antd';
import { useState } from 'react';
import { GetConcert } from '../../../../hooks/useGetConcerts';
import { BrandsInterface } from '../../../../model/interfaces/brands';
import { EventsTypeInterface } from '../../../../model/interfaces/eventsType';
import { VenuesInterface } from '../../../../model/interfaces/venues';
import { RecommendtionValidation } from '../../../../model/types/artist-recommendation';
import { QuestionsUI } from '../../../../model/types/questions';
import { AddRecommendationResponse, DeleteRecommendationResponse, ValidateRecommendationFieldsResponse } from '../../../../model/types/service-response';
import { ConcertsTable } from '../../../components/ConcertsTable';
import CurateConcertModal from '../../../components/CurateConcertModal';
import IconRenderer from '../../../components/IconRenderer';

export type CreateRenderChartProps = {
  getConcert: GetConcert;
  deleteRecommendation: (id: string) => Promise<DeleteRecommendationResponse>;
  addNewRecommendation(concertData : QuestionsUI): Promise<AddRecommendationResponse>;
  validateRecommendationFields(fields: RecommendtionValidation)
  : Promise<ValidateRecommendationFieldsResponse>;
  venuesService: VenuesInterface;
  eventsTypeService: EventsTypeInterface;
  brandsService: BrandsInterface,

};

export function createRenderConcerts({
  getConcert,
  deleteRecommendation,
  addNewRecommendation,
  validateRecommendationFields,
  venuesService,
  eventsTypeService,
  brandsService,
}: CreateRenderChartProps): () => JSX.Element | null {
  return function ConcertList(): JSX.Element | null {
    const {
      loadingForConcerts, getRecommendations, forms, error,
    } = getConcert;
    const [displayFormModal, setDisplayFormModal] = useState(false);

    if (error) {
      return (
        <Result status={500} title={error.status} subTitle={error.message} />
      );
    }

    return (
      <>
        <CurateConcertModal
          setDisplayFormModal={setDisplayFormModal}
          displayFormModal={displayFormModal}
          forms={forms}
          addNewRecommendation={addNewRecommendation}
          validateRecommendationFields={validateRecommendationFields}
          venuesService={venuesService}
          eventsTypeService={eventsTypeService}
          brandsService={brandsService}
        />
        <div className="row-flex width-md">
          <h4 className="text-size-3" style={{ marginRight: '20px' }}>
            Concert List
          </h4>
          <Tooltip overlay="New Concert">
            <Button
              data-testid="curate-concert"
              onClick={() => setDisplayFormModal(true)}
            >
              {IconRenderer('add')}
            </Button>
          </Tooltip>
          <Tooltip overlay="Refresh">
            <Button type="text" onClick={() => getRecommendations()}>
              {IconRenderer('refresh')}
            </Button>
          </Tooltip>
        </div>
        <ConcertsTable
          forms={forms}
          concertLoading={loadingForConcerts}
          getConcerts={getRecommendations}
          deleteRecommendation={deleteRecommendation}
        />
      </>
    );
  };
}
