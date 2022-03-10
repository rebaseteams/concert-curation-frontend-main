/* eslint-disable no-extra-boolean-cast */
export function renderSignedPdf(pdf: string): JSX.Element {
  // eslint-disable-next-line no-useless-escape
  const base64regx = new RegExp('data:application/pdf;base64,JVBE', 'g');
  if (!pdf.match(base64regx)) {
    return <div>Pdf invalid</div>;
  }
  return (
    <div className="row-flex align-center" style={{ height: '88vh' }}>
      <embed
        className="hideScroll"
        src={`${pdf}#toolbar=0&navpanes=0&scrollbar=0`}
        type="application/pdf"
        width="100%"
        height="100%"
      />
    </div>
  );
}
