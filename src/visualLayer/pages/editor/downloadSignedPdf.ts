import DocusignRepo from '../../../dataLayer/repositories/http/docusign';

const downloadSignedPdf = async (envelopeId: string): Promise<boolean> => {
  const docusignRepo = new DocusignRepo();
  const response = await docusignRepo.getSignedPdf(envelopeId);
  if (response.error && response.data && !response.data.success) {
    return false;
  }
  if (response.data && response.data.data) {
    const pdfBase64 = response.data.data;
    const linkSource = `data:application/pdf;base64,${pdfBase64}`;
    const downloadLink = document.createElement('a');
    const fileName = `${envelopeId}.pdf`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
    downloadLink.remove();
    return true;
  }
  return false;
};

export default downloadSignedPdf;
