'use client';

import { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const timeoutRef = useRef(null);
  const textCache = useRef(new Map());

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  // Pre-cache text for faster rendering
  useEffect(() => {
    textArray.forEach(text => {
      if (!textCache.current.has(text)) {
        textCache.current.set(text, [...text]);
      }
    });
  }, [textArray]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return '#ffffff';
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout;
    let animationFrame;

    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;
    const cachedText = textCache.current.get(processedText) || [...processedText];

    const executeTypingAnimation = () => {
      if (!isVisible) return;
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }

          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }

          setCurrentTextIndex(prev => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          // Use requestAnimationFrame for smoother deletion
          animationFrame = requestAnimationFrame(() => {
            timeout = setTimeout(() => {
              setDisplayedText(prev => prev.slice(0, -1));
            }, deletingSpeed);
          });
        }
      } else {
        if (currentCharIndex < processedText.length) {
          // Use requestAnimationFrame for smoother typing
          animationFrame = requestAnimationFrame(() => {
            timeout = setTimeout(
              () => {
                setDisplayedText(prev => prev + processedText[currentCharIndex]);
                setCurrentCharIndex(prev => prev + 1);
              },
              variableSpeed ? getRandomSpeed() : typingSpeed
            );
          });
        } else if (textArray.length > 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => {
      clearTimeout(timeout);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

  const renderContent = useMemo(() => {
    const currentColor = getCurrentTextColor();
    return createElement(
      Component,
      {
        ref: containerRef,
        className,
        style: { color: currentColor },
        ...props
      },
      displayedText,
      showCursor && (
        <span
          ref={cursorRef}
          className={cursorClassName}
          style={{
            opacity: hideCursorWhileTyping && !isDeleting && currentCharIndex < textArray[currentTextIndex].length ? 0 : 1,
            transition: 'opacity 150ms ease-in-out'
          }}
        >
          {cursorCharacter}
        </span>
      )
    );
  }, [displayedText, currentTextIndex, isDeleting, showCursor, cursorCharacter, Component, className, props]);

  return renderContent;
};

export default TextType;
