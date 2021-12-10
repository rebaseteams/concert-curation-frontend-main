/* eslint-disable class-methods-use-this */
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import { notification } from 'antd';
import { savePDF } from '@progress/kendo-react-pdf';
import { DownloadImageData, DownloadPdfData, DownloadService } from '../services/download.service';

export class HtmlDownloadService implements DownloadService {
  async downloadPdf(data: DownloadPdfData): Promise<void> {
    if (data.container) {
      savePDF(data.container, {
        paperSize: 'auto',
        margin: 40,
        fileName: `${data.pdfName}`,
      });
    }
  }

  async downloadImage(data: DownloadImageData): Promise<void> {
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
