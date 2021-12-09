import {
  Layout,
  Row,
  Col,
} from 'antd';

import { createRenderConcerts } from './concerts-list';
import { createRenderDocuments } from './documents-list';

// styles
import './dashboard.style.scss';
import {
  UseGetConcerts,
  useGetConcerts as defaultUseGetConcerts,
} from '../../../hooks/useGetConcerts';
import {
  UseGetDocuments,
  useGetDocuments as defaultUseGetDocuments,
} from '../../../hooks/useGetDocuments';
import { ArtistRecommendationInterface } from '../../../model/interfaces/artistRecommendation';
import { DocumentsInterface } from '../../../model/interfaces/documents';
import { useDeleteDocument } from '../../../hooks/useDeleteDocument';

const { Content } = Layout;

export interface CreateDashboardComponentProps {
  useGetConcerts?: UseGetConcerts;
  artistRecommendation: ArtistRecommendationInterface;
  useGetDocuments?: UseGetDocuments;
  documentsService: DocumentsInterface;
}

export function createDashboardComponent({
  useGetConcerts = defaultUseGetConcerts,
  artistRecommendation,
  useGetDocuments = defaultUseGetDocuments,
  documentsService,
}: CreateDashboardComponentProps): () => JSX.Element | null {
  return function DashboardComponent() {
    const ConcertList = createRenderConcerts({ getConcert: useGetConcerts(artistRecommendation) });
    const DocumentsList = createRenderDocuments(
      {
        getDocument: useGetDocuments(documentsService),
        useDeleteDocument: useDeleteDocument(documentsService),
      },
    );

    return (
      <Content style={{ height: '88vh', overflowY: 'auto', marginTop: '10px' }}>

        <Row>
          <Col md={{ span: 24 }}>
            <ConcertList />
          </Col>

          <Col md={{ span: 24 }}>
            <DocumentsList />
          </Col>
        </Row>
      </Content>
    );
  };
}
