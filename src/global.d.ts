interface Window {
  cloudinary: {
    createUploadWidget: (
      options: {
        cloudName: string;
        uploadPreset: string;
        [key: string]: any;
      },
      callback: (error: any, result: any) => void
    ) => {
      open: () => void;
      destroy: () => void;
    };
  };
}
