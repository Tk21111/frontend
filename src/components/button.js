import { useEffect, useState, useRef } from 'react';

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function ButtonRanNum({ id, onClick, destroy }) {
  const [disabled, setDisabled] = useState(false);
  const [randomString, setRandomString] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const typingRef = useRef(null);
  
  const typeRandomString = () => {
    // Clear any existing timeout to prevent memory leaks
    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }
    
    const newRandomString = generateRandomString(12);
    let displayedText = '';
    
    const typeChar = (index) => {
      if (index < newRandomString.length) {
        displayedText += newRandomString.charAt(index);
        setRandomString(displayedText);
        
        typingRef.current = setTimeout(() => {
          typeChar(index + 1);
        }, 10);
      }
    };
    
    // Start typing
    typeChar(0);
  };

  useEffect(() => {
    // Initial string typing
    typeRandomString();
    
    // Regenerate string every 3 seconds
    const interval = setInterval(() => {
      typeRandomString();
    }, 3000);

    // Cursor blink every 500ms
    const blink = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(blink);
      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      key={id}
      className="selectChild border-2 border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 p-2 rounded"
      onClick={handleClick}
      disabled={disabled}
    >
      {randomString}
      <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </button>
  );
}

export default ButtonRanNum;