import * as fs from 'fs';
import * as path from 'path';
import { parseArgs, ParseArgsConfig } from "node:util";
import ejs from 'ejs';

function main() {
  const args = parseArgs({
    options: parseArgsOptions,
    args: process.argv.slice(2),
  });

  // Get the current date
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');

  // Define the source and destination paths
  const sourcePath = path.join(__dirname, '../templates/entry.tmpl.md');
  const destDir = path.join(__dirname, `../entries/${year}/${month}`);
  const fileName = args.values.slug ? `${args.values.slug}.md` : `new-entry-${Date.now()}.md`;
  const destPath = path.join(destDir, fileName);

  // Ensure the destination directory exists
  fs.mkdirSync(destDir, { recursive: true });

  // Read the EJS template file
  const template = fs.readFileSync(sourcePath, 'utf-8');

  const data = {
    title: args.values.title ?? "New Entry",
    description: args.values.description ?? "Description of the entry",
    tags: args.values.tags ?? [],
    created_at: `${year}-${month}-${date}`,
    updated_at: null,
    thumbnail_path: `/assets/images/${year}/${month}/image-name.jpg`,
    thumbnail_alt: `thumbnail ALT text`,
  };

  // Render the template with data
  const rendered = ejs.render(template, data);

  // Write the rendered content to the destination file
  fs.writeFileSync(destPath, rendered);

  console.log(`File created at ${destPath}`);
}

const parseArgsOptions = {
  title: {
    type: 'string',
    short: "t",
    multiple: false,
  },
  slug: {
    type: 'string',
    short: "s",
    multiple: false,
  },
  description: {
    type: 'string',
    short: "d",
    multiple: false,
  },
  tags: {
    type: 'string',
    short: "g",
    multiple: true,
  },
} satisfies ParseArgsConfig["options"];

main();
