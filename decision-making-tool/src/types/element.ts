export type Element<T extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap> = {
  tag: T;
  className?: string;
  text?: string;
};