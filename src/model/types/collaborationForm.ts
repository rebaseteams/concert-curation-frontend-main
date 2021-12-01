export type CreateDocumentForm = {
  templateId: string,
  recommendationId: string,
  fields: object;
  documentName: string,
}

export type CreateCollaborationResponseData = {
  success: boolean,
  data: {
    document: CollaborationData,
  }
}

export type CollaborationData = {
  documentId: string,
  html: string,
  recommendationId: string
}
