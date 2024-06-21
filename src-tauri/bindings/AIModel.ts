// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { AIModelDeveloper } from "./AIModelDeveloper";
import type { AIModelFeatures } from "./AIModelFeatures";
import type { AIProvider } from "./AIProvider";

export type AIModel = { label: string, aiProvider: AIProvider, developer: AIModelDeveloper | null, features: Array<AIModelFeatures>, apiName: string, latestVersionApiName: string | null, tag: string | null, contextWindow: number | null, pricePerMillionInputTokens: number | null, pricePerMillionOutputTokens: number | null, linkToModelDocumentation: string | null, };