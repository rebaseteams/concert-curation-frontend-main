import React from 'react';

import { Row, Col } from 'antd';

import { useParams } from 'react-router-dom';

const ConcertData = (): JSX.Element => {
  const { id }: { id: string } = useParams();

  // concert Id extracted from url
  // eslint-disable-next-line no-console
  console.log(id);

  return (
    <Row>
      <Col span={3}>
        Concert Name
      </Col>
    </Row>
  );
};

export default ConcertData;
