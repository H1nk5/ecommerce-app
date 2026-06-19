import { useState } from 'react';
import { FALLBACK_IMG } from '../mockData';

// 所有图片统一走这个组件，自动处理加载失败
export default function SafeImg({ src, alt = '', className = '', style = {}, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(FALLBACK_IMG);
    }
  };

  return (
    <img
      src={imgSrc || FALLBACK_IMG}
      alt={alt}
      className={className}
      style={style}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
}
