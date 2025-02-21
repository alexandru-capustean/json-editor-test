declare module "jsoneditor" {
  interface JSONEditorOptions {
    schema?: any;
    startval?: any;
    modes?: string[];
    options?: any;
  }

  class JSONEditor {
    constructor(container: HTMLElement, options: JSONEditorOptions);
    destroy(): void;
    get(): any;
    set(value: any): void;
  }

  export default JSONEditor;
}
