import { useEffect, useState } from 'react';
import { Error } from '../model/types/errors';
import { Documents } from '../model/types/document/addDocument';
import { DocumentsInterface } from '../model/interfaces/documents';

export type GetDocument = {
  loadingForDocuments: boolean;
  documents: Array<Documents>;
  error: Error | undefined;
  getDocuments: () => Promise<void>;
}

export function useGetDocuments(documentsService: DocumentsInterface): GetDocument {
  const [loadingForDocuments, setLoadingForDocuments] = useState(false);
  const [documents, setDocuments] = useState<Array<Documents>>([]);
  const [error, setError] = useState<Error>();

  async function getDocuments() {
    setLoadingForDocuments(true);
    const documentsResponse = await documentsService.getDocuments();
    if (documentsResponse.error) {
      setError({ status: documentsResponse.status, message: documentsResponse.message });
    } else if (documentsResponse.data && documentsResponse.data.data) {
      setDocuments(documentsResponse.data.data);
    }
    setLoadingForDocuments(false);
  }

  useEffect(() => {
    getDocuments();
  }, []);

  return {
    loadingForDocuments,
    documents,
    error,
    getDocuments,
  };
}

export type UseGetDocuments = (documentsService: DocumentsInterface) => GetDocument;
