import {SelectListItem} from "./selectListItem";

export class SelectListProgressData {
  items: SelectListItem[];

  stepOneTitle: string;
  stepOneButtonBack: string;
  stepOneButtonForward: string;
  stepOneSearchBar: string;

  stepTwoTitle: string;
  stepTwoButtonBack: string;
  stepTwoButtonForward: string;
  stepTwoInfoText: string;

  stepThreeTitle: string;
  stepThreeButtonBack: string;
  stepThreeButtonForward: string;
  stepThreeInfoText: string;
  stepThreeInfoSuccessText: string;


  constructor(items: SelectListItem[], stepOneTitle: string, stepOneButtonBack: string, stepOneButtonForward: string, stepOneSearchBar: string, stepTwoTitle: string, stepTwoButtonBack: string, stepTwoButtonForward: string, stepTwoInfoText: string, stepThreeTitle: string, stepThreeButtonBack: string, stepThreeButtonForward: string, stepThreeInfoText: string, stepThreeInfoSuccessText: string) {
    this.items = items;
    this.stepOneTitle = stepOneTitle;
    this.stepOneButtonBack = stepOneButtonBack;
    this.stepOneButtonForward = stepOneButtonForward;
    this.stepOneSearchBar = stepOneSearchBar;
    this.stepTwoTitle = stepTwoTitle;
    this.stepTwoButtonBack = stepTwoButtonBack;
    this.stepTwoButtonForward = stepTwoButtonForward;
    this.stepTwoInfoText = stepTwoInfoText;
    this.stepThreeTitle = stepThreeTitle;
    this.stepThreeButtonBack = stepThreeButtonBack;
    this.stepThreeButtonForward = stepThreeButtonForward;
    this.stepThreeInfoText = stepThreeInfoText;
    this.stepThreeInfoSuccessText = stepThreeInfoSuccessText;
  }
}
