import { DocusignInterface } from '../../../model/interfaces/docusign';

export async function downloadSignedPdf(envelopeId: string, docusignService: DocusignInterface):
Promise<boolean> {
  const response = await docusignService.getSignedPdf(envelopeId);
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
}

export async function getSignedPdf(envelopeId: string, docusignService: DocusignInterface):
Promise<string | null> {
  const response = await docusignService.getSignedPdf(envelopeId);
  if (response.error && response.data && !response.data.success) {
    return null;
  }
  if (response.data && response.data.data) {
    const pdfBase64 = response.data.data;
    const linkSource = `data:application/pdf;base64,${pdfBase64}`;
    return linkSource;
  }
  return null;
}
