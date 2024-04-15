import { Endpoints } from "@octokit/types";

export type IssueCategory = "todoIssues" | "inProgressIssues" | "doneIssues"

export type GithubIssue =
  Endpoints["GET /repos/{owner}/{repo}/issues/{issue_number}"]["response"]["data"];
