export type BreakPoint = {
  small?: BreakPointData;
  medium?: BreakPointData;
  large?: BreakPointData;
}

export type BreakPointData = {
  range: string;
  class: string | string[] | { [key: string]: boolean };
}
