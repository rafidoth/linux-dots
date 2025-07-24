const fs = require('fs/promises');
const path = require('path');
const showdown = require('showdown');
const matter = require('gray-matter');
const cheerio = require('cheerio');

// Configure showdown
const converter = new showdown.Converter({
  tables: true,
  strikethrough: true,
  tasklists: true,
  ghCodeBlocks: true,
  emoji: true
});

async function convertMarkdownToHtml(markdownDir, outputDir, indexPath) {
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true });

    // Read all markdown files
    const files = await fs.readdir(markdownDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    // Array to store article metadata
    const articles = [];

    // Process each markdown file
    for (const file of markdownFiles) {
      const markdownPath = path.join(markdownDir, file);
      const markdownContent = await fs.readFile(markdownPath, 'utf-8');

      // Parse frontmatter and content
      const { data: frontmatter, content } = matter(markdownContent);
      
      // Convert markdown to HTML using showdown
      const htmlContent = converter.makeHtml(content);

      // Create HTML file name
      const htmlFileName = path.basename(file, '.md') + '.html';
      const htmlPath = path.join(outputDir, htmlFileName);

      // Create complete HTML document
      const completeHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${frontmatter.title || 'Article'}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css">
    <style>
      .content pre {
        padding: 1em;
        background: #f5f5f5;
        border-radius: 4px;
      }
      .content code {
        background: #f5f5f5;
        padding: 0.2em 0.4em;
        border-radius: 3px;
      }
    </style>
  </head>
  <body>
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-two-thirds">
            <article class="content">
              ${htmlContent}
            </article>
          </div>
        </div>
      </div>
    </section>
  </body>
</html>`;

      // Save HTML file
      await fs.writeFile(htmlPath, completeHtml);

      // Store article metadata
      articles.push({
        title: frontmatter.title || 'Untitled',
        date: frontmatter.date || new Date().toISOString(),
        description: frontmatter.description || '',
        tags: frontmatter.tags || [],
        url: htmlFileName
      });
    }

    // Sort articles by date
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Update index.html
    await updateIndexPage(indexPath, articles);

    console.log('Conversion completed successfully!');
  } catch (error) {
    console.error('Error during conversion:', error);
  }
}

async function updateIndexPage(indexPath, articles) {
  // Read the index file
  const indexHtml = await fs.readFile(indexPath, 'utf-8');
  const $ = cheerio.load(indexHtml);

  // Find the container for articles
  const container = $('.column.is-two-thirds');
  container.empty();

  // Add articles to the container
  articles.forEach(article => {
    const articleHtml = `
      <div class="card mb-5">
        <div class="card-content">
          <h2 class="title is-4">
            <a href="articles/${article.url}" class="has-text-dark">${article.title}</a>
          </h2>
          <p class="subtitle is-6 mb-2">${new Date(article.date).toLocaleDateString()}</p>
          <div class="content">
            <p>${article.description}</p>
          </div>
          ${article.tags.length > 0 ? `
          <div class="tags">
            ${article.tags.map(tag => `<span class="tag is-primary">${tag}</span>`).join('')}
          </div>
          ` : ''}
        </div>
      </div>
    `;
    container.append(articleHtml);
  });

  // Save updated index file
  await fs.writeFile(indexPath, $.html());
}

// Example usage
const markdownDir = './markdown';  // Directory containing markdown files
const outputDir = './articles';    // Directory for output HTML files
const indexPath = './index.html';  // Path to your index.html file

convertMarkdownToHtml(markdownDir, outputDir, indexPath);