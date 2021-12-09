import { useState } from 'react';
import { Notification } from '../model/types/errors';
import { DocumentsInterface } from '../model/interfaces/documents';

export type DeleteDocument = {
  loadingForDeleteDocument: boolean;
  notification: Notification | undefined;
  deleteDocument: (arg0: string) => Promise<void>;
}

export function useDeleteDocument(documentsService: DocumentsInterface): DeleteDocument {
  const [loadingForDeleteDocument, setLoadingForDeleteDocument] = useState(false);
  const [notification, setNotification] = useState<Notification | undefined>();

  async function deleteDocument(documentId: string) {
    setLoadingForDeleteDocument(true);
    const documentsResponse = await documentsService.deleteDocument(documentId);
    if (documentsResponse.error) {
      setNotification(
        { status: 'error', message: 'Document deletion failed' },
      );
    } else if (documentsResponse.data && documentsResponse.data) {
      setNotification(
        { status: 'success', message: 'Document sucessfully deleted' },
      );
    }
    setLoadingForDeleteDocument(false);
    setTimeout(() => {
      setNotification(undefined);
    }, 100);
  }

  return {
    loadingForDeleteDocument,
    notification,
    deleteDocument,
  };
}

export type UseDeleteDocument = (documentsService: DocumentsInterface) => DeleteDocument;
