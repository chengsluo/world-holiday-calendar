export const data = {
  pagination: { data: "site.dataFiles", size: 1, alias: "file" },
  permalink: ({ file }) => file.path,
  eleventyExcludeFromCollections: true,
};

export function render({ file }) {
  return JSON.stringify(file.content) + "\n";
}
