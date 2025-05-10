import initialContent from "../data/initial_content.json";

// Simulating a delay for API calls
const simulateApiDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get data from Local Storage or initial content
const getContent = async (section: string): Promise<any> => {
  await simulateApiDelay(300); // Simulate network latency
  try {
    const storedContent = localStorage.getItem("appContent");
    if (storedContent) {
      const parsedContent = JSON.parse(storedContent);
      if (parsedContent[section]) {
        console.log(`Loaded [${section}] from localStorage`);
        return parsedContent[section];
      }
    }
    // @ts-ignore
    if (initialContent[section]) {
      console.log(`Loaded [${section}] from initial_content.json`);
      // @ts-ignore
      const sectionData = initialContent[section];
      // Initialize with default structure if section exists but is empty or not structured
      if (section === "cv" && (!sectionData.data || !sectionData.settings)) {
        return {
          data: { fileName: "Your_CV.pdf", lastUpdated: new Date().toISOString(), url: "" },
          settings: { showDownloadButton: true, showUpdateDate: true, generateFromProfile: false }
        };
      }
      return sectionData;
    }
    // If section is completely missing in initialContent.json, provide a default structure for known sections
    if (section === "cv") {
        console.log(`Providing default structure for [${section}] as it was not in initial_content.json`);
        return {
            data: { fileName: "Your_CV.pdf", lastUpdated: new Date().toISOString(), url: "" },
            settings: { showDownloadButton: true, showUpdateDate: true, generateFromProfile: false }
        };
    }
    if (section === "about") { // Ensure about also has a default if not present
        return { title: "About Us - Default", content: "Default about content.", imageUrl: "/placeholder.svg" };
    }

    throw new Error(`Content for section [${section}] not found and no default structure defined.`);
  } catch (error) {
    console.error(`Error getting content for ${section}:`, error);
    // @ts-ignore
    if (initialContent[section]) return initialContent[section];
     if (section === "cv") { // Fallback default for CV if everything else fails
        return {
            data: { fileName: "Your_CV.pdf", lastUpdated: new Date().toISOString(), url: "" },
            settings: { showDownloadButton: true, showUpdateDate: true, generateFromProfile: false }
        };
    }
    if (section === "about") { 
        return { title: "About Us - Default", content: "Default about content.", imageUrl: "/placeholder.svg" };
    }
    return null;
  }
};

// Helper to save data to Local Storage
const saveContent = async (section: string, data: any): Promise<boolean> => {
  await simulateApiDelay(500); // Simulate network latency
  try {
    const storedContent = localStorage.getItem("appContent");
    let appContent = storedContent ? JSON.parse(storedContent) : {};
    appContent[section] = data;
    localStorage.setItem("appContent", JSON.stringify(appContent));
    console.log(`Saved [${section}] to localStorage`);
    return true;
  } catch (error) {
    console.error(`Error saving content for ${section}:`, error);
    return false;
  }
};

// --- About Page --- //
export interface AboutData {
  title: string;
  content: string; // Could be a JSON string with more structure
  imageUrl: string;
}

export const getAboutData = async (): Promise<AboutData> => {
  return getContent("about") as Promise<AboutData>;
};

export const updateAboutData = async (data: AboutData): Promise<boolean> => {
  return saveContent("about", data);
};

// --- CV Page --- //
export interface CvData {
    fileName: string;
    lastUpdated: string; // ISO date string
    url: string; // URL to the CV file or a data URI for local preview
}

export interface CvSettings {
    showDownloadButton: boolean;
    showUpdateDate: boolean;
    generateFromProfile: boolean; // If CV can be auto-generated
}

export interface CvPageData {
    data: CvData;
    settings: CvSettings;
}

export const getCvData = async (): Promise<CvPageData | null> => {
    const cvPageContent = await getContent("cv");
    if (cvPageContent && cvPageContent.data && cvPageContent.settings) {
        return cvPageContent as CvPageData;
    }
    // Return a default structure if not found or malformed
    return {
        data: { fileName: "Your_CV.pdf", lastUpdated: new Date().toISOString(), url: "" },
        settings: { showDownloadButton: true, showUpdateDate: true, generateFromProfile: false }
    };
};

export const updateCvData = async (data: CvPageData): Promise<boolean> => {
  return saveContent("cv", data);
};


// --- Portfolio --- //
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  // ... other fields
}

export const getPortfolioItems = async (): Promise<PortfolioItem[]> => {
  const items = await getContent("portfolio");
  return items || []; 
};

export const addPortfolioItem = async (item: PortfolioItem): Promise<boolean> => {
  const items = await getPortfolioItems();
  item.id = item.id || Date.now().toString(); // Ensure ID
  items.push(item);
  return saveContent("portfolio", items);
};

export const updatePortfolioItem = async (updatedItem: PortfolioItem): Promise<boolean> => {
  let items = await getPortfolioItems();
  items = items.map(item => item.id === updatedItem.id ? updatedItem : item);
  return saveContent("portfolio", items);
};

export const deletePortfolioItem = async (itemId: string): Promise<boolean> => {
  let items = await getPortfolioItems();
  items = items.filter(item => item.id !== itemId);
  return saveContent("portfolio", items);
};

// --- Blog Posts --- //
export interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  content: string; // Markdown or HTML content
  author: string;
  date: string; // ISO date string
  tags?: string[];
  imageUrl?: string;
  // ... other fields like SEO, metadata
}

export const getBlogPosts = async (): Promise<BlogPostData[]> => {
  try {
    const response = await fetch('http://localhost:4000/api/blog');
    if (!response.ok) throw new Error('Failed to fetch blog posts');
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const getBlogPostById = async (id: string | number): Promise<BlogPostData | null> => {
  try {
    const response = await fetch(`http://localhost:4000/api/blog/${id}`);
    if (!response.ok) throw new Error('Failed to fetch blog post');
    const post = await response.json();
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};


export const addBlogPost = async (post: BlogPostData): Promise<boolean> => {
  const posts = await getBlogPosts();
  post.id = post.id || Date.now().toString();
  post.slug = post.slug || post.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  posts.unshift(post); // Add new posts to the beginning
  return saveContent("blogPosts", posts);
};

export const updateBlogPost = async (updatedPost: BlogPostData): Promise<boolean> => {
  let posts = await getBlogPosts();
  posts = posts.map(post => post.id === updatedPost.id ? updatedPost : post);
  return saveContent("blogPosts", posts);
};

export const deleteBlogPost = async (postId: string): Promise<boolean> => {
  let posts = await getBlogPosts();
  posts = posts.filter(post => post.id !== postId);
  return saveContent("blogPosts", posts);
};

// Initialize default content if nothing is in localStorage
const initializeDefaultContent = async () => {
    const storedContent = localStorage.getItem("appContent");
    if (!storedContent) {
        console.log("No appContent in localStorage, initializing with defaults from initial_content.json");
        // @ts-ignore
        const initialDataToStore: Record<string, any> = {};
        if (initialContent.about) {
            // @ts-ignore
            initialDataToStore.about = initialContent.about;
        }
        // @ts-ignore
        if (initialContent.cv) { // Ensure CV is also initialized if present in JSON
            // @ts-ignore
            initialDataToStore.cv = initialContent.cv;
        } else { // Or provide a default if not in JSON
             initialDataToStore.cv = {
                data: { fileName: "Your_CV.pdf", lastUpdated: new Date().toISOString(), url: "" },
                settings: { showDownloadButton: true, showUpdateDate: true, generateFromProfile: false }
            };
        }
        // @ts-ignore
        if (initialContent.portfolio) initialDataToStore.portfolio = initialContent.portfolio;
        // @ts-ignore
        if (initialContent.blogPosts) initialDataToStore.blogPosts = initialContent.blogPosts;
        // Add other sections as needed

        if (Object.keys(initialDataToStore).length > 0) {
            localStorage.setItem("appContent", JSON.stringify(initialDataToStore));
            console.log("Initialized localStorage with default content.");
        } else {
            console.log("initial_content.json is empty or missing expected sections, localStorage not initialized with defaults.");
        }
    } else {
        console.log("appContent found in localStorage.");
    }
};

initializeDefaultContent();

console.log("Content service initialized. Using localStorage for persistence.");

