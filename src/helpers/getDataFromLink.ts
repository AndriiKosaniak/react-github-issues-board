export const getDataFromLink = (link: string) => {
  const split = link.split("/");

  const owner = split[3];
  const repo = split[4];

  const linkToOwner = split.slice(0, 4).join("/");
  const linkToRepo = split.slice(0, 5).join("/");

  return { owner, repo, linkToOwner, linkToRepo };
};
