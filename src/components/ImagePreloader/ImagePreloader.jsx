import { useState, useEffect, useMemo, useRef } from 'react';
import classnames from 'classnames';
import gsap from 'gsap';
import PropTypes from 'prop-types';
import useImagePreloaderWorker from './ImagePreloader.worker';
import styled from './ImagePreloader.module.scss';

const propTypes = {
  src         : PropTypes.string,
  className   : PropTypes.string,
  aspectRatio : PropTypes.number,
  width       : PropTypes.string,
  height      : PropTypes.string,
  alt         : PropTypes.string,
  fit         : PropTypes.oneOf(['cover', 'contain', 'fill', 'scale-down']),
  noFade      : PropTypes.bool,
  withWorker  : PropTypes.bool,
};

const defaultProps = {
  src         : '',
  className   : '',
  aspectRatio : null,
  width       : '',
  height      : 'auto',
  alt         : '',
  fit         : 'cover',
  noFade      : false,
  withWorker  : true
};

const ImagePreloader = (props) => {
  const {
    src,
    aspectRatio,
    className,
    width,
    height,
    fit,
    noFade,
    withWorker,
    alt
  } = props;

  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const { preloadedImage, loadImageWithWorker, workerImagePreloadError } =
    useImagePreloaderWorker(src);

  const handleOnLoad = () => {
    setLoaded(true);
  };

  const containerClassNames = classnames(
    styled.ImagePreloader,
    className
  );

  const containerStyle = {
    ...(width && { width }),
    ...(height && { height })
  };

  const imgClassNames = classnames(
    styled.image,
    styled[`image--${fit}`],
    className
  );

  const imageSource = useMemo(() => {
    if (!withWorker || workerImagePreloadError) {
      return src;
    } else if (withWorker && preloadedImage) {
      return preloadedImage;
    }
  }, [withWorker, preloadedImage, workerImagePreloadError, src]);

  const mountImage = useMemo(() => {
    if (!withWorker || workerImagePreloadError) {
      return true;
    } else if (withWorker && preloadedImage) {
      return true;
    }
    return false;
  }, [withWorker, preloadedImage, workerImagePreloadError]);

  useEffect(() => {
    if (withWorker) {
      loadImageWithWorker();
    }
  }, [src, withWorker, loadImageWithWorker]);

  useEffect(() => {
    // Make sure to set loaded to true if img.complete is true
    // THis happens when the image is cached in the browser
    if (imgRef && imgRef.current) {
      if (imgRef.current.complete && !loaded) {
        setLoaded(true);
      }
    }
  }, [mountImage, loaded, setLoaded]);

  useEffect(() => {
    if (loaded && containerRef && containerRef.current) {
      gsap.to(
        containerRef.current,
        { opacity : 1, duration : noFade ? 0 : 0.4, ease : 'power4.inOut' }
      );
    }
  }, [loaded, containerRef, noFade]);

  const imgStyle = aspectRatio
    ? {
      position : 'absolute',
      width    : '100%',
      height   : '100%'
    }
    : height === 'auto'
      ? {
        position : 'relative',
        height   : 'auto'
      }
      : {};

  return (
    <div
      ref={containerRef}
      className={containerClassNames}
      style={containerStyle}
    >
      {aspectRatio && (
        <div className={styled.aspectRatioContainer} style={{ width }}>
          <div
            className={styled.aspectRatioContainerInner}
            style={{ paddingTop : `${100 * aspectRatio}%` }}
          ></div>
        </div>
      )}
      {mountImage && (
        // eslint-disable-next-line
        <img
          ref={imgRef}
          style={imgStyle}
          className={imgClassNames}
          src={imageSource}
          onLoad={handleOnLoad}
          alt={alt}
        />
      )}
    </div>
  );
};

ImagePreloader.propTypes = propTypes;
ImagePreloader.defaultProps = defaultProps;

export default ImagePreloader;
