import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from 'antd';
import config from '../../services/config.json';

const getStaticHtml = (name: string) => `<h2><span style="color: #fbeeb8;">Hey ${name},</span></h2>
<h3>We <span style="color: #2dc26b;">liked</span> your profile on <span style="color: #f1c40f;">Cuttime.</span></h3>
<p>We are planning to have a Concert at <strong><span style="color: #3598db;">London, Imperial Collge,</span></strong></p>
<p>and what you to collaborate with us.</p>
<p><strong>Regards Imperial College.</strong></p>`;

const EditorComponent = (): JSX.Element => {
  const editorRef = useRef('');
  const name = 'Nick';

  const initialContent = getStaticHtml(name);
  const log = () => {
    if (editorRef.current) {
      // For Testing purpose
      // eslint-disable-next-line no-console
      console.log(editorRef.current);
    }
  };
  return (
    <div>
      <Editor
        // eslint-disable-next-line no-return-assign
        onInit={(evt, editor) => editorRef.current = editor.getContent()}
        apiKey={config.TINY_API}
        initialValue={initialContent}
        // eslint-disable-next-line no-return-assign
        onChange={(evt, editor) => editorRef.current = editor.getContent()}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar: 'undo redo | formatselect | '
           + 'bold italic backcolor forecolor | alignleft aligncenter '
           + 'alignright alignjustify | bullist numlist outdent indent | '
           + 'removeformat | help',
          skin: 'oxide-dark',
          content_css: 'dark',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      <Button type="primary" onClick={log}>Log editor content</Button>
    </div>
  );
};

export default EditorComponent;
