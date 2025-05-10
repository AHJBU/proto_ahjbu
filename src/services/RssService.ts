
/**
 * RSS Feed Service
 * Manages the generation and serving of RSS feeds for the blog
 */

interface RssFeedItem {
  id: string | number;
  title: string;
  link: string;
  description: string;
  pubDate: Date;
  author?: string;
  category?: string;
  content?: string;
  imageUrl?: string;
}

interface RssFeedOptions {
  title: string;
  description: string;
  siteUrl: string;
  feedUrl: string;
  language?: string;
  copyright?: string;
  managingEditor?: string;
  webMaster?: string;
  ttl?: number; // Time to live in minutes
  imageUrl?: string;
}

export class RssService {
  /**
   * Generates an RSS feed XML string
   * 
   * @param items Feed items to include
   * @param options Feed options
   * @returns RSS feed XML as string
   */
  static generateFeed(items: RssFeedItem[], options: RssFeedOptions): string {
    const { 
      title, 
      description, 
      siteUrl, 
      feedUrl,
      language = 'en-us',
      copyright = `Copyright ${new Date().getFullYear()}`,
      managingEditor = '',
      webMaster = '',
      ttl = 60,
      imageUrl = ''
    } = options;
    
    const lastBuildDate = new Date().toUTCString();
    
    // Start building the RSS XML
    let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${this.escapeXml(title)}</title>
  <link>${siteUrl}</link>
  <description>${this.escapeXml(description)}</description>
  <language>${language}</language>
  <lastBuildDate>${lastBuildDate}</lastBuildDate>
  <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
  <copyright>${this.escapeXml(copyright)}</copyright>
  <ttl>${ttl}</ttl>`;
    
    // Add optional channel elements
    if (managingEditor) {
      rss += `\n  <managingEditor>${this.escapeXml(managingEditor)}</managingEditor>`;
    }
    
    if (webMaster) {
      rss += `\n  <webMaster>${this.escapeXml(webMaster)}</webMaster>`;
    }
    
    // Add channel image if provided
    if (imageUrl) {
      rss += `\n  <image>
    <url>${imageUrl}</url>
    <title>${this.escapeXml(title)}</title>
    <link>${siteUrl}</link>
  </image>`;
    }
    
    // Add each item to the feed
    items.forEach(item => {
      rss += `\n  <item>
    <title>${this.escapeXml(item.title)}</title>
    <link>${item.link}</link>
    <description>${this.escapeXml(item.description)}</description>
    <pubDate>${item.pubDate.toUTCString()}</pubDate>
    <guid isPermaLink="true">${item.link}</guid>`;
      
      // Add optional item elements
      if (item.author) {
        rss += `\n    <author>${this.escapeXml(item.author)}</author>`;
      }
      
      if (item.category) {
        rss += `\n    <category>${this.escapeXml(item.category)}</category>`;
      }
      
      if (item.content) {
        rss += `\n    <content:encoded><![CDATA[${item.content}]]></content:encoded>`;
      }
      
      if (item.imageUrl) {
        rss += `\n    <enclosure url="${item.imageUrl}" type="image/jpeg" length="0" />`;
      }
      
      rss += `\n  </item>`;
    });
    
    // Close the RSS feed
    rss += `\n</channel>\n</rss>`;
    
    return rss;
  }
  
  /**
   * Generates an Atom feed XML string
   * 
   * @param items Feed items to include
   * @param options Feed options
   * @returns Atom feed XML as string
   */
  static generateAtomFeed(items: RssFeedItem[], options: RssFeedOptions): string {
    const { 
      title, 
      description, 
      siteUrl, 
      feedUrl,
      language = 'en-us',
      copyright = `Copyright ${new Date().getFullYear()}`,
      managingEditor = ''
    } = options;
    
    const updated = new Date().toISOString();
    
    // Start building the Atom XML
    let atom = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${this.escapeXml(title)}</title>
  <subtitle>${this.escapeXml(description)}</subtitle>
  <link href="${siteUrl}" />
  <link href="${feedUrl}" rel="self" />
  <id>${siteUrl}</id>
  <updated>${updated}</updated>
  <rights>${this.escapeXml(copyright)}</rights>`;
    
    if (managingEditor) {
      atom += `\n  <author>
    <name>${this.escapeXml(managingEditor)}</name>
  </author>`;
    }
    
    // Add each entry to the feed
    items.forEach(item => {
      atom += `\n  <entry>
    <title>${this.escapeXml(item.title)}</title>
    <link href="${item.link}" />
    <id>${item.link}</id>
    <updated>${item.pubDate.toISOString()}</updated>
    <summary>${this.escapeXml(item.description)}</summary>`;
      
      if (item.content) {
        atom += `\n    <content type="html"><![CDATA[${item.content}]]></content>`;
      }
      
      if (item.author) {
        atom += `\n    <author>
      <name>${this.escapeXml(item.author)}</name>
    </author>`;
      }
      
      if (item.category) {
        atom += `\n    <category term="${this.escapeXml(item.category)}" />`;
      }
      
      atom += `\n  </entry>`;
    });
    
    // Close the Atom feed
    atom += `\n</feed>`;
    
    return atom;
  }
  
  /**
   * Escapes XML special characters
   * 
   * @param unsafe String to escape
   * @returns Escaped string
   */
  private static escapeXml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
  
  /**
   * Generates and serves an RSS feed for the blog
   * 
   * @param blogPosts Array of blog posts
   * @param siteUrl Base URL of the site
   * @returns RSS feed XML
   */
  static generateBlogFeed(blogPosts: any[], siteUrl: string): string {
    // Convert blog posts to RSS feed items
    const feedItems = blogPosts
      .filter(post => post.status === 'published')
      .map(post => ({
        id: post.id,
        title: post.title,
        link: `${siteUrl}/blog/${post.id}`,
        description: post.excerpt || '',
        pubDate: new Date(post.publishDate),
        author: post.author?.name || '',
        category: post.category,
        content: post.content,
        imageUrl: post.featuredImage,
      }));
    
    // Generate the RSS feed
    return this.generateFeed(feedItems, {
      title: 'Ahmed Jamal Blog',
      description: 'Latest posts from Ahmed Jamal\'s blog',
      siteUrl,
      feedUrl: `${siteUrl}/rss.xml`,
      language: 'ar',
      copyright: `Copyright © ${new Date().getFullYear()} Ahmed Jamal. All rights reserved.`,
      managingEditor: 'ahmed@example.com (Ahmed Jamal)',
    });
  }
  
  /**
   * Generates and serves an Atom feed for the blog
   * 
   * @param blogPosts Array of blog posts
   * @param siteUrl Base URL of the site
   * @returns Atom feed XML
   */
  static generateBlogAtomFeed(blogPosts: any[], siteUrl: string): string {
    // Convert blog posts to feed items
    const feedItems = blogPosts
      .filter(post => post.status === 'published')
      .map(post => ({
        id: post.id,
        title: post.title,
        link: `${siteUrl}/blog/${post.id}`,
        description: post.excerpt || '',
        pubDate: new Date(post.publishDate),
        author: post.author?.name || '',
        category: post.category,
        content: post.content,
        imageUrl: post.featuredImage,
      }));
    
    // Generate the Atom feed
    return this.generateAtomFeed(feedItems, {
      title: 'Ahmed Jamal Blog',
      description: 'Latest posts from Ahmed Jamal\'s blog',
      siteUrl,
      feedUrl: `${siteUrl}/atom.xml`,
      language: 'ar',
      copyright: `Copyright © ${new Date().getFullYear()} Ahmed Jamal. All rights reserved.`,
      managingEditor: 'Ahmed Jamal',
    });
  }
}

export default RssService;
