import { jest, expect, describe, test, beforeEach } from "@jest/globals";
import { JSDOM } from "jsdom";
import View from "./../../../public/controller/js/view.js";

describe("#View - test suite for presentation layer", () => {
  const dom = new JSDOM();
  global.document = dom.window.document;
  global.window = dom.window;

  function makeButtonElement(
    { text, classList } = {
      text: "",
      classList: { add: jest.fn(), remove: jest.fn() },
    }
  ) {
    return {
      onclick: jest.fn(),
      classList,
      innerText: text,
    };
  }

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.spyOn(document, "getElementById").mockReturnValue(makeButtonElement());
  });

  test("#changeCommandButtonsVisibility - given hide=true it should add \
    unassigned class and reset onclick", () => {
    const view = new View();
    const btn = makeButtonElement();

    jest.spyOn(document, "querySelectorAll").mockReturnValue([btn]);

    view.changeCommandButtonsVisibility();

    expect(btn.classList.add).toHaveBeenCalledWith("unassigned");
    expect(btn.onclick.name).toStrictEqual("onClickReset");
    expect(() => btn.onclick()).not.toThrow();
  });

  test("#changeCommandButtonsVisibility - given hide=false it should remove \
    unassigned class and reset onclick", () => {
    const view = new View();
    const btn = makeButtonElement();

    jest.spyOn(document, "querySelectorAll").mockReturnValue([btn]);

    view.changeCommandButtonsVisibility(false);

    expect(btn.classList.add).not.toHaveBeenCalledWith();
    expect(btn.classList.remove).toHaveBeenCalledWith("unassigned");
    expect(btn.onclick.name).toStrictEqual("onClickReset");
    expect(() => btn.onclick()).not.toThrow();
  });

  test("#onLoad", () => {
    const view = new View();
    jest
      .spyOn(view, view.changeCommandButtonsVisibility.name)
      .mockReturnValue();

    view.onLoad();

    expect(view.changeCommandButtonsVisibility).toHaveBeenCalled();
  });
});
