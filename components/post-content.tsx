interface PostContentProps {
  html: string;
}

export function PostContent({ html }: PostContentProps) {
  return (
    <div
      className="post-content max-w-none text-[15px] leading-7"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
