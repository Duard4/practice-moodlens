import { useState, useEffect } from 'react';

const EditField = ({ onContentChange, onLengthChange, initialContent }) => {
  const [content, setContent] = useState(initialContent);
  const maxLength = 10000;

  useEffect(() => {
    const savedContent = localStorage.getItem('content');
    if (savedContent) setContent(savedContent);
  }, []);

  useEffect(() => {
    localStorage.setItem('content', content);
  }, [content]);

  const handleChange = (e) => {
    const newContent = e.target.value;
    if (newContent.length <= maxLength) {
      setContent(newContent);
      onContentChange(newContent);
      onLengthChange(newContent.length);
    }
  };

  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Рецензія</h2>
      <div className="relative">
        <textarea
          value={content}
          onChange={handleChange}
          className="textarea textarea-bordered w-full h-64"
          placeholder="Писати тут..."
          maxLength={maxLength}
        />
        <div className="text-sm text-gray-500 mt-2 text-right">
          {content.length}/{maxLength}
        </div>
      </div>
    </div>
  );
};

export default EditField;
