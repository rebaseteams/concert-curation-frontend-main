import { SearchOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { ReactNode } from 'react';

import './styles.scss';

type ResultRendererReturn={
    id: string,
    type: string;
    value: string;
    label: ReactNode;
}

const ResultRenderer = (
  id: string,
  title: string,
  type: string,
  image: string,
  description: string,
): ResultRendererReturn => ({
  id,
  type,
  value: title,
  label: (
    <div className="result-container">
      <Avatar
        shape="square"
        size="large"
        src={image || <SearchOutlined />}
      />
      <div className="results-text-field">
        {title}
        <h4>
          {description}
          {' '}
        </h4>
      </div>
    </div>
  ),
});

export default ResultRenderer;
