import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Row, Col, Switch,
  Layout, Space, Tag,
  Typography, Tooltip, Empty,
  Result, message, Button, Modal,
} from 'antd';
import * as _ from 'lodash';
import * as htmlToImage from 'html-to-image';

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
import { DocumentsInterface } from '../../../model/interfaces/documents';
import renderDocumentList from './DocumentsList';

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
  documentsService: DocumentsInterface;
};

export function createRecommendationPage({
  useGetArtistRecommendation = defaultUseGetArtistRecommendation,
  useDiscardArtistRecommendation = defaultUseDiscardArtistRecommendation,
  artistRecommendation,
  downloadService,
  documentsService,
}: CreateRecommendationPageProps): () => JSX.Element | null {
  return function RecommendationPage(): JSX.Element {
    const {
      error,
      recommendationId,
      getArtistRecommendation,
      concertData, artistsData,
      discardedArtists,
      documents,
      lastModifiedBy,
    } = useGetArtistRecommendation(
      artistRecommendation,
      documentsService,
    );

    const { discardArtistRecommendation, notification } = useDiscardArtistRecommendation(
      artistRecommendation,
    );

    const [artistsView, setArtistsView] = useState<{
      name: string;
      toggleBtn: boolean;
    }>({
      name: 'pie',
      toggleBtn: true,
    });
    const [documentsModal, setDocumentsModal] = useState(false);

    const navigate = useNavigate();
    const redirectBack = () => {
      navigate(-1);
    };

    if (!recommendationId) {
      return <Empty />;
    }

    const shareRecommendation = async () => {
      const root = document.getElementById('recommendation-page-container');
      if (root) {
        // Setting background black to not have transprent
        root.style.background = '#111';
        await htmlToImage.toBlob(root).then((dataUrl) => {
          let file: File;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          if (dataUrl) file = new File([dataUrl], 'file', { type: 'image/png' });
        });
        root.style.background = '';
      }
    };

    const updateView = (view: boolean) => {
      if (view) {
        setArtistsView({ name: 'pie', toggleBtn: true });
        localStorage.setItem('view', 'pie');
      } else {
        setArtistsView({ name: 'card', toggleBtn: false });
        localStorage.setItem('view', 'card');
      }
    };
    const container = React.useRef(null);

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
    }, [notification?.status, container]);

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

    const renderDiscardedArtists = () => {
      if (discardedArtists.length > 0) {
        return discardedArtists.map((discarded) => (
          <div key={discarded.artistId} className="row-flex my-2">
            <img width={25} src={discarded.artistImage} alt={discarded.artistName} />
            <h4 className="mx-3">{discarded.artistName}</h4>
          </div>
        ));
      }
      return <div><Empty description="Discarded artists will be listed here." /></div>;
    };

    const renderRecommendationContainer = (): JSX.Element => (
      <Row id="recommendation-page-container">
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          {concertData && <ConcertData data={concertData} />}
          <h5>Discarded artists</h5>
          <div
            style={{
              overflow: 'auto',
              height: '110px',
            }}
          >
            { renderDiscardedArtists() }
          </div>
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
            <Button type="text" color="#FFF" onClick={redirectBack}>
              {IconRenderer('back')}
            </Button>
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
              title={(
                <div>
                  <h2>Selected Venues</h2>
                  {' '}
                  { concertData.venue.map((v: string) => <h3 key={v}>{v}</h3>) }
                </div>
              )}
              color="#0029"
            >
              <Tag className="cursor" color="blue">
                <span className="text-size-4">
                  { IconRenderer('location') }
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
          <div className="row-flex align-center">
            <span className="mx-5">
              last modified by -
              {lastModifiedBy}
            </span>
            <Tooltip title="share this recommendation" color="blue">
              <Button type="primary" onClick={shareRecommendation}>
                { IconRenderer('share') }
              </Button>
            </Tooltip>
            <Tooltip title="documents">
              <Button type="ghost" onClick={() => { setDocumentsModal(true); }}>
                { IconRenderer('doc') }
              </Button>
            </Tooltip>
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
                  container: container.current,
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
          <div ref={container}>
            { renderRecommendationContainer() }
          </div>
        </Content>
        <Modal
          title="Documents"
          onCancel={() => { setDocumentsModal(false); }}
          bodyStyle={{
            height: '350px',
            overflow: 'auto',
          }}
          style={{
            position: 'absolute',
            right: 20,
          }}
          visible={documentsModal}
          footer={false}
          width={450}
        >
          { documents.length > 0
            ? renderDocumentList(documents)
            : <Empty />}
        </Modal>
      </Layout>
    );
  };
}
