import { Component, createContext, createResource, useContext } from "solid-js";
import { invoke } from "@tauri-apps/api/core";
import { IProviderPropTypes } from "../utils/types";
import { ModuleDataReadList } from "../api_types/ModuleDataReadList";
import { Module } from "../api_types/Module";
import { Email } from "../api_types/Email";
import { EmailAccount } from "../api_types/EmailAccount";
import { Mailbox } from "../api_types/Mailbox";
import { ModuleFilters } from "../api_types/ModuleFilters";

const makeStore = () => {
  const [emails, { mutate: _mutateEmails, refetch: refetchEmails }] =
    createResource<{
      data: Array<Email>;
    }>(async (_, { value, refetching }) => {
      let filters = {
        Email: {},
      } as ModuleFilters;

      if (!!refetching && typeof refetching === "object") {
        filters = {
          Email: {
            // We are fetching emails from a specific mailbox
            emailAccountIdList:
              "emailAccountIdList" in refetching
                ? refetching.emailAccountIdList
                : [],
            searchQuery:
              "searchQuery" in refetching ? refetching.searchQuery : undefined,
          },
        } as ModuleFilters;
      }
      const result = await invoke<ModuleDataReadList>("search_emails", {
        filters,
      });
      if (
        !!result &&
        "data" in result &&
        "type" in result["data"] &&
        result["data"]["type"] === "Email"
      ) {
        return { ...value, data: result["data"]["data"] as Array<Email> };
      }
      return { data: [] };
    });

  const [
    emailAccounts,
    { mutate: _mutateEmailAccounts, refetch: refetchEmailAccounts },
  ] = createResource<{ data: Array<EmailAccount> }>(
    async (_, { value: _value, refetching: _refetching }) => {
      const result = await invoke<ModuleDataReadList>(
        "read_row_list_for_module",
        {
          module: "EmailAccount" as Module,
        },
      );

      if (
        !!result &&
        "data" in result &&
        "type" in result["data"] &&
        result["data"]["type"] === "EmailAccount"
      ) {
        return {
          data: result["data"]["data"] as Array<EmailAccount>,
        };
      }
      return { data: [] };
    },
  );

  const [mailboxes, { mutate: _mutateMailboxes, refetch: refetchMailboxes }] =
    createResource<{ data: Array<Mailbox> }>(
      async (_, { value: _value, refetching: _refetching }) => {
        const result = await invoke<ModuleDataReadList>(
          "read_row_list_for_module",
          {
            module: "Mailbox" as Module,
          },
        );
        if (
          !!result &&
          "data" in result &&
          "type" in result["data"] &&
          result["data"]["type"] === "Mailbox"
        ) {
          return {
            data: result["data"]["data"] as Array<Mailbox>,
          };
        }
        return { data: [] };
      },
    );

  return [
    emailAccounts,
    mailboxes,
    emails,
    {
      fetchAllEmailAccounts: () => {
        refetchEmailAccounts();
      },

      fetchAllMailboxes: () => {
        refetchMailboxes();
      },

      fetchEmailsForAccounts: (
        emailAccountIdList: number[],
        searchQuery: string | undefined,
      ) => {
        if (!emailAccountIdList) return;
        refetchEmails({ emailAccountIdList, searchQuery });
      },
    },
  ] as const; // `as const` forces tuple type inference
};

type TStoreAndFunctions = ReturnType<typeof makeStore>;
const searchableDataStore = makeStore();

const SearchableDataContext =
  createContext<TStoreAndFunctions>(searchableDataStore);

export const SearchableDataProvider: Component<IProviderPropTypes> = (
  props,
) => {
  return (
    <SearchableDataContext.Provider value={searchableDataStore}>
      {props.children}
    </SearchableDataContext.Provider>
  );
};

export const useSearchableData = () => useContext(SearchableDataContext);
