/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import * as _ from 'lodash';

// Importing Components and Pages
import ConcertData from './concertData';
import ArtistPieChart from './ArtistPieChart/ArtistPieChart';
import ArtistsSummary from '../../components/ArtistsSummary';
import IconRenderer from '../../components/IconRenderer';
import CardView from './cardView';
import { ARec } from '../../../model/types/artist-recommendation';

// Importing styles
import './recommendationPage.scss';
import { DownloadService } from '../../../services/download.service';
import { useGetArtistRecommendation as defaultUseGetArtistRecommendation, UseGetArtistRecommendation } from '../../../hooks/useGetArtistRecommendation';
import { useDiscardArtistRecommendation as defaultUseDiscardArtistRecommendation, UseDiscardArtistRecommendation } from '../../../hooks/useDiscardArtistRecommendation';
import { ArtistRecommendationInterface } from '../../../model/interfaces/artistRecommendation';

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
  useGetArtistRecommendation?: UseGetArtistRecommendation;
  useDiscardArtistRecommendation?: UseDiscardArtistRecommendation;
  artistRecommendation: ArtistRecommendationInterface;
  downloadService: DownloadService;
};

export function createRecommendationPage({
  useGetArtistRecommendation = defaultUseGetArtistRecommendation,
  useDiscardArtistRecommendation = defaultUseDiscardArtistRecommendation,
  artistRecommendation,
  downloadService,
}: CreateRecommendationPageProps): () => JSX.Element | null {
  return function RecommendationPage(): JSX.Element {
    const {
      error, recommendationId, getArtistRecommendation, concertData, artistsData,
    } = useGetArtistRecommendation(
      artistRecommendation,
    );

    const { discardArtistRecommendation, notification } = useDiscardArtistRecommendation(artistRecommendation);

    const [artistsView, setArtistsView] = useState<{
      name: string;
      toggleBtn: boolean;
    }>({
      name: 'pie',
      toggleBtn: true,
    });

    if (!recommendationId) {
      return <Empty />;
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
      if (notification) {
        if (notification.status === 'success') {
          message.success(notification.message);
        }
        if (notification.status === 'error') {
          message.error(notification.message);
        }
      }

      const view: string | null = String(localStorage.getItem('view'));
      if (view === 'pie') {
        setArtistsView({ name: 'pie', toggleBtn: true });
      }
      if (view === 'card') {
        setArtistsView({ name: 'card', toggleBtn: false });
      }
      getArtistRecommendation();
    }, [notification?.status]);

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
                  discardArtistRecommendation={discardArtistRecommendation}
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
