import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import { notification } from 'antd';
import { DownloadData, ImageDownloadService } from '../services/image-download.service';

export class HtmlImageDownloadService implements ImageDownloadService {
  // eslint-disable-next-line class-methods-use-this
  async download(data: DownloadData): Promise<void> {
    const root = document.getElementById(data.elementId);
    if (root) {
      // Setting background black to not have transprent
      root.style.background = '#000';
      await htmlToImage.toPng(root).then((dataUrl) => {
        download(dataUrl, 'Concert-Curation.png');
      });
      // setting background back to null
      root.style.background = 'null';
      notification.success({
        message: 'File Downloading started',
        description: 'Image will be downloaded shortly...',
        placement: 'bottomRight',
      });
    } else {
      notification.error({
        message: 'File Downloading Failed',
        description: 'Something went wrong',
        placement: 'bottomRight',
      });
    }
  }
}
