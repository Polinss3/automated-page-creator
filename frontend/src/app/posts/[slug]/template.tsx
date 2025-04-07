import React from 'react';
import Head from 'next/head';

interface PostTemplateProps {
  title: string;
  meta_description: string;
  body_content: string;
}

const PostTemplate: React.FC<PostTemplateProps> = ({ title, meta_description, body_content }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={meta_description} />
      </Head>
      <main dangerouslySetInnerHTML={{ __html: body_content }} />
    </>
  );
};

export default PostTemplate;
