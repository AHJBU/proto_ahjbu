
// Share functions for blog posts
export const copyToClipboard = (text: string): Promise<boolean> => {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text)
      .then(() => true)
      .catch(() => false);
  } else {
    // Fallback for older browsers
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return Promise.resolve(successful);
    } catch (err) {
      return Promise.resolve(false);
    }
  }
};

export const shareOnTwitter = (url: string, title: string) => {
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, 
    '_blank', 'width=550,height=420');
};

export const shareOnFacebook = (url: string) => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, 
    '_blank', 'width=550,height=420');
};

export const shareOnLinkedIn = (url: string, title: string) => {
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, 
    '_blank', 'width=550,height=420');
};

export const shareOnWhatsApp = (url: string, title: string) => {
  window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, 
    '_blank', 'width=550,height=420');
};
