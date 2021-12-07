import {
  Button,
  Tooltip,
} from 'antd';

type DownloadAsPdfButtonProp = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  downloadPdf: any;
};

const DownloadAsPdfButton = ({ downloadPdf }: DownloadAsPdfButtonProp): JSX.Element => (
  <Tooltip
    placement="top"
    title="Download Pdf"
    color="orange"
  >
    <Button
      type="text"
      onClick={() => downloadPdf()}
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
);

export default DownloadAsPdfButton;
