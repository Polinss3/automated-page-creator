import React from 'react';
import styles from './PostDetails.module.css';

interface PostDetailsProps {
  content: string;
}

const PostDetails: React.FC<PostDetailsProps> = ({ content }) => {
  return (
    <div
      className={styles.postContent}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default PostDetails;
