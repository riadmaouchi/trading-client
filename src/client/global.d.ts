declare module '*.css' {
  const styles: any;
  export = styles;
}

declare interface Window {
  devToolsExtension?(): (args?: any) => any;
}
