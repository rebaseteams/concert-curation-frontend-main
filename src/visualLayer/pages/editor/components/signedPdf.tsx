export function renderSignedPdf(pdf: string): JSX.Element {
  if (pdf.length < 10) {
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
