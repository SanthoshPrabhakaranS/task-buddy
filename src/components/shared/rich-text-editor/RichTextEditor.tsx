import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { assets } from '../../../assets';
import Button from '../button';
import { cn } from '../../../utils/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  maxCharacters?: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  maxCharacters = 300,
}) => {
  const [characterCount, setCharacterCount] = useState(0);

  const editor = useEditor({
    extensions: [StarterKit, BulletList, OrderedList],
    content: value,
    onUpdate: ({ editor }) => {
      const currentContent = editor.getText();
      const currentLength = currentContent.length;

      setCharacterCount(currentLength);

      if (currentLength <= maxCharacters) {
        onChange(editor.getHTML());
      } else {
        const truncatedContent = currentContent.slice(0, maxCharacters);
        editor.commands.setContent(truncatedContent);
        setCharacterCount(maxCharacters);
      }
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose max-w-none [&_ol]:list-decimal [&_ol]:ml-2 [&_ul]:list-disc [&_ul]:ml-2 h-[100px]'
        ),
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
      setCharacterCount(editor.getText().length);
    }
  }, [value, editor]);

  const _renderToolButton = useCallback(
    (
      title: string,
      icon: ReactNode,
      onClick: () => void,
      isActive: boolean
    ) => {
      return (
        <Button
          onClick={onClick}
          className={`p-2 rounded hover:bg-lightGray ${
            isActive ? 'bg-white border' : 'bg-lightGray'
          }`}
          icon={icon}
          aria-label={title}
        />
      );
    },
    [editor]
  );

  return (
    <div className='border border-gray-300 rounded-lg p-3 bg-lightGray'>
      <div className='w-full flex flex-row items-center gap-2 mb-1'>
        <img
          className='w-[13px] h-[15px]'
          src={assets.DescriptionImg}
          alt='description'
        />
        <p className='text-black/40 font-medium text-sm'>Description</p>
      </div>
      {/* Editor Content */}
      <EditorContent editor={editor} className='min-h-[100px] list-disc' />

      {/* Toolbar */}
      <div className='w-full flex flex-row items-center justify-between'>
        <div className='flex flex-wrap gap-1 items-center'>
          {_renderToolButton(
            'Bold',
            <img className='w-[10px]' src={assets.BoldImg} alt='bold' />,
            () => editor?.chain().focus().toggleBold().run(),
            editor?.isActive('bold') || false
          )}
          {_renderToolButton(
            'Italic',
            <img
              className='w-[10px] h-[13px]'
              src={assets.ItalicImg}
              alt='italic'
            />,
            () => editor?.chain().focus().toggleItalic().run(),
            editor?.isActive('italic') || false
          )}
          {_renderToolButton(
            'Strike',
            <img className='w-[11px]' src={assets.StrikeImg} alt='strike' />,
            () => editor?.chain().focus().toggleStrike().run(),
            editor?.isActive('strike') || false
          )}
          <div className='h-5 w-[.5px] bg-black/20'></div>
          {_renderToolButton(
            'Bullet List',
            <img
              className='w-[13px]'
              src={assets.BulletListImg}
              alt='bullet list'
            />,
            () => editor?.chain().focus().toggleBulletList().run(),
            editor?.isActive('bulletList') || false
          )}
          {_renderToolButton(
            'Numbered List',
            <img
              className='w-[13px]'
              src={assets.OrderedListImg}
              alt='numbered list'
            />,
            () => editor?.chain().focus().toggleOrderedList().run(),
            editor?.isActive('orderedList') || false
          )}
        </div>

        <div className='text-sm text-black/40 font-medium'>
          {characterCount}/{maxCharacters} characters
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
