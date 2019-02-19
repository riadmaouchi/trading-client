declare module '*.css' {
  const styles: any;
  export = styles;
}

declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?(): (args?: any) => any;
}
