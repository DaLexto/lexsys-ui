declare module "react" {
  export type ReactNode = unknown
  export type RefCallback<T> = (instance: T | null) => void

  export interface RefObject<T> {
    current: T | null
  }

  export type Ref<T> = RefCallback<T> | RefObject<T> | null
  export type ForwardedRef<T> = Ref<T>

  export interface Attributes {
    key?: string | number
  }

  export interface RefAttributes<T> {
    ref?: Ref<T>
  }

  export interface DOMAttributes<T> {
    children?: ReactNode
    currentTarget?: T
  }

  export interface HTMLAttributes<T> extends DOMAttributes<T> {
    className?: string
    [key: string]: unknown
  }

  export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean
    type?: "button" | "submit" | "reset"
    "aria-busy"?: boolean
  }

  export interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean
    placeholder?: string
    type?: string
    value?: string | number | readonly string[]
    defaultValue?: string | number | readonly string[]
    "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling"
  }

  export type ReactElement = JSX.Element

  export interface ForwardRefExoticComponent<P> {
    (props: P): ReactElement | null
    displayName?: string
  }

  export function forwardRef<T, P extends object = object>(
    render: (props: P, ref: ForwardedRef<T>) => ReactElement | null,
  ): ForwardRefExoticComponent<P & RefAttributes<T>>
}

declare module "react/jsx-runtime" {
  export const Fragment: unique symbol
  export function jsx(type: unknown, props: unknown, key?: unknown): unknown
  export function jsxs(type: unknown, props: unknown, key?: unknown): unknown
}

declare module "class-variance-authority" {
  export function cva(
    base?: string,
    config?: unknown,
  ): (options?: unknown) => string
}

declare module "clsx" {
  export type ClassValue = unknown
  export function clsx(...inputs: ClassValue[]): string
}

declare module "tailwind-merge" {
  export function twMerge(...classLists: string[]): string
}

declare module "@/lib/utils" {
  export function cn(...inputs: unknown[]): string
}

declare namespace JSX {
  interface Element {
    readonly __jsxElementBrand?: never
  }

  interface IntrinsicElements {
    button: IntrinsicElement
    div: IntrinsicElement
    h3: IntrinsicElement
    input: IntrinsicElement
    label: IntrinsicElement
    p: IntrinsicElement
    span: IntrinsicElement
    textarea: IntrinsicElement
  }

  interface IntrinsicElement {
    ref?: unknown
    className?: string
    children?: unknown
    disabled?: boolean
    [key: string]: unknown
  }
}
