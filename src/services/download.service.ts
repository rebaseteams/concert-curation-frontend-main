export interface DownloadImageData {
  elementId: string;
  imageName: string;
}

export interface DownloadPdfData {
  pdfName: string;
  content: JSX.Element;
}

export interface DownloadService {
  downloadImage(data: DownloadImageData): Promise<void>;

  downloadPdf(data: DownloadPdfData): Promise<void>;
}
