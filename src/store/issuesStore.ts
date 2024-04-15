import { create } from "zustand";
import { persist } from "zustand/middleware";

import { octokit } from "api";
import { getDataFromLink } from "helpers";

import type { RequestError } from "@octokit/types";
import type { GithubIssue, IssueCategory } from "types";

type IssuesStore = {
  isLoading: boolean;
  error: string;
  currentRepositoryUrl: string;
  repositoriesData: {
    [repositoryUrl: string]: {
      todoIssues: GithubIssue[];
      inProgressIssues: GithubIssue[];
      doneIssues: GithubIssue[];
    };
  };
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
          set({ isLoading: true });

          const { owner, repo } = getDataFromLink(repositoryUrl);

          if (repositoryUrl in get().repositoriesData) {
            set({ currentRepositoryUrl: repositoryUrl });
            set({ isLoading: false });
            return;
          }

          const openIssuesResponse = await octokit.request(
            "GET /repos/{owner}/{repo}/issues",
            {
              owner: owner,
              repo: repo,
              state: "open",
            }
          );

          const doneIssuesResponse = await octokit.request(
            "GET /repos/{owner}/{repo}/issues",
            {
              owner: owner,
              repo: repo,
              state: "closed",
            }
          );

          const openIssues = openIssuesResponse.data;
          const doneIssues = doneIssuesResponse.data;

          const todoIssues = openIssues.filter((issue) => !issue.assignee);
          const inProgressIssues = openIssues.filter((issue) => issue.assignee);

          set({
            currentRepositoryUrl: repositoryUrl,
            repositoriesData: {
              ...get().repositoriesData,
              [repositoryUrl]: {
                todoIssues,
                inProgressIssues,
                doneIssues,
              },
            },
          });

          set({ isLoading: false });
        } catch (err) {
          const error = err as RequestError;
          set({ error: error.name });
          set({ isLoading: false });
        }
      },
      moveIssueBetweenCategories: (
        sourceCategory,
        destinationCategory,
        issueId,
        index
      ) => {
        const repositoryData =
          get().repositoriesData[get().currentRepositoryUrl];
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
          ...get().repositoriesData,
          [get().currentRepositoryUrl]: {
            ...repositoryData,
            [sourceCategory]: sourceIssues,
            [destinationCategory]: destinationIssues,
          },
        };

        set({
          ...get(),
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
