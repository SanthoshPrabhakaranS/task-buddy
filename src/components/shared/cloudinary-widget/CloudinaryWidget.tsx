import { FC, useEffect, useRef } from 'react';

interface CloudinaryUploadWidgetProps {
  uwConfig: any;
  setPublicId: (publicId: string) => void;
}

const CloudinaryUploadWidget: FC<CloudinaryUploadWidgetProps> = ({
  uwConfig,
  setPublicId,
}) => {
  const uploadWidgetRef = useRef<any>(null);
  const uploadButtonRef = useRef<any>(null);

  useEffect(() => {
    const initializeUploadWidget = () => {
      if (window.cloudinary && uploadButtonRef.current) {
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (!error && result && result.event === 'success') {
              setPublicId(result.info.public_id);
            }
          }
        );

        const handleUploadClick = () => {
          if (uploadWidgetRef.current) {
            uploadWidgetRef.current.open();
          }
        };

        const buttonElement = uploadButtonRef.current;
        buttonElement.addEventListener('click', handleUploadClick);

        return () => {
          buttonElement.removeEventListener('click', handleUploadClick);
        };
      }
    };

    initializeUploadWidget();
  }, [uwConfig, setPublicId]);

  return (
    <button
      ref={uploadButtonRef}
      id='upload_widget'
      className='cloudinary-button'
    >
      Upload
    </button>
  );
};

export default CloudinaryUploadWidget;
