import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Switch,
  Layout,
  Space,
  Tag,
  Typography,
  Tooltip,
  Empty,
  Result,
  message,
  Button,
} from 'antd';
import { PDFExport } from '@progress/kendo-react-pdf';
import * as _ from 'lodash';

// Importing Services and utils
// import patchRecommendationArtist from '../../../services/patchRecommendationArtist';
import services from '../../services';
import { Questions } from '../../../model/types/questions';

// Importing Components and Pages
import ConcertData from './concertData';
import ArtistPieChart from './ArtistPieChart/ArtistPieChart';
import ArtistsSummary from '../../components/ArtistsSummary';
import IconRenderer from '../../components/IconRenderer';
// import DownloadAsPdfButton from '../../components/Buttons/pdfCreateButton';
import CardView from './cardView';
import { ARec } from '../../../model/types/artist-recommendation';

// Importing styles
import './recommendationPage.scss';
import { DownloadService } from '../../../services/download.service';

const { Content } = Layout;

const { Title } = Typography;

const renderSummary = (artistsData: Array<ARec>, view: string) => {
  let count = 4;
  if (view === 'card') {
    count = 3;
  }
  return _.times(count, (n) => (
    <ArtistsSummary
      key={n}
      summary={artistsData[n].summary}
      artistName={artistsData[n].artistName}
    />
  ));
};

export type CreateRecommendationPageProps = {
  downloadService: DownloadService;
};

export function createRecommendationPage({
  downloadService,
}: CreateRecommendationPageProps): () => JSX.Element | null {
  return function RecommendationPage(): JSX.Element {
    const { recommendationId } = useParams();
    const [concertData, setConcertData] = useState<Questions>();
    const [artistsData, setArtistsData] = useState<Array<ARec>>([]);
    const [artistsView, setArtistsView] = useState<{
      name: string;
      toggleBtn: boolean;
    }>({
      name: 'pie',
      toggleBtn: true,
    });
    const [error, setError] = useState<{ status: string; message: string }>();

    const pdfExportComponent = React.useRef<PDFExport>(null);

    const downloadPdf = () => {
      if (pdfExportComponent.current) {
        pdfExportComponent.current.save();
      }
    };

    if (!recommendationId) {
      return <Empty />;
    }

    const getConcertData = async () => {
      const response = await services.ArtistRecommendation.getRecommendation(
        recommendationId,
      );
      if (!response) {
        setError({ status: '404', message: 'Internal Error' });
        return;
      }
      if (response.error) {
        setError({
          status: String(response.status),
          message: response.message,
        });
        return;
      }
      if (response.data) {
        setConcertData(response.data.concertData);
        setArtistsData(response.data.artists);
      }
    };

    // eslint-disable-next-line react/jsx-no-bind
    async function patchConcertData(discardedArtistId: string) {
      // await patchRecommendationArtist(id, discardedArtistId, userID);
      const patchData = {
        id: recommendationId || '',
        artistId: discardedArtistId,
      };
      const response = await services.ArtistRecommendation.discardArtist(
        patchData,
      );
      if (response.error) {
        message.error("Can't delete artist now!");
        return;
      }
      message.success('Artist discarded');
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

    if (error) {
      return (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={(
            <Link to="/" type="primary">
              Back Home
            </Link>
          )}
        />
      );
    }

    if (!concertData) {
      return <Empty />;
    }

    const renderRecommendationContainer = (): JSX.Element => (
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
                  recommendationId={recommendationId}
                  // eslint-disable-next-line react/jsx-no-bind
                  patchConcertData={patchConcertData}
                />
              )}
            </div>
          ) : (
            <Row className="card-container" align="bottom">
              {artistsData.length > 0 && (
                <CardView
                  data={artistsData.slice(0, 3)}
                  recommendationId={recommendationId}
                />
              )}
            </Row>
          )}
        </Col>

        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <div className="summary-container">
            <h3>Summary</h3>
            <div>
              {artistsData.length > 0
                && renderSummary(artistsData, artistsView.name)}
            </div>
          </div>
        </Col>
      </Row>
    );

    return (
      <Layout id="recommendation-page" className="recommendation-page">
        <Content
          id="recommendation-page-header"
          className="recommendation-page-header justify-between"
        >
          <Space>
            <Link color="#FFF" to="/">
              {IconRenderer('back')}
            </Link>
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
            <Tooltip placement="top" title="Download image" color="aqua">
              <Button
                type="text"
                onClick={() => downloadService.downloadImage({
                  elementId: 'recommendation-page',
                  imageName: 'Concert-Curation.png',
                })}
                data-testid="download-image"
              >
                <span
                  className="material-icons"
                  style={{
                    color: 'aqua',
                  }}
                >
                  image
                </span>
              </Button>
            </Tooltip>
            <Tooltip
              placement="top"
              title="Download Pdf"
              color="orange"
            >
              <Button
                type="text"
                onClick={() => downloadService.downloadPdf({
                  pdfName: 'Recommendaton.pdf',
                  content: renderRecommendationContainer(),
                })}
                data-testid="download-pdf"
              >
                <span
                  className="material-icons"
                  style={{
                    color: 'orange',
                  }}
                >
                  picture_as_pdf
                </span>
              </Button>
            </Tooltip>
            {/* <DownloadAsPdfButton downloadPdf={downloadService.downloadPdf({
              pdfName: 'Recommendaton.pdf',
              content: renderRecommendationContainer(),
            })}
            /> */}
          </div>
        </Content>
        <Content className="recommendation-page-body">
          {/* <PDFExport
            ref={pdfExportComponent}
            scale={0.4}
            paperSize="auto"
            margin={20}
            fileName={`ReccomendationFor${recommendationId}`}
          >
            { renderRecommendationContainer() }
          </PDFExport> */}
          { renderRecommendationContainer() }
        </Content>
      </Layout>
    );
  };
}
