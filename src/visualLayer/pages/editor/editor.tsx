/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import {
  Button, Dropdown, Empty, Form, Input, message, PageHeader, Spin, Tag,
} from 'antd';
import * as htmlToImage from 'html-to-image';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'antd/lib/modal/Modal';
import FormItem from 'antd/lib/form/FormItem';
import services from '../../services';
import { DocumentsInterface } from '../../../model/interfaces/documents';
import { HtmlDownloadService } from '../../../adapters/html-download.service';

// logos and images
import pdflogo from '../../../assets/pdf-logo.png';
import { CreateEnvelope, createEnvelope } from '../../../services/docusign';
import DocusignForm from '../../components/ContractForm';
import { DocusignFormData } from '../../../model/types/docusign/docusignForm';
import { DocusignInterface } from '../../../model/interfaces/docusign';
import IconRenderer from '../../components/IconRenderer';
import { DocumentContractData, DocumentModes } from '../../../model/types/service-response';
import createTextEditor from '../../components/TextEditor';

type EditorPageProp = {
  documentsService: DocumentsInterface
  docusignService: DocusignInterface
}

export const createEditorPage = ({ documentsService, docusignService }: EditorPageProp):
  () => JSX.Element => {
  return function EdiortContainer() {
    const navigate = useNavigate();
    const [html, setHtml] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [documentName, setDocumentName] = useState('');
    const [editorContent, setEditorContent] = useState<string>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [createdOn, setCreatedOn] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [documentId, setDocumentId] = useState<string>('');
    const [enterEmail, setEnterEmail] = useState(false);
    const [docusignModal, setDocusignModal] = useState(false);
    const [documentMode, setDocumentMode] = useState<DocumentModes>();
    const [contractInfo, setContractInfo] = useState<DocumentContractData>();
    const htmlDownloadService = new HtmlDownloadService();

    const TextEditor = createTextEditor({
      setEditorContent, html, setHtml, isDisabled,
    });

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
        setDocumentMode(response.data.data.mode);
        if (response.data.data.mode === 'submit' || response.data.data.mode === 'sign') {
          setContractInfo(response.data.data.contract);
          setIsDisabled(true);
        }
        // setCreatedOn(response.data.data.createdOn.split('T')[0]);
        setDocumentId(response.data.data.id);
      }
    };

    const { id } = useParams();
    if (!id) {
      return <Empty />;
    }
    useEffect(() => {
      getDocument(id);
    }, []);

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

    const submitForSign = async (data: DocusignFormData) => {
      setLoading(true);
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
      setLoading(false);
      setDocusignModal(false);
    };

    const sharingMenu = (): JSX.Element => {
      return (
        <div className="column-flex p-8" style={{ background: '#222' }}>
          <Button type="text" style={{ textAlign: 'left' }} onClick={() => setEnterEmail(true)}>
            { IconRenderer('send') }
            <span className="mx-2">Sent via email</span>
          </Button>
          <Button type="text" style={{ textAlign: 'left' }} onClick={downloadPdf}>
            <img width={25} src={pdflogo} alt="pdf-logo" />
            <span className="mx-2">Download as pdf</span>
          </Button>
        </div>
      );
    };

    const renderHeaderExtra = () => {
      if (documentMode === 'edit') {
        return (
          <div className="row-flex align-center">
            <Button className="m-2" type="primary" onClick={() => { setDocusignModal(true); }}>Submit</Button>
            <Button className="m-2" type="primary" onClick={() => saveDocument()}>Save</Button>
            <Dropdown className="m-2" overlay={sharingMenu} trigger={['click']}>
              <Button type="text">
                { IconRenderer('share') }
              </Button>
            </Dropdown>
          </div>
        );
      }
      if (documentMode === 'submit' && contractInfo) {
        return (
          <div className="row-flex align-center">
            <Tag color="lime">Document is submitted</Tag>
            <Button type="text">
              <div className="row-flex align-center">
                { IconRenderer('refresh') }
                <span>Update status</span>
              </div>
            </Button>
            <Dropdown className="m-2" overlay={sharingMenu} trigger={['click']}>
              <Button type="text">
                { IconRenderer('share') }
              </Button>
            </Dropdown>
          </div>
        );
      }
      if (documentMode === 'sign' && contractInfo) {
        return (
          <div>
            <h1>Document is submitted</h1>
            <span>{ contractInfo.status }</span>
            <Button type="primary">Download</Button>
          </div>
        );
      }
      return <Empty />;
    };

    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => redirectBack()}
          title={documentName}
          subTitle={`created on ${createdOn}`}
          extra={renderHeaderExtra()}
        />
        <div
          style={{
            maxWidth: '950px',
            margin: 'auto',
          }}
        >
          <TextEditor />
          {/* { renderEditorBody() } */}
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
          style={
            {
              padding: '10px',
            }
          }
          bodyStyle={
              {
                height: 'calc(100vh - 200px)',
                padding: '10px',
                overflowY: 'scroll',
                margin: '0',
              }
            }
        >
          { loading ? (
            <div className="column-flex justify-center align-center height-100">
              <Spin />
              <span>please wait</span>
            </div>
          ) : <DocusignForm sendContract={submitForSign} />}
        </Modal>
      </div>
    );
  };
};
