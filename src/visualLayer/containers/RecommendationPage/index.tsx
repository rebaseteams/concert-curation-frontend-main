import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Row, Col, notification, Switch,
  Layout, Space, Tag, Typography,
  Tooltip, Empty, Result,
} from 'antd';
import { PDFExport } from '@progress/kendo-react-pdf';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import * as _ from 'lodash';

// Importing Services and utils
import patchRecommendationArtist from '../../../services/patchRecommendationArtist';
import services from '../../services';
import { Questions } from '../../../model/types/questions';

// Importing Components and Pages
import ConcertData from './concertData';
import ArtistPieChart from './ArtistPieChart/ArtistPieChart';
import ArtistsSummary from '../../components/ArtistsSummary';
import IconRenderer from '../../components/IconRenderer';
import DownloadAsImageButton from '../../components/Buttons/downloadAsImageButton';
import DownloadAsPdfButton from '../../components/Buttons/pdfCreateButton';
import CardView from './cardView';
import { ARec } from '../../../model/types/artist-recommendation';

// Importing styles
import './recommendationPage.scss';

const { Content } = Layout;

const { Title } = Typography;

const renderSummary = (artistsData: Array<ARec>, view: string) => {
  let count = 4;
  if (view === 'card') {
    count = 3;
  }
  return (_.times(count, (n) => (
    <ArtistsSummary
      key={n}
      summary={artistsData[n].summary}
      artistName={artistsData[n].artistName}
    />
  )));
};

const RecommendationPage = (): JSX.Element => {
  const { id }: { id: string } = useParams();
  const [concertData, setConcertData] = useState<Questions>();
  const [artistsData, setArtistsData] = useState<Array<ARec>>(
    [],
  );
  const [artistsView, setArtistsView] = useState<{
    name: string;
    toggleBtn: boolean;
  }>({
    name: 'pie',
    toggleBtn: true,
  });
  const [error, setError] = useState<{ status: string; message: string }>();
  const userID = '1234589';

  const pdfExportComponent = React.useRef<PDFExport>(null);

  const downloadPdf = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  const getConcertData = async () => {
    const response = await services.ArtistRecommendation.getRecommendation(id);
    if (!response) {
      setError({ status: '404', message: 'Internal Error' });
      return;
    }
    if (response.error) {
      setError({ status: String(response.status), message: response.message });
      return;
    }
    if (response.data) {
      setConcertData(response.data.concertData);
      setArtistsData(response.data.artists);
    }
  };

  // eslint-disable-next-line react/jsx-no-bind
  async function patchConcertData(discardedArtistId: string) {
    await patchRecommendationArtist(id, discardedArtistId, userID);
    getConcertData();
  }

  const updateView = (view: boolean) => {
    if (view) {
      setArtistsView({ name: 'pie', toggleBtn: true });
      localStorage.setItem('view', 'pie');
    } else {
      setArtistsView({ name: 'card', toggleBtn: false });
      localStorage.setItem('view', 'card');
    }
  };

  useEffect(() => {
    const view: string | null = String(localStorage.getItem('view'));
    if (view === 'pie') {
      setArtistsView({ name: 'pie', toggleBtn: true });
    }
    if (view === 'card') {
      setArtistsView({ name: 'card', toggleBtn: false });
    }
    getConcertData();
  }, []);

  const downloadImage = () => {
    const root = document.getElementById('recommendation-page');
    if (root) {
      // Setting background black to not have transprent
      root.style.background = '#000';
      htmlToImage.toPng(root).then((dataUrl) => {
        download(dataUrl, 'Concert-Curation.png');
      });
      // setting background back to null
      root.style.background = 'null';
      notification.success({
        message: 'File Downloading started',
        description: 'Image will be downloaded withing few minutes.',
        placement: 'bottomRight',
      });
    } else {
      notification.error({
        message: 'File Downloading Failed',
        description: 'Something went wrong',
        placement: 'bottomRight',
      });
    }
  };

  if (error) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to="/" type="primary">Back Home</Link>}
      />
    );
  }

  if (!concertData) {
    return <Empty />;
  }

  return (
    <Layout id="recommendation-page" className="recommendation-page">
      <Content id="recommendation-page-header" className="recommendation-page-header justify-between">
        <Space>
          <Link color="#FFF" to="/">{IconRenderer('back')}</Link>
          <Title level={2}>{concertData.concertName}</Title>
          <Tooltip
            title={`Sponsorship: ${concertData.sponsorshipType}`}
            color="orange"
          >
            <Tag color="orange">
              <span className="text-size-4">
                {IconRenderer(concertData.sponsorshipType)}
              </span>
            </Tag>
          </Tooltip>
          <Tooltip
            title={`Event type: ${concertData.eventType}`}
            color="magenta"
          >
            <Tag color="magenta">
              <span className="text-size-4">{concertData.eventType}</span>
            </Tag>
          </Tooltip>
          <Tooltip
            title={`Budget: $${concertData.artistBudget.min} to $${concertData.artistBudget.max}`}
            color="green"
          >
            <Tag color="green">
              <span className="text-size-4">
                {`$${concertData.artistBudget.min} to $${concertData.artistBudget.max}`}
              </span>
            </Tag>
          </Tooltip>
        </Space>
        <div>
          <DownloadAsImageButton downloadImage={downloadImage} />
          <DownloadAsPdfButton downloadPdf={downloadPdf} />
        </div>
      </Content>
      <Content className="recommendation-page-body">
        <PDFExport
          ref={pdfExportComponent}
          scale={0.4}
          paperSize="auto"
          margin={20}
          fileName={`ReccomendationFor${id}`}
        >
          <Row id="recommendation-page-container">
            <Col xs={{ span: 24 }} lg={{ span: 4 }}>
              {concertData && <ConcertData data={concertData} />}
            </Col>

            <Col xs={{ span: 24 }} lg={{ span: 14 }}>
              <Switch
                checkedChildren={IconRenderer('pie')}
                unCheckedChildren={IconRenderer('card')}
                checked={artistsView.toggleBtn}
                onChange={updateView}
                style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                  zIndex: 100,
                }}
              />
              {artistsView.name === 'pie' ? (
                <div className="pie-container scroll height=100">
                  {artistsData.length > 0 && (
                  <ArtistPieChart
                    data={artistsData}
                    // eslint-disable-next-line react/jsx-no-bind
                    patchConcertData={patchConcertData}
                  />
                  )}
                </div>
              ) : (
                <Row className="card-container" align="bottom">
                  {artistsData.length > 0 && (
                  <CardView data={artistsData.slice(0, 3)} />
                  )}
                </Row>
              )}
            </Col>

            <Col xs={{ span: 24 }} lg={{ span: 6 }}>
              <div className="summary-container">
                <h3>Summary</h3>
                <div>
                  {artistsData.length > 0 && renderSummary(artistsData, artistsView.name)}
                </div>
              </div>
            </Col>
          </Row>
        </PDFExport>
      </Content>
    </Layout>
  );
};

export default RecommendationPage;
