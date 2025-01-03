/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATABASE: string;
  readonly VITE_STORE_NAME: string;

}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
