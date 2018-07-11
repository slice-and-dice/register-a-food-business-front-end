import SessionWrapper from "../components/SessionWrapper";
import renderer from "react-test-renderer";

const ExampleComponent = () => (
  <div>
    <h1>A title</h1>
    <p>Some paragraph text</p>
  </div>
);

describe("<SessionWrapper />", () => {
  describe("the wrapper function", () => {
    it("returns the same component that it is passed", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const treeWrapped = renderer.create(<WrappedComponent />).toJSON();
      const treeOriginal = renderer.create(<ExampleComponent />).toJSON();
      expect(JSON.stringify(treeOriginal)).toEqual(JSON.stringify(treeWrapped));
    });

    it("returns some initial props via getInitialProps when passed a session object", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({
        req: { session: {} }
      });
      expect(typeof initialProps).toBe("object");
    });

    it("returns a 'cumulativeAnswers' object as part of the initial props", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({
        req: { session: {} }
      });
      expect(typeof initialProps.cumulativeAnswers).toBe("object");
    });

    it("returns a 'validatorErrors' object as part of the initial props", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({
        req: { session: {} }
      });
      expect(typeof initialProps.validatorErrors).toBe("object");
    });

    it("returns a 'submissionData' object as part of the initial props", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({
        req: { session: {} }
      });
      expect(typeof initialProps.submissionData).toBe("object");
    });

    it("returns a 'switches' object as part of the initial props", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({
        req: { session: {} }
      });
      expect(typeof initialProps.switches).toBe("object");
    });

    it("returns 'validatorErrors', 'cumulativeAnswers', 'submissionData', and 'switches' even if req is undefined", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({});
      expect(typeof initialProps.validatorErrors).toBe("object");
      expect(typeof initialProps.cumulativeAnswers).toBe("object");
      expect(typeof initialProps.submissionData).toBe("object");
      expect(typeof initialProps.switches).toBe("object");
    });
  });

  describe("the resulting child component", () => {
    describe("given that req.session.cumulativeAnswers is undefined", () => {
      it("props.cumulativeAnswers is an empty object", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: {} }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.cumulativeAnswers).toEqual({});
      });
    });

    describe("given that req.session.validatorErrors is undefined", () => {
      it("props.validatorErrors is an empty object", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: {} }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.validatorErrors).toEqual({});
      });
    });

    describe("given that req.session.submissionData is undefined", () => {
      it("props.submissionData is an empty object", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: {} }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.submissionData).toEqual({});
      });
    });

    describe("given that req.session.switches is undefined", () => {
      it("props.submissionData is an empty object", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: {} }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.switches).toEqual({});
      });
    });

    describe("given that req.session.cumulativeAnswers is defined", () => {
      it("props.cumulativeAnswers is the same as the session.cumulativeAnswers", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const exampleCumulativeAnswers = { test: "value" };
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: { cumulativeAnswers: exampleCumulativeAnswers } }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.cumulativeAnswers).toBe(exampleCumulativeAnswers);
      });
    });

    describe("given that req.session.validatorErrors is defined", () => {
      it("props.validatorErrors is the same as the session.validatorErrors", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const exampleValidatorErrors = { test: "value" };
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: { validatorErrors: exampleValidatorErrors } }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.validatorErrors).toBe(exampleValidatorErrors);
      });
    });

    describe("given that req.session.submissionData is defined", () => {
      it("props.submissionData is the same as the session.submissionData", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const exampleValidatorErrors = { test: "value" };
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: { submissionData: exampleValidatorErrors } }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.submissionData).toBe(exampleValidatorErrors);
      });
    });

    describe("given that req.session.switches is defined", () => {
      it("props.submissionData is the same as the session.submissionData", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const exampleSwitches = { test: true };
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: { switches: exampleSwitches } }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.switches).toBe(exampleSwitches);
      });
    });
  });
});
