import {
  Config as SemanticReleaseConfig,
  Context as SemanticReleaseContext,
  Result as SemanticReleaseResult
} from 'semantic-release'

export interface Context
  extends SemanticReleaseContext,
    SemanticReleaseConfig,
    SemanticReleaseResult {}

export interface SwarmService {
  name?: string
  image?: string
  updateOrder?: string
}
export interface Config {
  dockerHost?: string
  services?: SwarmService[]
}

export interface SemanticReleaseError {
  message: string
  details: string
}
