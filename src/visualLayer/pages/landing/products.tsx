/* eslint-disable max-len */
import { Col, Row } from 'antd';

const Products = (): JSX.Element => (
  <div className="third-sec">
    <Row gutter={10} className="height-100 row-flex">
      <Col xs={{ span: 24 }} md={{ span: 12 }} xxl={{ span: 6 }}>
        <div className="column-flex justify-center align-center">
          <span style={{ fontSize: '65px', color: '#6f4' }} className="material-icons">
            engineering
          </span>
          <h4>MATCHMAKING ENGINE</h4>
          <p>
            Concert curation tool quickly and inexpensively analyzes a growing list of more than 6,000 recording artists and 4.000 brands ensuring that only the best matches rise to the top.
          </p>
          <p>
            Instead of brands spending millions on a single artist endorsement, concert tool recommends groups of up-and-coming artists who will reach a comparable audience at a far lower rate.
            In-depth filtering tools make it easy to narrow down your matches based on your preferences and goals. Segment your results by industry, genre, social reach, location, age groups, personality types, and much, much more.
          </p>
        </div>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }} xxl={{ span: 6 }}>
        <div className="column-flex justify-center align-center">
          <span style={{ fontSize: '65px', color: '#6f4' }} className="material-icons">
            home
          </span>
          <h4>ARTIST ANALYTICS</h4>
          <p>
            Concert curation tool equips established and emerging recording artists with the marketing insights and collateral they need to effectively pitch brand partnership prospects.
            By aggregating and processing a bands’ own data and measuring it against equivalent metrics for product consumers, concert tool provides expert guidance leading recording artists to brands that make the most sense for them and their fans.
            For brands, detailed insights into more than 6,000 artists provide an in-depth, data-driven snapshot into the up-and-coming acts who can help you reach your next round of passionate, dedicated customers
          </p>
        </div>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }} xxl={{ span: 6 }}>
        <div className="column-flex justify-center align-center">
          <span style={{ fontSize: '65px', color: '#6f4' }} className="material-icons">
            insights
          </span>
          <h4>AFFINITY SCORES</h4>
          <p>
            concert tool matchmaking engine is powered by Affinity Scores, a proprietary metric that makes it easy to discover the bands and brands whose audience is the most like your own.
            Our scores take in frequently used demographics (age, gender, location, income, and so on), along with personality types derived from cutting-edge research into the psychology of music.
            Affinity Scores make it easy to discover meaningful, low risk, high potential opportunities for commercial brands to partner with the most relevant members of the music industry — and  vice-versa.
          </p>
        </div>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }} xxl={{ span: 6 }}>
        <div className="column-flex justify-center align-center">
          <span style={{ fontSize: '65px', color: '#6f4' }} className="material-icons">
            bubble_chart
          </span>
          <h4>Contract signing</h4>
          <p>We allow  promoters to create contracts in the tool itself and get it signed and store in the system for future reference purposes. No hassles for maintaining separate files or folders for contracts..</p>
        </div>
      </Col>
    </Row>
  </div>
);

export default Products;
