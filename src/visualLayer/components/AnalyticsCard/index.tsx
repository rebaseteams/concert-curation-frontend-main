import {
  Empty, Row, Col, Card,
} from 'antd';
import _ from 'lodash';

type Data = {
  field: string,
  value: string | number;
}

type AnalyticsCardProp = {
  data: Array<Data>;
}

const AnalyticsCard = ({ data }: AnalyticsCardProp): JSX.Element => {
  if (data.length <= 0) {
    return <Empty />;
  }
  return (
    <Row className="mx-6">
      { _.map(data, (d:Data, index: number) => (
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }} key={index}>
          <Card color="#7F7" hoverable style={{ margin: '10px', textAlign: 'center' }} className="text-center m-4">
            <h2>{d.value}</h2>
            <h3>{d.field}</h3>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default AnalyticsCard;
