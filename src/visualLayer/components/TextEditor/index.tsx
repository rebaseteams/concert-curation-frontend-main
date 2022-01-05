import { Editor } from '@tinymce/tinymce-react';
import config from '../../../services/config.json';

type TextEditorProp = {
  setHtml: React.Dispatch<React.SetStateAction<string>>,
  setEditorContent: React.Dispatch<React.SetStateAction<string>>,
  html: string,
  isDisabled: boolean,
}

const createTextEditor = ({
  setHtml, setEditorContent, html, isDisabled,
} :
  TextEditorProp):() => JSX.Element | null => function TextEditor() {
  return (
    <Editor
          // eslint-disable-next-line no-return-assign
      onInit={(evt, editor) => {
        setHtml(editor.getContent()); setEditorContent(editor.getContent());
      }}
      apiKey={config.TINY_API}
      disabled={isDisabled}
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
  );
};

export default createTextEditor;
