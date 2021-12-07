import { Empty, Row, Col } from 'antd';
import _ from 'lodash';

type Data = {
  name: string,
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
    <Row>
      { _.map(data, (d:Data) => (
        <Col span={6}>
          <div>
            <h1>{d.name}</h1>
            <h3>{d.value}</h3>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default AnalyticsCard;
