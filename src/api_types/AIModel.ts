// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { AIProvider } from "./AIProvider";

export interface AIModel {
  id: bigint;
  label: string;
  aiProvider: AIProvider;
  apiName: string;
  latestVersionApiName: string | null;
  contextWindow: number | null;
  pricePerMillionInputTokens: number | null;
  pricePerMillionOutputTokens: number | null;
  linkToModelDocumentation: string | null;
  createdAt: string;
  modifiedAt: string | null;
}
