import React from 'react';

function DownloadLink({ fileUrl, fileName }) {
  return (
    <a href={fileUrl} download={fileName}>
      Download File
    </a>
  );
}

export default DownloadLink;
