import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button, message, PageHeader } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import config from '../../../services/config.json';
import services from '../../services';

const EditorContainer = (): JSX.Element => {
  const history = useHistory();
  const [html, setHtml] = useState<string>('');
  const [documentName, setDocumentName] = useState('');
  const [editorContent, setEditorContent] = useState<string>('');
  const [createdOn, setCreatedOn] = useState<string>('');
  const documentId = useRef<string>('');

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
      documentId.current = response.data.data.id;
    }
  };

  const { id }: { id: string } = useParams();
  getDocument(id);

  const redirectBack = () => {
    history.goBack();
  };

  const saveDocument = async () => {
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

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => redirectBack()}
        title={documentName}
        subTitle={`created on ${createdOn}`}
        extra={<Button type="primary" onClick={() => saveDocument()}>Save</Button>}
      />
      <div
        style={{
          maxWidth: '850px',
          margin: 'auto',
        }}
      >
        <Editor
        // eslint-disable-next-line no-return-assign
          onInit={(evt, editor) => setHtml(editor.getContent())}
          apiKey={config.TINY_API}
          initialValue={html}
        // eslint-disable-next-line no-return-assign
          onChange={(evt, editor) => setEditorContent(editor.getContent())}
          init={{
            height: '88vh',
            menubar: false,
            plugins: [
              'export pagebreak',
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar: 'export code pagebreak | undo redo | formatselect | '
           + 'bold italic backcolor forecolor | alignleft aligncenter '
           + 'alignright alignjustify | bullist numlist outdent indent | '
           + 'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
      </div>
    </div>
  );
};

export default EditorContainer;
