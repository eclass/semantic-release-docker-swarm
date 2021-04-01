import {
  Config as SemanticReleaseConfig,
  Context as SemanticReleaseContext,
  Result as SemanticReleaseResult
} from 'semantic-release'

export interface Context
  extends SemanticReleaseContext,
    SemanticReleaseConfig,
    SemanticReleaseResult {}

export interface Config {
  dockerHost?: string
  service?: string
  image?: string
  updateOrder?: string
}

export interface SemanticReleaseError {
  message: string
  details: string
}
