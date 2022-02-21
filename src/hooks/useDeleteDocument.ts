import { message } from 'antd';
import { useState } from 'react';
import { DocumentsInterface } from '../model/interfaces/documents';

export type DeleteDocument = {
  loadingForDeleteDocument: boolean;
  deleteDocument: (arg0: string) => Promise<boolean>;
}

export function useDeleteDocument(documentsService: DocumentsInterface): DeleteDocument {
  const [loadingForDeleteDocument, setLoadingForDeleteDocument] = useState(false);

  async function deleteDocument(documentId: string) {
    setLoadingForDeleteDocument(true);
    const documentsResponse = await documentsService.deleteDocument(documentId);
    if (documentsResponse.error) {
      message.error('Document deletion failed');
      setLoadingForDeleteDocument(false);
      return (false);
    } if (documentsResponse.data && documentsResponse.data) {
      message.success('Document sucessfully deleted');
      setLoadingForDeleteDocument(false);
      return (true);
    }
    setLoadingForDeleteDocument(false);
    return (false);
  }

  return {
    loadingForDeleteDocument,
    deleteDocument,
  };
}

export type UseDeleteDocument = (documentsService: DocumentsInterface) => DeleteDocument;
