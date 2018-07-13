import OnHandleErrorClick from "../components/OnHandleErrorClick";

const scrollIntoView = jest.fn();
document.getElementsByName = jest.fn(() => {
  return [{ scrollIntoView: scrollIntoView }];
});

describe("On Handle Error Click function", () => {
  it("Uses target name props to run the getElementsByName function", () => {
    const targetName = "test";
    OnHandleErrorClick(targetName);
    expect(document.getElementsByName).toHaveBeenCalledWith(targetName);
    expect(scrollIntoView).toHaveBeenCalled();
  });
});
