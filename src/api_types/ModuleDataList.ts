// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { AIIntegration } from "./AIIntegration";
import type { Chat } from "./Chat";
import type { DatabaseSource } from "./DatabaseSource";
import type { DirectorySource } from "./DirectorySource";
import type { Email } from "./Email";
import type { EmailAccount } from "./EmailAccount";
import type { Mailbox } from "./Mailbox";
import type { OAuth2App } from "./OAuth2App";
import type { UserAccount } from "./UserAccount";

export type ModuleDataList =
  | { type: "UserAccount"; data: Array<UserAccount> }
  | { type: "DirectorySource"; data: Array<DirectorySource> }
  | { type: "DatabaseSource"; data: Array<DatabaseSource> }
  | { type: "AIIntegration"; data: Array<AIIntegration> }
  | { type: "Chat"; data: Array<Chat> }
  | { type: "OAuth2App"; data: Array<OAuth2App> }
  | { type: "EmailAccount"; data: Array<EmailAccount> }
  | { type: "Mailbox"; data: Array<Mailbox> }
  | { type: "Email"; data: Array<Email> };
