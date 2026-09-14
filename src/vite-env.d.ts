/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the socket.io server the two players talk through. */
  readonly VITE_SERVER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
