export type Templates = {
  templateId: string,
  templateName: string,
  templateImg: string,
}

export type TemplateQuestions = {
  question: string,
  field: string,
  type: string,
}

export type TemplateResponse = {
  success: boolean,
  data: {
    templateId: string,
    questions: Array<TemplateQuestions>,
  }
}
