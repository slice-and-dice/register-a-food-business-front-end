const SessionWrapper = Page => {
  const wrapper = props => <Page {...props} />;

  wrapper.getInitialProps = ({ req }) => {
    const initialProps = {
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
      referenceNumber: "34672462",
      submissionDate: "18/03/2018",
      localCouncil: "Rushmoor Borough Council",
      localCouncilEmail: "food@rushmoorboroughcouncil.gov.uk"
    };

    req && req.query && req.query.edit === "on"
      ? (initialProps.editMode = true)
      : (initialProps.editMode = false);

    return initialProps;
  };

  return wrapper;
};

export default SessionWrapper;
