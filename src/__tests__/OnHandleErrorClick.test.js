import OnHandleErrorClick from "../components/OnHandleErrorClick";

const a = () => {
  return [{ scrollIntoView: jest.fn() }];
};
document.getElementsByName = jest.fn(a);

describe("On Handle Error Click function"),
  () => {
    const targetName = "test";
    it("Uses target name props to run the getElementsByName function"),
      () => {
        OnHandleErrorClick(targetName);
        expect(document.getElementsByName).toHaveBeenCalled();
      };
  };
