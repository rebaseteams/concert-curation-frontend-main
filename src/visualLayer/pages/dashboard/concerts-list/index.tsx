import { Button, Result, Tooltip } from 'antd';
import { useState } from 'react';
import { GetConcert } from '../../../../hooks/useGetConcerts';
import { ConcertsTable } from '../../../components/ConcertsTable';
import CurateConcertModal from '../../../components/CurateConcertModal';
import IconRenderer from '../../../components/IconRenderer';

export type CreateRenderChartProps = {
  getConcert: GetConcert;
};

export function createRenderConcerts({
  getConcert,
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
        />
      </>
    );
  };
}
