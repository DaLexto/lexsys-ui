export interface ResolvedRegistryStyleFile {
  path: string
  target: string
}

export interface ResolvedRegistryStyle {
  name: string
  version: string
  files: ResolvedRegistryStyleFile[]
}
