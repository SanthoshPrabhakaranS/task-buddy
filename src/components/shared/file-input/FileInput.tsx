import React, { FC, useCallback, useEffect, useState } from 'react';
import { assets } from '../../../assets';

interface FileInputProps {
  file: File | string | null;
  setFile: (file: File | null) => void;
}

const FileInput: FC<FileInputProps> = ({ file, setFile }) => {
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      if (file instanceof File) {
        if (file.type.startsWith('image/')) {
          setPreviewURL(URL.createObjectURL(file));
        } else {
          setPreviewURL(assets.FileImg);
        }
      } else if (typeof file === 'string') {
        setPreviewURL(file);
      }
    } else {
      setPreviewURL(null);
    }
  }, [file]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setFile(file);
      }
    },
    [setFile]
  );

  const handleRemoveFile = useCallback(() => {
    setPreviewURL(null);
    setFile(null);
  }, [setFile]);

  return (
    <div className='w-full flex flex-col gap-1'>
      <p className='text-[14px] font-medium text-black/60'>Attachment</p>
      <label
        htmlFor='file'
        className='border border-black/10 p-3 rounded-lg cursor-pointer bg-lightGray'
      >
        <p className='text-[12px] font-medium text-center'>
          Drop your files here or{' '}
          <span className='text-[#2956DD] underline'>Update</span>
        </p>
      </label>
      <input
        type='file'
        id='file'
        name='file'
        className='hidden'
        onChange={handleFileChange}
        required
      />
      {/* Render preview only if previewURL is valid */}
      {previewURL && (
        <div className='relative flex mt-2 w-[200px] h-[150px]'>
          <div
            onClick={handleRemoveFile}
            className='absolute right-[-7px] top-[-8px] bg-lightGray rounded-full border border-black/10 flex h-[25px] w-[25px] justify-center items-center cursor-pointer'
          >
            <img
              className='w-[17px] rounded-lg'
              src={assets.CloseImg}
              alt='close'
            />
          </div>
          <img
            src={previewURL}
            alt='preview'
            className='w-[200px] h-[150px] object-cover rounded-lg border border-black/10'
          />
        </div>
      )}
    </div>
  );
};

export default FileInput;
