import React from 'react';

interface dataFooter {
  pageName: string;
}

const Footer: React.FC<dataFooter> = ({ pageName }) => {
  const styleComponent: React.CSSProperties = {
    
  };

  return (
    <div style={styleComponent}>
      <p>{pageName}</p>
    </div>
  );
};

export default Footer;