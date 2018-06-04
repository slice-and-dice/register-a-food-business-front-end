const SessionWrapper = Page => {
  const wrapper = props => <Page {...props} />;

  wrapper.getInitialProps = ({ req }) => {
    return {
      sessionData: req.session.data,
      validatorErrors: req.session.validatorErrors || {}
    };
  };

  return wrapper;
};

export default SessionWrapper;
