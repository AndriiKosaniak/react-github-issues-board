import { octokit } from "api";

export const githubApi = {
  fetchIssues({
    owner,
    repo,
    state,
  }: {
    owner: string;
    repo: string;
    state: "open" | "closed";
  }) {
    return octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner,
      repo,
      state,
    });
  },
};
