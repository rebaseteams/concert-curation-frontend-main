export type CreateDocumentForm = {
  templateId: string,
  recommendationId: string,
  fields: object;
  name: string,
  required: any;
}

export type CreateCollaborationResponseData = {
  success: boolean,
  data: {
    document: CollaborationData,
  }
}

export type CollaborationData = {
  id: string,
  html: string,
  recommendationId: string
}
