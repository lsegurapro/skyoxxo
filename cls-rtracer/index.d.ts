import { IncomingMessage, ServerResponse } from 'http'

export type RequestIdFactory = (req?: IncomingMessage | any) => unknown

export interface IOptions {
  // Default: false
  echoHeader?: boolean
  // Default: false
  useHeader?: boolean
  // Default: 'X-Request-Id'
  headerName?: string
  // Default: UUID v1
  requestIdFactory?: RequestIdFactory
}

export interface IFastifyOptions {
  // Default: false
  echoHeader?: boolean
  // Default: false
  useHeader?: boolean
  // Default: 'X-Request-Id'
  headerName?: string
  // Default: false
  useFastifyRequestId?: boolean
  // Default: UUID v1
  requestIdFactory?: RequestIdFactory
}

export interface IHapiPlugin<T> {
  name: string
  once: boolean
  register: (server: any, options: T) => void | Promise<void>
}

export declare const expressMiddleware: (
  options?: IOptions,
) => (
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: any) => void,
) => void

export declare const fastifyPlugin: (
  fastify: any,
  options: IFastifyOptions,
  done: (err?: any) => void,
) => void

export declare const fastifyMiddleware: (
  options?: IOptions,
) => (
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: any) => void,
) => void

export declare const koaMiddleware: (
  options?: IOptions,
) => (
  ctx: { request: IncomingMessage; response: ServerResponse },
  next: () => Promise<void>,
) => Promise<void>

export declare const koaV1Middleware: (
  options?: IOptions,
) => GeneratorFunction

export declare const hapiPlugin: IHapiPlugin<IOptions>

export declare function runWithId<T>(fn: () => T, id?: unknown): T

export declare const id: () => unknown | undefined

export declare function set(id:string|number): void