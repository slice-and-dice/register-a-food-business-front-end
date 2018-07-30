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

    it("returns a 'switches' object as part of the initial props", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({
        req: { session: {} }
      });
      expect(typeof initialProps.switches).toBe("object");
    });

    it("returns an 'addressLookups object as part of the initial props", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({
        req: { session: {} }
      });
      expect(typeof initialProps.addressLookups).toBe("object");
    });

    describe("given a url query that includes an edit value", () => {
      it("returns an editMode value that is true", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: {}, query: { edit: "on" } }
        });
        expect(initialProps.editMode).toBe(true);
      });
    });

    describe("given a url query that does not include an edit value", () => {
      it("returns an editMode value that is false", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: {}, query: {} }
        });
        expect(initialProps.editMode).toBe(false);
      });
    });

    it("returns 'validatorErrors', 'cumulativeAnswers', 'switches', and 'addressLookups' even if req is undefined", () => {
      const WrappedComponent = SessionWrapper(ExampleComponent);
      const initialProps = WrappedComponent.getInitialProps({});
      expect(typeof initialProps.validatorErrors).toBe("object");
      expect(typeof initialProps.cumulativeAnswers).toBe("object");
      expect(typeof initialProps.switches).toBe("object");
      expect(typeof initialProps.addressLookups).toBe("object");
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

    describe("given that req.session.switches is undefined", () => {
      it("props.switches is object with an editMode property", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: {} }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.editMode).toBeDefined();
      });
    });

    describe("given that req.session.addressLookups is undefined", () => {
      it("props.switches is object with an editMode property", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: {} }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.addressLookups).toEqual({});
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

    describe("given that req.session.switches is defined", () => {
      it("props.switches is the same as the session.switches but with an editMode property", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const exampleSwitches = { test: true };
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: { switches: exampleSwitches } }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.switches.test).toBe(true);
        expect(componentProps.editMode).toBeDefined();
      });
    });

    describe("given that req.session.addressLookups is defined", () => {
      it("props.validatorErrors is the same as the session.validatorErrors", () => {
        const WrappedComponent = SessionWrapper(ExampleComponent);
        const exampleAddressLookup = { test: [] };
        const initialProps = WrappedComponent.getInitialProps({
          req: { session: { addressLookups: exampleAddressLookup } }
        });
        const componentProps = WrappedComponent(initialProps).props;
        expect(componentProps.addressLookups).toBe(exampleAddressLookup);
      });
    });
  });
});
