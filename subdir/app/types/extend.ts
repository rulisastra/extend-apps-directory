export enum Language {
  Go = 'Go',
  Shell = 'Shell',
  CSharp = 'C#',
  CPlusPlus = 'C++',
  Python = 'Python',
  Java = 'Java'
}

export enum FilterDevelopedBy {
  All = 'All',
  AccelByte = 'AccelByte',
  External = 'External'
}

export enum RepositoryType {
  ServiceExtension = 'service-extension',
  EventHandler = 'event-handler',
  Override = 'override'
}

export const mapRepositoryTypeToText: Record<RepositoryType, string> = {
  [RepositoryType.ServiceExtension]: 'Service Extension',
  [RepositoryType.EventHandler]: 'Event Handler',
  [RepositoryType.Override]: 'Override'
}

export const mapLanguageToColor: Record<Language, string> = {
  [Language.Go]: '#2AA1FF',
  [Language.Shell]: '#52C41A',
  [Language.CPlusPlus]: '#EB2F96',
  [Language.CSharp]: '#389E0D',
  [Language.Python]: '#004EC3',
  [Language.Java]: '#D48806'
}

export interface ExtendDirectoryAppInfo {
  // This needs to be generated manually, e.g. from https://www.uuidgenerator.net/.
  id: string
  imageUrl?: string
  title: string
  description: string
  creator: string
  // Undefined to indicate "coming soon".
  repositories?: RepositoryInfo[]
}

export interface RepositoryInfo {
  index?: boolean
  title: string
  description: string
  url: string
  language: Language
  // No type to indicate "index" repository, usually in "Suite" cases.
  type?: RepositoryType
  appRecommendedResource: {
    cpu: string
    memory: string
  }
}
