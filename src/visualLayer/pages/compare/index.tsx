const createCompareComponent = ():
    () => JSX.Element => {
  const ComparePage = (): JSX.Element => (
    <div>
      compare page
    </div>
  );

  return ComparePage;
};

export default createCompareComponent;
