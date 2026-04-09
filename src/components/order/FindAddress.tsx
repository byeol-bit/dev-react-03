import styled from 'styled-components'
import Button from '../common/Button'
import { useEffect } from 'react'

interface IFindAddress {
  onCompleted: (address: string) => void;
}

const SCRIPT_URL = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

const FindAddress = ({ onCompleted }: IFindAddress) => {
  const handleFindAddress = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        onCompleted(data.address as string);
      }
    }).open();
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    }
  }, []);

  return (
    <Button type='button' size='small' scheme='normal' onClick={handleFindAddress}>주소 찾기</Button>
  )
}

export default FindAddress