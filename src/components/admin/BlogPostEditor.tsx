import React from 'react';

interface BlogPostEditorProps {
  post?: any;
  onSave: (post: any) => void;
}

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({ post, onSave }) => {
  // This is just a placeholder that we keep for compatibility
  return (
    <div>
      <p>Blog Post Editor (placeholder)</p>
      <button onClick={() => onSave({})}>Save</button>
    </div>
  );
};

export default BlogPostEditor;
