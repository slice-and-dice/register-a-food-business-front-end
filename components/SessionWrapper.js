const SessionWrapper = Page => {
  const wrapper = props => <Page {...props} />;

  wrapper.getInitialProps = ({ req }) => {
    return {
      cumulativeAnswers: req.session.cumulativeAnswers || {},
      validatorErrors: req.session.validatorErrors || {}
    };
  };

  return wrapper;
};

export default SessionWrapper;
