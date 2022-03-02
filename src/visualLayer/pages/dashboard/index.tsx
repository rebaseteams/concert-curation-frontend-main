import {
  Layout,
  Tabs,
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
import { TemplatesInterface } from '../../../model/interfaces/templates';
import { VenuesInterface } from '../../../model/interfaces/venues';
import { EventsTypeInterface } from '../../../model/interfaces/eventsType';

const { Content } = Layout;
const { TabPane } = Tabs;

export interface CreateDashboardComponentProps {
  templatesService: TemplatesInterface;
  useGetConcerts?: UseGetConcerts;
  artistRecommendation: ArtistRecommendationInterface;
  useGetDocuments?: UseGetDocuments;
  documentsService: DocumentsInterface;
  venuesService: VenuesInterface;
  eventsTypeService: EventsTypeInterface;
}

export function createDashboardComponent({
  useGetConcerts = defaultUseGetConcerts,
  artistRecommendation,
  templatesService,
  useGetDocuments = defaultUseGetDocuments,
  documentsService,
  venuesService,
  eventsTypeService,
}: CreateDashboardComponentProps): () => JSX.Element | null {
  return function DashboardComponent() {
    const ConcertList = createRenderConcerts({
      getConcert: useGetConcerts(artistRecommendation),
      deleteRecommendation: artistRecommendation.deleteRecommendation,
      addNewRecommendation: artistRecommendation.addNewRecommendation,
      venuesService,
      eventsTypeService,
    });
    const DocumentsList = createRenderDocuments(
      {
        getDocument: useGetDocuments(documentsService),
        useDeleteDocument: useDeleteDocument(documentsService),
        templatesService,
        documentsService,
      },
    );

    return (
      <Content style={{ height: '88vh', overflowY: 'auto', marginTop: '10px' }}>

        <Tabs centered>
          <TabPane tab="Concerts" key="concerts">
            <ConcertList />
          </TabPane>
          <TabPane tab="Documents" key="documents">
            <DocumentsList />
          </TabPane>
        </Tabs>
      </Content>
    );
  };
}
