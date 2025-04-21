import { useEffect, useState } from 'react';

function ButtonRanNum({ i , func , destory}) {
  const [disabled, setDisabled] = useState(false);

  return (
    <button
      key={i}
      className='selectChild border-2 border-blue-100 focus:'
      onClickCapture={() => func()}
      disabled={disabled}
    >
      {i}
    </button>
  );
}

export default ButtonRanNum;
