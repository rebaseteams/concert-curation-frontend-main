/* eslint-disable class-methods-use-this */
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import { notification } from 'antd';
// import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
// import * as ReactDOM from 'react-dom';
// import ReactDOMServer from 'react-dom/server';
import { DownloadImageData, DownloadPdfData, DownloadService } from '../services/download.service';

export class HtmlDownloadService implements DownloadService {
  async downloadPdf(data: DownloadPdfData): Promise<void> {
    // // const pdfExportComponent = React.useRef<PDFExport>(null);

    // // const downloadPdf = () => {
    // //   if (pdfExportComponent.current) {
    // //     pdfExportComponent.current.save();
    // //   }
    // // };

    // const exportPDFWithMethod = (container: HTMLElement) => {
    //   // const container = React.useRef(null);
    //   // const container = document.createElement('div');
    //   // const element = container.current || document.body;
    //   savePDF(container, {
    //     paperSize: 'auto',
    //     margin: 40,
    //     fileName: `${data.pdfName}`,
    //   });
    // };

    // // const App = new PDFExport({
    // //   scale: 0.4,
    // //   paperSize: 'auto',
    // //   margin: 20,
    // //   fileName: `${data.pdfName}`,

    // // }: PDFExportProps);

    // const App = () => (
    //   <PDFExport
    //     // ref={pdfExportComponent}
    //     scale={0.4}
    //     paperSize="auto"
    //     margin={20}
    //     fileName={`${data.pdfName}`}
    //   >
    //     { data.content }
    //   </PDFExport>
    // );

    // // console.log(App.render());
    // // const element = document.createElement('div');
    // // element.setAttribute('id', 'temp-div');
    // // ReactDOM.render(<App />, document.getElementById('overlays'));
    // const element = document.getElementById('overlays');
    // if (element) {
    //   ReactDOM.render(<App />, element);
    //   exportPDFWithMethod(element);
    //   console.log(element.innerHTML);
    // }
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
