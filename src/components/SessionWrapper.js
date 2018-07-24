const SessionWrapper = Page => {
  const wrapper = props => <Page {...props} />;

  wrapper.getInitialProps = ({ req }) => {
    return {
      cumulativeAnswers:
        req && req.session && req.session.cumulativeAnswers
          ? req.session.cumulativeAnswers
          : {},
      validatorErrors:
        req && req.session && req.session.validatorErrors
          ? req.session.validatorErrors
          : {},
      switches:
        req && req.session && req.session.switches ? req.session.switches : {},
      referenceNumber: "34672462"
    };
  };

  return wrapper;
};

export default SessionWrapper;
