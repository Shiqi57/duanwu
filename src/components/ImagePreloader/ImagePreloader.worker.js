import { useRef, useState, useEffect, useCallback } from 'react';

const useImagePreloaderWorker = (src) => {
  const worker = useRef(null);
  const [preloadedImage, setPreloadedImage] = useState(null);
  const [workerImagePreloadError, setWorkerImagePreloadError] = useState(false);
  const handleWorkerMessageRef = useRef(null);

  const handleWorkerMessage = ({ data }) => {
    try {
      if (data instanceof Error || (data.blob && data.blob.size === 0)) {
        throw new Error(data);
      }

      const { blob } = data;
      if (blob) {
        const objectURL = URL.createObjectURL(blob);
        setPreloadedImage(objectURL);
      }
    } catch (error) {
      console.error('handleWorkerMessage error:', error.message);
      setWorkerImagePreloadError(true);
    }
  };

  const loadImageWithWorker = useCallback(() => {
    if (worker.current) {
      worker.current.removeEventListener(
        'message',
        handleWorkerMessage.current
      );
      worker.current.terminate();
    }
    worker.current = new Worker('workers/image-loader.js');
    if (worker.current) {
      handleWorkerMessageRef.current = handleWorkerMessage;
      worker.current.addEventListener('message', handleWorkerMessage);
      worker.current.postMessage({ source : src });
    }
  }, [worker, src]);

  useEffect(() => {
    return () => {
      if (worker.current) {
        worker.current.removeEventListener('message', handleWorkerMessage);
        worker.current.terminate();
        worker.current = null;
      }
    };
  }, []);

  return { loadImageWithWorker, preloadedImage, workerImagePreloadError };
};

export default useImagePreloaderWorker;
