/* eslint-disable arrow-body-style */
import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {
  Button, Empty, Form, Input, message, PageHeader,
} from 'antd';
import * as htmlToImage from 'html-to-image';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'antd/lib/modal/Modal';
import FormItem from 'antd/lib/form/FormItem';
import config from '../../../services/config.json';
import services from '../../services';
import { DocumentsInterface } from '../../../model/interfaces/documents';
import { HtmlDownloadService } from '../../../adapters/html-download.service';

// logos and images
import pdflogo from '../../../assets/pdf-logo.png';
import { CreateEnvelope, createEnvelope } from '../../../services/docusign';
import DocusignForm from '../../components/ContractForm';
import { DocusignFormData } from '../../../model/types/docusign/docusignForm';
import { DocusignInterface } from '../../../model/interfaces/docusign';

type EditorPageProp = {
  documentsService: DocumentsInterface
  docusignService: DocusignInterface
}

export const createEditorPage = ({ documentsService, docusignService }: EditorPageProp):
  () => JSX.Element => {
  return function EdiortContainer() {
    const navigate = useNavigate();
    const [html, setHtml] = useState<string>('');
    const [documentName, setDocumentName] = useState('');
    const [editorContent, setEditorContent] = useState<string>('');
    const [createdOn, setCreatedOn] = useState<string>('');
    const [documentId, setDocumentId] = useState<string>('');
    const [enterEmail, setEnterEmail] = useState(false);
    const [docusignModal, setDocusignModal] = useState(false);
    const htmlDownloadService = new HtmlDownloadService();

    const downloadPdf = () => {
      const root: HTMLIFrameElement = document.getElementById('editor_ifr') as HTMLIFrameElement;
      if (root.contentWindow) {
        const PdfHtml: HTMLElement = root.contentWindow.document.body;
        htmlDownloadService.downloadPdf({ pdfName: `${documentName}${Date().split('GMT')[0]}`, container: PdfHtml });
      }
    };

    const getDocument = async (id: string) => {
      const response = await services.Documents.getDocument(id);
      if (response.error) {
        message.error(response.message);
        return;
      }
      if (response.data && response.data.success) {
        setDocumentName(response.data.data.name);
        setHtml(response.data.data.html);
        setCreatedOn(response.data.data.createdOn.split('T')[0]);
        setDocumentId(response.data.data.id);
      }
    };

    const { id } = useParams();
    if (!id) {
      return <Empty />;
    }
    getDocument(id);

    const redirectBack = () => {
      navigate(-1);
    };

    const shareRecommendation = async (event: { emails: string }) => {
      const root: HTMLIFrameElement = document.getElementById('editor_ifr') as HTMLIFrameElement;
      if (root && root.contentWindow) {
        root.contentWindow.document.body.style.background = '#FFF';
        htmlToImage.toPng(root.contentWindow.document.body).then((dataUrl) => {
          const url = dataUrl;
          fetch(url)
            .then((res) => res.blob())
            .then((blob) => {
              const file = new File([blob], 'File name', { type: 'image/png' });

              documentsService.shareDocument(id, event.emails, file).then((data) => {
                if (data.error) {
                  message.error('Unable to share');
                } else {
                  message.success('Success');
                }
              });
            });
          setEnterEmail(false);
          if (root.contentWindow) root.contentWindow.document.body.style.background = '';
        });
      }
    };

    const saveDocument = async () => {
      if (editorContent.length <= 0) {
        return;
      }
      const response = await services.Documents.editDocument(id, editorContent);
      if (response.error) {
        message.error(response.message);
        return;
      }
      if (response.data && response.data.success) {
        message.success('saved successfully');
        return;
      }
      message.error('Somthing went wrong');
    };

    const docSign = async (data: DocusignFormData) => {
      const root: HTMLIFrameElement = document.getElementById('editor_ifr') as HTMLIFrameElement;
      if (!root.contentWindow) {
        return;
      }
      const envelopData: CreateEnvelope = {
        pdfBase64: String(root.contentWindow.document.body.innerHTML),
        fileName: data.fileName,
        fileExtension: 'pdf',
        emailSubject: data.emailSubject,
        pdfId: '1',
        recipients: {
          carbonCopies: [
            {
              email: data.ccEmail,
              name: data.ccName,
              recipientId: '1',
              routingOrder: '2',
            },
          ],
          signers: [
            {
              email: 'pkumarprajapati007@gmail.com', // Provide artists email programatically
              recipientId: '2',
              routingOrder: '1',
              name: 'Praveen Prajapati', // Provide artists name programatically
              tabs: {
                signHereTabs: [
                  {
                    anchorString: '**signature_1**', // Add this string in pdf where you want to add signature
                    anchorUnits: 'pixels',
                    anchorXOffset: '20',
                    anchorYOffset: '10',
                  },
                ],
              },
            },
          ],
        },
      };
      const envelope = createEnvelope(envelopData);
      const response = await docusignService.createEnvelope(envelope, documentId);
      if (response.error) {
        message.error(response.message);
        return;
      }
      message.success(`${response.message}`);
      setDocusignModal(false);
    };

    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => redirectBack()}
          title={documentName}
          subTitle={`created on ${createdOn}`}
          extra={(
            <>
              <Button type="primary" onClick={() => { setDocusignModal(true); }}>Submit</Button>
              <Button type="ghost" onClick={() => setEnterEmail(true)}>Share</Button>
              <Button type="primary" onClick={() => saveDocument()}>Save</Button>
              <Button type="text" onClick={downloadPdf}>
                <img width={25} src={pdflogo} alt="pdf-logo" />
              </Button>
            </>
          )}
        />
        <div
          style={{
            maxWidth: '950px',
            margin: 'auto',
          }}
        >
          <Editor
          // eslint-disable-next-line no-return-assign
            onInit={(evt, editor) => {
              setHtml(editor.getContent()); setEditorContent(editor.getContent());
            }}
            apiKey={config.TINY_API}
            initialValue={html}
            id="editor"
          // eslint-disable-next-line no-return-assign
            onChange={(evt, editor) => setEditorContent(editor.getContent())}
            init={{
              height: '88vh',
              menubar: 'file edit insert view format table tools',
              fontsize_formats:
                '8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt',
              plugins: [
                'export pagebreak',
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar: 'export | undo redo | formatselect | fontselect fontsizeselect | '
             + 'bold italic backcolor forecolor | alignleft aligncenter '
             + 'alignright alignjustify | bullist numlist outdent indent | '
             + 'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        </div>

        <Modal
          title="Enter Email"
          visible={enterEmail}
          onCancel={() => setEnterEmail(false)}
          footer={false}
        >
          <Form
            onFinish={shareRecommendation}
          >
            <FormItem label="Enter Email" name="emails">
              <Input type="email" name="emails" />
            </FormItem>
            <FormItem>
              <Button htmlType="submit" type="primary">Send</Button>
            </FormItem>
          </Form>
        </Modal>

        <Modal
          title="Please fill this form"
          visible={docusignModal}
          onCancel={() => setDocusignModal(false)}
          footer={false}
          style={{
            height: '80vh',
            overflow: 'auto',
          }}
        >
          <DocusignForm sendContract={docSign} />
        </Modal>
      </div>
    );
  };
};
