/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Row,
  Col,
  notification,
} from 'antd';
import { PDFExport } from '@progress/kendo-react-pdf';
import * as _ from 'lodash';
import { ConcertDataResponse } from '../../interfaces/concertDataResponse';
import getRecommendedArtists from '../../services/getRecommendedArtists';
import ConcertData from './concertData';
import ArtistPieChart from './ArtistPieChart/ArtistPieChart';
import { ArtistsDataInterface } from '../RecomendationComponent/recomendedDataInterface';
import ErrorPage from '../ErrorPage';
import patchRecommendationArtist from '../../services/patchRecommendationArtist';
import ArtistsSummary from './ArtistsSummary';
import DownloadAsImageButton from '../Buttons/downloadAsImageButton';

// styles
import './recommendationPage.scss';
import DownloadAsPdfButton from '../Buttons/pdfCreateButton';

const renderSummary = (artistsData: Array<ArtistsDataInterface>) => _.times(4, (n) => (
  <ArtistsSummary key={n} summary={artistsData[n].summary} artistName={artistsData[n].artistName} />));

const RecommendationPage = (): JSX.Element => {
  const { id }: { id: string } = useParams();
  const [concertData, setConcertData] = useState<ConcertDataResponse>();
  const [artistsData, setArtistsData] = useState<Array<ArtistsDataInterface>>([]);
  const [error, setError] = useState<{status: string, message: string}>();
  const userID = '1234589';

  const pdfExportComponent = React.useRef<PDFExport>(null);

  const downloadPdf = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  const getConcertData = async () => {
    const data = await getRecommendedArtists(id);
    if (!data.success) {
      setError({ status: '404', message: data.data.error });
    }
    setConcertData(data.data.concertData);
    setArtistsData(data.data.artists);
  };

  // eslint-disable-next-line react/jsx-no-bind
  async function patchConcertData(discardedArtistId: string) {
    await patchRecommendationArtist(id, discardedArtistId, userID);
    getConcertData();
  }

  useEffect(() => {
    getConcertData();
  }, [artistsData]);

  const downloadImage = () => {
    notification.info({
      message: 'Under Developement',
      description: 'This feature is under developement',
      placement: 'bottomRight',
    });
  };

  if (error) {
    return (
      <ErrorPage error={error} />
    );
  }
  return (
    <div>
      <div className="recommendation-page-header">
        <DownloadAsImageButton downloadImage={downloadImage} />
        <DownloadAsPdfButton downloadPdf={downloadPdf} />
      </div>
      <PDFExport
        ref={pdfExportComponent}
        scale={0.4}
        paperSize="auto"
        margin={20}
        fileName={`ReccomendationFor${id}`}
      >
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 4 }}>
            { concertData && <ConcertData data={concertData} /> }
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            { artistsData.length > 0 && <ArtistPieChart data={artistsData} patchConcertData={patchConcertData} />}
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            <div className="summary-container">
              <h3>Summary</h3>
              <div>
                { artistsData.length > 0 && renderSummary(artistsData) }
              </div>
            </div>
          </Col>
        </Row>
      </PDFExport>
    </div>
  );
};

export default RecommendationPage;
