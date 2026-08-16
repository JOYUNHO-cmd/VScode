import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, X, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
}

export const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.75): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Scale down if it exceeds maximum width
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Compress as JPEG to significantly reduce file size
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => {
        reject(new Error('이미지를 불러올 수 없습니다.'));
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('파일을 읽는 데 실패했습니다.'));
    };
    reader.readAsDataURL(file);
  });
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ label, value, onChange, id }) => {
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Compress the image to maintain fast loads and fit in Firestore database safely
      const compressedBase64 = await compressImage(file);
      onChange(compressedBase64);
    } catch (err) {
      console.error(err);
      setError('이미지 처리 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    onChange('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2" id={`${id}-uploader-container`}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold text-gray-700" htmlFor={id}>
          {label}
        </label>
        <button
          type="button"
          id={`${id}-toggle-mode-btn`}
          onClick={() => {
            setIsUrlMode(!isUrlMode);
            setError(null);
          }}
          className="text-xs text-primaryDark hover:underline font-medium flex items-center gap-1 focus:outline-none"
        >
          {isUrlMode ? (
            <>
              <Upload size={12} /> 이미지 파일 직접 넣기
            </>
          ) : (
            <>
              <LinkIcon size={12} /> 이미지 주소(URL)로 입력
            </>
          )}
        </button>
      </div>

      {isUrlMode ? (
        <div className="relative">
          <input
            id={id}
            type="text"
            required
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary transition-all outline-none"
            placeholder="https://example.com/image.jpg 또는 이미지 주소를 입력하세요."
          />
          {value && (
            <button
              type="button"
              id={`${id}-clear-url-btn`}
              onClick={clearImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <X size={16} />
            </button>
          )}
        </div>
      ) : (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            id={`${id}-file-input`}
          />

          {value ? (
            // Thumbnail / Image Preview
            <div 
              id={`${id}-preview-card`}
              className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-slate-50 group flex items-center justify-center shadow-inner"
            >
              <img
                src={value}
                alt="미리보기"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  id={`${id}-remove-preview-btn`}
                  onClick={clearImage}
                  className="bg-white/90 hover:bg-white text-red-600 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow shadow-black/10"
                >
                  <X size={14} /> 지우고 다시 등록
                </button>
              </div>
            </div>
          ) : (
            // Drag and Drop Area
            <div
              id={`${id}-dropzone`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[140px] ${
                isDragging
                  ? 'border-primary bg-primary/5 scale-[0.99]'
                  : 'border-slate-200 hover:border-primary/50 bg-white hover:bg-slate-50/55'
              }`}
            >
              {isProcessing ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
                  <p className="text-sm text-gray-500 font-medium">이미지 최적화 중...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <Upload className="text-primary w-5 h-5 animate-pulse" />
                  </div>
                  <p className="text-sm font-bold text-gray-800 mb-1">
                    클릭하여 사진 파일 보관함에서 선택
                  </p>
                  <p className="text-xs text-gray-400">
                    또는 여기에 마우스로 사진을 끌어다 놓으세요 (Drag & Drop)
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 font-medium mt-1" id={`${id}-error-text`}>
          ⚠️ {error}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
