import Loader from 'react-loader-spinner';
import React from 'react';
export default function LoaderApp() {
  return (
    <Loader
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
      // timeout={3000} //3 secs
    />
  );
}
