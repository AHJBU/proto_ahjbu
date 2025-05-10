import React, { useEffect, useCallback, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Link from '@tiptap/extension-link';
import Quote from '@tiptap/extension-blockquote';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';

interface BlogPostEditorProps {
  post?: any;
  onSave: (post: any) => void;
}

const AUTOSAVE_INTERVAL = 3000; // 3 seconds

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({ post, onSave }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [coverImage, setCoverImage] = useState(post?.cover_image || '');
  const [videoUrl, setVideoUrl] = useState(post?.video_url || '');
  const [album, setAlbum] = useState(post?.album || []);
  const [quote, setQuote] = useState(post?.quote || '');
  const [youtubeUrl, setYoutubeUrl] = useState(post?.youtube_url || '');
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Youtube,
      Link,
      Quote,
      Underline,
      Placeholder.configure({ placeholder: 'ابدأ كتابة التدوينة هنا...' }),
    ],
    content: post?.content || '',
  });

  // Auto-save effect
  useEffect(() => {
    if (!editor) return;
    const interval = setInterval(() => {
      setSaving(true);
      onSave({
        title,
        content: editor.getJSON(),
        cover_image: coverImage,
        video_url: videoUrl,
        album,
        quote,
        youtube_url: youtubeUrl,
      });
      setSaving(false);
    }, AUTOSAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [editor, title, coverImage, videoUrl, album, quote, youtubeUrl, onSave]);

  // Image upload handler (stub)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // TODO: upload to server and get URL
    const url = URL.createObjectURL(file);
    setCoverImage(url);
    if (editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // Video upload handler (stub)
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // TODO: upload to server and get URL
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  // Add image to album
  const handleAlbumImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // TODO: upload to server and get URL
    const url = URL.createObjectURL(file);
    setAlbum((prev: string[]) => [...prev, url]);
  };

  // Add YouTube embed
  const handleAddYoutube = () => {
    if (editor && youtubeUrl) {
      editor.chain().focus().setYoutubeVideo({ src: youtubeUrl }).run();
      setYoutubeUrl('');
    }
  };

  // Add quote
  const handleAddQuote = () => {
    if (editor && quote) {
      editor.chain().focus().setBlockquote().insertContent(quote).run();
      setQuote('');
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="عنوان التدوينة"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border rounded p-2 text-lg"
      />
      <div className="flex gap-2 items-center">
        <label>
          صورة الغلاف:
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
        {coverImage && <img src={coverImage} alt="cover" className="h-16 rounded" />}
      </div>
      <div className="flex gap-2 items-center">
        <label>
          فيديو:
          <input type="file" accept="video/*" onChange={handleVideoUpload} />
        </label>
        {videoUrl && <video src={videoUrl} controls className="h-16" />}
      </div>
      <div className="flex gap-2 items-center">
        <label>
          ألبوم صور:
          <input type="file" accept="image/*" onChange={handleAlbumImageUpload} />
        </label>
        <div className="flex gap-1">
          {album.map((img: string, idx: number) => (
            <img key={idx} src={img} alt={`album-${idx}`} className="h-12 rounded" />
          ))}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="رابط يوتيوب"
          value={youtubeUrl}
          onChange={e => setYoutubeUrl(e.target.value)}
          className="border rounded p-1"
        />
        <button type="button" onClick={handleAddYoutube} className="bg-blue-500 text-white px-2 py-1 rounded">إضافة يوتيوب</button>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="اقتباس"
          value={quote}
          onChange={e => setQuote(e.target.value)}
          className="border rounded p-1"
        />
        <button type="button" onClick={handleAddQuote} className="bg-green-500 text-white px-2 py-1 rounded">إضافة اقتباس</button>
      </div>
      <EditorContent editor={editor} className="border rounded min-h-[300px] p-2" />
      <div className="text-sm text-gray-500">{saving ? 'يتم الحفظ...' : 'تم الحفظ تلقائياً'}</div>
      <button
        type="button"
        onClick={() => {
          if (editor) {
            onSave({
              title,
              content: editor.getJSON(),
              cover_image: coverImage,
              video_url: videoUrl,
              album,
              quote,
              youtube_url: youtubeUrl,
            });
          }
        }}
        className="bg-primary text-white px-4 py-2 rounded mt-2"
      >
        حفظ نهائي
      </button>
    </div>
  );
};

export default BlogPostEditor;
