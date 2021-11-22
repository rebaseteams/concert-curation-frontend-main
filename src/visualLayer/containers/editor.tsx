import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from 'antd';
import config from '../../services/config.json';

const EditorComponent = (): JSX.Element => {
  const editorRef = useRef('');
  const name = 'Elon';

  const initialContent = `<h3>Hello.. ${name}</h3>`;
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
