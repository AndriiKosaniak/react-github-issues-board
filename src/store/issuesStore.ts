import { create } from "zustand";
import { persist } from "zustand/middleware";

import { githubApi } from "api";
import { getDataFromLink } from "helpers";

import type { RequestError } from "@octokit/types";
import type { GithubIssue, IssueCategory } from "types";

type RepositoriesData = {
  [repositoryUrl: string]: {
    todoIssues: GithubIssue[];
    inProgressIssues: GithubIssue[];
    doneIssues: GithubIssue[];
  };
};

type IssuesStore = {
  isLoading: boolean;
  error: string;
  currentRepositoryUrl: string;
  repositoriesData: RepositoriesData;
  fetchIssues: (repositoryUrl: string) => void;
  moveIssueBetweenCategories: (
    sourceCategory: IssueCategory,
    destinationCategory: IssueCategory,
    issueId: number,
    index: number
  ) => void;
  discardError: () => void;
};

export const useIssuesStore = create<IssuesStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      error: "",
      repositoriesData: {},
      currentRepositoryUrl: "",
      fetchIssues: async (repositoryUrl) => {
        try {
          const { owner, repo } = getDataFromLink(repositoryUrl);

          const { repositoriesData } = get();

          set({ currentRepositoryUrl: repositoryUrl });

          if (repositoryUrl in repositoriesData) return;

          set({ isLoading: true });

          const [{ data: openIssues }, { data: doneIssues }] =
            await Promise.all([
              githubApi.fetchIssues({
                owner,
                repo,
                state: "open",
              }),
              githubApi.fetchIssues({
                owner,
                repo,
                state: "closed",
              }),
            ]);

          const todoIssues = openIssues.filter((issue) => !issue.assignee);
          const inProgressIssues = openIssues.filter((issue) => issue.assignee);

          set({
            currentRepositoryUrl: repositoryUrl,
            repositoriesData: {
              ...repositoriesData,
              [repositoryUrl]: {
                todoIssues,
                inProgressIssues,
                doneIssues,
              },
            },
          });
        } catch (err) {
          const { name } = err as RequestError;
          set({ error: name });
        } finally {
          set({ isLoading: false });
        }
      },
      moveIssueBetweenCategories: (
        sourceCategory,
        destinationCategory,
        issueId,
        index
      ) => {
        const { repositoriesData, currentRepositoryUrl } = get();
        const repositoryData = repositoriesData[currentRepositoryUrl];

        if (!repositoryData) return get();

        const sourceIssues = repositoryData[sourceCategory];
        const destinationIssues = repositoryData[destinationCategory];

        const issueIndex = sourceIssues.findIndex(
          (issue: GithubIssue) => issue.id === issueId
        );
        if (issueIndex === -1) return get();

        const [movedIssue] = sourceIssues.splice(issueIndex, 1);

        destinationIssues.splice(index, 0, movedIssue);

        const updatedRepositoriesData = {
          ...repositoriesData,
          [currentRepositoryUrl]: {
            ...repositoryData,
            [sourceCategory]: sourceIssues,
            [destinationCategory]: destinationIssues,
          },
        };

        set({
          repositoriesData: updatedRepositoriesData,
        });
      },
      discardError: () => set({ error: "" }),
    }),
    {
      name: "issues-storage",
    }
  )
);
