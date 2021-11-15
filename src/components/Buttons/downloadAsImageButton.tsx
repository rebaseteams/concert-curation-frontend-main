import React from 'react';
import {
  Button,
  Tooltip,
} from 'antd';

type DownloadAsImageButtonProp = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  downloadImage: any;
};

const DownloadAsImageButton = ({ downloadImage }: DownloadAsImageButtonProp): JSX.Element => (
  <Tooltip
    placement="top"
    title="Download image"
    color="orange"
  >
    <Button
      type="text"
      onClick={() => downloadImage()}
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
);

export default DownloadAsImageButton;
