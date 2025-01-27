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
        // Create upload widget
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (!error && result && result.event === 'success') {
              console.log('Upload successful:', result.info);
              setPublicId(result.info.public_id);
            }
          }
        );

        // Add click event to open widget
        const handleUploadClick = () => {
          if (uploadWidgetRef.current) {
            uploadWidgetRef.current.open();
          }
        };

        const buttonElement = uploadButtonRef.current;
        buttonElement.addEventListener('click', handleUploadClick);

        // Cleanup
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
