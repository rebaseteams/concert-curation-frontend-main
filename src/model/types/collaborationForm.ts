export type CollaborationFormValues = {
  templateId: string,
  recommendationId: string,
  fields: object;
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
