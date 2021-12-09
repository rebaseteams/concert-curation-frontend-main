export interface DownloadData {
  elementId: string;
  imageName: string;
}

export interface ImageDownloadService {
  download(data: DownloadData): Promise<void>;
}
