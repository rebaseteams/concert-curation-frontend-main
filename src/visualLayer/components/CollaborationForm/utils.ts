import * as _ from 'lodash';
import { FormFields } from '../../../model/types/formRenderer';
import { TemplateQuestions } from '../../../model/types/templates';

const templateFormDataMapper = (formsData: Array<TemplateQuestions>): Array<FormFields> => {
  const result: Array<FormFields> = _.map(formsData, (form) => ({
    type: form.type,
    name: form.field,
    label: form.question,
    required: true,
    multiple: false,
  }));
  return result;
};

export default templateFormDataMapper;
